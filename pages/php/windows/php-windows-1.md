---
layout: page-steps
language: PHP
title: Windows
permalink: /php/windows/
redirect_from:
  - /php/
  - /php/windows/step/
  - /php/windows/step/1
---

> In this section, you will get SQL Server 2017 on Windows. After that you will install the necessary dependencies to create PHP apps with SQL Server

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_windows.md %}

## Step 1.2 Install PHP and Chocolatey

You can download PHP using the [**Web Platform Installer**](https://www.microsoft.com/web/downloads/platform.aspx). Once you download Web PI, open it up search for **PHP 7.1 x64 for IIS**. Download the entry which says **'PHP 7.1.7 (x64) for IIS Express'**.

Next, install Chocolatey. Chocolatey is a package manager like apt-get and yum for Windows. We will use Chocolatey later in the tutorial. Use an elevated Command-line session (run as administrator):

```powershell
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

For Chocolatey to work, you now need to restart the terminal session by closing and opening the terminal.

> You have succesfuly installed PHP and Chocolatey on your machine! 

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server
{% include partials/install_sqlcmd_windows.md %}

