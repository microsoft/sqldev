---
layout: page-steps
language: PHP
title: Ubuntu
permalink: /php/ubuntu/az/
redirect_from:
  - /php/ubuntu/az/step/
  - /php/ubuntu/az/step/1
---

> In this section, you create an Azure Hosted SQL Database After that you will install the necessary dependencies to create PHP apps with Azure SQL DB.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

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

{% include partials/az-install_sqlcmd_linux_ubuntu.md %}

## Step 1.4 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

> You have successfully installed the Python Driver on your Ubuntu machine. You now have everything you need to start writing Python apps with Azure SQL DB!