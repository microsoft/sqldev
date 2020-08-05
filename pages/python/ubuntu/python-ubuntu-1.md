---
layout: page-steps
language: Python
title: Ubuntu
permalink: python/ubuntu/server/
redirect_from:
  - /python/
  - /python/ubuntu/
  - /python/ubuntu/step/
  - /python/ubuntu/step/1
---

> In this section, you will get SQL Server 2019 running on Ubuntu. After that you will install the necessary dependencies to create Python apps with SQL Server

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_ubuntu.md %}

## Step 1.2 Install Python and other required packages

```terminal
sudo apt-get install python python-pip gcc g++ build-essential
```

> You now have Python installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_ubuntu.md %}

> You have successfully installed the Python Driver on your Ubuntu machi. You now have everything you need to start writing Python apps with SQL Server!
