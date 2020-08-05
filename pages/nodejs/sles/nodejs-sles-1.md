---
layout: page-steps
language: Node.js
title: SLES
permalink: node/sles/server/
redirect_from:
  - /node/
  - /node/sles/
  - /node/sles/step/
  - /node/sles/step/1
---

> In this section, you will get SQL Server 2019 running on SUSE Linux Enterprise Server (SLES). After that you will install the necessary dependencies to create Node.js apps with SQL Server

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_sles.md %}

## Step 1.2 Install Node.js

To install the Node.js package, you first need to enable the Web and Scripting module in the subscription.

```terminal
    sudo zypper in -t patch SUSE-SLE-Module-Web-Scripting-12-2015-427=1
```

Install Node.js by updating the repository lists and then installing the nodejs6 package.

```terminal
    sudo zypper refresh
    sudo zypper install nodejs6
```

You can verify your Node.js installation using this command:

```terminal
  node -v
```

```results
v.6.9.5
```

> You now have Node.js installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_sles.md %}

> You have successfully installed SQL Server Command Line Utilities on SUSE Linux Enterprise Server. You now have everything you need to start writing Node.js apps with SQL Server!
