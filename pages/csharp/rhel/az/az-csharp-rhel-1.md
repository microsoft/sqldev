---
layout: page-steps
language: C#
title: RHEL
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

If you already have .NET Core installed on your machine, skip this step. Install [.NET Core](https://docs.microsoft.com/en-us/dotnet/core/install/linux-rhel) using the following commands.

1.  Install the SDK

```terminal
sudo dnf install dotnet-sdk-3.1
```

2. Install the runtime

```terminal
sudo dnf install aspnetcore-runtime-3.1
```


## Step 1.3 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli_linux.md %}

> You have successfully installed .NET Core on your RHEL machine, and authenticated to Azure. You now have everything you need to start writing your C# apps with Azure SQL!
