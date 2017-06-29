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
sudo sh -c 'echo "deb [arch=amd64] https://apt-mo.trafficmanager.net/repos/dotnet-release/ xenial main" > /etc/apt/sources.list.d/dotnetdev.list'
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 417A0893
sudo apt-get update
sudo apt-get install dotnet-sdk-2.0.0-preview2-006497
```
```results
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following NEW packages will be installed:
  dotnet-sdk-2.0.0-preview2-006497
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
...
This software may collect information about you and your use of the software, and send that to Microsoft.
Please visit http://aka.ms/dotnet-cli-eula for more information.
```
> You have successfully installed .NET Core on your Ubuntu machine. You now have everything you need to start writing your C# apps with SQL Server!

