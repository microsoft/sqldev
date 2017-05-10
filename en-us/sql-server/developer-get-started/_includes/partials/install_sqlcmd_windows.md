SQLCMD is a command line tool that enables you to connect to SQL Server and run queries.

1. Install the [**ODBC Driver**](https://www.microsoft.com/en-us/download/details.aspx?id=53339)
2. Install the [**SQL Server Command Line Utilities**](https://www.microsoft.com/en-us/download/details.aspx?id=53591)

After installing SQLCMD using the msi's, you can connect to SQL Server using the following command from a CMD session:

```terminal
sqlcmd -S localhost -U sa -P your_password
1> # You're connected! Type your T-SQL statements here. Use the keyword 'GO' to execute each batch of statements.
```

This how to run a basic inline query. The results will be printed to the STDOUT.
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

