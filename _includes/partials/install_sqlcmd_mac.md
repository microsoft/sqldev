SQLCMD is a command line tool that enables you to connect to SQL Server and run queries.

```terminal
brew tap microsoft/mssql-preview https://github.com/Microsoft/homebrew-mssql-preview
brew update
ACCEPT_EULA=y brew install msodbcsql mssql-tools
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

> You have successfully installed SQL Server Command Line Utilities on your macOS
