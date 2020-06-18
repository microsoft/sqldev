
> In this section you will create a simple PHP app. The PHP app will perform basic Insert, Update, Delete, and Select.

## Step 2.1 Get Connection Information to use in Connection Strings, and Create a Firewall Rule.

{% include partials/get_azure_sql_connection_info.md %}

## Step 2.2 Install the PHP Driver for SQL Server

> If you get an error message saying `Connection to 'pecl.php.net:443' failed: Unable to find the socket transport "ssl"`, edit the pecl script at /usr/bin/pecl and remove the `-n` switch in the last line. This switch prevents PECL from loading ini files when PHP is called, which prevents the OpenSSL extension from loading.

```terminal
sudo pecl install sqlsrv
sudo pecl install pdo_sqlsrv
sudo su
echo extension=pdo_sqlsrv.so >> `php --ini | grep "Scan for additional .ini files" | sed -e "s|.*:\s*||"`/pdo_sqlsrv.ini
echo extension=sqlsrv.so >> `php --ini | grep "Scan for additional .ini files" | sed -e "s|.*:\s*||"`/sqlsrv.ini
exit
```

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

Using your favorite text editor, create a new file called crud.php in the AzureSqlSample folder. Paste the code below inside into the new file. This will insert, update, delete, and read a few rows.

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

> Congratulations! You have created your first PHP app with Azure SQL! Check out the next section to learn about how you can make your PHP faster with Azure SQL DB's Columnstore feature.
