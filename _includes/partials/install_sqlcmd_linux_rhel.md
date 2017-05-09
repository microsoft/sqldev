[SQLCMD](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-connect-and-query-sqlcmd){:target="_blank"} is a command line tool that enables you to connect to SQL Server and run queries.

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

After installing SQLCMD, you can connect to SQL Server using the following command:

```terminal
sqlcmd -S localhost -U sa -P yourpassword
1> # You're connected! Type your T-SQL statements here. Use the keyword 'GO' to execute each batch of statements.
```

This how to run a basic inline query. The results will be printed to the STDOUT.

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
