---
layout: page-steps
language: PHP
title: Windows
permalink: /php/windows/az/
redirect_from:
  - /php/windows/az/step/
  - /php/windows/az/step/1
---


> In this section, you create an Azure Hosted SQL Database.  After that you will install the necessary dependencies to create PHP apps with Azure SQL DB.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install PHP and Chocolatey

You can download PHP using the [**Web Platform Installer**](https://www.microsoft.com/web/downloads/platform.aspx). Once you download Web PI, open it up and download the entry which says **'PHP 7.4.1 (x64) for IIS Express'**.

Next, install Chocolatey. Chocolatey is a package manager like apt-get and yum for Windows. We will use Chocolatey later in the tutorial. Use an elevated Command-line session (run as administrator):

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

You can check the version this way:

```terminal
choco -?
```

For Chocolatey to work, you now need to restart the terminal session by closing and opening the terminal.

> You have succesfully installed PHP and Chocolatey on your machine!

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server and Azure SQL.

{% include partials/az-install_sqlcmd_windows.md %}

## Step 1.4 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

