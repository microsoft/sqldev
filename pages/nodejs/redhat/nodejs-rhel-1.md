---
layout: page-steps
language: Node.js
title: Ubuntu
permalink: /node/mac/
redirect_from:
  - /node/
  - /node/ubuntu/step/
  - /node/ubuntu/step/1
---

> In this section, you will get SQL Server 2017 running on Ubuntu. After that you will install the necessary dependencies to create Node.js apps with SQL Server

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_linux_ubuntu.md %}

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
v.6.9.1
```

> You now have Node.js installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_ubuntu.md %}

> You have successfully installed the SQL Server command line utilities on Ubuntu. You now have everything you need to start writing Node.js apps with SQL Server!