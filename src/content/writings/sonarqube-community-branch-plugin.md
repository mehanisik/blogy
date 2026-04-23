---
title: Branch Analysis on SonarQube Community for Free
date: 2026-03-15T00:00:00+00:00
type: blog
description: Using the mc1arke community branch plugin to unlock branch analysis and PR decoration on a self-hosted SonarQube Community Build.
metadata: {"read_time":"3"}
tags: ["sonarqube","devops","static-analysis","self-hosted","ci"]
---
SonarQube is one of those tools most teams end up running eventually. The Community Build is free and covers a lot of ground, but **branch analysis** and **pull request decoration** are locked behind Developer Edition. If you are self hosting and do not want to pay per LOC, there is a community plugin by [mc1arke](https://github.com/mc1arke/sonarqube-community-branch-plugin) that adds both features to Community Build.

Two things up front. The plugin is not maintained or supported by SonarSource, and there is no upgrade path from Community + plugin to a paid edition. That is fine for internal use, less fine if you plan to move to Developer Edition later.

## The Easy Way: Docker Image

mc1arke publishes a pre-baked image that matches the upstream SonarQube tag:

```yaml
services:
  sonarqube:
    image: mc1arke/sonarqube-with-community-branch-plugin:latest
    ports: ["9000:9000"]
    environment:
      SONAR_JDBC_URL: jdbc:postgresql://db:5432/sonar
      SONAR_JDBC_USERNAME: sonar
      SONAR_JDBC_PASSWORD: sonar
      SONAR_WEB_JAVAADDITIONALOPTS: "-javaagent:./extensions/plugins/sonarqube-community-branch-plugin.jar=web"
      SONAR_CE_JAVAADDITIONALOPTS: "-javaagent:./extensions/plugins/sonarqube-community-branch-plugin.jar=ce"
    volumes:
      - sonar_data:/opt/sonarqube/data
      - sonar_ext:/opt/sonarqube/extensions
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: sonar
      POSTGRES_PASSWORD: sonar
    volumes: [db:/var/lib/postgresql/data]
volumes: { sonar_data: {}, sonar_ext: {}, db: {} }
```

`docker compose up -d`, wait for SonarQube to come up on :9000, done.

## The Manual Way: Drop the JAR In

If you already run SonarQube another way (VM, Helm chart, ECS), download the JAR from the plugin's [releases page](https://github.com/mc1arke/sonarqube-community-branch-plugin/releases) matching your SonarQube version and:

1. Copy it to `extensions/plugins/`.
2. In `conf/sonar.properties`, add the `-javaagent` flag for both the web and compute engine processes:

```properties
sonar.web.javaAdditionalOpts=-javaagent:./extensions/plugins/sonarqube-community-branch-plugin-<version>.jar=web
sonar.ce.javaAdditionalOpts=-javaagent:./extensions/plugins/sonarqube-community-branch-plugin-<version>.jar=ce
```

3. Restart SonarQube.

You will see a new **Branches** tab on each project once a non-main branch is scanned.

## PR Decoration

For PR comments on GitHub, GitLab, Bitbucket, or Azure DevOps, set up the integration in **Administration → DevOps Platform Integrations** the same way you would on Developer Edition, then pass the PR metadata on the scanner call:

```bash
sonar-scanner \
  -Dsonar.pullrequest.key=123 \
  -Dsonar.pullrequest.branch=feature/x \
  -Dsonar.pullrequest.base=main
```

Most CI systems have a ready to copy snippet in their docs.

## Gotchas

- **Version match matters.** Plugin releases are pinned to SonarQube versions. Upgrade SonarQube and the plugin together, or the web process will not start.
- **Both `web` and `ce` agents are required.** Forgetting the `ce` one produces confusing "branch not found" errors after scan.
- **Behind a reverse proxy or firewall**, set the **Images base URL** in *General → Pull Request* so PR comments can render badges.
- **No official support.** Issues go on the plugin's GitHub tracker, not SonarSource.

Not glamorous, but it turns a free Community Build into something that feels a lot closer to Developer Edition for self hosted setups.

Sources:
- [mc1arke/sonarqube-community-branch-plugin](https://github.com/mc1arke/sonarqube-community-branch-plugin)
- [Docker image: mc1arke/sonarqube-with-community-branch-plugin](https://hub.docker.com/r/mc1arke/sonarqube-with-community-branch-plugin)
- [SonarQube Community Build docs](https://docs.sonarsource.com/sonarqube-community-build)
