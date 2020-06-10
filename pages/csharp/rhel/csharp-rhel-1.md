---
layout: page-steps
language: C#
title: RHEL
permalink: /csharp/rhel/
redirect_from:
  - /rhel/
  - /csharp/rhel/step/
  - /csharp/rhel/step/1
---

> In this section, you will get SQL Server 2019 on Red Hat Enterprise Linux (RHEL). After that you will install the necessary dependencies to create .NET Core apps with SQL Server.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_rhel.md %}

## Step 1.2 Install .NET Core

If you already have .NET Core installed on your machine, skip this step. Install .NET Core using the following commands.

You also need to ensure that your system supports enabling software collections via the [scl tool](https://access.redhat.com/documentation/en-US/Red_Hat_Developer_Toolset/1/html-single/Software_Collections_Guide/#sect-Enabling_the_Software_Collection).

1. Enable the .NET Core Channel. 
  For help registering your machine to get access to the channel see [Chapter 1 of the .NET Core Getting Started Guide](https://access.redhat.com/documentation/en/net-core/1.0/getting-started-guide/chapter-1-install-net-core-100-on-red-hat-enterprise-linux).

  Note: For RHEL 8, .NET Core 3.1 is included in the AppStream repository, this action is unnecessary.

  ```terminal
  subscription-manager repos --enable=rhel-7-server-dotnet-rpms
  ```

2. Install scl-tools
  Note: For RHEL 8, this action is unnecessary.

  ```terminal
  yum install scl-utils
  ```

3. Install .NET Core

  ```terminal:RHEL8
  sudo yum install dotnet-sdk-3.1 -y
  ```

  ```terminal:RHEL7
  sudo yum install rh-dotnet31 -y
  ```

4. Enable the .NET Core software collection
  Note: For RHEL 8, this action is unnecessary.

  ```terminal:RHEL7
  scl enable rh-dotnet31 bash
  ```

> You have successfully installed .NET Core on your RHEL machine. You now have everything you need to start writing your C# apps with SQL Server!
