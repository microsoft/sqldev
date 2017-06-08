---
layout: page-steps
language: Go
title: RHEL
permalink: /go/rhel/

redirect_from:
  - /go/
  - /go/rhel/step/
  - /go/rhel/step/1
---

> In this section, you will get SQL Server 2017 on your RHEL machine and then you will install the necessary dependencies to run GoLang.

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_linux_rhel.md %}

## Step 1.2 Install GoLang

If you already have GoLang installed on your machine, skip this step. To install GoLang, follow these commands:

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

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_linux_rhel.md %}

> You have successfully installed and setup GoLang and mssql-tools on your RHEL computer. You now have everything you need to start writing your Go apps with SQL Server!
