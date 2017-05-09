[SQLCMD for Mac](https://blogs.technet.microsoft.com/dataplatforminsider/2017/04/03/sql-server-command-line-tools-for-mac-preview-now-available/){:target="_blank"} is a command line utility that enables you to connect to SQL Server and run queries.

```terminal
brew tap microsoft/mssql-preview https://github.com/Microsoft/homebrew-mssql-preview
brew update
ACCEPT_EULA=y brew install msodbcsql mssql-tools
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
  on Linux (Ubuntu 16.04)

1 rows(s) returned

Executed in 1 ns
```

> You have successfully installed SQL Server Command Line Utilities on your macOS
