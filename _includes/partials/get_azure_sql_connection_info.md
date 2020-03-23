
1. Get the connection string info from the Azure Portal

Go to your database and look in the panel on the left.  It should say Overview, activity log, …

Under the settings subcategory, look for connection strings:

![ConnectionStringMenu]({{ baseurl }}/assets/images/ConnectionStringOnMenu.png)

2. Click Connection Strings, and then take note of the information:  

 ```results
Server=tcp:<YOUR SERVER NAME>.database.windows.net,1433;Initial Catalog=<YOUR DATABASE NAME>;Persist Security Info=False;User ID=<YOUR USER ID> ;Password=<YOUR PASSWORD>;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
 ```

3. Make a note of the following somewhere for reference in subsequent steps:

 ```results
Server=<YOUR SERVER NAME>

Database=<YOUR DATABASE NAME>

UserId=<YOUR USER ID>

Password=<YOUR PASSWORD>
```