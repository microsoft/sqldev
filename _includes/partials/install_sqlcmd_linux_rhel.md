SQLCMD is a command line tool that enables you to connect to SQL Server and run queries.

```terminal
sudo su
curl https://packages.microsoft.com/config/rhel/7/prod.repo > /etc/yum.repos.d/mssql-tools.repo
exit
sudo ACCEPT_EULA=Y yum install msodbcsql mssql-tools
sudo yum install unixODBC-devel
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
  on Linux (Red Hat Enterprise Linux)

1 rows(s) returned

Executed in 1 ns
```

> You have successfully installed SQL Server Command Line Utilities on your Red Hat machine! 
