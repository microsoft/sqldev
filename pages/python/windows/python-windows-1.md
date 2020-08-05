---
layout: page-steps
language: Python
title: Windows
permalink: python/windows/server/
redirect_from:
  - /python/
  - /python/windows/
  - /python/windows/step/
  - /python/windows/step/1
---

> In this section, you will get SQL Server 2019 on Windows. After that you will install the necessary dependencies to create Python apps with SQL Server.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_windows.md %}

## Step 1.2 Install Python

Download and run the installer [**here**](https://www.python.org/downloads/)

Next, add Python to your path

1. Press start
2. Search for "Advanced System Settings"
3. Click on the "Environment Variables" button
4. Add the location of the Python27 folder to the PATH variable in System Variables. The following is a typical value for the PATH variable C:\Python27

> You have succesfully installed Python on your machine!

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_windows.md %}
