---
layout: page-steps
language: PHP
title: macOS
permalink: /php/mac/
redirect_from:
  - /php/
  - /php/mac/step/
  - /php/mac/step/1
---

> In this section, you will get SQL Server vNext running on Docker. After that you will install the necessary dependencies to create PHP apps with SQL Server

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_mac.md %}

## Step 1.2 Install Homebrew and PHP 7.1

If you already have PHP installed on your machine, skip this step. 

- Install Homebrew.

    {% include partials/install_homebrew.md %}

- Restart the terminal session.

- Install PHP

    ```terminal
    brew tap 
    brew tap homebrew/dupes
    brew tap homebrew/versions
    brew tap homebrew/homebrew-php
    brew install php70 --with-pear --with-httpd24 --with-cgi
    echo 'export PATH="/usr/local/sbin:$PATH"' >> ~/.bash_profile
    echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bash_profile
    ```

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_mac.md %}

## Step 1.4 Install the PHP Driver for SQL Server

```terminal
    brew tap microsoft/mssql-preview https://github.com/Microsoft/homebrew-mssql-preview
    brew install llvm --with-clang --with-clang-extra-tools
    brew install autoconf
    sudo pecl install sqlsrv-4.1.7preview pdo_sqlsrv-4.1.7preview
    sudo echo "extension= pdo_sqlsrv.so" >> `php --ini | grep "Loaded Configuration" | sed -e "s|.*:\s*||"`
    sudo echo "extension= sqlsrv.so" >> `php --ini | grep "Loaded Configuration" | sed -e "s|.*:\s*||"`
```
    
> You have successfully installed PHP on your Mac. You now have everything you need to start writing your PHP apps with SQL Server!
