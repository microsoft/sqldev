---
layout: page-steps
language: PHP
title: Windows
permalink: /php/windows/az/step/2
---

> In this section you will create a simple PHP app. The PHP app will perform basic Insert, Update, Delete, and Select.

## Step 2.1 Get Connection Information to use in Connection Strings, and Create a Firewall Rule

{% include partials/get_azure_sql_connection_info.md %}

## Step 2.2 Install the PHP Drivers for Azure SQL DB

If you have used the [**Web Platform Installer**](https://www.microsoft.com/web/downloads/platform.aspx) in Step 1 to install the Microsoft PHP Drivers for SQL Server, you can skip this step. Otherwise, download the drivers from the [download page](https://aka.ms/downloadmsphpsql).

For example, if you have downloaded **'PHP 8.0.0 (x64)'** using the Web Platform Installer, select **php_pdo_sqlsrv_80_nts.dll** for the **PDO_SQLSRV Driver** and/or **php_sqlsrv_80_nts.dll** for the **SQLSRV driver**. Copy the dll file(s) to the **C:\Program Files\PHP\v8.0\ext** folder.

Enable Microsoft PHP Drivers for SQL Server by modifying the **php.ini** file. First, navigate to **C:\Program Files\PHP\v8.0**. If you do not find the **php.ini** file, make a copy of either **php.ini-development** or **php.ini-production** (depending on whether your system is a development environment or production environment) and rename it **php.ini**.

```terminal
    cd "C:\Program Files\PHP\v8.0"
    echo extension=php_sqlsrv_80_nts.dll >> php.ini
    echo extension=php_pdo_sqlsrv_80_nts.dll >> php.ini
```

> You do not have to enable both extensions in php.ini if you're planning to use either SQLSRV driver or PDO_SQLSRV driver.

## Step 2.3 Create a PHP app that connects to Azure SQL DB and executes queries

```terminal
mkdir AzureSqlSample
cd AzureSqlSample
```

Using your favorite text editor, create a new file called connect.php in the AzureSqlSample folder. Paste the code below inside into the new file.

```php
<?php
    $serverName = "your_server.database.windows.net";
    $connectionOptions = array(
        "Database" => "your_database",
        "Uid" => "your_user",
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
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -Q "CREATE SCHEMA TestSchema;"
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -Q "CREATE TABLE TestSchema.Employees (Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY, Name NVARCHAR(50), Location NVARCHAR(50));"
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -Q "INSERT INTO TestSchema.Employees (Name, Location) VALUES (N'Jared', N'Australia'), (N'Nikita', N'India'), (N'Tom', N'Germany');"
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -Q "SELECT * FROM TestSchema.Employees;"
```

Using your favorite text editor, create a new file called crud.php in the SqlServerSample folder. Paste the code below inside into the new file. This will insert, update, delete, and read a few rows. 

```php
<?php
 $serverName = "your_server.database.windows.net";
    $connectionOptions = array(
        "Database" => "your_database",
        "Uid" => "your_user",
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

> Congratulations! You have created your first PHP app with Azure SQL DB! Check out the next section to learn about how you can make your PHP faster with Azure SQL DB's Columnstore feature.
