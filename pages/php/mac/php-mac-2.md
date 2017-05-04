---
layout: page-steps
language: PHP
title: macOS
permalink: /php/mac/step/2
---

## Step 2.1 Install the PHP Driver for SQL Server

```terminal
    brew tap microsoft/mssql-preview https://github.com/Microsoft/homebrew-mssql-preview
    brew install llvm --with-clang --with-clang-extra-tools
    brew install autoconf
    sudo pecl install sqlsrv-4.1.7preview pdo_sqlsrv-4.1.7preview
    sudo echo "extension= pdo_sqlsrv.so" >> `php --ini | grep "Loaded Configuration" | sed -e "s|.*:\s*||"`
    sudo echo "extension= sqlsrv.so" >> `php --ini | grep "Loaded Configuration" | sed -e "s|.*:\s*||"`
```
{% include partials/php/crudunix.md %}

