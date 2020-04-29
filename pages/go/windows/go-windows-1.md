---
layout: page-steps
language: Go
title: Windows
permalink: go/windows/server/
redirect_from:
  - /go/
  - /go/windows/
  - /go/windows/step/
  - /go/windows/step/1
---

> In this section, you will get SQL Server 2017 on your Windows machine and then you will install the necessary dependencies to run GoLang.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_windows.md %}

## Step 1.2 Install GoLang

If you already have Go installed on your machine, skip this step. To install GoLang, download the msi file for Windows at the [Go Downloads page](https://golang.org/dl/).

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_windows.md %}

> You have successfully installed and setup GoLang and mssql-tools on your Ubuntu computer. You now have everything you need to start writing your Go apps with SQL Server!
