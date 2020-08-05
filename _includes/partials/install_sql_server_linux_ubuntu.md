Note: To ensure optimal performance of SQL Server, your machine should have at least 4 GB of memory.
If you need to get Ubuntu, check out the Ubuntu Downloads website.

1. Register the Microsoft Linux repositories and add their keys.

    ```terminal
    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
    sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/18.04/mssql-server-2019.list)"
    ```

2. Install SQL Server.

    ```terminal
    sudo apt-get update
    sudo apt-get install -y mssql-server
    ```

3. Setup your SQL Server.

    ```terminal
    sudo /opt/mssql/bin/mssql-conf setup
    ```

    ```results
    Choose an edition of SQL Server:
      1) Evaluation (free, no production use rights, 180-day limit)
      2) Developer (free, no production use rights)
      3) Express (free)
      4) Web (PAID)
      5) Standard (PAID)
      6) Enterprise (PAID) - CPU Core utilization restricted to 20 physical/40 hyperthreaded
      7) Enterprise Core (PAID) - CPU Core utilization up to Operating System Maximum
      8) I bought a license through a retail sales channel and have a product key to enter.

    Details about editions can be found at
    https://go.microsoft.com/fwlink/?LinkId=2109348&clcid=0x409

    Use of PAID editions of this software requires separate licensing through a
    Microsoft Volume Licensing program.
    By choosing a PAID edition, you are verifying that you have the appropriate
    number of licenses in place to install and run this software.

    Enter your edition(1-8): 2
    The license terms for this product can be found in
    /usr/share/doc/mssql-server or downloaded from:
    https://go.microsoft.com/fwlink/?LinkId=2104294&clcid=0x409

    The privacy statement can be viewed at:
    https://go.microsoft.com/fwlink/?LinkId=853010&clcid=0x409

    Do you accept the license terms? [Yes/No]:Yes

    Enter the SQL Server system administrator password:
    Confirm the SQL Server system administrator password:
    Configuring SQL Server...

    ForceFlush is enabled for this instance.
    ForceFlush feature is enabled for log durability.
    Created symlink /etc/systemd/system/multi-user.target.wants/mssql-server.service → /lib/systemd/system/mssql-server.service.
    Setup has completed successfully. SQL Server is now starting.
    ```

> You now have SQL Server running locally on your Ubuntu machine! Check out the next section to continue installing prerequisites.
