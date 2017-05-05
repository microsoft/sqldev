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

> In this section, you will get SQL Server 2017 running on Docker. After that you will install the necessary dependencies to create PHP apps with SQL Server

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_mac.md %}

## Step 1.2 Install Homebrew, PHP and other required packages
1. Install Homebrew.

    {% include partials/install_homebrew.md %}

2. Restart the terminal session.

3. Install PHP

    ```terminal
    brew tap 
    brew tap homebrew/dupes
    brew tap homebrew/versions
    brew tap homebrew/homebrew-php
    brew install php70 --with-pear --with-httpd24 --with-cgi
    echo 'export PATH="/usr/local/sbin:$PATH"' >> ~/.bash_profile
    echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bash_profile
    ```

4. Install other required packages

```terminal
    brew install llvm --with-clang --with-clang-extra-tools
    brew install autoconf
```
> You have successfully installed PHP on your macOS!

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_mac.md %}
    
