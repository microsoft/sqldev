---
layout: page-steps
language: C#
title: RHEL
permalink: csharp/rhel/server/
redirect_from:
  - /rhel/
  - /csharp/rhel/
  - /csharp/rhel/step/
  - /csharp/rhel/step/1
---

> In this section, you will get SQL Server 2019 on Red Hat Enterprise Linux (RHEL) 7. After that you will install the necessary dependencies to create .NET Core apps with SQL Server.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_rhel.md %}

## Step 1.2 Install .NET Core SDK

If you already have .NET Core SDK installed on your machine, skip this step. Install .NET Core using the following commands.

You also need to ensure that your system supports enabling software collections via the [scl tool](https://access.redhat.com/documentation/en-US/Red_Hat_Developer_Toolset/1/html-single/Software_Collections_Guide/#sect-Enabling_the_Software_Collection).

1. Enable the .NET Core Channel.
For help registering your machine to get access to the channel see [Chapter 1 of the .NET Core Getting Started Guide](https://access.redhat.com/documentation/en/net-core/1.0/getting-started-guide/chapter-1-install-net-core-100-on-red-hat-enterprise-linux).

```terminal
subscription-manager repos --enable=rhel-7-server-dotnet-rpms
```

2. Install scl-tools

```terminal
yum install scl-utils
```

3. Install .NET Core

```terminal
yum install rh-dotnet31 -y
```

4. Enable the .NET Core software collection

```terminal
scl enable rh-dotnet31 bash
```

Red Hat does not recommend permanently enabling rh-dotnet31 because it may affect other programs. For example, rh-dotnet31 includes a version of libcurl that differs from the base RHEL version. This may lead to issues in programs that do not expect a different version of libcurl. If you want to enable rh-dotnet permanently, add the following line to your ~/.bashrc file.

```terminal
source scl_source enable rh-dotnet31
```

> You have successfully installed .NET Core on your RHEL machine. You now have everything you need to start writing your C# apps with SQL Server!
