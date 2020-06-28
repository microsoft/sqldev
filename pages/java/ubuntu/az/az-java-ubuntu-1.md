---
layout: page-steps
language: Java
title: Ubuntu
permalink: /java/ubuntu/az/
redirect_from:
  - /java/ubuntu/az/1
  - /java/ubuntu/az/step/
  - /java/ubuntu/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create Java apps with Azure SQL.
 
## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

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
Setting up libx11-dev:amd64 (2:1.6.4-3ubuntu0.2) ...
Setting up default-jdk (2:1.11-68ubuntu1~18.04.1) ...
Setting up libxt-dev:amd64 (1:1.1.5-1) ...
Processing triggers for man-db (2.8.3-2ubuntu0.1) ...
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
Setting up maven (3.6.0-1~18.04.1) ...
update-alternatives: using /usr/share/maven/bin/mvn to provide /usr/bin/mvn (mvn) in auto mode
```

Check that you have Maven properly installed by running the following command.

```terminal
mvn -v
```

```results
Apache Maven 3.6.0
Maven home: /usr/share/maven
Java version: 11.0.6, vendor: Ubuntu, runtime: /usr/lib/jvm/java-11-openjdk-amd64
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "5.0.0-25-generic", arch: "amd64", family: "unix"
```

## Step 1.5 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli_linux.md %}

> You have successfully installed Java and Maven on your Ubuntu machine, and authenticated to Azure. You now have everything you need to start writing your Java apps with Azure SQL!
