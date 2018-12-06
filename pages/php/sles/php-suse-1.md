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

> To install PHP 7.0 or 7.1, replace the repository URL below with one of the following URLs: `https://download.opensuse.org/repositories/devel:languages:php:php70/SLE_12_SP3/devel:languages:php:php70.repo`
`https://download.opensuse.org/repositories/devel:languages:php:php71/SLE_12_SP3/devel:languages:php:php71.repo`

```terminal
    sudo zypper -n ar -f https://download.opensuse.org/repositories/devel:languages:php/SLE_12_SP3/devel:languages:php.repo
    sudo zypper --gpg-auto-import-keys refresh
    sudo zypper install php7 php7-pear php7-devel
```
> You have successfully installed PHP on your SLES machine! 

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_sles.md %}

> You have successfully installed the PHP Driver for SQL Server on your SLES machine. You now have everything you need to start writing PHP apps with SQL Server!

