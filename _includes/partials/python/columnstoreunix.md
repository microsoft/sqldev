{% include partials/step3/title.md %}

## Step 3.1 Create a new table with 5 million using sqlcmd

```terminal
sqlcmd -S localhost -U sa -P your_password -d SampleDB -t 60000 -Q "WITH a AS (SELECT * FROM (VALUES(1),(2),(3),(4),(5),(6),(7),(8),(9),(10)) AS a(a))
SELECT TOP(5000000)
ROW_NUMBER() OVER (ORDER BY a.a) AS OrderItemId
,a.a + b.a + c.a + d.a + e.a + f.a + g.a + h.a AS OrderId
,a.a * 10 AS Price
,CONCAT(a.a, N' ', b.a, N' ', c.a, N' ', d.a, N' ', e.a, N' ', f.a, N' ', g.a, N' ', h.a) AS ProductName
INTO Table_with_5M_rows
FROM a, a AS b, a AS c, a AS d, a AS e, a AS f, a AS g, a AS h;"
```

## Step 3.2 Create a Python app that queries this tables and measures the time taken

```terminal
cd ~/
mkdir SqlServerColumnstoreSample
cd SqlServerColumnstoreSample
```

Using your favorite text editor, create a new file called columnstore.py in the SqlServerColumnstoreSample folder. Paste the following code inside it.

```python
import pyodbc
import datetime
server = 'localhost'
database = 'SampleDB'
username = 'sa'
password = 'your_password'
cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = cnxn.cursor()
tsql = "SELECT SUM(Price) as sum FROM Table_with_5M_rows"
a = datetime.now()
with cursor.execute(tsql):
  b = datetime.now()
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
Sum: 50000000
QueryTime: 363ms
```

## Step 3.4 Add a columnstore index to your table.

```terminal
sqlcmd -S localhost -U sa -P your_password -d SampleDB -Q "CREATE CLUSTERED COLUMNSTORE INDEX Columnstoreindex ON Table_with_5M_rows;"
```

## Step 3.5 Measure how long it takes to run the query with a columnstore index

```terminal
python columnstore.py
```

```results
Sum: 50000000
QueryTime: 5ms
```

> Congratulations! You just made your Python app faster using Columnstore Indexes!
