---
layout: page-steps
language: Go
title: Windows
permalink: /go/windows/az/
redirect_from:
  - /go/az/
  - /go/windows/az/step/
  - /go/windows/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will you will install the necessary dependencies to run GoLang.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install GoLang

If you already have Go installed on your machine, skip this step. To install GoLang, download the msi file for Windows at the [Go Downloads page](https://golang.org/dl/).

You may also have to [install git](https://git-scm.com/downloads) on your machine, to make future calls to "go get" work.


## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server and Azure SQL.

{% include partials/az-install_sqlcmd_windows.md %}

## Step 1.4 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

> You have successfully installed and setup GoLang and mssql-tools on your Windows computer. You now have everything you need to start writing your Go apps with Azure SQL!
