Note: To ensure optimal performance of SQL Server, your machine should have at least 4 GB of memory.
If you need to get Ubuntu, check out the Ubuntu Downloads website.

1. Register the Microsoft Linux repositories and add their keys

    ```terminal
    curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
    curl https://packages.microsoft.com/config/ubuntu/16.04/mssql-server.list | sudo tee /etc/apt/sources.list.d/mssql-server.list
    ```

2. Install SQL Server

    ```terminal
    sudo apt-get update
    sudo apt-get install mssql-server
    ```

    ```results
    Reading package lists... Done
    Building dependency tree
    Reading state information... Done
    The following NEW packages will be installed:
      mssql-server
    ...
    Unpacking mssql-server ...
    Setting up mssql-server ...
    ```

3. Setup your SQL Server

    ```terminal
    sudo /opt/mssql/bin/mssql-conf setup
    ```

    ```results
    Microsoft(R) SQL Server(R) Setup

    To abort setup at anytime, press Ctrl-C.

    The license terms for this product can be downloaded from http://go.microsoft.com/fwlink/?LinkId=746388 and
    found in /usr/share/doc/mssql-server/LICENSE.TXT.

    Do you accept the license terms? If so, please type YES:
    Please enter a password for the system administrator (SA) account:
    Please confirm the password for the system administrator (SA) account:
    ```

> You now have SQL Server running locally on your Ubuntu machine! Check out the next section to continue installing prerequisites.
