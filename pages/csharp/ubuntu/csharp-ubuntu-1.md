---
layout: page-steps
language: C#
title: Ubuntu
permalink: csharp/ubuntu/server/
redirect_from:
  - /csharp/
  - /csharp/ubuntu/
  - /csharp/ubuntu/step/
  - /csharp/ubuntu/step/1
---

> In this section, you will get SQL Server 2019 on Ubuntu 18.04. After that you will install the necessary dependencies to create .NET Core apps with SQL Server.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_ubuntu.md %}

## Step 1.2 Install .NET Core SDK

If you already have .NET Core SDK installed on your machine, skip this step. Otherwise, install it using the following commands.

```terminal
wget https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install -y apt-transport-https
sudo apt-get update
sudo apt-get install dotnet-sdk-3.1
```

> You have successfully installed .NET Core on your Ubuntu machine. You now have everything you need to start writing your C# apps with SQL Server!
