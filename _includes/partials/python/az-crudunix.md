
> In this section you will create a simple Python app. The Python app will perform basic Insert, Update, Delete, and Select.


## Step 2.1 Get Connection Information to use in Connection Strings, and Create a Firewall Rule.

{% include partials/get_azure_sql_connection_info.md %}


## Step 2.2 Install the Python driver for SQL Server

```terminal
sudo apt-get install unixodbc-dev 
sudo apt-get install python-pip
pip install pyodbc
```

## Step 2.3 Create a Python app that connects to Azure SQLand executes queries

Create a new folder for the sample

```terminal
mkdir AzureSqlSample
cd AzureSqlSample
```

Execute the T-SQL scripts below in the terminal with sqlcmd to a table and insert some row.

```terminal
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -Q "CREATE TABLE Employees (Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY, Name NVARCHAR(50), Location NVARCHAR(50));"
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -Q "INSERT INTO Employees (Name, Location) VALUES (N'Jared', N'Australia'), (N'Nikita', N'India'), (N'Tom', N'Germany');"
```

Using your favorite text editor, create a new file called crud.py in the AzureSqlSample folder. Paste the code below inside into the new file. This will insert, update, delete, and read a few rows.

```python
import pyodbc
server = 'your_server.database.windows.net'
database = 'your_database'
username = 'your_user'
password = 'your_password'
cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = cnxn.cursor()

print ('Inserting a new row into table')
#Insert Query
tsql = "INSERT INTO Employees (Name, Location) VALUES (?,?);"
with cursor.execute(tsql,'Jake','United States'):
    print ('Successfully Inserted!')


#Update Query
print ('Updating Location for Nikita')
tsql = "UPDATE Employees SET Location = ? WHERE Name = ?"
with cursor.execute(tsql,'Sweden','Nikita'):
    print ('Successfully Updated!')


#Delete Query
print ('Deleting user Jared')
tsql = "DELETE FROM Employees WHERE Name = ?"
with cursor.execute(tsql,'Jared'):
    print ('Successfully Deleted!')


#Select Query
print ('Reading data from table')
tsql = "SELECT Name, Location FROM Employees;"
with cursor.execute(tsql):
    row = cursor.fetchone()
    while row:
        print (str(row[0]) + " " + str(row[1]))
        row = cursor.fetchone()
```

Run your Python script from the terminal.

```terminal
python crud.py
```

```results
Inserting a new row into table
Successfully Inserted!
Updating Location for Nikita
Successfully Updated!
Deleting user Jared
Successfully Deleted!
Reading data from table
Jake United States
```


## Step 2.4 Secure your credentials using Azure Key Vault


**Create an Azure Key Vault and put your Secret into it.**

{% include partials/create_key_vault_and_store_creds.md %}


** Install the python libraries**

The reference documentation about the python sdk for Azure can be found [**here.**](https://docs.microsoft.com/en-us/python/api/overview/azure/key-vault?view=azure-python)

1. Execute the following from an Administrator command window:

```terminal 
pip install azure-keyvault-secrets 
pip install azure-keyvault-keys
pip install azure-keyvault-certificates
pip install azure-identity
```

**Set up your environment to Authenticate to Azure Key Vault**

This section takes you through the steps described [**on this site**](https://docs.microsoft.com/en-us/azure/key-vault/secrets/quick-create-python) to set up your machine for authentication to the key vault.  You need to do this to use the **DefaultAzureCredentialBuilder()**.

1. Open a command window and execute **az login** if you have not already.
1. Create a service prinicpal (make sure you take note of the output, as you will use it in the next two steps.):

```terminal
az ad sp create-for-rbac -n "http://mySP" --sdk-auth
```

1. Give the serpvice prinicpal access to your key vault.

```terminal
az keyvault set-policy -n <your-unique-keyvault-name> --spn <clientId-of-your-service-principal> --secret-permissions delete get list set --key-permissions create decrypt delete encrypt get list unwrapKey wrapKey
```

1. Set environment variables.  You can do this from the command line in the following way:

```terminal
setx AZURE_CLIENT_ID <your_client_id>
setx AZURE_CLIENT_SECRET <your_client_secret>
setx AZURE_TENANT_ID <your_tenantID>
```

**Update your crud.py to use the Key Vault for Authentication** 

Copy the following into your crud.py, replacing the old, and being sure to update your connection information and your keyvault name:

```python
import pyodbc
server = 'your_server.database.windows.net'
database = 'your_database'
username = 'your_user'

from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

credential = DefaultAzureCredential()

secret_client = SecretClient(vault_url="https://<your_keyvault_name>.vault.azure.net", credential=credential)

# NOTE: please replace the ("<your-secret-name>") with the name of the secret in your vault
secret = secret_client.get_secret("AppSecret")

password = secret.value

cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = cnxn.cursor()


print ('Inserting a new row into table')
#Insert Query
tsql = "INSERT INTO Employees (Name, Location) VALUES (?,?);"
with cursor.execute(tsql,'Jake','United States'):
    print ('Successfully Inserted!')


#Update Query
print ('Updating Location for Nikita')
tsql = "UPDATE Employees SET Location = ? WHERE Name = ?"
with cursor.execute(tsql,'Sweden','Nikita'):
    print ('Successfully Updated!')


#Delete Query
print ('Deleting user Jared')
tsql = "DELETE FROM Employees WHERE Name = ?"
with cursor.execute(tsql,'Jared'):
    print ('Successfully Deleted!')


#Select Query
print ('Reading data from table')
tsql = "SELECT Name, Location FROM Employees;"
with cursor.execute(tsql):
    row = cursor.fetchone()
    while row:
        print (str(row[0]) + " " + str(row[1]))
        row = cursor.fetchone()
```

Then run again:

```terminal
python crud.py
```

> Congratulations! You created your first Python app with Azure SQL, and secured your credentials in Azure Key Vault! Check out the next section to learn about how you can make your Python app faster with Azure SQL's Columnstore feature.
