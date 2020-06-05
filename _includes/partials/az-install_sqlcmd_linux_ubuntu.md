[SQLCMD](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-setup-tools?view=sql-server-ver15#ubuntu){:target="_blank"} is a command line tool that enables you to connect to Azure SQL and run queries.

```terminal

curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -

Download appropriate package for the OS version
#Choose only ONE of the following, corresponding to your OS version

#Ubuntu 16.04
curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list | sudo tee /etc/apt/sources.list.d/msprod.list

#Ubuntu 18.04
curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list | sudo tee /etc/apt/sources.list.d/msprod.list

#Ubuntu 19.10
curl https://packages.microsoft.com/config/ubuntu/19.10/prod.list | sudo tee /etc/apt/sources.list.d/msprod.list


sudo apt-get update 
sudo apt-get install mssql-tools unixodbc-dev


echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile

echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
source ~/.bashrc

sudo su
curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
```

After installing SQLCMD, you can connect to Azure SQL using the following command:

```terminal
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database
1> # You're connected! Type your T-SQL statements here. Use the keyword 'GO' to execute each batch of statements.
```

This how to run a basic inline query. The results will be printed to the STDOUT.

```terminal
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -Q "SELECT @@VERSION"
```

```results
------------------------------------------------------------
Microsoft SQL Azure (RTM) - 12.0.2000.8 
	May 15 2020 00:47:08 
	Copyright (C) 2019 Microsoft Corporation
                                                                                                                                                                                                  

(1 rows affected)
```

> You have successfully installed SQL Server Command Line Utilities on your Ubuntu machine!
