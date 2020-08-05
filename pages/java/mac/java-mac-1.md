---
layout: page-steps
language: Java
title: macOS
permalink: java/macos/server/
redirect_from:
  - /java/
  - /java/mac/
  - /java/mac/step/
  - /java/mac/step/1
---

> In this section, you will get SQL Server 2019 on Docker. After that you will install the necessary dependencies to create Java apps with SQL Server.

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

> You have sucessfully install Homebrew and Java on your macOS! 

## Step 1.3 Install Maven

[Maven](https://maven.apache.org/) can be used to help manage dependencies, build, test and run your Java project.

```terminal
brew install maven
```

```results
==> Using the sandbox
==> Downloading https://www.apache.org/dyn/closer.cgi?path=maven/maven-3/3.3.9/binaries/apache-maven-3
==> Best Mirror http://www-eu.apache.org/dist/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.
######################################################################## 100.0%
     /usr/local/Cellar/maven/3.3.9: 95 files, 9.6M, built in 6 seconds
```

Check that you have Maven properly installed by running the following command.

```terminal
mvn -v
```

```results
Apache Maven 3.3.9 (bb52d8502b132ec0a5a3f4c09453c07478323dc5; 2015-11-10T08:41:47-08:00)
Maven home: /Users/usr1/apache-maven-3.3.9
Java version: 1.8.0_102, vendor: Oracle Corporation
Java home: /Library/Java/JavaVirtualMachines/jdk1.8.0_102.jdk/Contents/Home/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "10.11.6", arch: "x86_64", family: "mac"
```

> You have successfully installed Java and Maven on your Mac. You now have everything you need to start writing your Java apps with SQL Server!
