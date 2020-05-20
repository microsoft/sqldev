---
layout: page-steps
language: Node.js
title: Ubuntu
permalink: /node/ubuntu/az/
redirect_from:
  - /node/ubuntu/az/step/
  - /node/ubuntu/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create Node.js apps with Azure SQL. 

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Node.js

Install Node.js by first adding the necessary node repositories, and then installing the nodejs package.

```terminal
sudo apt-get install nodejs
sudo apt-get install npm
```

You can verify your Node.js installation using this command:

```terminal
node -v
```

```results
v8.10.0
```

> You now have Node.js installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/az-install_sqlcmd_linux_ubuntu.md %}

## Step 1.4 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

> You have now installed authenticated your machine to Azure.  