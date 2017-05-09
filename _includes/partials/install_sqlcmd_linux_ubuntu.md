SQLCMD is a command line tool that enables you to connect to SQL Server and run queries.

```terminal
sudo su
curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-tools.list
exit
sudo apt-get update
sudo ACCEPT_EULA=Y apt-get install mssql-tools
sudo apt-get install unixodbc-dev
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
source ~/.bashrc
```

Run a basic query.

```terminal
sqlcmd -S localhost -U sa -P yourpassword -Q "SELECT @@VERSION"
```

```results
--------------------------------------------------------
Microsoft SQL Server vNext (CTP2.0) - 14.0.500.272 (X64) 
	Apr 13 2017 11:44:40 
  Copyright (c) Microsoft Corporation
  on Linux (Ubuntu 16.04)

1 rows(s) returned

Executed in 1 ns
```

> You have successfully installed SQL Server Command Line Utilities on your Ubuntu
