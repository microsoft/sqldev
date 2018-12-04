---
layout: page-steps
language: PHP
title: RHEL
permalink: /php/rhel/
redirect_from:
  - /php/
  - /php/rhel/step/
  - /php/rhel/step/1
---

> In this section, you will get SQL Server 2017 running on Red Hat Enterprise Linux (RHEL). After that you will install the necessary dependencies to create PHP apps with SQL Server

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_linux_rhel.md %}

## Step 1.2 Install PHP and other required packages

> To install PHP 7.0, 7.1, or 7.3, replace remi-php72 with remi-php70, remi-php71, or remi-php73 respectively in the following commands.

```terminal
    wget https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
    wget http://rpms.remirepo.net/enterprise/remi-release-7.rpm
    rpm -Uvh remi-release-7.rpm epel-release-latest-7.noarch.rpm
    subscription-manager repos --enable=rhel-7-server-optional-rpms
    yum install yum-utils
    yum-config-manager --enable remi-php72
    yum update
    yum install php php-pdo php-xml php-pear php-devel re2c gcc-c++ gcc
```

> Compiling the PHP drivers with PECL with PHP 7.2 requires a more recent GCC than the default:

```terminal
   sudo yum-config-manager --enable rhel-server-rhscl-7-rpms
   sudo yum install devtoolset-7
   scl enable devtoolset-7 bash
```
    
> You have successfuly installed PHP on your RHEL machine! 

> SELinux is installed by default and runs in Enforcing mode. To allow Apache to connect to a database through SELinux, run the following command: 
 
```terminal
    sudo setsebool -P httpd_can_network_connect_db 1
```

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_rhel.md %}

