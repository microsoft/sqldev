```terminal
sudo su
curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
curl https://packages.microsoft.com/config/ubuntu/16.04/mssql-server.list > /etc/apt/sources.list.d/mssql-server.list
sudo apt-get update
sudo apt-get install mssql-server
sudo /opt/mssql/bin/mssql-conf setup
exit
```
