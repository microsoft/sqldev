SQLCMD is a command line tool that enables you to connect to SQL Server and run queries.

1. Install the [**ODBC Driver**](https://aka.ms/downloadmsodbcsql).
2. Install the [**SQL Server Command Line Utilities**](https://docs.microsoft.com/sql/tools/sqlcmd-utility).

After installing SQLCMD, you can connect to SQL Server using the following command from a CMD session:

```terminal
sqlcmd -S localhost -U sa -P your_password
1> # You're connected! Type your T-SQL statements here. Use the keyword 'GO' to execute each batch of statements.
```

This how to run a basic inline query. The results will be printed to STDOUT.

```terminal
sqlcmd -S localhost -U sa -P yourpassword -Q "SELECT @@VERSION"
```

```results
--------------------------------------------------------
{% include partials/sql_server_version.md %} on Windows 10

(1 rows affected)
```

> You have successfully installed SQL Server Command Line Utilities on your Windows machine!
