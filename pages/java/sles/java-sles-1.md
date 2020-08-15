---
layout: page-steps
language: Java
title: SLES
permalink: java/sles/server/
redirect_from:
  - /java/
  - /java/sles/
  - /java/sles/step/
  - /java/sles/step/1
---

> In this section, you will get SQL Server 2019 on SUSE Linux Enterprise Server (SLES). After that you will install the necessary dependencies to create Java apps with SQL Server.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_sles.md %}

## Step 1.2 Install Java

If you already have Java installed on your machine, skip the next two steps. Install the Java Runtime Environment (JRE) and the Java Development Kit (JDK) using the following commands.

```terminal
    sudo zypper update
    sudo zypper install java-1_8_0-openjdk
    sudo zypper install java-1_8_0-openjdk-devel
```

## Step 1.3 Install Maven

[Maven](https://maven.apache.org/) can be used to help manage dependencies, build, test and run your Java project.

```terminal
  sudo zypper addrepo http://download.opensuse.org/repositories/devel:tools:building/SLE_12_SP2/devel:tools:building.repo
  sudo zypper refresh
  sudo zypper install maven
```

```results
Apache Maven 3.3.9 (bb52d8502b132ec0a5a3f4c09453c07478323dc5; 2015-11-10T08:41:47-08:00)
Maven home: /usr/share/java/maven
Java version: 1.8.0_121, vendor: Oracle Corporation
Java home: /usr/lib64/jvm/java-1.8.0-openjdk-1.8.0/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "4.4.38-93-default", arch: "amd64", family: "unix"
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

> You have successfully installed Java and Maven on SLES. You now have everything you need to start writing your Java apps with SQL Server!
