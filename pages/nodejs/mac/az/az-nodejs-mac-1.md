---
layout: page-steps
language: Node.js
title: macOS
permalink: /node/macos/az/
redirect_from:
  - /node/macos/az/step/
  - /node/macos/az/step/1
  - /node/macos/az/1
---

> In this section, you create an Azure Hosted SQL Database, and then you will install the necessary dependencies to run Node.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Homebrew and Node.js

1. Install [Homebrew](https://brew.sh/).

    {% include partials/install_homebrew.md %}

2. Restart the terminal session.

3. Install Node.js

    ```terminal
      brew install node
    ```

    ```results
      ==> Downloading https://homebrew.bintray.com/bottles/node-6.7.0.el_captian.bottle.tar.gz
      ################################################################## 100.0%
      ==> Pouring node-6.7.0.el_captian.bottle.tar.gz
      ...
      ==> Using the sandbox
      ==> Caveats
      Please note by the default...
      ...
      ==> Summary
      /usr/local/Cellar/node/6.7.0: 3,669 files, 40.8M
    ```

> You now have Node.js installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for Azure SQL DB

{% include partials/az-install_sqlcmd_mac.md %}

> You now have everything you need to start writing Node.js apps with Azure SQL DB!
