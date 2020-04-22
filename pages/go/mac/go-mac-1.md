---
layout: page-steps
language: Go
title: macOS
permalink: go/macos/server/
redirect_from:
  - /go/
  - /go/macos/
  - /go/mac/
  - /go/mac/step/
  - /go/mac/step/1
---

> In this section, you will get SQL Server 2017 running on Docker on your Mac and then you will install the necessary dependencies to run GoLang.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_mac.md %}

## Step 1.2 Install Homebrew and GoLang

If you already have GoLang installed on your machine, skip this step. Use the following commands to install Homebrew. Make sure to restart your terminal session once you're done.

1. Install Homebrew.

    {% include partials/install_homebrew.md %}

1. Restart the terminal session.

1. Update Homebrew and install GoLang.

    ```terminal
    brew update
    brew install go
    ```

1. Set up the GOPATH, GOROOT and GOBIN environment variables and add these to the PATH with the following commands:

    ```terminal
    echo "export GOPATH=$HOME/golang" >> ~/.bash_profile
    echo "export GOROOT=/usr/local/opt/go/libexec" >> ~/.bash_profile
    echo "export GOBIN=$GOPATH/bin" >> ~/.bash_profile
    echo "export PATH=$PATH:$GOPATH" >> ~/.bash_profile
    echo "export PATH=$PATH:$GOROOT/bin" >> ~/.bash_profile
    ```

## Step 1.3 Install the ODBC Driver and SQL Command Line Utility for SQL Server

{% include partials/install_sqlcmd_mac.md %}

> You have successfully installed and setup GoLang and mssql-tools on your Mac. You now have everything you need to start writing your Go apps with SQL Server!
