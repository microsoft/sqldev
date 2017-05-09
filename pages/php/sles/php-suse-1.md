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


```terminal
    sudo zypper update
    sudo zypper install php7 php7-devel php7-openssl php7-phar php7-mcrypt php7-mbstring php7-pear gcc gcc-c++ make apache2
```
> You have successfully installed PHP on your SLES machine! 

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_sles.md %}

> You have successfully installed the PHP Driver for SQL Server on your SLES machine. You now have everything you need to start writing PHP apps with SQL Server!

