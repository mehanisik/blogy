---
title: EndeavourOS + Hyprland dotfiles 
date: 2025-08-11T00:00:00+00:00
type: blog
description: N/A
metadata: {"read_time":"2"}
tags: ["arch","linux","hyprland","dotfiles"]
---
I thought I would share my dotfiles here and give a brief explanation of what dotfiles actually are, and how you can use them if you want and I hope this might be useful or interesting for others.

If you want to try out my configs, check out my [GitHub repo](https://github.com/mehanisik/dotfiles).

Here’s a glimpse of what my EndeavourOS + Hyprland setup looks like at this point:

- **OS:** EndeavourOS
- **WM:** Hyprland
- **Terminal:** Kitty
- **Application Launcher:** Rofi
- **Status Bar:** Waybar
- **Notification Daemon:** Swaync
- **Shell:** Fish

## What Are Dotfiles, And How Do I Use Them?

So why are they called “dotfiles”? Simply put, most configuration settings on Linux systems live in files that begin with a `.`—like `.config/`, `.bash_profile`, `.zshrc`, `.profile`, etc.

You can experiment with someone else’s configs by:

1. Installing the necessary programs.
2. Copying the config files into your home directory.

Some setups include an `install.sh` script that automates this process, but you can also pick and choose what you want to use.

## Using Only What You Like

You don’t have to copy everything. If you like a particular part of someone’s setup, you can just use that config file.

For example, if you like my Waybar setup:

```bash
mkdir -p ~/.config/waybar
cp -r ~/dotfiles/waybar/* ~/.config/waybar/
```

And make sure it runs on startup by editing `~/.config/hypr/hyprland.conf`:

```ini
exec-once = waybar
```

This process works the same for any config files—just check for dependencies first.

## Dynamic Color Schemes with Pywal

I like my colors to match with wallpaper automatically. I use a tool called `pywal` for this. Pywal generates `.conf` and `.css` files with colors based on your wallpaper, and many programs like Hyprland, Waybar, Kitty, and Rofi can use these files:

```bash
# Install pywal16
pip3 install pywal16

# Generate colors from wallpaper
wal -i ~/Pictures/wallpapers/mywallpaper.jpg

# Apply to Hyprland
source ~/.cache/wal/colors-hyprland.conf
```

## Learning and Customizing

Understanding each program and how to configure it is key. Reading the documentation will save time. Once you understand each tool rest will be more fun.

In my setup:

- `~/.config/fish/` → shell configuration
- `~/.config/kitty/` → terminal appearance
- `~/.config/waybar/` → status bar
- `~/.cache/wal/colors-*` → dynamic color schemes

Feel free to experiment, tweak, and make it yours. This is just my personal setup that i am sharing for anyone curious.
