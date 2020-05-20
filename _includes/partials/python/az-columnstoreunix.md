{% include partials/step3/az-title.md %}

## Step 3.1 Create a new table with 3 million rows using sqlcmd

```terminal
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -t 60000 -Q "WITH a AS (SELECT * FROM (VALUES(1),(2),(3),(4),(5),(6),(7),(8),(9),(10)) AS a(a))
SELECT TOP(3000000)
ROW_NUMBER() OVER (ORDER BY a.a) AS OrderItemId
,a.a + b.a + c.a + d.a + e.a + f.a + g.a + h.a AS OrderId
,a.a * 10 AS Price
,CONCAT(a.a, N' ', b.a, N' ', c.a, N' ', d.a, N' ', e.a, N' ', f.a, N' ', g.a, N' ', h.a) AS ProductName
INTO Table_with_3M_rows
FROM a, a AS b, a AS c, a AS d, a AS e, a AS f, a AS g, a AS h;"
```

## Step 3.2 Create a Python app that queries this tables and measures the time taken

```terminal
mkdir AzureSqlColumnstoreSample
cd AzureSqlColumnstoreSample
```

Using your favorite text editor, create a new file called columnstore.py in the SqlServerColumnstoreSample folder. Paste the following code inside it.

```python
import pyodbc
import datetime
server = 'your_server.database.windows.net'
database = 'your_database'
username = 'your_user'


from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

credential = DefaultAzureCredential()

secret_client = SecretClient(vault_url="https://<your_key_vault_name>.vault.azure.net", credential=credential)

# NOTE: please replace the ("<your-secret-name>") with the name of the secret in your vault
secret = secret_client.get_secret("AppSecret")

password = secret.value

cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = cnxn.cursor()
tsql = "SELECT SUM(Price) as sum FROM Table_with_3M_rows"
a = datetime.datetime.now()
with cursor.execute(tsql):
  b = datetime.datetime.now()
  c = b - a
  for row in cursor:
    print ('Sum:', str(row[0]))
  print ('QueryTime:', c.microseconds, 'ms')
```

## Step 3.3 Measure how long it takes to run the query

Run your Python script from the terminal.

```terminal
python columnstore.py
```

```results
('Sum:', '30000000')
('QueryTime:', 870974, 'ms')
```

## Step 3.4 Add a columnstore index to your table.

```terminal
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_db -Q "CREATE CLUSTERED COLUMNSTORE INDEX Columnstoreindex ON Table_with_3M_rows;"
```

## Step 3.5 Measure how long it takes to run the query with a columnstore index

```terminal
python columnstore.py
```

```results
('Sum:', '30000000')
('QueryTime:', 67888, 'ms')
```

> Congratulations! You just made your Python app faster using Columnstore Indexes!
