---
layout: page-steps
language: Python
title: Ubuntu
permalink: /python/ubuntu/az/
redirect_from:
  - /python/az/
  - /python/ubuntu/az/step/
  - /python/ubuntu/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create Python apps with Azure SQL DB. 

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Python and other required packages

```terminal
sudo apt-get install python python-pip gcc g++ build-essential
```

> You now have Python installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/az-install_sqlcmd_linux_ubuntu.md %}

## Step 1.4 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

> You have successfully installed the Python Driver on your Ubuntu machine. You now have everything you need to start writing Python apps with Azure SQL DB!
