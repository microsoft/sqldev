---
layout: page-steps
language: Java
title: macOS
permalink: /java/macos/az/
redirect_from:
  - /java/macos/az/step/
  - /java/macos/az/step/1
  - /java/macos/az/1

---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create Java apps with Azure SQL.
 
## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Azul Java

If you already have Java installed on your machine, skip this step. Install the Azul Zulu JDK's for Mac.  Follow instructions [here](https://docs.microsoft.com/en-us/java/azure/jdk/java-jdk-install?view=azure-java-stable).

[Download the 64-bit Azul Zulu JDK 8 as a ZIP file](https://repos.azul.com/azure-only/zulu/packages/zulu-11/11.0.3/zulu-11-azure-jdk_11.31.11-11.0.3-macosx_x64.zip) to a location on your client, such as /Library/Java/JavaVirtualMachines/. (.DMG packages are also provided on Azul's Azure downloads page.)

Launch Finder, navigate to the download directory, and double-click the ZIP file. Alternatively, you can launch a terminal command window, navigate to the directory, and run:

```terminal
unzip <name_of_zulu_package>.zip
```

> You have sucessfully installed Java on your macOS! 

## Step 1.3 Install Maven

[Maven](https://maven.apache.org/) can be used to help manage dependencies, build, test and run your Java project.


Download the latest version of Maven from [here](https://maven.apache.org/), selecting the binary tar.gz file.  Extract the archive to your desired location.

```terminal
sudo su
chown -R root:wheel Downloads/apache-maven*
mv Downloads/apache-maven* /opt/apache-maven
exit
```

Now using your favorite text editor to add the following to your /.profile.  This will add the Maven binaries to your path:

```terminal
export PATH=$PATH:/opt/apache-maven/bin
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

## Step 1.4 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

> You have successfully installed Java and Maven on your Mac, and authenticated to Azure. You now have everything you need to start writing your Java apps with Azure SQL DB!
