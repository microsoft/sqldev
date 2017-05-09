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
Microsoft SQL Server vNext (CTP2.0) - 14.0.500.272 (X64) 
	Apr 13 2017 11:44:40 
  Copyright (c) Microsoft Corporation
  on Linux (SUSE Linux Enterprise Server 12 SP2)

1 rows(s) returned

Executed in 1 ns
```

> You have successfully installed SQL Server Command Line Utilities on your SLES machine! 
