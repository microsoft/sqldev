---
layout: page-steps
language: C#
title: SLES and Azure SQL
permalink: /csharp/sles/az/
redirect_from:
  - /sles/az/
  - /csharp/sles/az/step/
  - /csharp/sles/az/step/1
---

> In this section, you will get setup an Azure SQL instance. After that you will install the necessary dependencies to create .NET Core apps with Auzre SQL.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install .NET Core

If you already have .NET Core installed on your machine, skip this step. Otherwise, install it using the following commands.

```terminal
sudo rpm -Uvh https://packages.microsoft.com/config/sles/12/packages-microsoft-prod.rpm
sudo zypper install dotnet-sdk-3.1
```

## Step 1.3 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

> You have successfully installed .NET Core on your SLES machine, and authenticated to Azure. You now have everything you need to start writing your C# apps with Azure SQL!
