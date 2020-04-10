---
layout: page-steps
language: Java
title: Windows and Azure SQL
permalink: /java/windows/az
redirect_from:
  - /java/windows/az/step/
  - /java/windows/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create .NET Framework apps with SQL Server. 

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Java

If you already have Java installed on your machine, skip the next three steps.

Install the **Java Long-terms supoort for Azure** by following the steps below.

1. Download and install Java from [**Microsoft's Java Support Page**](https://docs.microsoft.com/en-us/java/azure/jdk/java-jdk-install?view=azure-java-stable)
2.  Check your Java install worked by opening a command window and typing the following command.

```terminal
  Java --version
```

Add the JDK to your PATH environment variable (Not sure if this is required after installing from above...TBD)

1. Press start
2. Search for "Advanced System Settings"
3. Click on the "Environment Variables" button
4. Add the location of the bin folder of the JDK installation to the PATH variable in **System Variables**. The following is a typical value for the PATH variable: C:\WINDOWS\system32;C:\WINDOWS;C:\Program Files\Java\jdk1.8.0\bin

## 1.3 Install Maven

[Maven](https://maven.apache.org/) can be used to help manage dependencies, build, test and run your Java project. Follow the instructions below to install Maven.

1. Download the [Maven binary](https://downloads.apache.org/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.zip)
2. Unzip the installer to a file location on your computer

Add the Maven bin directory to your PATH environment variable and add the JRE to the JAVA_HOME environment variable

1. Press start 
2. Search for "Advanced System Settings" 
3. Click on the "Environment Variables" button 
4. Add the location of the bin folder of the Maven installation to the PATH variable 
5. Create a new System Variable for "JAVA_HOME" and point it to the JDK folder (ex. C:\Program Files\Zulu-11)
6. Check that Maven was installed properly by running the following command.

```terminal
  mvn --version
```

```results
Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)
Maven home: C:\Maven\apache-maven-3.6.3\bin\..
Java version: 11.0.3, vendor: Azul Systems, Inc., runtime: C:\Program Files\Zulu\zulu-11
Default locale: en_US, platform encoding: Cp1252
OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
```

## Step 1.3 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}


> You have successfully installed Java and Maven on Windows, and authenticated to Azure. You now have everything you need to start writing your Java apps with Azure SQL!
