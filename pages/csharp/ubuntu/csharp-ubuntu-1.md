---
layout: page-steps
language: C#
title: Ubuntu
permalink: /csharp/ubuntu/
redirect_from:
  - /csharp/
  - /csharp/ubuntu/step/
  - /csharp/ubuntu/step/1
---

> In this section, you will get SQL Server 2017 on Ubuntu. After that you will install the necessary dependencies to create .NET Core apps with SQL Server.

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_linux_ubuntu.md %}

## Step 1.2 Install .NET Core 

If you already have .NET Core installed on your machine, skip this step. Otherwise, install it using the following commands.

```terminal
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-xenial-prod xenial main" > /etc/apt/sources.list.d/dotnetdev.list'
sudo apt-get update
sudo apt-get install dotnet-sdk-2.0.0
```

> You have successfully installed .NET Core on your Ubuntu machine. You now have everything you need to start writing your C# apps with SQL Server!

