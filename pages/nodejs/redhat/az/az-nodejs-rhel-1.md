---
layout: page-steps
language: Node.js
title: RHEL
permalink: /node/rhel/az/
redirect_from:
  - /node/rhel/az/step/
  - /node/rhel/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create Node.js apps with Azure SQL DB

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Node.js

Add [Extra Packages for Enterprise Linux (EPEL)](https://fedoraproject.org/wiki/EPEL) to your list of repos and update. If you already have Node.js installed on your machine, skip this step.

```terminal
wget https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo rpm -ivh epel-release-latest-7.noarch.rpm
sudo yum update
```

Install Node.js by first adding the necessary node repositories, and then installing the nodejs package.

```terminal
sudo yum update
sudo yum -y install nodejs
```

You can verify your Node.js installation using this command:

```terminal
node -v
```

```results
v10.19.0
```

> You now have Node.js installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for Azure SQL DB

{% include partials/az-install_sqlcmd_linux_rhel.md %}
