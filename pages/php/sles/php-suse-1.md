---
layout: page-steps
language: PHP
title: SLES
permalink: /php/sles/
redirect_from:
  - /php/
  - /php/sles/step/
  - /php/sles/step/1
---

> In this section, you will get SQL Server 2017 running on SUSE Linux Enterprise Server (SLES). After that you will install the necessary dependencies to create PHP apps with SQL Server

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_sles.md %}

## Step 1.2 Install PHP and other required packages

> In the following instructions, replace <SuseVersion> with your version of Suse - if you are using Suse Enterprise Linux 15, it will be SLE_15 or SLE_15_SP1, and similarly for other versions. Not all versions of PHP are available for all versions of Suse Linux - please refer to `http://download.opensuse.org/repositories/devel:/languages:/php` to see which versions of Suse have the default version PHP available, or to `http://download.opensuse.org/repositories/devel:/languages:/php:/` to see which other versions of PHP are available for which versions of Suse.

> Packages for PHP 7.3 are not available for Suse 12. To install PHP 7.1, replace the repository URL below with the following URL:
      `https://download.opensuse.org/repositories/devel:/languages:/php:/php71/<SuseVersion>/devel:languages:php:php71.repo`. To install PHP 7.2, replace the repository URL below with the following URL:
      `https://download.opensuse.org/repositories/devel:/languages:/php:/php72/<SuseVersion>/devel:languages:php:php72.repo`.

```terminal
sudo su
zypper -n ar -f https://download.opensuse.org/repositories/devel:languages:php/<SuseVersion>/devel:languages:php.repo
zypper --gpg-auto-import-keys refresh
zypper -n install php7 php7-pear php7-devel php7-openssl
```

> You have successfully installed PHP on your SLES machine! 

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_sles.md %}

> You have successfully installed the PHP Driver for SQL Server on your SLES machine. You now have everything you need to start writing PHP apps with SQL Server!
