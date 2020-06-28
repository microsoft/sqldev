---
layout: page-steps
language: Node.js
title: Windows
permalink: /node/windows/az/
redirect_from:
  - /node/az/
  - /node/windows/az/step/
  - /node/windows/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create Node.js apps with Azure SQL. 

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Chocolatey and Node.js

If you already have Node.js and choco installed on your machine, skip this step. Install Chocolatey using this command in an elevated Command prompt (run as administrator).

```terminal
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

For choco to work, you now need to restart the terminal session by closing and opening the command prompt. Open an elevated Command prompt (run as administrator) and run the following commands to install node:

```terminal
choco install -y nodejs
```

```results
Installing the following packages:
nodejs
The install of nodejs was successful.
  Software install location not explicitly set, could be in package or
  default install location if installer.

Chocolatey installed 1/1 packages. 0 packages failed.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
 ```

 > You have succesfuly installed Node.js and Chocolatey on your machine!


## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/az-install_sqlcmd_windows.md %}

## Step 1.4 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

> You have now authenticated your machine to Azure.  
