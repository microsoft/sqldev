---
layout: page-steps
language: Go
title: SLES
permalink: /go/sles/az/

redirect_from:
  - /go/sles/az/step/
  - /go/sles/az/step/1
---

> In this section, you create an Azure Hosted SQL Database, and then you will install the necessary dependencies to run GoLang.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install GoLang

If you already have GoLang installed on your machine, skip this step. To install GoLang, follow these commands:

1. Run the following commands:

    ```terminal
    curl -O https://storage.googleapis.com/golang/go1.8.linux-amd64.tar.gz
    tar xvf go1.8.linux-amd64.tar.gz
    sudo chown -R root:root ./go
    sudo mv go /usr/local
    ```

1. Now, execute the, add these two lines to the ~/.profile file.

    ```terminal
    export GOPATH=$HOME/work
    export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin
    ```

Then reload your profile, and confirm that go is on the path:

    ```terminal
    source .profile
    which go
    ```

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for Azure SQL DB.

{% include partials/az-install_sqlcmd_linux_sles.md %}

> You have successfully installed and setup GoLang and mssql-tools on your RHEL computer. You now have everything you need to start writing your Go apps with Azure SQL DB!
