---
layout: page-steps
language: C#
title: SLES
permalink: /csharp/sles/
redirect_from:
  - /sles/
  - /csharp/sles/step/
  - /csharp/sles/step/1
---

> In this section, you will get SQL Server 2019 on SUSE Linux Enterprise Server (SLES). After that you will install the necessary dependencies to create .NET Core apps with SQL Server.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_sles.md %}

## Step 1.2 Install .NET Core

If you already have .NET Core installed on your machine, skip this step. Otherwise, install it using the following commands.

```terminal
sudo rpm -Uvh https://packages.microsoft.com/config/sles/12/packages-microsoft-prod.rpm
sudo zypper install dotnet-sdk-3.1
```

> You have successfully installed .NET Core on your SLES machine. You now have everything you need to start writing your C# apps with SQL Server!
