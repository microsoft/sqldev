---
layout: page-steps
language: C#
title: macOS and Azure SQL
permalink: /csharp/macos/az/step/1
redirect_from:
  - /csharp/macos/az/step/
---

> In this section, you will get setup an Azure SQL instance. After that you will install the necessary dependencies to create .NET Core apps with Auzre SQL.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install .NET Core

If you already have .NET Core installed on your machine, skip this step.

Install .NET Core by downloading the **[official installer](https://download.visualstudio.microsoft.com/download/pr/787e81f1-f0da-4e3b-a989-8a199132ed8c/61a8dba81fbf2b3d533562d7b96443ec/dotnet-sdk-3.1.100-osx-x64.pkg)**. This installer will install the tools and put them on your PATH so you can run dotnet from the Console.

## Step 1.3 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

> You have successfully installed .NET Core on your Mac, and authenticated to Azure. You now have everything you need to start writing your C# apps with Azure SQL!