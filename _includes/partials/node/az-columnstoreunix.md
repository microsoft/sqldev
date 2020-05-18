{% include partials/step3/az-title.md %}

## Step 3.1 Create a new table with 3 million rows using sqlcmd

Change to your home directory and create a folder for your project.

```terminal
cd ~/
mkdir AzureSqlColumnstoreSample
cd AzureSqlColumnstoreSample
```

Using your favorite text editor, create a new file called CreateSampleTable.sql in the folder AzureSqlColumnstoreSample. Paste the T-SQL code below into your new SQL file. Save and close the file.

```SQL
WITH a AS (SELECT * FROM (VALUES(1),(2),(3),(4),(5),(6),(7),(8),(9),(10)) AS a(a))
SELECT TOP(3000000)
ROW_NUMBER() OVER (ORDER BY a.a) AS OrderItemId
,a.a + b.a + c.a + d.a + e.a + f.a + g.a + h.a AS OrderId
,a.a * 10 AS Price
,CONCAT(a.a, N' ', b.a, N' ', c.a, N' ', d.a, N' ', e.a, N' ', f.a, N' ', g.a, N' ', h.a) AS ProductName
INTO Table_with_3M_rows
FROM a, a AS b, a AS c, a AS d, a AS e, a AS f, a AS g, a AS h;
```

Connect to the database using sqlcmd and run the SQL script to create the table with 5 million rows. This may take a few minutes to run.

```terminal
  sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -i ./CreateSampleTable.sql
```

## Step 3.2 Create a Node.js that queries this tables and measures the time taken

In your project folder, initialize Node dependencies.
```terminal
npm init -y
npm install tedious
npm install node-uuid
npm install async
npm install @azure/keyvault-secrets
npm install @azure/identity
```

Using you favorite text editor, create a file called columnstore.js in your folder.

```javascript
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var uuid = require('node-uuid');
var async = require('async');
const KeyVaultSecrets = require("@azure/keyvault-secrets");
const Identity = require("@azure/identity");

var password;
var conn;

async function GetSecret(){
	console.log("Getting secret...");
  	// DefaultAzureCredential expects the following three environment variables:
  	// - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  	// - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  	// - AZURE_CLIENT_SECRET: The client secret for the registered application
  	const credential = new Identity.DefaultAzureCredential();

	const vaultName = process.env["KEY_VAULT_NAME"] || "your_keyvault_name";
  	const url = `https://${vaultName}.vault.azure.net`;

	const client = new KeyVaultSecrets.SecretClient(url, credential);

	try {
	  secret = await client.getSecret('AppSecret').then((secret) => { 
		password = secret.value;
		});
	}
	catch (error) {
		console.log("Error connecting to key vault: " + error);
	}
}

async function GetConnection(){
   var config = {
     server: 'your_server.database.windows.net',  // update me
     authentication: {
        type: 'default',
        options: {
            userName: 'your_user', 		// update me
            password: password 			// will be retrieved
        }
      },
      options: {
	encrypt: true, 
	trustServerCertificate: true,
	database: 'your_database'		// update me
      }
    };

  conn = new Connection(config);
  conn.connect();
}

function exec(sql) {
    var timerName = "QueryTime";

    var request = new Request(sql, function(err) {
        if (err) {
            console.log(err);
        }
    });
    request.on('doneProc', function(rowCount, more, rows) {
        if(!more){
            console.timeEnd(timerName);
        }
    });
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("Sum: " +  column.value);
        });
    });
    console.time(timerName);
    conn.execSql(request);
}

async function Main() {

  await GetSecret();
  await GetConnection();

	console.log("Got connection");

  conn.on('connect', function(err) {
    if (err) {
     console.log(err);
    } else {
      console.log('Connected');

    // Execute all functions in the array serially
    async.waterfall([
        function(){
            exec('SELECT SUM(Price) FROM Table_with_3M_rows');},
        ]);
     }});

}

Main();
```

## Step 3.3 Measure how long it takes to run the query

Run your Node.js app from the terminal.

```terminal
  node columnstore.js
```

```results
Sum: 30000000
QueryTime: 961.248ms
```

## Step 3.4 Add a columnstore index to your table using SQLCMD.

Run this command to create a Columnstore Index on your table:

```terminal
sqlcmd -S localhost -U sa -P your_password -d SampleDB -Q "CREATE CLUSTERED COLUMNSTORE INDEX Columnstoreindex ON Table_with_3M_rows;"
```

## Step 3.5 Re-run the columnstore.js script and notice how long the query took to complete this time.


```terminal
  node columnstore.js
```

```results
Sum: 30000000
QueryTime: 961.248ms
```

> Congratulations! You just made your Node.js app faster using Columnstore Indexes!
