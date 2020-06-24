---
layout: page-steps
language: C#
title: macOS
permalink: csharp/macos/az/
redirect_from:
  - /csharp/macos/az/step/1
  - /csharp/macos/az/step/
  - /csharp/macos/az/1
---

> In this section, you will get setup an Azure SQL instance. After that you will install the necessary dependencies to create .NET Core apps with Auzre SQLDB.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Homebrew and .NET Core

If you already have .NET Core installed on your machine, skip this step.

Install .NET Core by downloading the **[official installer](https://dotnet.microsoft.com/download/dotnet-core/3.1)**. 

Follow the steps (also listed **[here](https://docs.microsoft.com/en-us/dotnet/core/install/sdk?pivots=os-macos)**) to install. 

mkdir -p $HOME/dotnet
sudo installer -pkg ~/Downloads/dotnet-sdk.pkg -target $HOME/dotnet
export DOTNET_ROOT=$HOME/dotnet
export PATH=$PATH:$HOME/dotnet

## Step 1.3 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

> You have successfully installed .NET Core on your Mac, and authenticated to Azure. You now have everything you need to start writing your C# apps with Azure SQL DB!