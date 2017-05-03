---
layout: page-steps
language: Java
title: macOS
permalink: /java/mac/
redirect_from:
  - /java/
  - /java/mac/step/
  - /java/mac/step/1
---

> At the end of this tutorial, you will have created a few Java apps using SQL Server running on your Mac. You will have also tried out some cool SQL Server features we think you'll love.

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_mac.md %}

## Step 1.2 Install Homebrew and Java

If you already have Java installed on your machine, skip this step. Install Homebrew, cask, and Java using the following commands. Once you have installed Homebrew, make sure to restart the terminal session.

{% include partials/install_homebrew.md %}

For Homebrew to work, you need to restart the terminal session by closing and opening the terminal. Once you have opened a new session, update Homebrew and install Java.

```terminal
brew update
brew cask install java
```

```results
==> Tapping caskroom/cask
Cloning into '/usr/local/Homebrew/Library/Taps/caskroom/homebrew-cask'...
...
==> Creating Caskroom at /usr/local/Caskroom
==> Caveats
...
==> Downloading http://download.oracle.com/otn-pub/java/jdk/8u102-b14/jdk-8u102-macosx-x64.dmg
######################################################################## 100.0%
==> Verifying checksum for Cask java
==> Running installer for java; your password may be necessary.
==> Package installers may write to any location; options such as --appdir are ignored.
==> installer: Package name is JDK 8 Update 102
==> installer: Upgrading at base path /
==> installer: The upgrade was successful.
     java was successfully installed!
```