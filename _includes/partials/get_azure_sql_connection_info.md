
**Get Connection Information**

1. Get the connection string info from the Azure Portal

Go to your database and look in the panel on the left.  It should say Overview, activity log, …

Under the settings subcategory, look for connection strings:

![ConnectionStringMenu]({{ baseurl }}/assets/images/ConnectionStringOnMenu.png)

2. Click Connection Strings, and then take note of the information:  

 ```results
Server=tcp:your_server.database.windows.net,1433;Initial Catalog=your_database;Persist Security Info=False;User ID=your_user ;Password=<THIS IS ACTUALLY NOT RETURNED>;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
 ```

3. Make a note of the following somewhere for reference in subsequent steps:

 ```results
Server=your_server.database.windows.net

Database=your_database

UserId=your_user

Password=your_password
```

**Create a firewall rule**
In order to connect to your Azure SQL database, you will need to create a filrewall rule on the target server.  This allows your application to talk to your Azure SQL Database.

1.  Find your IP Address.  On the Windows task bar, in the lower right, select the newtork icon to see networks.  
1.  Select the network you are connected to, and click properites. 
1.  Within the properites, you will see an **IPv4 address**.  Take note of this.  It will be something like 123.123.123.123
1.  Go to the AzurePortal.  Find your database.  
1.  From your database, in the Overview, you can look in the panel on the right, and where it says Server name, click that server.
1.  From the server, in the search bar at the top, type "firewall", and select "Firewalls and virtual networks".
1.  For now, you can ignore the three questions at the top, and scroll down to the set of specific firewall rules.
1.  Then, you add a rule.  Put RuleName as "AzureSQLGetStarted", then enter the Start IP should be 123.123.123.000, and End IP as 123.123.124.000, based on the values for your IP.
1.  Once the values are filled in, the rule should appear, and you then click the Save icon at the top. 