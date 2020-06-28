---
layout: page-steps
language: Python
title: SLES
permalink: /python/sles/az/
redirect_from:
  - /python/sles/az/step/
  - /python/sles/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create Python apps with Azure SQL DB. 

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Python and other required packages

Install Python

```terminal
sudo zypper install python-pip python-devel gcc gcc-c++
```

> You now have Python installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for Azure SQL DB

{% include partials/az-install_sqlcmd_linux_sles.md %}

> You have successfully installed the Python Driver on your SLES machine. You now have everything you need to start writing Python apps with Azure SQL DB!
