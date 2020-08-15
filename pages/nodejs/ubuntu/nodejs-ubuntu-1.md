---
layout: page-steps
language: Node.js
title: Ubuntu
permalink: node/ubuntu/server/
redirect_from:
  - /node/
  - /node/ubuntu/
  - /node/ubuntu/step/
  - /node/ubuntu/step/1
---

> In this section, you will get SQL Server 2019 running on Ubuntu. After that you will install the necessary dependencies to create Node.js apps with SQL Server

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_ubuntu.md %}

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
v.6.9.1
```

> You now have Node.js installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_ubuntu.md %}
