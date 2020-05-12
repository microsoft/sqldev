---
layout: page-steps
language: Node.js
title: Windows
permalink: /node/windows/az/step/2
---

> In this section you will create two simple Node.js apps. One of them will perform basic Insert, Update, Delete, and Select, while the second one will make use of Sequelize, one of the most popular Node.js Object-relational mappers, to execute the same operations.

## Step 2.1 Get Connection Information to use in Connection Strings, and Create a Firewall Rule.

{% include partials/get_azure_sql_connection_info.md %}

## Step 2.2 Create a Node.js app that connects to Azure SQL and executes queries

Create a new project directory and initialize Node dependencies.

```terminal
    cd ~/
    mkdir AzureSqlSample
    cd AzureSqlSample
    npm init -y
    #Install tedious and async module in your project folder
    npm install tedious
    npm install async
```


Now you will create a simple Node.js app that connects to Azure SQL.

Using your favorite editor, create a file named connect.js in the AzureSqlSample folder. Copy and paste the below contents into the file.

```javascript
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    // Create connection to database
    var config = {
      server: 'your_server.database.windows.net',
      authentication: {
          type: 'default',
          options: {
              userName: 'your_user', // update me
              password: 'your_password' // update me
          }
      },
      options: {
          database: 'your_database',
	  trustServerCertificate: true
      }
    }
    var connection = new Connection(config);
    connection.connect();

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

Using your favorite text editor, create a file called CreateTestData.sql in the AzureSqlSample folder. Copy and paste the following the T-SQL code inside it. This will create a schema, table, and insert a few rows.

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
  sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -i ./CreateTestData.sql
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

Using your favorite text editor, create a new file called crud.js in the AzureSqlSample folder. Copy and paste the following code inside it. This will insert, update, delete, and read a few rows.

```javascript
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');

// Create connection to database
var config = {
   server: 'your_server.database.windows.net',
	authentication: {
		type: 'default',
		options: {
			userName: 'your_user',
			password: 'your_password'
		}
	},
	options: {
		database: 'your_database',
		trustServerCertificate: true
	}
}
var connection = new Connection(config);
connection.connect();

function Start(callback) {
    console.log('Starting...');
    callback(null, 'Jake', 'United States');
}

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
}

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
}

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
}

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
    var result = ""; 
    request.on('row', function(columns) {
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

function Complete(err, result) {
    if (err) {
        callback(err);
    } else {
        console.log("Done!");
    }
}

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');

    // Execute all functions in the array serially
    async.waterfall([
        Start,
        Insert,
        Update,
        Delete,
        Read
    ], Complete)
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

## Step 2.3 Create a Node.js app that connects to Azure SQL using the popular Sequelize ORM

Create the app directory and initialize Node dependencies.

```terminal
    cd ~/
    mkdir AzureSqlSequelizeSample
    cd AzureSqlSequelizeSample
    npm init -y
    #Install tedious and Sequelize module in your project folder
    npm install tedious
    npm install sequelize
```

a. Open your favourite text editor and create the file orm.js in the directory AzreSqlSequelizeSample. 
b. Paste the contents below into orm.js 
c. Update the connection information to point to your server and database. 
d. Save and close orm.js

```javascript
    var Sequelize = require('sequelize');
    var userName = 'your_user';     			// update me
    var password = 'your_password'; 			// update me
    var hostName = 'your_server.database.windows.net';  // update me
    var sampleDbName = 'your_database';  		//update me

    // Initialize Sequelize to connect to sample DB
    var sampleDb = new Sequelize(sampleDbName, userName, password, {
        dialect: 'mssql',
        host: hostName,
        port: 1433, // Default port
        logging: false, // disable logging; default: console.log,
	encrypt: true,

        dialectOptions: {
            requestTimeout: 30000 // timeout = 30 seconds
        }
    });

    // Define the 'User' model
    var User = sampleDb.define('user', {
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING
    });

    // Define the 'Task' model
    var Task = sampleDb.define('task', {
        title: Sequelize.STRING,
        dueDate: Sequelize.DATE,
        isComplete: Sequelize.BOOLEAN
    });

    // Model a 1:Many relationship between User and Task
    User.hasMany(Task);

    console.log('**Node CRUD sample with Sequelize and MSSQL **');

    // Tell Sequelize to DROP and CREATE tables and relationships in the database
    sampleDb.sync({force: true})
    .then(function() {
        console.log('\nCreated database schema from model.');

        // Create demo: Create a User instance and save it to the database
        User.create({firstName: 'Anna', lastName: 'Shrestinian'})
        .then(function(user) {
            console.log('\nCreated User:', user.get({ plain: true}));

            // Create demo: Create a Task instance and save it to the database
            Task.create({
                title: 'Ship Helsinki', dueDate: new Date(2017,04,01), isComplete: false
            })
            .then(function(task) {
                console.log('\nCreated Task:', task.get({ plain: true}));

                // Association demo: Assign task to user
                user.setTasks([task])
                .then(function() {
                    console.log('\nAssigned task \''
                + task.title
                + '\' to user ' + user.firstName
                + ' ' + user.lastName);

                    // Read demo: find incomplete tasks assigned to user 'Anna''
                    User.findAll({
                        where: { firstName: 'Anna'},
                        include: [{
                            model: Task,
                            where: { isComplete: false }
                        }]
                    })
                    .then(function(users) {
                        console.log('\nIncomplete tasks assigned to Anna:\n',
                    JSON.stringify(users));

                        // Update demo: change the 'dueDate' of a task
                        Task.findByPk(1).then(function(task) {
                            console.log('\nUpdating task:',
                    task.title + ' ' + task.dueDate);
                            task.update({
                                dueDate: new Date(2016,06,30)
                            })
                            .then(function() {
                                console.log('dueDate changed:',
                        task.title + ' ' + task.dueDate);

                                // Delete demo: delete all tasks with a dueDate in 2016
                                console.log('\nDeleting all tasks with with a dueDate in 2016');
                                Task.destroy({
                                    where: { dueDate: {[Sequelize.Op.lte]: new Date(2016,12,31)}},
                                }).then(function() {  // delete this line and the below, and corresponding closing braces and see what happens.
                                	Task.findAll()
					.then(function(tasks) {
                                        console.log('Tasks in database after delete:',
                            JSON.stringify(tasks));
                                        console.log('\nAll done!');
				    })
                           
                                })
                            })
                        })
                    })
                })
            })
        })
    })
```

Run the orm.js app

```terminal
    node orm.js
```

```results
**Node CRUD sample with Sequelize and MSSQL **

Created database schema from model.

Created User: {
  id: 1,
  firstName: 'Anna',
  lastName: 'Shrestinian',
  updatedAt: 2020-05-12T16:16:34.907Z,
  createdAt: 2020-05-12T16:16:34.907Z
}

Created Task: {
  id: 1,
  title: 'Ship Helsinki',
  dueDate: 2017-05-01T07:00:00.000Z,
  isComplete: false,
  updatedAt: 2020-05-12T16:16:35.017Z,
  createdAt: 2020-05-12T16:16:35.017Z
}

Assigned task 'Ship Helsinki' to user Anna Shrestinian

Incomplete tasks assigned to Anna:
 [{"id":1,"firstName":"Anna","lastName":"Shrestinian","createdAt":"2020-05-12T16:16:34.907Z","updatedAt":"2020-05-12T16:16:34.907Z","tasks":[{"id":1,"title":"Ship Helsinki","dueDate":"2017-05-01T07:00:00.000Z","isComplete":false,"createdAt":"2020-05-12T16:16:35.017Z","updatedAt":"2020-05-12T16:16:35.193Z","userId":1}]}]

Updating task: Ship Helsinki Mon May 01 2017 00:00:00 GMT-0700 (Pacific Daylight Time)
dueDate changed: Ship Helsinki Sat Jul 30 2016 00:00:00 GMT-0700 (Pacific Daylight Time)

Deleting all tasks with with a dueDate in 2016
Tasks in database after delete: []

All done!
```

> Congratulations! You created your first two Node.js apps with Azure SQL! Check out the next section to learn about how you can make your Node.js apps faster with Azure SQL’s Columnstore feature.
