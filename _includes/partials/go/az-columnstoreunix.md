{% include partials/step3/title.md %}

## Step 3.1 Create a new table with 5 million using sqlcmd

Change to your home directory and create a folder for your project.

```terminal
cd ~/
mkdir SqlServerColumnstoreSample
cd SqlServerColumnstoreSample
```

Using your favorite text editor, create a new file called CreateSampleTable.sql in the folder SqlServerColumnstoreSample. Paste the T-SQL code below into your new SQL file. Save and close the file.

```SQL
WITH a AS (SELECT * FROM (VALUES(1),(2),(3),(4),(5),(6),(7),(8),(9),(10)) AS a(a))
SELECT TOP(5000000)
ROW_NUMBER() OVER (ORDER BY a.a) AS OrderItemId
,a.a + b.a + c.a + d.a + e.a + f.a + g.a + h.a AS OrderId
,a.a * 10 AS Price
,CONCAT(a.a, N' ', b.a, N' ', c.a, N' ', d.a, N' ', e.a, N' ', f.a, N' ', g.a, N' ', h.a) AS ProductName
INTO Table_with_5M_rows
FROM a, a AS b, a AS c, a AS d, a AS e, a AS f, a AS g, a AS h;
```

Connect to the database using sqlcmd and run the SQL script to create the table with 5 million rows. This may take a few minutes to run.

```terminal
  sqlcmd -S 127.0.0.1 -U sa -P your_password -d SampleDB -i ./CreateSampleTable.sql
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

var server = "localhost"
var port = 1433
var user = "sa"
var password = "your_password"
var database = "SampleDB"

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
    err = db.QueryRowContext(ctx, "SELECT SUM(Price) as sum FROM Table_with_5M_rows").Scan(&result)
    if err != nil {
        log.Fatal("Error executing query: " + err.Error())
    }

    fmt.Printf("Sum: %s\n", result)
}

func main() {
    // Connect to database
    connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s;",
                                server, user, password, port, database)
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

Run your Go app from the terminal.

```terminal
  go run columnstore.go
```

```results
Connected!
Start time: 2017-06-05 16:33:50.0340976 -0700 PDT
Sum: 50000000
The query took: 601.7463ms
```

## Step 3.4 Add a columnstore index to your table using SQLCMD.

Run this command to create a Columnstore Index on your table:

```terminal
sqlcmd -S localhost -U sa -P your_password -d SampleDB -Q "CREATE CLUSTERED COLUMNSTORE INDEX Columnstoreindex ON Table_with_5M_rows;"
```

## Step 3.5 Re-run the columnstore.go script and notice how long the query took to complete this time.

```terminal
  go run columnstore.go
```

```results
Connected!
Start time: 2017-06-05 16:35:02.5409285 -0700 PDT
Sum: 50000000
The query took: 86.9826ms
```

> Congratulations! You just made your Go app faster using Columnstore Indexes!
