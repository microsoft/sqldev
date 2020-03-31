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

## Step 1.2 Install Homebrew and .NET Core

If you already have .NET Core installed on your machine, skip this step.

Install .NET Core by downloading the **[official installer](https://download.microsoft.com/download/0/F/D/0FD852A4-7EA1-4E2A-983A-0484AC19B92C/dotnet-sdk-2.0.0-osx-gs-x64.pkg)**. This installer will install the tools and put them on your PATH so you can run dotnet from the Console.

> You have successfully installed .NET Core on your Mac. You now have everything you need to start writing your C# apps with Azure SQL!
