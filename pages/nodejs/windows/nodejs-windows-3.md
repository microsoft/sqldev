---
layout: page-steps
language: Node.js
title: Windows
permalink: /node/windows/server/step/3
---

> In this section we will show you a simple example of [Columnstore Indexes](https://docs.microsoft.com/en-us/sql/relational-databases/indexes/columnstore-indexes-overview) and how they can improve data processing speeds. Columnstore Indexes can achieve up to 100x better performance on analytical workloads and up to 10x better data compression than traditional rowstore indexes.

## Step 3.1 Create a new table with 5 million using sqlcmd

Change to your home directory and create a folder for your project.

```terminal
cd ~/
mkdir SqlServerColumnstoreSample
cd SqlServerColumnstoreSample
```

Using your favorite text editor, create a new file called CreateSampleTable.sql in the folder SqlServerColumnstoreSample. Paste the T-SQL code below into your new SQL file. Save and close the file.

```SQL
sqlcmd -S localhost -U sa -P your_password -d SampleDB -t 60000 -Q "WITH a AS (SELECT * FROM (VALUES(1),(2),(3),(4),(5),(6),(7),(8),(9),(10)) AS a(a))
SELECT TOP(5000000)
ROW_NUMBER() OVER (ORDER BY a.a) AS OrderItemId
,a.a + b.a + c.a + d.a + e.a + f.a + g.a + h.a AS OrderId
,a.a * 10 AS Price
,CONCAT(a.a, N' ', b.a, N' ', c.a, N' ', d.a, N' ', e.a, N' ', f.a, N' ', g.a, N' ', h.a) AS ProductName
INTO Table_with_5M_rows
FROM a, a AS b, a AS c, a AS d, a AS e, a AS f, a AS g, a AS h;"
```

Connect to the database using sqlcmd and run the SQL script to create the table with 5 million rows. This may take a few minutes to run.

```terminal
  sqlcmd -S localhost -U sa -P your_password -d SampleDB -i ./CreateSampleTable.sql
```

## Step 3.2 Create a Node.js that queries this tables and measures the time taken

In your project folder, initialize Node dependencies.

```terminal
npm init -y
npm install tedious
npm install node-uuid
npm install async
```

Using you favorite text editor, create a file called columnstore.js in the SqlServerColumnstoreSample folder.

```javascript
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var uuid = require('node-uuid');
var async = require('async');

var config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', // update me
            password: 'your_password' // update me
        }
    },
    options: {
        database: 'SampleDB'
    }
    // When you connect to Azure SQL Database, you need these next options.
    //options: {encrypt: true, database: 'yourDatabase'}
};


var connection = new Connection(config);
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
    connection.execSql(request);
}
// Open connection and execute query
connection.on('connect', function(err) {
    async.waterfall([
        function(){
            exec('SELECT SUM(Price) FROM Table_with_5M_rows');
        },
    ]);
});
```

## Step 3.3 Measure how long it takes to run the query

Run your Node.js app from the terminal.

```terminal
  node columnstore.js
```

```results
Sum: 50000000
QueryTime: 363ms
```

## Step 3.4 Add a columnstore index to your table.

```terminal
sqlcmd -S localhost -U sa -P your_password -d SampleDB -Q "CREATE CLUSTERED COLUMNSTORE INDEX Columnstoreindex ON Table_with_5M_rows;"
```

## Step 3.5 Re-run the columnstore.js script and notice how long the query took to complete this time.


```terminal
  node columnstore.js
```

```results
Sum: 50000000
QueryTime: 5ms
```

> Congratulations! You just made your Node.js app faster using Columnstore Indexes!
