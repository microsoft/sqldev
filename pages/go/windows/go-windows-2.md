---
layout: page-steps
language: GO
title: Windows
permalink: /go/windows/server/step/2
---

> After getting SQL Server and GoLang installed, you can now proceed to create your new Go projects. Here we will explore three simple applications. One of them will connect and print the SQL Server version of your database server, the other one will perform basic Insert, Update, Delete, and Select operations, and the third one will make use of [GORM](https://github.com/jinzhu/gorm), a popular object relational mapping (ORM) framework for Go to execute the same operations.

## Create a Go app that connects to SQL Server and executes queries

Create a new project directory and install Go dependencies.

```terminal
    cd \

    #Create Project Directory
    md SqlServerSample
    cd SqlServerSample

    # Get the SQL Server driver for Go
    go get github.com/denisenkom/go-mssqldb
```

Create a database that will be used for the rest of this tutorial by connecting to SQL Server using sqlcmd and executing the following command. Don't forget to update the username and password with your own.

```terminal
    sqlcmd -S 127.0.0.1 -U sa -P your_password -Q "CREATE DATABASE SampleDB;"
```

Now you will create a simple Go app that connects to SQL Server.

Using [your favorite text editor](https://code.visualstudio.com/), create a file named connect.go in the SqlServerSample folder. Copy and paste the below contents into the file. Don't forget to update the username and password with your own.

This sample uses the GoLang Context methods to ensure that there's an active connection to the database server.

```go
package main

import (
    _ "github.com/denisenkom/go-mssqldb"
    "database/sql"
    "context"
    "log"
    "fmt"
)

// Replace with your own connection parameters
var server = "localhost"
var port = 1433
var user = "sa"
var password = "your_password"

var db *sql.DB

func main() {
    var err error

    // Create connection string
    connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d",
        server, user, password, port)

    // Create connection pool
    db, err = sql.Open("sqlserver", connString)
    if err != nil {
        log.Fatal("Error creating connection pool: " + err.Error())
    }
    log.Printf("Connected!\n")

    // Close the database connection pool after program executes
    defer db.Close()

    SelectVersion()
}

// Gets and prints SQL Server version
func SelectVersion(){
    // Use background context
    ctx := context.Background()

    // Ping database to see if it's still alive.
    // Important for handling network issues and long queries.
    err := db.PingContext(ctx)
    if err != nil {
        log.Fatal("Error pinging database: " + err.Error())
    }

    var result string

    // Run query and scan for result
    err = db.QueryRowContext(ctx, "SELECT @@version").Scan(&result)
    if err != nil {
        log.Fatal("Scan failed:", err.Error())
    }
    fmt.Printf("%s\n", result)
}
```

Run the application.

```terminal
go run connect.go
```

```results
Connected!
Microsoft SQL Server 2017 (CTP2.1) - 14.0.600.250 (X64)
        May 10 2017 12:21:23
        Copyright (C) 2017 Microsoft Corporation. All rights reserved.
        Developer Edition (64-bit) on Linux (Ubuntu 16.04.2 LTS)
```

Using your favorite text editor, create a file called CreateTestData.sql in the SqlServerSample folder. Copy and paste the following the T-SQL code inside it. This will create a schema, table, and insert a few rows.

```sql
CREATE SCHEMA TestSchema;
GO

CREATE TABLE TestSchema.Employees (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(50),
  Location NVARCHAR(50)
);
GO

INSERT INTO TestSchema.Employees (Name, Location) VALUES
(N'Jared', N'Australia'),
(N'Nikita', N'India'),
(N'Tom', N'Germany');
GO

SELECT * FROM TestSchema.Employees;
GO
```

Connect to the database using sqlcmd and run the SQL script to create the schema, table, and insert some rows.

```terminal
sqlcmd -S 127.0.0.1 -U sa -P your_password -d SampleDB -i ./CreateTestData.sql
```

```results
CREATE SCHEMA TestSchema;

Executed in 0 ms
CREATE TABLE TestSchema.Employees (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(50),
  Location NVARCHAR(50)
);

Executed in 0 ms
INSERT INTO TestSchema.Employees (Name, Location) VALUES
(N'Jared', N'Australia'),
(N'Nikita', N'India'),
(N'Tom', N'Germany');

Executed in 0 ms
SELECT * FROM TestSchema.Employees;
Id  Name    Location
--  ------  ---------
1   Jared   Australia
2   Nikita  India
3   Tom     Germany

3 row(s) returned

Executed in 1 ms
```

Using your favorite text editor, create a new file called crud.go in the SqlServerSample folder. Copy and paste the following code inside it. This will insert, update, delete, and read a few rows.

```go
package main

import (
    _ "github.com/denisenkom/go-mssqldb"
    "database/sql"
    "context"
    "log"
    "fmt"
)

var db *sql.DB

var server = "localhost"
var port = 1433
var user = "sa"
var password = "your_password"
var database = "SampleDB"

func main() {
    // Build connection string
    connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s;",
        server, user, password, port, database)

    var err error

    // Create connection pool
    db, err = sql.Open("sqlserver", connString)
    if err != nil {
        log.Fatal("Error creating connection pool:", err.Error())
    }
    fmt.Printf("Connected!\n")

    // Create employee
    createId, err := CreateEmployee("Jake", "United States")
    fmt.Printf("Inserted ID: %d successfully.\n", createId)

    // Read employees
    count, err := ReadEmployees()
    fmt.Printf("Read %d rows successfully.\n", count)

    // Update from database
    updateId, err := UpdateEmployee("Jake", "Poland")
    fmt.Printf("Updated row with ID: %d successfully.\n", updateId)

    // Delete from database
    rows, err := DeleteEmployee("Jake")
    fmt.Printf("Deleted %d rows successfully.\n", rows)
}

func CreateEmployee(name string, location string) (int64, error) {
    ctx := context.Background()
    var err error

    if db == nil {
        log.Fatal("What?")
    }

    // Check if database is alive.
    err = db.PingContext(ctx)
    if err != nil {
        log.Fatal("Error pinging database: " + err.Error())
    }

    tsql := fmt.Sprintf("INSERT INTO TestSchema.Employees (Name, Location) VALUES ('%s','%s');",
        name, location)

    // Execute non-query
    result, err := db.ExecContext(ctx, tsql)
    if err != nil {
        log.Fatal("Error inserting new row: " + err.Error())
        return -1, err
    }

    return result.LastInsertId()
}

func ReadEmployees() (int, error) {
    ctx := context.Background()

    // Check if database is alive.
    err := db.PingContext(ctx)
    if err != nil {
        log.Fatal("Error pinging database: " + err.Error())
    }

    tsql := fmt.Sprintf("SELECT Id, Name, Location FROM TestSchema.Employees;")

    // Execute query
    rows, err := db.QueryContext(ctx, tsql)
    if err != nil {
        log.Fatal("Error reading rows: " + err.Error())
        return -1, err
    }

    defer rows.Close()

    var count int = 0

    // Iterate through the result set.
    for rows.Next() {
        var name, location string
        var id int

        // Get values from row.
        err := rows.Scan(&id, &name, &location)
        if err != nil {
            log.Fatal("Error reading rows: " + err.Error())
            return -1, err
        }

        fmt.Printf("ID: %d, Name: %s, Location: %s\n", id, name, location)
        count++
    }

    return count, nil
}

// Update an employee's information
func UpdateEmployee(name string, location string) (int64, error) {
    ctx := context.Background()

    // Check if database is alive.
    err := db.PingContext(ctx)
    if err != nil {
        log.Fatal("Error pinging database: " + err.Error())
    }

    tsql := fmt.Sprintf("UPDATE TestSchema.Employees SET Location = @Location WHERE Name= @Name")

    // Execute non-query with named parameters
    result, err := db.ExecContext(
        ctx,
        tsql,
        sql.Named("Location", location),
        sql.Named("Name", name))
    if err != nil {
        log.Fatal("Error updating row: " + err.Error())
        return -1, err
    }

    return result.LastInsertId()
}

// Delete an employee from database
func DeleteEmployee(name string) (int64, error) {
    ctx := context.Background()

    // Check if database is alive.
    err := db.PingContext(ctx)
    if err != nil {
        log.Fatal("Error pinging database: " + err.Error())
    }

    tsql := fmt.Sprintf("DELETE FROM TestSchema.Employees WHERE Name=@Name;")

    // Execute non-query with named parameters
    result, err := db.ExecContext(ctx, tsql, sql.Named("Name", name))
    if err != nil {
        fmt.Println("Error deleting row: " + err.Error())
        return -1, err
    }

    return result.RowsAffected()
}
```

Run the crud.go app to see the results

```terminal
go run crud.go
```

```results
Connected!
Inserted ID: 4 successfully.
ID: 1, Name: Jared, Location: Australia
ID: 2, Name: Nikita, Location: India
ID: 3, Name: Tom, Location: Germany
ID: 4, Name: Jake, Location: United States
Read 4 rows successfully.
Updated row with ID: 4 successfully.
Deleted 1 rows successfully.
```

## Step 2.2 Create a Go app that connects to SQL Server using the popular GORM

Create the app directory and initialize Go dependencies.

```terminal
    cd \
    md SqlServerGormSample
    cd SqlServerGormSample

    # Get the SQL Server driver for Go
    go get github.com/denisenkom/go-mssqldb

   # Get GORM
   go get github.com/jinzhu/gorm
```

Paste the contents below into a file called `orm.go`. Make sure to replace the password variable to your own.

```go
    package main

    import (
        "fmt"
        "github.com/jinzhu/gorm"
        _ "github.com/jinzhu/gorm/dialects/mssql"
        "log"
    )

    var server = "localhost"
    var port = 1433
    var user = "sa"
    var password = "your_password"
    var database = "SampleDB"

    // Define a User model struct
    type User struct {
        gorm.Model
        FirstName string
        LastName string
    }

    // Define a Task model struct
    type Task struct {
        gorm.Model
        Title string
        DueDate string
        IsComplete bool
        UserID  uint
    }

    // Read and print all the tasks
    func ReadAllTasks(db *gorm.DB){
        var users []User
        var tasks []Task
        db.Find(&users)

        for _, user := range users{
            db.Model(&user).Related(&tasks)
            fmt.Printf("%s %s's tasks:\n", user.FirstName, user.LastName)
            for _, task := range tasks {
                fmt.Printf("Title: %s\nDueDate: %s\nIsComplete:%t\n\n",
                                task.Title, task.DueDate, task.IsComplete)
            }
        }
    }

    // Update a task based on a user
    func UpdateSomeonesTask(db *gorm.DB, userId int){
        var task Task
        db.Where("user_id = ?", userId).First(&task).Update("Title", "Buy donuts for Luis")
        fmt.Printf("Title: %s\nDueDate: %s\nIsComplete:%t\n\n",
                        task.Title, task.DueDate, task.IsComplete)
    }

    // Delete all the tasks for a user
    func DeleteSomeonesTasks(db *gorm.DB, userId int){
        db.Where("user_id = ?", userId).Delete(&Task{})
        fmt.Printf("Deleted all tasks for user %d", userId)
    }

    func main() {
        connectionString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s",
                                            server, user, password, port, database)
        db, err := gorm.Open("mssql", connectionString)

        if err != nil {
            log.Fatal("Failed to create connection pool. Error: " + err.Error())
        }
        gorm.DefaultCallback.Create().Remove("mssql:set_identity_insert")
        defer db.Close()

        fmt.Println("Migrating models...")
        db.AutoMigrate(&User{})
        db.AutoMigrate(&Task{})

        // Create awesome Users
        fmt.Println("Creating awesome users...")
        db.Create(&User{FirstName: "Andrea", LastName: "Lam"}) 		//UserID: 1
        db.Create(&User{FirstName: "Meet", LastName: "Bhagdev"}) 	//UserID: 2
        db.Create(&User{FirstName: "Luis", LastName: "Bosquez"})	//UserID: 3

        // Create appropriate Tasks for each user
        fmt.Println("Creating new appropriate tasks...")
        db.Create(&Task{
            Title: "Do laundry", DueDate: "2017-03-30", IsComplete: false, UserID: 1})
        db.Create(&Task{
            Title: "Mow the lawn", DueDate: "2017-03-30", IsComplete: false, UserID: 2})
        db.Create(&Task{
            Title: "Do more laundry", DueDate: "2017-03-30", IsComplete: false, UserID: 3})
        db.Create(&Task{
            Title: "Watch TV", DueDate: "2017-03-30", IsComplete: false, UserID: 3})

        // Read
        fmt.Println("\nReading all the tasks...")
        ReadAllTasks(db)

        // Update - update Task title to something more appropriate
        fmt.Println("Updating Andrea's task...")
        UpdateSomeonesTask(db, 1)

        // Delete - delete Luis's task
        DeleteSomeonesTasks(db, 3)
    }
```

Run the orm.go app

```terminal
    go run orm.go
```

```results
[info] removing callback `mssql:set_identity_insert` from C:/Projects/golang-experiments/tutorials/orm.go:70
Migrating models...
Creating awesome users...
Creating new appropriate tasks...

Reading all the tasks...
Andrea Lam's tasks:
Title: Do laundry
DueDate: 2017-03-30
IsComplete:false

Meet Bhagdev's tasks:
Title: Mow the lawn
DueDate: 2017-03-30
IsComplete:false

Luis Bosquez's tasks:
Title: Do more laundry
DueDate: 2017-03-30
IsComplete:false

Title: Watch TV
DueDate: 2017-03-30
IsComplete:false

Updating Andrea's task...
Title: Buy donuts for Luis
DueDate: 2017-03-30
IsComplete:false

Deleted all tasks for user 3
```

> Congratulations! You created your first three Go apps with SQL Server! Check out the next section to learn about how you can make your apps faster with SQL Server’s Columnstore feature.
