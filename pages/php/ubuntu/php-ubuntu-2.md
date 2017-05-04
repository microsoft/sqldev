---
layout: page-steps
language: PHP
title: Ubuntu
permalink: /php/ubuntu/step/2
---

## Step 2.1 Install the PHP Driver for SQL Server

```terminal
    sudo apt-get install unixodbc-dev gcc g++ build-essential
    sudo pecl install sqlsrv pdo_sqlsrv
    sudo echo "extension= pdo_sqlsrv.so" >> `php --ini | grep "Loaded Configuration" | sed -e "s|.*:\s*||"`
    sudo echo "extension= sqlsrv.so" >> `php --ini | grep "Loaded Configuration" | sed -e "s|.*:\s*||"`
```
    
{% include partials/php/crudunix.md %}

