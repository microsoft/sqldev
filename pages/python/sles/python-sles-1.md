---
layout: page-steps
language: Python
title: SLES
permalink: python/sles/server/
redirect_from:
  - /python/
  - /python/sles/
  - /python/sles/step/
  - /python/sles/step/1
---

> In this section, you will get SQL Server 2019 running on SUSE Linux Enterprise Server (SLES). After that you will install the necessary dependencies to create Python apps with SQL Server

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_sles.md %}

## Step 1.2 Install Python and other required packages

Install Python

```terminal
sudo zypper install python-pip python-devel gcc gcc-c++
```

> You now have Python installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_sles.md %}

> You have successfully installed the Python Driver on your SLES machine. You now have everything you need to start writing Python apps with SQL Server!
