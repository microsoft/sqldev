{% include partials/step3/title.md %}

## Step 3.1 Create a Ruby app to demonstrate Columnstore indexes

Create a new directory for your project and install [TinyTDS](https://github.com/rails-sqlserver/tiny_tds).

```terminal
mkdir SqlServerColumnstoreSample
cd SqlServerSample
gem install tiny_tds
```

Using your favorite text editor, create a file called **columnstore.rb** in the SqlServerColumnstoreSample folder. Copy and paste the below code inside it. Save and close the file.

```ruby
require 'tiny_tds'
@client = TinyTds::Client.new username: 'sa', password: 'your_password',
    host: 'localhost', port: 1433, timeout: 60

# Calculate time difference in milliseconds
def time_diff_milli(start, finish)
   ((finish - start) * 1000).floor
end

def execute(sql)
    @client.execute(sql).do
    true
end

# Create database
puts "Dropping and creating database 'SampleDB'"
execute("DROP DATABASE IF EXISTS [SampleDB]; CREATE DATABASE [SampleDB];")

# Insert 5 million rows into the table 'Table_with_5M_rows'
puts "Inserting 5 million rows into table 'Table_with_5M_rows'. This takes ~1 minute, please wait."
execute("USE SampleDB; WITH a AS (SELECT * FROM (VALUES(1),(2),(3),(4),(5),(6),(7),(8),(9),(10)) AS a(a))
    SELECT TOP(5000000)
    ROW_NUMBER() OVER (ORDER BY a.a) AS OrderItemId
    ,a.a + b.a + c.a + d.a + e.a + f.a + g.a + h.a AS OrderId
    ,a.a * 10 AS Price
    ,CONCAT(a.a, N' ', b.a, N' ', c.a, N' ', d.a, N' ', e.a, N' ', f.a, N' ', g.a, N' ', h.a) AS ProductName
    INTO Table_with_5M_rows
    FROM a, a AS b, a AS c, a AS d, a AS e, a AS f, a AS g, a AS h;")

# Execute query without columnstore index
t1 = Time.now
execute("SELECT SUM(Price) as sum FROM Table_with_5M_rows")
t2 = Time.now
elapsedTimeWithoutIndex = time_diff_milli t1, t2
puts "Query time without columnstore index: #{elapsedTimeWithoutIndex}ms"

# Create columnnstore index on table 'Table_with_5M_rows'
puts("Adding a columnstore index to table 'Table_with_5M_rows'")
execute("CREATE CLUSTERED COLUMNSTORE INDEX columnstoreindex ON Table_with_5M_rows;")

# Execute the same query with columnstore index
t3 = Time.now
execute("SELECT SUM(Price) as sum FROM Table_with_5M_rows")
t4 = Time.now
elapsedTimeWithIndex = time_diff_milli t3, t4
puts "Query time WITH columnstore index: #{elapsedTimeWithIndex}ms"

# Calculate performance improvement with columnstore index
perf_improvement = (elapsedTimeWithoutIndex / elapsedTimeWithIndex).floor
puts "Performance improvement with columnstore index: #{perf_improvement}x!"

@client.close
```

```results
Dropping and creating database 'SampleDB'
Inserting 5 million rows into table 'Table_with_5M_rows'. This takes ~1 minute, please wait.
Query time without columnstore index: 363ms
Adding a columnstore index to table 'Table_with_5M_rows'
Query time WITH columnstore index: 5ms
Performance improvement with columnstore index: 71x!
```

> Congratulations! You just made your Ruby app faster using Columnstore Indexes!
