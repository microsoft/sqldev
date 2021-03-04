SQLCMD is a command line tool that enables you to connect to Azure SQL or SQL Server and run queries.

1. Install the [**ODBC Driver**](https://aka.ms/downloadmsodbcsql).
2. Install the [**SQL Server Command Line Utilities**](https://docs.microsoft.com/sql/tools/sqlcmd-utility).

After installing SQLCMD, you can connect to Azure SQL using the following command from a CMD session, making sure to update your connection information:

```terminal
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_databsae
1> # You're connected! Type your T-SQL statements here. Use the keyword 'GO' to execute each batch of statements.
```

This how to run a basic inline query. The results will be printed to STDOUT.

```terminal
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -Q "SELECT @@VERSION"
```

```results
------------------------------------------------------
Microsoft SQL Azure (RTM) - 12.0.2000.8
        Feb 26 2020 10:26:43
        Copyright (C) 2019 Microsoft Corporation
```

> You have successfully installed SQL Server Command Line Utilities on your Windows machine, and used them to connect to Azure SQL! 
