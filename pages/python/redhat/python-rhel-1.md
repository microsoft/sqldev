---
layout: page-steps
language: Python
title: RHEL
permalink: python/rhel/server/
redirect_from:
  - /python/
  - /python/rhel/
  - /python/rhel/step/
  - /python/rhel/step/1
---

> In this section, you will get SQL Server 2019 running on Red Hat Enterprise Linux (RHEL). After that you will install the necessary dependencies to create Python apps with SQL Server

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_rhel.md %}

## Step 1.2 Install Python and other required packages

```terminal
wget https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo rpm -ivh epel-release-latest-7.noarch.rpm
sudo yum install python python-pip python-wheel python-devel
sudo yum group install "Development tools"
```

> You now have Python installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_rhel.md %}
