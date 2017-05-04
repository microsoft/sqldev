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

> In this section, you will get SQL Server vNext running on Ubuntu. After that you will install the necessary dependencies to create Python apps with SQL Server

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_linux_ubuntu.md %}

## Step 1.2 Install PHP and other required packages

```terminal
  sudo apt-get -y install php7.0 libapache2-mod-php7.0 mcrypt php7.0-mcrypt php-mbstring php-pear php7.0-dev apache2
```

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_ubuntu.md %}

## Step 1.4 Install the PHP Driver for SQL Server

```terminal
    sudo apt-get install unixodbc-dev gcc g++ build-essential
    sudo pecl install sqlsrv pdo_sqlsrv
    sudo echo "extension= pdo_sqlsrv.so" >> `php --ini | grep "Loaded Configuration" | sed -e "s|.*:\s*||"`
    sudo echo "extension= sqlsrv.so" >> `php --ini | grep "Loaded Configuration" | sed -e "s|.*:\s*||"`
```
    
> You have successfully installed the PHP Driver for SQL Server on your Ubuntu machine. You now have everything you need to start writing your PHP apps with SQL Server!
