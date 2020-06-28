---
layout: page-steps
language: Ruby
title: Ubuntu
permalink: /ruby/ubuntu/az/
redirect_from:
  - /ruby/az/
  - /ruby/ubuntu/az/step/
  - /ruby/ubuntu/az/step/1
---
> In this section, you will get setup an Azure SQL instance. After that you will install the necessary dependencies to create Ruby apps with Azure SQL DB.

## Step 1.1 Create Azure Hosted SQL Database

{% include partials/setup_azure_sql_instance.md %}

## Step 1.2 Install prerequisites for Ruby

Use the commands below to install prerequisites.

```terminal
sudo apt-get update
sudo apt-get install autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm-dev
sudo apt-get install git
```

## Step 1.3 Install rbenv and ruby-build

If you already have rbenv and ruby-build installed on your machine, skip this step. Use the following commands to install prerequisites for Ruby.

```terminal
cd
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL
```

## Step 1.4 Install Ruby

Use the commands below to install Ruby using rbenv and check the version.

```terminal
rbenv install 2.7.0
rbenv global 2.7.0
ruby -v
```

```results
ruby 2.7.0p0 (2019-12-25 revision 647ee6f091) [x86_64-linux] 
```

## Step 1.5 Install FreeTDS

FreeTDS is a driver that enables you to connect to Azure SQL DB. It is a prerequisite for the connector you'll get later in the tutorial to connect to SQL Server. Run the following commands to install FreeTDS:

```terminal
wget ftp://ftp.freetds.org/pub/freetds/stable/freetds-1.00.27.tar.gz
tar -xzf freetds-1.00.27.tar.gz
cd freetds-1.00.27
./configure --prefix=/usr/local --with-tdsver=7.3
sudo make
sudo make install
```


> You have successfully installed Ruby on your Ubuntu machine. You now have everything you need to start writing your Ruby apps with Azure SQL!
