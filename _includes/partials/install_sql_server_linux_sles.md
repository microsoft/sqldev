Note: To ensure optimal performance of SQL Server, your machine should have at least 4 GB of memory.

1. Register the Microsoft Linux repository and add they keys

    ```terminal
        sudo zypper addrepo -fc https://packages.microsoft.com/config/sles/12/mssql-server.repo
        sudo zypper --gpg-auto-import-keys refresh
    ```
2. Install SQL Server

    ```terminal
        sudo zypper update
        sudo zypper install mssql-server
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

> You now have SQL Server running locally on your SLES machine! Check out the next section to continue installing prerequisites.
