SQLCMD is a command line tool that enables you to connect to SQL Server and run queries.

```terminal
sudo su
zypper ar https://packages.microsoft.com/config/sles/12/prod.repo
zypper update
exit
sudo ACCEPT_EULA=Y zypper install msodbcsql mssql-tools
sudo zypper install unixODBC-devel
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

> You have successfully installed SQL Server Command Line Utilities on your SLES machine! 
