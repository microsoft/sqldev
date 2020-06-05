{% include partials/step3/az-title.md %}

## Step 3.1 Create a new table with 3 million rows using sqlcmd

```terminal
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -t 60000 -Q "WITH a AS (SELECT * FROM (VALUES(1),(2),(3),(4),(5),(6),(7),(8),(9),(10)) AS a(a))
SELECT TOP(3000000)
ROW_NUMBER() OVER (ORDER BY a.a) AS OrderItemId
,a.a + b.a + c.a + d.a + e.a + f.a + g.a + h.a AS OrderId
,a.a * 10 AS Price
,CONCAT(a.a, N' ', b.a, N' ', c.a, N' ', d.a, N' ', e.a, N' ', f.a, N' ', g.a, N' ', h.a) AS ProductName
INTO Table_with_3M_rows
FROM a, a AS b, a AS c, a AS d, a AS e, a AS f, a AS g, a AS h;"
```

## Step 3.2 Create a PHP app that queries this tables and measures the time taken

```terminal
cd ~/
mkdir AzureSqlColumnstoreSample
cd AzureSqlColumnstoreSample
```

Using your favorite text editor, create a new file called columnstore.php in the AzureSqlColumnstoreSample folder. Paste the following code inside it.

```php
<?php
$time_start = microtime(true);

$serverName = "your_server.database.windows.net";
$connectionOptions = array(
    "Database" => "your_database",
    "Uid" => "your_user",
    "PWD" => "your_password"
);
//Establishes the connection
$conn = sqlsrv_connect($serverName, $connectionOptions);

//Read Query
$tsql= "SELECT SUM(Price) as sum FROM Table_with_3M_rows";
$getResults= sqlsrv_query($conn, $tsql);
echo ("Sum: ");
if ($getResults == FALSE)
    die(FormatErrors(sqlsrv_errors()));
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    echo ($row['sum'] . PHP_EOL);

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
$time_end = microtime(true);
$execution_time = round((($time_end - $time_start)*1000),2);
echo 'QueryTime: '.$execution_time.' ms';

?>
```

## Step 3.3 Measure how long it takes to run the query

Run your PHP script from the terminal.

```terminal
php columnstore.php
```

```results
Sum: 30000000
QueryTime: 1404.74 ms
```

## Step 3.4 Add a columnstore index to your table

```terminal
sqlcmd -S your_server.database.windows.net -U your_user -P your_password -d your_database -Q "CREATE CLUSTERED COLUMNSTORE INDEX Columnstoreindex ON Table_with_3M_rows;"
```

## Step 3.5 Measure how long it takes to run the query with a columnstore index

```terminal
php columnstore.php
```

```results
Sum: 30000000
QueryTime: 488.99 ms
```

> Congratulations! You just made your PHP app faster using Columnstore Indexes!
