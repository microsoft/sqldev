---
layout: page-steps
language: Ruby
title: macOS
permalink: ruby/macos/server/
redirect_from:
  - /ruby/
  - /ruby/macos/
  - /ruby/mac/
  - /ruby/mac/step/
  - /ruby/mac/step/1
---

> In this section, you will get SQL Server 2019 running on Docker. After that you will install the necessary dependencies to create Ruby apps with SQL Server.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_mac.md %}

## Step 1.2 Install Homebrew

Ruby is already installed on your Mac. If you already have Homebrew on your machine, skip this step. Install Homebrew using the following commands. Once you have installed Homebrew, make sure to restart the terminal session.

```terminal
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Step 1.3 Install rbenv and ruby-build

If you already have rbenv and ruby-build installed on your machine, skip this step. Use the following commands to install prerequisites for Ruby.

```terminal
brew update
brew install rbenv ruby-build
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
source ~/.bash_profile
```

## Step 1.4 Install Ruby

Use the commands below to install Ruby using rbenv and check the version.

```terminal
rbenv install 2.4.0
rbenv global 2.4.0
ruby -v
```

```results
ruby 2.4.0p0 (2016-12-24 revision 57164) [x86_64-darwin15]
```

## Step 1.5 Install FreeTDS

FreeTDS is a driver that enables you to connect to SQL Server. It is a prerequisite for the connector you'll get later in the tutorial to connect to SQL Server. Run the following commands to install FreeTDS:

```terminal
brew install FreeTDS
```

> You have successfully installed Ruby on your Mac. You now have everything you need to start writing your Ruby apps with SQL Server!
