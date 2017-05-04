---
layout: page-steps
language: Python
title: Ubuntu
permalink: /python/ubuntu/
redirect_from:
  - /python/
  - /python/ubuntu/step/
  - /python/ubuntu/step/1
---

> In this section, you will get SQL Server vNext running on Docker. After that you will install the necessary dependencies to run .NET Core.

> In this section, you will get SQL Server vNext running on Docker. After that you will install the necessary dependencies to create Python apps with SQL Server

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_linux_ubuntu.md %}

## Step 1.2 Install Python and pip


Install Python

```terminal
sudo apt-get install python python-pip
```
    
> You now have Python installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_ubuntu.md %}

## Step 1.4 Install the Python Driver for SQL Server

```terminal
    pip install virtualenv #To create virtual environments to isolate package installations between projects
    virtualenv venv
    source venv/bin/activate
    pip install pyodbc
```
    
> You have successfully installed the Python Driver on your Ubuntu. You now have everything you need to start writing your Python apps with SQL Server!
