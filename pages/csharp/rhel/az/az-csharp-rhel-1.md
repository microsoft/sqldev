---
layout: page-steps
language: C#
title: RHEL and Azure SQL
permalink: csharp/rhel/az/
redirect_from:
  - /rhel/az/
  - /csharp/rhel/az/step/
  - /csharp/rhel/az/step/1
---

> In this section, you will get setup an Azure SQL instance. After that you will install the necessary dependencies to create .NET Core apps with Azure SQL.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install .NET Core

If you already have .NET Core installed on your machine, skip this step. Install .NET Core using the following commands.

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
yum install rh-dotnetcore20
```

4. Enable the .NET Core software collection

```terminal
scl enable rh-dotnetcore20 bash
```

## Step 1.3 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

> You have successfully installed .NET Core on your RHEL machine, and authenticated to Azure. You now have everything you need to start writing your C# apps with Azure SQL!
