[SQLCMD](https://docs.microsoft.com/sql/linux/sql-server-linux-setup-tools){:target="_blank"} is a command line utility that enables you to connect to SQL Server and run queries.

```terminal
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
HOMEBREW_NO_ENV_FILTERING=1 ACCEPT_EULA=Y brew install msodbcsql17 mssql-tools
```

After installing SQLCMD, you can connect to Azure SQL DB using the following command:

```terminal
sqlcmd -S your_database.database.windows.net -U your_user -P your_password -d your_database
1> # You're connected! Type your T-SQL statements here. Use the keyword 'GO' to execute each batch of statements.
```

This how to run a basic inline query. The results will be printed to the STDOUT.

```terminal
sqlcmd -S your_database.database.windows.net -U your_user -P your_password -d your_database -Q "SELECT @@VERSION"
```

```results
------------------------------------------------------------
Microsoft SQL Azure (RTM) - 12.0.2000.8 
	May 15 2020 00:47:08 
	Copyright (C) 2019 Microsoft Corporation
                                                                                                                                                                                                  

(1 rows affected)
```

> You have successfully installed SQL Server Command Line Utilities on your macOS machine!
