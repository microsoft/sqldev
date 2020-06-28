---
layout: page-steps
language: Go
title: Ubuntu
permalink: /go/ubuntu/az/

redirect_from:
  - /go/ubuntu/az/step/
  - /go/ubuntu/az/step/1
---

> In this section, you create an Azure Hosted SQL Database, and then you will install the necessary dependencies to run GoLang.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install GoLang

If you already have Go installed on your machine, skip this step. To install GoLang, follow these commands:

1. Run the following commands:

    ```terminal
    curl -O https://storage.googleapis.com/golang/go1.8.linux-amd64.tar.gz
    tar xvf go1.8.linux-amd64.tar.gz
    sudo chown -R root:root ./go
    sudo mv go /usr/local
    ```

1. Using your favorite text editor, add these two lines to the ~/.profile file.

    ```terminal
    export GOPATH=$HOME/work
    export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin
    ```

You may also have to [install git](https://git-scm.com/downloads) on your machine, to make future calls to "go get" work.

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_ubuntu.md %}

## Step 1.4 Install The Azure CLI and Login to Azure

{% include partials/download_azure_cli.md %}


> You have successfully installed and setup GoLang and mssql-tools on your Ubuntu computer. You now have everything you need to start writing your Go apps with Azure SQL!
