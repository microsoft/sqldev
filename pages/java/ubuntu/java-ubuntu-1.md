---
layout: page-steps
language: Java
title: Ubuntu
permalink: java/ubuntu/server/
redirect_from:
  - /java/ubuntu/
  - /java/ubuntu/step/
  - /java/ubuntu/step/1
---

> In this section, you will get SQL Server 2019 on Ubuntu. After that you will install the necessary dependencies to create Java apps with SQL Server.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_ubuntu.md %}

## Step 1.2 Install Java

If you already have Java installed on your machine, skip the next two steps. Install the Java Runtime Environment (JRE) using the following command.

```terminal
  sudo apt-get install default-jre
```

```results
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following package was automatically installed and is no longer required:
  default-jdk-headless
Get:1 http://us.archive.ubuntu.com/ubuntu xenial/main amd64 default-jre amd64 2:1.8-56ubuntu2 [980 B]
...........
...........
Setting up default-jre (2:1.8-56ubuntu2) ...
```

## Step 1.3 Install the Java Development Kit (JDK)

```terminal
sudo apt-get install default-jdk
```

```results
Reading package lists... Done
Building dependency tree
Reading state information... Done
.......
.......
Preparing to unpack .../default-jdk_2%3a1.8-56ubuntu2_amd64.deb ...
Unpacking default-jdk (2:1.8-56ubuntu2) ...
Setting up default-jdk (2:1.8-56ubuntu2) ...
```

## Step 1.4 Install Maven

[Maven](https://maven.apache.org/) can be used to help manage dependencies, build, test and run your Java project.

```terminal
  sudo apt-get install maven
```

```results
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following NEW packages will be installed:
  maven
........
........
Unpacking maven (3.3.9-3) ...
Setting up maven (3.3.9-3) ...
update-alternatives: using /usr/share/maven/bin/mvn to provide /usr/bin/mvn (mvn) in auto mode
```

Check that you have Maven properly installed by running the following command.

```terminal
mvn -v
```

```results
Apache Maven 3.3.9
Maven home: /usr/share/maven
Java version: 1.8.0_111, vendor: Oracle Corporation
Java home: /usr/lib/jvm/java-8-openjdk-amd64/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "4.4.0-45-generic", arch: "amd64", family: "unix"
```

> You have successfully installed Java and Maven on your Ubuntu machine. You now have everything you need to start writing your Java apps with SQL Server!
