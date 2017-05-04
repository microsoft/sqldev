SQLCMD is a command line tool that enables you to connect to SQL Server and run queries.

1. Install the [**ODBC Driver**](https://www.microsoft.com/en-us/download/details.aspx?id=53339)
2. Install the [**SQL Server Command Line Utilities**](https://www.microsoft.com/en-us/download/details.aspx?id=53591)

Once you install both the msi's, open up cmd.exe and run the following command to connect and run a basic query.

```terminal
sqlcmd -S localhost -U sa -P yourpassword -Q "SELECT @@VERSION"
```

```results
--------------------------------------------------------
Microsoft SQL Server 2016 (RTM) - 13.0.1601.5 (X64)
Apr 29 2016 23:23:58
Copyright (c) Microsoft Corporation
Developer Edition (64-bit)

1 rows(s) returned

Executed in 1 ns.
```
> You have successfully installed SQL Server Command Line Utilities on your Windows machine! 

