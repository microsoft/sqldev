---
layout: page-steps
language: C#
title: Ubuntu and Azure SQL
permalink: /csharp/ubuntu/az/
redirect_from:
  - /csharp/ubuntu/az/step/
  - /csharp/ubuntu/az/step/1
---

> In this section, you will get setup an Azure SQL instance. After that you will install the necessary dependencies to create .NET Core apps with Auzre SQL.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install .NET Core

If you already have .NET Core installed on your machine, skip this step. Otherwise, install it using the following commands.

```terminal
wget https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo add-apt-repository universe
sudo apt-get update
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install dotnet-sdk-3.1
```

## Step 1.3 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

> You have successfully installed .NET Core on your Ubuntu machine, and authenticated to Azure. You now have everything you need to start writing your C# apps with Azure SQL!