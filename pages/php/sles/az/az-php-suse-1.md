---
layout: page-steps
language: PHP
title: SLES
permalink: /php/sles/az/
redirect_from:
  - /php/sles/az/step/
  - /php/sles/az/step/1
---

> In this section, you create an Azure Hosted SQL Database After that you will install the necessary dependencies to create PHP apps with Azure SQL DB.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install PHP and other required packages

> In the following instructions, replace `<SuseVersion>` with your version of Suse - if you are using Suse Enterprise Linux 15, it will be SLE_15 or SLE_15_SP1. For Suse 12, use SLE_12_SP4 (or above if applicable). Not all versions of PHP are available for all versions of Suse Linux - please refer to `http://download.opensuse.org/repositories/devel:/languages:/php` to see which versions of Suse have the default version PHP available, or to `http://download.opensuse.org/repositories/devel:/languages:/php:/` to see which other versions of PHP are available for which versions of Suse.

> Packages for PHP 7.4 are not available for Suse 12. To install PHP 7.2, replace the repository URL below with the following URL: `https://download.opensuse.org/repositories/devel:/languages:/php:/php72/<SuseVersion>/devel:languages:php:php72.repo`. To install PHP 7.3, replace the repository URL below with the following URL: `https://download.opensuse.org/repositories/devel:/languages:/php:/php73/<SuseVersion>/devel:languages:php:php73.repo`.

```terminal
sudo zypper ar http://download.opensuse.org/repositories/devel:/languages:/php/openSUSE_Leap_15.1/ php
sudo zypper mr -p 70 php
sudo zypper refresh
sudo zypper in php7 php php7-devel
```

> You have successfully installed PHP on your SLES machine! 

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for Azure SQL DB

{% include partials/az-install_sqlcmd_linux_sles.md %}

> You have successfully installed the PHP Driver for SQL Server on your SLES machine. You now have everything you need to start writing PHP apps with Azure SQL DB!
