---
title: Velero Backups on OpenShift
date: 2026-04-23T00:00:00+00:00
type: blog
description: A short, practical note on backing up OpenShift workloads with OADP and Velero.
metadata: {"read_time":"3"}
tags: ["openshift","velero","oadp","kubernetes","backup"]
---
Backups are one of those things nobody thinks about until the cluster is on fire. On OpenShift my go to is the **OADP Operator**, which wraps Velero with the OpenShift specific plugins you need for things like `ImageStreams` and `Routes`.

One thing worth calling out up front: OADP backs up *applications*, not the cluster itself. For the control plane you still need etcd backups. OADP will not back up operators or etcd.

You will need `oc` for everything here. The `velero` CLI is optional, since every operation can be expressed as a CR and applied with `oc`, but `velero backup describe --details` and `velero backup logs` are much friendlier than digging through CR status. If you install it, point it at the OADP namespace once: `velero client config set namespace=openshift-adp`.

## Install

Install the OADP Operator from OperatorHub into `openshift-adp`, then create a `DataProtectionApplication`:

```yaml
apiVersion: oadp.openshift.io/v1alpha1
kind: DataProtectionApplication
metadata:
  name: dpa-sample
  namespace: openshift-adp
spec:
  configuration:
    velero:
      defaultPlugins: [openshift, aws, csi]
    nodeAgent:
      enable: true
      uploaderType: kopia
  backupLocations:
    - velero:
        provider: aws
        default: true
        objectStorage:
          bucket: my-openshift-backups
          prefix: velero
        config:
          region: eu-central-1
        credential:
          name: cloud-credentials
          key: cloud
```

Kopia is the recommended uploader since OADP 1.3, and CSI snapshots are preferred for persistent volumes when your storage class supports them.

## Back Up and Restore

```bash
velero backup create my-app --include-namespaces my-app --ttl 168h
velero backup describe my-app --details
velero restore create --from-backup my-app
```

For a schedule:

```bash
velero schedule create nightly \
  --schedule="0 2 * * *" \
  --include-namespaces my-app --ttl 720h
```

## Gotchas That Cost Me Time

Most of these show up in the Red Hat docs and community threads, and they all bit me at some point:

- **Upgrade one minor version at a time.** 1.1 to 1.3 means 1.1 → 1.2 → 1.3. Skipping breaks things.
- **Stuck `InProgress` restore.** Delete the restored objects in the target namespace before retrying, otherwise the next restore never kicks off.
- **Do not rotate the repo password after the first backup.** Velero will lose access to older backups.
- **File system backups need pod annotations.** `backup.velero.io/backup-volumes: <volume-name>` on each pod, or use `defaultVolumesToFsBackup: true`.
- **S3 compatibility is not free.** OADP 1.4 ships both `aws` and `legacy-aws` plugins because SDK v1 vs v2 behave differently against non AWS endpoints.
- **Test restores on a schedule.** A backup you have never restored is a wish. A scratch namespace and a namespace mapping is enough for a drill.

OADP is boring in the good way once it is set up, which is exactly what you want from a backup tool.

Sources:
- [OpenShift Backup and Restore docs (4.19)](https://docs.redhat.com/en/documentation/openshift_container_platform/4.19/html-single/backup_and_restore/index)
- [OADP FAQ](https://access.redhat.com/articles/5456281)
- [openshift-velero-plugin](https://github.com/openshift/openshift-velero-plugin)
- [Velero file system backup docs](https://velero.io/docs/main/file-system-backup/)
