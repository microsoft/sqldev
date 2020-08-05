---
layout: page-steps
language: Python
title: macOS
permalink: python/macos/server/
redirect_from:
  - /python/
  - /python/macos/
  - /python/mac/
  - /python/mac/step/
  - /python/mac/step/1
---

> In this section, you will get SQL Server 2019 running on Docker. After that you will install the necessary dependencies to create Python apps with SQL Server

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_mac.md %}

## Step 1.2 Install Homebrew and Python

1. Install Homebrew.

    {% include partials/install_homebrew.md %}

2. Restart the terminal session.

3. Install Python

    ```terminal
    brew install python
    ```

    ```results
    ==> Downloading https://homebrew.bintray.com/bottles/python-2.7.12.el_capitan.bottle.tar.gz

    ...

    ==> Caveats
    Pip and setuptools have been installed. To update them
      pip install --upgrade pip setuptools

    You can install Python packages with
      pip install

    ==> Summary
    🍺  /usr/local/Cellar/python/2.7.12: 3,476 files, 46.7M
    ```

> You now have Python installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_mac.md %}

> You have successfully installed the Python Driver on your Mac. You now have everything you need to start writing your Python apps with SQL Server!
