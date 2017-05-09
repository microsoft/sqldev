---
layout: page-steps
language: PHP
title: Ubuntu
permalink: /php/ubuntu/
redirect_from:
  - /php/
  - /php/ubuntu/step/
  - /php/ubuntu/step/1
---

> In this section, you will get SQL Server 2017 running on Ubuntu. After that you will install the necessary dependencies to create PHP apps with SQL Server

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_linux_ubuntu.md %}

## Step 1.2 Install PHP and other required packages

```terminal
  sudo apt-get -y install php7.0 libapache2-mod-php7.0 mcrypt php7.0-mcrypt php-mbstring php-pear php7.0-dev apache2
```
> You have successfully installed PHP on your Ubuntu machine! 
## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_ubuntu.md %}

