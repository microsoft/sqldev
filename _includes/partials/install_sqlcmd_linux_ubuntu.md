[SQLCMD](https://docs.microsoft.com/sql/linux/sql-server-linux-connect-and-query-sqlcmd){:target="_blank" rel="noopener noreferrer"} is a command line tool that enables you to connect to SQL Server and run queries.

```terminal
sudo su 
curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -

#Download appropriate package for the OS version
#Choose only ONE of the following, corresponding to your OS version

#Ubuntu 16.04
curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list

#Ubuntu 18.04
curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list > /etc/apt/sources.list.d/mssql-release.list

#Ubuntu 19.10
curl https://packages.microsoft.com/config/ubuntu/19.10/prod.list > /etc/apt/sources.list.d/mssql-release.list

exit
sudo apt-get update
sudo ACCEPT_EULA=Y apt-get install msodbcsql17
# optional: for bcp and sqlcmd
sudo ACCEPT_EULA=Y apt-get install mssql-tools
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
source ~/.bashrc
# optional: for unixODBC development headers
sudo apt-get install unixodbc-dev
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
{% include partials/sql_server_version.md %}    on Linux (Ubuntu 16.04)

1 rows(s) returned

Executed in 1 ns
```

> You have successfully installed SQL Server Command Line Utilities on your Ubuntu machine!
