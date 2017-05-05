---
layout: page-steps
language: Ruby
title: macOS
permalink: /ruby/mac/
redirect_from:
  - /ruby/
  - /ruby/mac/step/
  - /ruby/mac/step/1
---

> In this section, you will get SQL Server vNext running on Docker. After that you will install the necessary dependencies to run .NET Core.

## Step 1.1 Install SQL Server
{% include partials/install_sql_server_mac.md %}

## Step 1.2 Install Homebrew 

Ruby is already installed on your Mac. If you already have Homebrew on your machine, skip this step. Install Homebrew using the following commands. Once you have installed Homebrew, make sure to restart the terminal session.

    {% include partials/install_homebrew.md %}

## Step 1.3 Install FreeTDS
FreeTDS is a driver that enables you to connect to SQL Server. It is a prerequisite for the connector you'll get later in the tutorial to connect to SQL Server. Run the following commands to install FreeTDS:

```terminal
brew install FreeTDS
```
> You have successfully installed Ruby on your Mac. You now have everything you need to start writing your Ruby apps with SQL Server!

