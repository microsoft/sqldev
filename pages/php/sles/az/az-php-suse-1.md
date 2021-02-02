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

> In the following instructions, replace `<SuseVersion>` with your version of Suse - if you are using Suse Enterprise Linux 15, it will be SLE_15_SP1 or SLE_15_SP2. For Suse 12, use SLE_12_SP4 (or above if applicable). Not all versions of PHP are available for all versions of Suse Linux - please refer to `http://download.opensuse.org/repositories/devel:/languages:/php` to see which versions of Suse have the default version PHP available, or check `http://download.opensuse.org/repositories/devel:/languages:/php:/` to see which other versions of PHP are available for which versions of Suse.

> Packages for PHP 7.4 or above are not available for Suse 12 and Package for PHP 8.0 is not yet available for Suse 15.
> To install PHP 7.3, replace the repository URL below with the following URL:
      `https://download.opensuse.org/repositories/devel:/languages:/php:/php73/<SuseVersion>/devel:languages:php:php73.repo`.

```terminal
sudo su
zypper -n ar -f https://download.opensuse.org/repositories/devel:languages:php/<SuseVersion>/devel:languages:php.repo
zypper --gpg-auto-import-keys refresh
zypper -n install php7 php7-devel php7-openssl
```

> You have successfully installed PHP on your SLES machine! 

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for Azure SQL DB

{% include partials/az-install_sqlcmd_linux_sles.md %}

> You have successfully installed the PHP Driver for SQL Server on your SLES machine. You now have everything you need to start writing PHP apps with Azure SQL DB!
