---
layout: page-steps
language: Python
title: Windows
permalink: /python/windows/az/
redirect_from:
  - /python/az/
  - /python/windows/az/step/
  - /python/windows/az/step/1
---

> In this section, you create an Azure Hosted SQL Database. After that you will install the necessary dependencies to create Python apps with Azure SQL. 

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install Python

Download and run the installer [**here**](https://www.python.org/downloads/)

Next, add Python to your path

1. Press start 
2. Search for "Advanced System Settings" 
3. Click on the "Environment Variables" button 
4. Add the location of the Python27 folder to the PATH variable in System Variables. The following is a typical value for the PATH variable: C:\Python27, so is: C:\Users\User\AppData\Local\Programs\Python\Python38-32\

> You have succesfully installed Python on your machine!

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/az-install_sqlcmd_windows.md %}

## Step 1.4 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}

## Step 1.5 Install Pyodbc

 These instructions are based off of the ones found [**here:**](https://docs.microsoft.com/en-us/sql/connect/python/pyodbc/step-1-configure-development-environment-for-pyodbc-python-development?view=sql-server-ver15)

```terminal
> cd C:\<The path you used when you added python to your PATH variable>\Scripts  
> pip install pyodbc
```