---
layout: page-steps
language: PHP
title: RHEL
permalink: /php/rhel/az/
redirect_from:
  - /php/rhel/az/step/
  - /php/rhel/az/step/1
---

> In this section, you create an Azure Hosted SQL Database After that you will install the necessary dependencies to create PHP apps with Azure SQL DB.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install PHP and other required packages

To install PHP on Red Hat 7, run the following:

> To install PHP 7.4 or 7.3, replace `remi-php80` with `remi-php74` or `remi-php73` respectively in the following commands.

```terminal
    sudo su
    yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
    yum install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
    subscription-manager repos --enable=rhel-7-server-optional-rpms
    yum install yum-utils
    yum-config-manager --enable remi-php80
    yum update
    # Note: The php-pdo package is required only for the PDO_SQLSRV driver
    yum install php php-pdo php-xml php-pear php-devel re2c gcc-c++ gcc
```

To install PHP on Red Hat 8, run the following:

> To install PHP 7.4 or 7.3, replace `remi-8.0` with `remi-7.4` or `remi-7.3` respectively in the following commands.

```terminal
    sudo su
    dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
    dnf install https://rpms.remirepo.net/enterprise/remi-release-8.rpm
    dnf install yum-utils
    dnf module reset php
    dnf module install php:remi-8.0
    subscription-manager repos --enable codeready-builder-for-rhel-8-x86_64-rpms
    dnf update
    # Note: The php-pdo package is required only for the PDO_SQLSRV driver
    dnf install php-pdo php-pear php-devel
```

> You have successfully installed PHP on your RHEL machine!

> SELinux is installed by default and runs in Enforcing mode. To allow Apache to connect to a database through SELinux, run the following command: 

```terminal
    sudo setsebool -P httpd_can_network_connect_db 1
```

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for Azure SQL DB

{% include partials/az-install_sqlcmd_linux_rhel.md %}
