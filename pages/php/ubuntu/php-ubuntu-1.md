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

> To install PHP 7.1 or 7.2, replace `7.3` with `7.1` or `7.2` in the following commands.

```terminal
sudo su
add-apt-repository ppa:ondrej/php -y
apt-get update
apt-get install php7.3 php7.3-dev php7.3-xml -y --allow-unauthenticated
```

> You have successfully installed PHP on your Ubuntu machine! 

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_ubuntu.md %}
