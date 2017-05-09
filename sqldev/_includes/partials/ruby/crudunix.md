
> In this section you will create two simple Ruby apps. One of them will perform basic Insert, Update, Delete, and Select, while the second one will make use of [Ruby on Rails](http://rubyonrails.org/), one of the most popular Ruby frameworks to execute the same operations. to execute the same operations.

## Step 2.1 Create a Ruby app that connects to SQL Server and executes queries

Create a new project directory and install TinyTDS. TinyTDS is used to connect Ruby applications to SQL Server.

```terminal
mkdir SqlServerSample
cd SqlServerSample
gem install tiny_tds
```
Using your favorite editor, create a file named **connect.rb** in the SqlServerSample folder. Copy and paste the below contents into the file. Don't forget to update the username and password with your own. Save and close the file.

```ruby
require 'tiny_tds'
@client = TinyTds::Client.new username: 'sa', password: 'your_password',
    host: 'localhost', port: 1433
puts 'Connecting to SQL Server'

if @client.active? == true then puts 'Done' end

@client.close
```

Run the Ruby script from the terminal.
```terminal
ruby connect.rb
```
```results
Connecting to SQL Server
Done.
```
Using your favorite text editor, create a new file called **crud.rb** in the SqlServerSample folder. Copy and paste the following code inside it. This will insert, update, delete, and read a few rows. Don't forget to update the username and password with your own. Save and close the file.
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
execute("USE SampleDB; CREATE TABLE Employees (Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY, Name NVARCHAR(50), Location NVARCHAR(50))
    INSERT INTO Employees (Name, Location) VALUES (N'Jared', N'Australia'),	(N'Nikita', N'India'), (N'Tom', N'Germany')")

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
Connecting to SQL Server
Done
Dropping and creating database 'SampleDB'
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
> You created your first Ruby + SQL Server app! Check out the next section to create an app using Ruby on Rails!

## Step 2.2 Create a Ruby on Rails app that connects to SQL Server using the Active Record ORM.

Change to your home directory. Install Ruby on Rails (RoR)
```terminal
gem install rails
```
Create a new RoR application and specify SQL Server as the database. This will create a new directory and install the gem dependencies required. This includes tiny_tds and [activerecord-sqlserver-adapter](https://github.com/rails-sqlserver/activerecord-sqlserver-adapter).

```terminal
rails new SqlServerRailsSample --database=sqlserver
```
Open the database.yml file in your favorite text editor and update the default database information. Don't forget to update the username and password with your own. Save and close the file.
```yaml
default: &default
  adapter: sqlserver
  encoding: utf8
  username: sa
  password: your_password
  host: localhost

development:
  <<: *default
  database: SqlServerRailsSample_development

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: SqlServerRailsSample_test
```
Change into the project directory and set up the development and test databases.

```terminal
cd SqlServerRailsSample
./bin/setup
```

Run your RoR application.
```terminal
./bin/rails server
```

```results
=> Booting Puma
=> Rails 5.0.2 application starting in development on http://localhost:3000
=> Run `rails server -h` for more startup options
Puma starting in single mode...
* Version 3.8.2 (ruby 2.3.3-p222), codename: Sassy Salamander
* Min threads: 5, max threads: 5
* Environment: development
* Listening on tcp://localhost:3000
Use Ctrl-C to stop
Started GET "/" for ::1 at 2017-03-15 14:26:40 -0700
  SQL (20.8ms)  USE [SqlServerRailsSample_development]
Processing by Rails::WelcomeController#index as HTML
  Parameters: {"internal"=>true}
  Rendering /usr/local/lib/ruby/gems/2.3.0/gems/railties-5.0.2/lib/rails/templates/rails/welcome/index.html.erb
  Rendered /usr/local/lib/ruby/gems/2.3.0/gems/railties-5.0.2/lib/rails/templates/rails/welcome/index.html.erb (4.0ms)
Completed 200 OK in 58ms (Views: 9.7ms | ActiveRecord: 0.0ms)
```
From your web browser, visit http://localhost:3000. You should see the following image.

![Ror](https://sqlchoice.blob.core.windows.net/sqlchoice/static/images/rails.png "RoR")

> Congrats you created your first two Ruby apps with SQL Server! Check out the next section to learn about how you can make your Ruby apps faster with SQL Server’s Columnstore feature


