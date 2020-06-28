---
layout: page-steps
language: Java
title: SLES
permalink: /java/sles/az/
redirect_from:
  - /java/az/sles/step/
  - /java/sles/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create Java apps with Azure SQL.
 
## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Java

If you already have Java installed on your machine, skip the next two steps. Install the Java Runtime Environment (JRE) and the Java Development Kit (JDK) using the following commands.

```terminal
    sudo zypper update
    sudo zypper install java-10-openjdk
    sudo zypper install java-10-openjdk-devel
```

## Step 1.3 Install Maven

[Maven](https://maven.apache.org/) can be used to help manage dependencies, build, test and run your Java project.

```terminal
  wget -c https://downloads.apache.org/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.zip
unzip apache-maven-3.6.3-bin.zip
sudo mv apache-maven-3.6.3 /opt/maven
```

In your favorite text editor, add the following to a new file, maven.sh, in /etc/profile.d/.

```terminal
export M2_HOME=/opt/maven/
export M2=$M2_HOME/bin
export PATH=$M2:$PATH
```

Next, refresh your terminal session or create a new one, and check your versions:

```terminal
mvn -v
```


```results
Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)
Maven home: /opt/maven
Java version: 10.0.2, vendor: Oracle Corporation, runtime: /usr/lib64/jvm/java-10-openjdk-10
Default locale: en, platform encoding: UTF-8
OS name: "linux", version: "4.12.14-8.33-azure", arch: "amd64", family: "unix"
```

Check that you have Maven properly installed by running the following command.


Note: If you're using an older version of Java, such as 1.7, your results above may differ slightly. If you want to use an updated version of Java, please update your Java home variable.

## Step 1.4 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli_linux.md %}

> You have successfully installed Java and Maven on SLES. You now have everything you need to start writing your Java apps with Azure SQL DB!
