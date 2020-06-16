---
layout: page-steps
language: Python
title: RHEL
permalink: /python/rhel/az/
redirect_from:
  - /python/rhel/az/step/
  - /python/rhel/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create Python apps with Azure SQL.
 
## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Python and other required packages

```terminal
wget https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo rpm -ivh epel-release-latest-7.noarch.rpm
sudo yum install python python-pip python-wheel python-devel
sudo yum group install "Development tools"
```

> You now have Python installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/az-install_sqlcmd_linux_rhel.md %}

