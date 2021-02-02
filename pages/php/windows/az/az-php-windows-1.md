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

For full details of installing PHP you can reference this [**site**](https://www.php.net/manual/en/install.windows.php).

To use PHP with IIS or IIS Express, you can first install the tool [**Web Platform Installer**](https://www.microsoft.com/web/downloads/platform.aspx). With Web Platform Installer, select what you like to install then click the "Add" button on the right and the "Install" button at the bottom. On the following page, click the "I Accept" button after reviewing the license terms. It takes care of installing the dependencies when you choose to install PHP versions and/or the corresponding Microsoft Drivers for PHP for SQL Server.

For example, select the entry **'PHP 8.0.0 (x64)'** if you want the 64-bit (Non Thread Safe) PHP 8.0.0 without the drivers. If you also want the drivers, select **'Microsoft Drivers 5.9 (x64) for PHP 8.0 for SQL Server in IIS'**, which will install PHP 8.0 as well as configure IIS to use PHP drivers 5.9 for SQL Server. 

The advanced users may want to click the "Direct Download link" instead of the "I Accept" button, in which case they have to configure PHP for IIS or take care of installing the dependencies themselves. PHP requires the Visual C++ Redistributable for Visual Studio 2015-2019 [x64](https://aka.ms/vs/16/release/VC_redist.x64.exe) or [x86](https://aka.ms/vs/16/release/VC_redist.x86.exe), depending on whether you are running the 64-bit or 32-bit PHP executables, and Microsoft Drivers for PHP for SQL Server requires the Microsoft ODBC Driver.

If you are experienced PHP users, you may skip the Web Platform Installer tool and directly download the PHP zip binary distribution from [PHP for Windows: Binaries and Sources](https://windows.php.net/download/).

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server and Azure SQL.

{% include partials/az-install_sqlcmd_windows.md %}

## Step 1.4 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

