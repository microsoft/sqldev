
> In this section you will create two simple Node.js apps. One of them will perform basic Insert, Update, Delete, and Select, while the second one will make use of Sequelize, one of the most popular Node.js Object-relational mappers, to execute the same operations.

## Create a Node.js app that connects to SQL Server and executes queries

Create a new project directory and initialize Node dependencies.

```terminal
    cd ~/
    mkdir SqlServerSample
    cd SqlServerSample
    npm init -y
    #Install tedious and async module in your project folder
    npm install tedious
    npm install async
```

Create a database that will be used for the rest of this tutorial by connecting to SQL Server using sqlcmd and executing the following statement.

```terminal
    sqlcmd -S localhost -U sa -P your_password -Q "CREATE DATABASE SampleDB;"
```

Now you will create a simple Node.js app that connects to SQL Server.

Using your favorite editor, create a file named connect.js in the SqlServerSample folder. Copy and paste the below contents into the file.

```node
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    // Create connection to database
    var config = {
      userName: 'sa', // update me
      password: 'your_password', // update me
      server: 'localhost',
      options: {
          database: 'SampleDB'
      }
    }
    var connection = new Connection(config);

    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Connected');
      }
    });
```

Run the application.

```terminal
  node connect.js
```

```results
  Connected
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
  sqlcmd -S localhost -U sa -P your_password -d SampleDB -i ./CreateTestData.sql
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

Using your favorite text editor, create a new file called crud.js in the SqlServerSample folder. Copy and paste the following code inside it. This will insert, update, delete, and read a few rows.

```node
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');

// Create connection to database
var config = {
  userName: 'sa', // update me
  password: 'your_password', // update me
  server: 'localhost',
  options: {
    database: 'SampleDB'
  }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');

    // Execute all functions in the array serially
    async.waterfall([
      function Start(callback) {
        console.log('Starting...');
        callback(null, 'Jake', 'United States');
      },
      function Insert(name, location, callback) {
        console.log("Inserting '" + name + "' into Table...");

        request = new Request(
          'INSERT INTO TestSchema.Employees (Name, Location) OUTPUT INSERTED.Id VALUES (@Name, @Location);',
          function(err, rowCount, rows) {
            if (err) {
              callback(err);
            } else {
              console.log(rowCount + ' row(s) inserted');
              callback(null, 'Nikita', 'United States');
            }
          });
        request.addParameter('Name', TYPES.NVarChar, name);
        request.addParameter('Location', TYPES.NVarChar, location);

        // Execute SQL statement
        connection.execSql(request);
      },
      function Update(name, location, callback) {
        console.log("Updating Location to '" + location + "' for '" + name + "'...");

        // Update the employee record requested
        request = new Request(
          'UPDATE TestSchema.Employees SET Location=@Location WHERE Name = @Name;',
          function(err, rowCount, rows) {
            if (err) {
              callback(err);
            } else {
              console.log(rowCount + ' row(s) updated');
              callback(null, 'Jared');
            }
          });
        request.addParameter('Name', TYPES.NVarChar, name);
        request.addParameter('Location', TYPES.NVarChar, location);

        // Execute SQL statement
        connection.execSql(request);
      },
      function Delete(name, callback) {
        console.log("Deleting '" + name + "' from Table...");

        // Delete the employee record requested
        request = new Request(
          'DELETE FROM TestSchema.Employees WHERE Name = @Name;',
          function(err, rowCount, rows) {
            if (err) {
              callback(err);
            } else {
              console.log(rowCount + ' row(s) deleted');
              callback(null);
            }
          });
        request.addParameter('Name', TYPES.NVarChar, name);

        // Execute SQL statement
        connection.execSql(request);
      },
      function Read(callback) {
        console.log('Reading rows from the Table...');

        // Read all rows from table
        request = new Request(
        'SELECT Id, Name, Location FROM TestSchema.Employees;',
        function(err, rowCount, rows) {
          if (err) {
            callback(err);
          } else {
            console.log(rowCount + ' row(s) returned');
            callback(null);
          }
        });

        // Print the rows read
        var result = ""; request.on('row', function(columns) {
          columns.forEach(function(column) {
            if (column.value === null) {
              console.log('NULL');
            } else {
              result += column.value + " ";
            }
          });
          console.log(result);
          result = "";
        });

        // Execute SQL statement
        connection.execSql(request);
      }
    ],
    function Complete(err, result) {
      if (err) {
        callback(err);
      } else {
        console.log("Done!");
      }
    }
                   )
  }
});
```

Run the crud.js app to see the results

```terminal
  node crud.js
```

```results
Connected
Starting...
Inserting 'Jake' into Table...
1 row(s) inserted
Updating Location to 'United States' for 'Nikita'...
1 row(s) updated
Deleting 'Jared' from Table...
1 row(s) deleted
Reading rows from the Table...
2 Nikita United States
3 Tom Germany
4 Jake United States
3 row(s) returned
Done!
```

## Step 2.2 Create a database for your application 

Create the database using sqlcmd

```terminal
sqlcmd -S localhost -U sa -P your_password -Q "CREATE DATABASE SampleDB;"
```

## Step 2.3 Create a PHP app that connects to SQL Server and executes queries

```terminal
mkdir SqlServerSample
cd SqlServerSample
```

Using your favorite text editor, create a new file called connect.php in the SqlServerSample folder. Paste the code below inside into the new file.

```php
<?php
    $serverName = "localhost";
    $connectionOptions = array(
        "Database" => "SampleDB",
        "Uid" => "sa",
        "PWD" => "your_password"
    );
    //Establishes the connection
    $conn = sqlsrv_connect($serverName, $connectionOptions);
    if($conn)
        echo "Connected!"
?>
```

Run your PHP script from the terminal.

```terminal
php connect.php
```

```results
Connected!
```

Execute the T-SQL scripts below in the terminal with sqlcmd to create a schema, table, and insert a few rows.

```terminal
sqlcmd -S localhost -U sa -P your_password -d SampleDB -Q "CREATE SCHEMA TestSchema;"
sqlcmd -S localhost -U sa -P your_password -d SampleDB -Q "CREATE TABLE TestSchema.Employees (Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY, Name NVARCHAR(50), Location NVARCHAR(50));"
sqlcmd -S localhost -U sa -P your_password -d SampleDB -Q "INSERT INTO TestSchema.Employees (Name, Location) VALUES (N'Jared', N'Australia'), (N'Nikita', N'India'), (N'Tom', N'Germany');"
sqlcmd -S localhost -U sa -P your_password -d SampleDB -Q "SELECT * FROM TestSchema.Employees;"
```

Using your favorite text editor, create a new file called crud.php in the SqlServerSample folder. Paste the code below inside into the new file. This will insert, update, delete, and read a few rows. 

```php
<?php
$serverName = "localhost";
$connectionOptions = array(
    "Database" => "SampleDB",
    "Uid" => "sa",
    "PWD" => "your_password"
);
//Establishes the connection
$conn = sqlsrv_connect($serverName, $connectionOptions);

//Insert Query
echo ("Inserting a new row into table" . PHP_EOL);
$tsql= "INSERT INTO TestSchema.Employees (Name, Location) VALUES (?,?);";
$params = array('Jake','United States');
$getResults= sqlsrv_query($conn, $tsql, $params);
$rowsAffected = sqlsrv_rows_affected($getResults);
if ($getResults == FALSE or $rowsAffected == FALSE)
    die(FormatErrors(sqlsrv_errors()));
echo ($rowsAffected. " row(s) inserted: " . PHP_EOL);

sqlsrv_free_stmt($getResults);

//Update Query

$userToUpdate = 'Nikita';
$tsql= "UPDATE TestSchema.Employees SET Location = ? WHERE Name = ?";
$params = array('Sweden', $userToUpdate);
echo("Updating Location for user " . $userToUpdate . PHP_EOL);

$getResults= sqlsrv_query($conn, $tsql, $params);
$rowsAffected = sqlsrv_rows_affected($getResults);
if ($getResults == FALSE or $rowsAffected == FALSE)
    die(FormatErrors(sqlsrv_errors()));
echo ($rowsAffected. " row(s) updated: " . PHP_EOL);
sqlsrv_free_stmt($getResults);

//Delete Query
$userToDelete = 'Jared';
$tsql= "DELETE FROM TestSchema.Employees WHERE Name = ?";
$params = array($userToDelete);
$getResults= sqlsrv_query($conn, $tsql, $params);
echo("Deleting user " . $userToDelete . PHP_EOL);
$rowsAffected = sqlsrv_rows_affected($getResults);
if ($getResults == FALSE or $rowsAffected == FALSE)
    die(FormatErrors(sqlsrv_errors()));
echo ($rowsAffected. " row(s) deleted: " . PHP_EOL);
sqlsrv_free_stmt($getResults);


//Read Query
$tsql= "SELECT Id, Name, Location FROM TestSchema.Employees;";
$getResults= sqlsrv_query($conn, $tsql);
echo ("Reading data from table" . PHP_EOL);
if ($getResults == FALSE)
    die(FormatErrors(sqlsrv_errors()));
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    echo ($row['Id'] . " " . $row['Name'] . " " . $row['Location'] . PHP_EOL);

}
sqlsrv_free_stmt($getResults);

function FormatErrors( $errors )
{
    /* Display errors. */
    echo "Error information: ";

    foreach ( $errors as $error )
    {
        echo "SQLSTATE: ".$error['SQLSTATE']."";
        echo "Code: ".$error['code']."";
        echo "Message: ".$error['message']."";
    }
}
?>
```
Run your PHP script from the terminal.

```terminal
php crud.php
```

```results
Inserting a new row into table
1 row(s) inserted:
Updating Location for user Nikita
1 row(s) updated:
Deleting user Jared
1 row(s) deleted:
Reading data from table
2 Nikita Sweden
3 Tom Germany
4 Jake United States
```


> Congrats you created your first PHP app with SQL Server! Check out the next section to learn about how you can make your PHP faster with SQL Server's Columnstore feature.
