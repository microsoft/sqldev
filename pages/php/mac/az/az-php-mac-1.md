---
layout: page-steps
language: PHP
title: macOS
permalink: /php/mac/az/
redirect_from:
  - /php/mac/az/step/
  - /php/mac/az/step/1
---

> In this section, you create an Azure Hosted SQL Database After that you will install the necessary dependencies to create PHP apps with Azure SQL DB.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Homebrew, PHP and other required packages

1. Install Homebrew.

    {% include partials/install_homebrew.md %}

2. Restart the terminal session.

3. Install PHP.

> To install PHP 7.2 or 7.3, replace `php@7.4` with `php@7.2` or `php@7.3` respectively in the following commands.

```terminal
    brew tap 
    brew tap homebrew/core
    brew install php@7.4
```

PHP should now be in your path -- run `php -v` to verify that you are running the correct version of PHP. If PHP is not in your path or it is not the correct version, run the following:

```terminal
    brew link --force --overwrite php@7.4
```

4. Install other required packages.

```terminal
    brew install autoconf automake libtool
```

> You have successfully installed PHP on your macOS!

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for Azure SQL DB

{% include partials/az-install_sqlcmd_mac.md %}
