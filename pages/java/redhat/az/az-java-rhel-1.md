---
layout: page-steps
language: Java
title: RHEL
permalink: /java/rhel/az/
redirect_from:
  - /java/rhel/az/1
  - /java/rhel/az/step/
  - /java/rhel/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create Java apps with Azure SQL.
 
## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Java

If you already have Java installed on your machine, skip the next two steps. Install the Java Runtime Environment (JRE) using the following command.

```terminal
  sudo rpm --import http://repos.azul.com/azul-repo.key
  sudo curl http://repos.azul.com/azure-only/zulu-azure.repo -o /etc/yum.repos.d/zulu-azure.repo
  sudo yum -q -y update
  sudo yum -q -y install zulu-11-azure-jdk
```

## Step 1.3 Install Maven

[Maven](https://maven.apache.org/) can be used to help manage dependencies, build, test and run your Java project.

```terminal
  cd /opt
sudo wget https://www-eu.apache.org/dist/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
sudo tar xzf apache-maven-3.6.3-bin.tar.gz
sudo ln -s apache-maven-3.6.3 maven
```


Now, create a maven.sh file in /etc/profile.d/maven.sh, and put the following into it:

```terminal
export M2_HOME=/opt/maven
export PATH=${M2_HOME}/bin:${PATH}
```

Load the file, and check the maven version:

```terminal
source /etc/profile.d/maven.sh
mvn -v
```

```results

Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)
Maven home: /opt/maven
Java version: 11.0.7, vendor: Azul Systems, Inc., runtime: /usr/lib/jvm/zulu-11-azure
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "4.18.0-193.el8.x86_64", arch: "amd64", family: "unix"
```

Note: If you're using an older version of Java, such as 1.7, your results above may differ slightly. If you want to use an updated version of Java, please update your Java home variable.


## Step 1.4 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli_linux.md %}

> You have successfully installed Java and Maven on your Red Hat machine. You now have everything you need to start writing your Java apps with Azure SQL DB!