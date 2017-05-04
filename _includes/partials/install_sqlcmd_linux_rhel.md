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
Microsoft SQL Server vNext (CTP1.3) - 14.0.304.100 (X64)
Feb  8 2017 04:21:38
Copyright (c) Microsoft Corporation
on Linux (Ubuntu 16.04)

1 rows(s) returned

Executed in 1 ns
```

> You have successfully installed SQL Server Command Line Utilities on your RedHat machine! 
