
> In this section you will create two simple Ruby apps. One of them will perform basic Insert, Update, Delete, and Select, while the second one will make use of [Ruby on Rails](http://rubyonrails.org/), one of the most popular Ruby frameworks to execute the same operations. to execute the same operations.

## Step 2.1 Get Connection Information to use in Connection Strings, and Create a Firewall Rule.

{% include partials/get_azure_sql_connection_info.md %}


## Step 2.2 Create a Ruby app that connects to Azure SQL and executes queries

Create a new project directory and install [TinyTDS](https://github.com/rails-sqlserver/tiny_tds). TinyTDS is used to connect Ruby applications to Azure SQL DB.

```terminal
cd ~/
mkdir AzureSqlSample
cd AzureSqlSample
gem install tiny_tds
```

Using your favorite editor, create a file named **connect.rb** in the AzureSqlSample folder. Copy and paste the below contents into the file. Don't forget to update the username and password with your own. Save and close the file.

```ruby
    require 'tiny_tds'
@client = TinyTds::Client.new username: 'your_user@your_server', password: 'your_password',
    dataserver: 'your_server.database.windows.net', database: 'your_database', azure: true

puts 'Connecting to Azure SQL'

if @client.active? == true then puts 'Done' end

@client.close
```

Run the Ruby script from the terminal.

```terminal
ruby connect.rb
```

```results
Connecting to Azure SQL DB
Done.
```

Using your favorite text editor, create a new file called **crud.rb** in the AzureSqlSample folder. Copy and paste the following code inside it. This will insert, update, delete, and read a few rows. Don't forget to update the username and password with your own. Save and close the file.

```ruby
require 'tiny_tds'
@client = TinyTds::Client.new username: 'sa', password: 'your_password',
    host: 'localhost', port: 1433
puts 'Connecting to SQL Server'

if @client.active? == true then puts 'Done' end

def execute(sql)
    result = @client.execute(sql)
    result.each
    if result.affected_rows > 0 then puts "#{result.affected_rows} row(s) affected" end
end

# Create database SampleDB
puts "Dropping and creating database 'SampleDB'"
execute("DROP DATABASE IF EXISTS [SampleDB]; CREATE DATABASE [SampleDB];")

# Create sample table with data
puts "Creating sample table with data"
execute("USE SampleDB; CREATE TABLE Employees (Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
  Name NVARCHAR(50), Location NVARCHAR(50))
  INSERT INTO Employees (Name, Location) VALUES (N'Jared', N'Australia'),
  (N'Nikita', N'India'), (N'Tom', N'Germany')")

# Insert new employee
puts "Inserting new employee Jake into Employees table"
execute("INSERT INTO Employees (Name, Location) VALUES (N'Jake', N'United States')")

# Update location for employee
puts "Updating Location for Nikita"
execute("UPDATE Employees SET Location = N'United States' WHERE NAME = N'Nikita'")

# Delete employee
puts "Deleting employee Jared"
execute("DELETE FROM Employees WHERE NAME = N'Jared'")

# Read all employees
puts "Reading data from table"
@client.execute("SELECT * FROM Employees").each do |row|
    puts row
end

puts "All done."

@client.close
```

Run the Ruby script from the terminal.

```terminal
ruby crud.rb
````

```results
Connecting to Azure SQL DB
Done
Creating sample table with data
3 row(s) affected
Inserting new employee Jake into Employees table
1 row(s) affected
Updating Location for Nikita
1 row(s) affected
Deleting employee Jared
1 row(s) affected
Reading data from table
{"Id"=>2, "Name"=>"Nikita", "Location"=>"United States"}
{"Id"=>3, "Name"=>"Tom", "Location"=>"Germany"}
{"Id"=>4, "Name"=>"Jake", "Location"=>"United States"}
All done.
```

> You created your first Ruby + Azure SQL DB app! Check out the next section to create an app using Ruby on Rails!

## Step 2.3 Create a Ruby app that connects to Azure SQL DB using the Active Record ORM 

Create a new project directory and install the gem dependencies required to connect Ruby to Azure SQL DB using the [Active Record ORM](http://guides.rubyonrails.org/active_record_basics.html#active-record-as-an-orm-framework). You'll also need [TinyTDS](https://github.com/rails-sqlserver/tiny_tds) and the [activerecord-sqlserver-adapter](https://github.com/rails-sqlserver/activerecord-sqlserver-adapter). 

```terminal
cd ~/
mkdir AzureSqlActiveRecordSample
cd AzureSqlActiveRecordSample
gem install active_record tiny_tds activerecord-sqlserver-adapter
```

Using your favorite editor, create a file named **activerecordcrud.rb** in the SqlServerSample folder. Copy and paste the below contents into the file. Don't forget to update the username and password with your own. Save and close the file.

```ruby
require 'active_record'
require 'tiny_tds'
require 'activerecord-sqlserver-adapter'
require 'pp'

ActiveRecord::Base.establish_connection(
  :adapter=> "sqlserver",
  :host => "localhost",
  :username => "sa",
  :password => "your_password"
)

#Create new database SampleDB
puts "Drop and create new database 'SampleDB'"
ActiveRecord::Base.connection.drop_database('SampleDB') rescue nil 
ActiveRecord::Base.connection.create_database('SampleDB')
ActiveRecord::Base.connection.use_database('SampleDB')

#Create a new table called Tasks
ActiveRecord::Schema.define do
  create_table :tasks, force: true do |t|
    t.string :taskname
    t.string :user
    t.date :duedate
  end 
end

class Task < ActiveRecord::Base
end

#Create new tasks and users
Task.create!(taskname:'Install SQL Server 2017 on Windows', user:'Andrea', duedate: '2017-07-01')
Task.create!(taskname:'Upgrade from SQL Server 2014 to 2017', user:'Meet', duedate: '2017-07-01')
Task.create!(taskname:'Write new SQL Server content', user:'Luis', duedate: '2017-07-01')
pp "Created new tasks:"
pp Task.all

#Update due date for specific task
task_to_update = Task.where(taskname: 'Install SQL Server 2017 on Windows').where(user: 'Andrea').first
puts "Updating the following task:"
pp task_to_update
task_to_update.update_attribute(:duedate, '2017-07-31')
puts "Due date changed:"
pp task_to_update

#Destroy all tasks for specific user
tasks_to_delete = Task.where(user: 'Meet').first
puts "Deleting all tasks for user:"
pp tasks_to_delete
tasks_to_delete.destroy!

#Read all tasks
puts "Printing all tasks:"
pp Task.all

ActiveRecord::Base.connection.close
```

Run the Ruby script from the terminal.

```terminal
ruby activerecordcrud.rb
```

```results
Drop and create new database 'SampleDB'
-- create_table(:tasks, {:force=>true})
   -> 1.5950s
   -> -1 rows
"Created new tasks:"
[#<Task:0x00005575e3c71b50
  id: 1,
  taskname: "Install SQL Server 2019 on Windows",
  user: "Andrea",
  duedate: Thu, 01 Jul 2021>,
 #<Task:0x00005575e3c71920
  id: 2,
  taskname: "Upgrade from SQL Server 2017 to 2019",
  user: "Meet",
  duedate: Thu, 01 Jul 2021>,
 #<Task:0x00005575e3c717b8
  id: 3,
  taskname: "Write new Azure SQL DB content",
  user: "Luis",
  duedate: Thu, 01 Jul 2021>]
Updating the following task:
#<Task:0x00005575e3c68078
 id: 1,
 taskname: "Install SQL Server 2019 on Windows",
 user: "Andrea",
 duedate: Thu, 01 Jul 2021>
Due date changed:
#<Task:0x00005575e3c68078
 id: 1,
 taskname: "Install SQL Server 2019 on Windows",
 user: "Andrea",
 duedate: Fri, 31 Jul 2020>
Deleting all tasks for user:
#<Task:0x00005575e3c5f8b0
 id: 2,
 taskname: "Upgrade from SQL Server 2017 to 2019",
 user: "Meet",
 duedate: Thu, 01 Jul 2021>
Printing all tasks:
[#<Task:0x00005575e3c44bf0
  id: 1,
  taskname: "Install SQL Server 2019 on Windows",
  user: "Andrea",
  duedate: Fri, 31 Jul 2020>,
 #<Task:0x00005575e3c449c0
  id: 3,
  taskname: "Write new Azure SQL DB content",
  user: "Luis",
  duedate: Thu, 01 Jul 2021>]

  ```

> Congratulations! You created your first two Ruby apps with Azure SQL DB! Check out the next section to learn about how you can make your Ruby apps faster with Azure SQL DB's Columnstore feature.
