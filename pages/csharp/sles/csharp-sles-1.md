---
layout: page-steps
language: C#
title: SLES
permalink: csharp/sles/server/
redirect_from:
  - /sles/
  - /csharp/sles/
  - /csharp/sles/step/
  - /csharp/sles/step/1
---

> In this section, you will get SQL Server 2019 on SUSE Linux Enterprise Server (SLES) 15. After that you will install the necessary dependencies to create .NET Core apps with SQL Server.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_sles.md %}

## Step 1.2 Install .NET Core SDK

If you already have .NET Core SDK installed on your machine, skip this step. Otherwise, install it using the following commands.

```terminal
sudo zypper install libicu
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
wget https://packages.microsoft.com/config/opensuse/15/prod.repo
sudo mv prod.repo /etc/zypp/repos.d/microsoft-prod.repo
sudo chown root:root /etc/zypp/repos.d/microsoft-prod.repo
sudo zypper install dotnet-sdk-3.1
```

> You have successfully installed .NET Core on your SLES machine. You now have everything you need to start writing your C# apps with SQL Server!
