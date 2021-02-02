---
layout: page-steps
language: PHP
title: Ubuntu
permalink: php/ubuntu/server/
redirect_from:
  - /php/
  - /php/ubuntu/
  - /php/ubuntu/step/
  - /php/ubuntu/step/1
---

> In this section, you will get SQL Server 2017 running on Ubuntu. After that you will install the necessary dependencies to create PHP apps with SQL Server

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_ubuntu.md %}

## Step 1.2 Install PHP and other required packages

> To install PHP 7.4 or 7.3, replace `8.0` with `7.4` or `7.3` in the following commands.

```terminal
sudo su
add-apt-repository ppa:ondrej/php -y
apt-get update
apt-get install php8.0 php8.0-dev php8.0-xml -y --allow-unauthenticated
```

> You have successfully installed PHP on your Ubuntu machine! 

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_ubuntu.md %}
