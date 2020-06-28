---
layout: page-steps
language: C#
title: SLES
permalink: /csharp/sles/az/
redirect_from:
  - /sles/az/
  - /csharp/sles/az/step/
  - /csharp/sles/az/step/1
---

> In this section, you will get setup an Azure SQL DB instance. After that you will install the necessary dependencies to create .NET Core apps with Auzre SQL DB.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install .NET Core

If you already have (**.NET Core**)[https://docs.microsoft.com/en-us/dotnet/core/install/linux-opensuse] installed on your machine, skip this step. Otherwise, install it using the following commands.

First, run the following to add the Microsoft package signing key to your list of trusted keys and add the Microsoft package repository.  

```terminal
sudo zypper install libicu
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
wget https://packages.microsoft.com/config/opensuse/15/prod.repo
sudo mv prod.repo /etc/zypp/repos.d/microsoft-prod.repo
sudo chown root:root /etc/zypp/repos.d/microsoft-prod.repo
```

Now, install the SDK and then the runtime. You may need to reboot your machine.

```terminal
sudo zypper install dotnet-sdk-3.1
sudo zypper install aspnetcore-runtime-3.1
```

## Step 1.3 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli_linux.md %}

> You have successfully installed .NET Core on your SLES machine, and authenticated to Azure. You now have everything you need to start writing your C# apps with Azure SQL DB!
