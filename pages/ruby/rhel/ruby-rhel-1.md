---
layout: page-steps
language: Ruby
title: RHEL
permalink: ruby/rhel/server/
redirect_from:
  - /ruby/
  - /ruby/rhel/
  - /ruby/rhel/step/
  - /ruby/rhel/step/1
---

> In this section, you will get SQL Server 2019 running on Red Hat Enterprise Linux (RHEL). After that you will install the necessary dependencies to create Ruby apps with SQL Server.

## Step 1.1 Install SQL Server

{% include partials/install_sql_server_linux_rhel.md %}

## Step 1.2 Install prerequisites for Ruby

Add [Extra Packages for Enterprise Linux (EPEL)](https://fedoraproject.org/wiki/EPEL) to your list of repos and install the prerequisites.

```terminal
wget https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo rpm -ivh epel-release-latest-7.noarch.rpm
sudo yum update
sudo yum install -y git-core zlib zlib-devel gcc-c++ patch readline readline-devel libyaml-devel libffi-devel openssl-devel make bzip2 autoconf automake libtool bison curl sqlite-devel
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
rbenv install 2.4.0
rbenv global 2.4.0
ruby -v
```

```results
ruby 2.4.0p0 (2016-12-24 revision 57164) [x86_64-linux] 
```

## Step 1.5 Install FreeTDS

FreeTDS is a driver that enables you to connect to SQL Server. It is a prerequisite for the connector you'll get later in the tutorial to connect to SQL Server. Run the following commands to install FreeTDS:

```terminal
wget ftp://ftp.freetds.org/pub/freetds/stable/freetds-1.00.27.tar.gz
tar -xzf freetds-1.00.27.tar.gz
cd freetds-1.00.27
./configure --prefix=/usr/local --with-tdsver=7.3
make
make install
```

> You have successfully installed Ruby on your RHEL machine. You now have everything you need to start writing your Ruby apps with SQL Server!
