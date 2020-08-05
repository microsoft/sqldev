---
layout: page-steps
language: Java
title: RHEL
permalink: java/rhel/server/
redirect_from:
  - /java/
  - /java/rhel/
  - /java/rhel/step/
  - /java/rhel/step/1
---

> In this section, you will get SQL Server 2019 on Red Hat Enterprise Linux (RHEL). After that you will install the necessary dependencies to create Java apps with SQL Server.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_rhel.md %}

## Step 1.2 Install Java

If you already have Java installed on your machine, skip the next two steps. Install the Java Runtime Environment (JRE) using the following command.

```terminal
  sudo yum install java-1.8.0-openjdk
```

```results
Loaded plugins: langpacks, product-id, search-disabled-repos
Resolving Dependencies
--> Running transaction check
---> Package java-1.8.0-openjdk.x86_64 1:1.8.0.111-2.b15.el7_3 will be installed
--> Processing Dependency: java-1.8.0-openjdk-headless = 1:1.8.0.111-2.b15.el7_3
for package: 1:java-1.8.0-openjdk-1.8.0.111-2.b15.el7_3.x86_64
--> Processing Dependency: fontconfig(x86-64) for package: 1:java-1.8.0-openjdk-
1.8.0.111-2.b15.el7_3.x86_64
--> Processing Dependency: libjava.so(SUNWprivate_1.1)(64bit) for package: 1:jav
a-1.8.0-openjdk-1.8.0.111-2.b15.el7_3.x86_64
--> Processing Dependency: libjli.so(SUNWprivate_1.1)(64bit) for package: 1:java
...
Installed:
  java-1.8.0-openjdk.x86_64 1:1.8.0.111-2.b15.el7_3
```

## Step 1.3 Install Maven

[Maven](https://maven.apache.org/) can be used to help manage dependencies, build, test and run your Java project.

```terminal
  sudo wget http://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
  sudo sed -i s/\$releasever/6/g /etc/yum.repos.d/epel-apache-maven.repo
  sudo yum install maven
```

```results
Loaded plugins: langpacks, product-id, search-disabled-repos
Resolving Dependencies
--> Running transaction check
---> Package maven.noarch 0:3.0.5-17.el7 will be installed
--> Processing Dependency: aether-api for package: maven-3.0.5-17.el7.noarch
--> Processing Dependency: aether-connector-wagon for package: maven-3.0.5-17.el7.noarch
--> Processing Dependency: aether-impl for package: maven-3.0.5-17.el7.noarch
--> Processing Dependency: aether-spi for package: maven-3.0.5-17.el7.noarch
--> Processing Dependency: aether-util for package: maven-3.0.5-17.el7.noarch
...
Installed:
  maven.noarch 0:3.0.5-17.el7
```

Check that you have Maven properly installed by running the following command.

```terminal
mvn -v
```

```results
Apache Maven 3.0.5 (Red Hat 3.0.5-17)
Maven home: /usr/share/maven
Java version: 1.8.0_111, vendor: Oracle Corporation
Java home: /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.111-2.b15.el7_3.x86_64/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "3.10.0-327.36.3.el7.x86_64", arch: "amd64", family: "unix"
```

Note: If you're using an older version of Java, such as 1.7, your results above may differ slightly. If you want to use an updated version of Java, please update your Java home variable.

> You have successfully installed Java and Maven on RHEL. You now have everything you need to start writing your Java apps with SQL Server!
