---
layout: page-steps
language: GO
title: Windows
permalink: /go/windows/az/step/3
---

{% include partials/step3/az-title.md %}

## Step 3.1 Create a new table with 3 million rows using sqlcmd

Change to your home directory and create a folder for your project.

```terminal
cd \
mkdir AzureSqlColumnstoreSample
cd AzureSqlColumnstoreSample
```

Using [your favorite text editor](https://code.visualstudio.com/), create a new file called CreateSampleTable.sql in the folder AzureSqlColumnstoreSample. Paste the T-SQL code below into your new SQL file. Save and close the file.

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

Connect to the database using sqlcmd and run the SQL script to create the table with 3 million rows. This may take a few minutes to run.

```terminal
  sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -i ./CreateSampleTable.sql
```

## Step 3.2 Create a Go app that queries this tables and measures the time taken

In your project folder, initialize Go dependencies.

```terminal
    go get github.com/denisenkom/go-mssqldb
    go install github.com/denisenkom/go-mssqldb
```

Using you favorite text editor, create a file called columnstore.go in your folder.

```go
package main

import (
    _ "github.com/denisenkom/go-mssqldb"
    "database/sql"
    "context"
    "log"
    "fmt"
    "time"
)

var server = "your_server.database.windows.net"
var user = "your_user"
var password = "your_password"
var database = "your_database"

var db *sql.DB

// Delete an employee from database
func ExecuteAggregateStatement(db *sql.DB) {
    ctx := context.Background()

    // Ping database to see if it's still alive.
    // Important for handling network issues and long queries.
    err := db.PingContext(ctx)
    if err != nil {
        log.Fatal("Error pinging database: " + err.Error())
    }

    var result string

    // Execute long non-query to aggregate rows
    err = db.QueryRowContext(ctx, "SELECT SUM(Price) as sum FROM Table_with_3M_rows").Scan(&result)
    if err != nil {
        log.Fatal("Error executing query: " + err.Error())
    }

    fmt.Printf("Sum: %s\n", result)
}

func main() {
    // Connect to database
    connString := fmt.Sprintf("server=%s;user id=%s;password=%s;database=%s;",
                                server, user, password, database)
    var err error

    // Create connection pool
    db, err = sql.Open("sqlserver", connString)
    if err != nil {
        log.Fatal("Open connection failed:", err.Error())
    }
    fmt.Printf("Connected!\n")

    defer db.Close()

    t1 := time.Now()
    fmt.Printf("Start time: %s\n", t1)

    ExecuteAggregateStatement(db)

    t2 := time.Since(t1)
    fmt.Printf("The query took: %s\n", t2)
}
```

## Step 3.3 Measure how long it takes to run the query

Run your Node.js app from the terminal.

```terminal
  go run columnstore.go
```

```results
Connected!
Start time: 2020-06-01 14:14:10.9798749 -0700 PDT m=+0.007956701
Sum: 30000000
The query took: 1.38459s
```

## Step 3.4 Add a columnstore index to your table using SQLCMD.

Run this command to create a Columnstore Index on your table:

```terminal
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -Q "CREATE CLUSTERED COLUMNSTORE INDEX Columnstoreindex ON Table_with_3M_rows;"
```

## Step 3.5 Re-run the columnstore.go script and notice how long the query took to complete this time.

```terminal
  go run columnstore.go
```

```results
Connected!
Start time: 2020-06-01 14:16:05.6629143 -0700 PDT m=+0.006997001
Sum: 30000000
The query took: 626.9687ms
```

> Congratulations! You just made your Go app faster using Columnstore Indexes!
