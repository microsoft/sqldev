---
layout: page-steps
language: Node.js
title: SLES
permalink: /node/sles/az/
redirect_from:
  - /node/sles/az/step/
  - /node/sles/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create Node.js apps with Azure SQL DB.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Node.js

Search for the version of node you want to use.

```terminal
sudo zypper refresh
sudo zypper search nodejs
```

Then pick the one you want from the list and install it:

```terminal   
    sudo zypper install nodejs8
```

You can verify your Node.js installation using this command:

```terminal
  node -v
```

```results
v8.17.0
```

> You now have Node.js installed! The next section will walk you through getting the tools to interact with your database.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for Azure SQL DB

{% include partials/az-install_sqlcmd_linux_sles.md %}

> You have successfully installed SQL Server Command Line Utilities on SUSE Linux Enterprise Server. You now have everything you need to start writing Node.js apps with Azure SQL DB!
