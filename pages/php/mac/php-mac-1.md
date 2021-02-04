---
layout: page-steps
language: PHP
title: macOS
permalink: php/macos/server/
redirect_from:
  - /php/
  - /php/macos/
  - /php/mac/
  - /php/mac/step/
  - /php/mac/step/1
---

> In this section, you will get SQL Server 2019 running on Docker. After that you will install the necessary dependencies to create PHP apps with SQL Server

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_mac.md %}

## Step 1.2 Install Homebrew, PHP and other required packages

1. Install Homebrew.

    {% include partials/install_homebrew.md %}

2. Restart the terminal session.

3. Install PHP.

> To install PHP 7.4 or 7.3, replace `php@8.0` with `php@7.4` or `php@7.3` respectively in the following commands.

```terminal
    brew tap
    brew tap homebrew/core
    brew install php@8.0
```

PHP should now be in your path -- run `php -v` to verify that you are running the correct version of PHP. If PHP is not in your path or it is not the correct version, run the following:

```terminal
    brew link --force --overwrite php@8.0
```

4. Install other required packages.

```terminal
    brew install autoconf automake libtool
```

> You have successfully installed PHP on your macOS!

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_mac.md %}
