[SQLCMD](https://docs.microsoft.com/sql/linux/sql-server-linux-setup-tools){:target="_blank" rel="noopener noreferrer"} is a command line utility that enables you to connect to SQL Server and run queries.

```terminal
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
HOMEBREW_NO_ENV_FILTERING=1 ACCEPT_EULA=Y brew install msodbcsql17 mssql-tools
```

After installing SQLCMD, you can connect to SQL Server using the following command:

```terminal
sqlcmd -S 127.0.0.1 -U sa -P your_password
1> # You're connected! Type your T-SQL statements here. Use the keyword 'GO' to execute each batch of statements.
```

This how to run a basic inline query. The results will be printed to the STDOUT.

```terminal
sqlcmd -S 127.0.0.1 -U sa -P your_password -Q "SELECT @@VERSION"
```

```results
--------------------------------------------------------
{% include partials/sql_server_version.md %}    on Linux (Ubuntu 16.04)

1 rows(s) returned

Executed in 1 ns
```

> You have successfully installed SQL Server Command Line Utilities on your macOS machine!
