Note: To ensure optimal performance of SQL Server, your machine should have at least 4 GB of memory.

Note: In case of RHEL8, Python 2 required for running SQL Server is not pre-installed, so please execute the installation and set it to the interpreter.

1. Register the Microsoft Linux repository.

    ```terminal
    sudo curl -o /etc/yum.repos.d/mssql-server.repo https://packages.microsoft.com/config/rhel/8/mssql-server-2019.repo
    ```

    Note: If you are using RHEL 7, change `/rhel/8` in the above path to `/rhel/7`.

2. Install SQL Server.

    ```terminal
    sudo yum update
    sudo yum install mssql-server
    ```

3. Setup your SQL Server.

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

> You now have SQL Server running locally on your RHEL machine! Check out the next section to continue installing prerequisites.
