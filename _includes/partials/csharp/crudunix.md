
> In this section you will create two simple C# projects. One of them will perform basic Insert, Update, Delete, and Select, while the second one will make use of [Entity Framework Core](https://docs.efproject.net/en/latest/), a popular object relational mapping (ORM) framework for .NET Core to execute the same operations.

## Step 2.1 Create a C# app that connects to SQL Server and executes queries

Change to your home directory. Create a new .NET Core project. This will create the project directory with a basic .NET Core Program.cs and csproj file.

```terminal
cd ~/
dotnet new console -o SqlServerSample
```

```results
The template "Console Application" created successfully.
```

You should already have a file called **SqlServerSample.csproj** in your .NET Core project located at: ~/SqlServerSample

Open this file in your favorite text editor and replace the contents with the code below to add System.Data.SqlClient to your project. Save and close the file.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Data.SqlClient" Version="2.0.0" />
  </ItemGroup>

</Project>
```

You should already have a file called **Program.cs** in your .NET Core project located at: ~/SqlServerSample

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to replace the username and password with your own. Save and close the file.

```csharp
using Microsoft.Data.SqlClient;
using System;
using System.Text;

namespace SqlServerSample
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                // Build connection string
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                builder.DataSource = "localhost";   // update me
                builder.UserID = "sa";              // update me
                builder.Password = "your_password";      // update me
                builder.InitialCatalog = "master";

                // Connect to SQL
                Console.Write("Connecting to SQL Server ... ");
                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();
                    Console.WriteLine("Done.");
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }

            Console.WriteLine("All done. Press any key to finish...");
            Console.ReadKey(true);
        }
    }
}
```

Change directories into the project folder and restore the dependencies in the csproj by running the following commands.

```terminal
cd ~/SqlServerSample
dotnet restore
```

```results
Restoring packages for /Users/usr1/SqlServerSample/SqlServerSample.csproj...
  Generating MSBuild file /Users/usr1/SqlServerSample/obj/SqlServerSample.csproj.nuget.g.props.
  Generating MSBuild file /Users/usr1/SqlServerSample/obj/SqlServerSample.csproj.nuget.g.targets.
  Writing lock file to disk. Path: /Users/usr1/SqlServerSample/obj/project.assets.json
  Restore completed in 5.79 sec for /Users/usr1/SqlServerSample/SqlServerSample.csproj.

  NuGet Config files used:
      /Users/usr1/.nuget/NuGet/NuGet.Config

  Feeds used:
      https://api.nuget.org/v3/index.json
```

Now build and run.

```terminal
dotnet run
```

```results
Connecting to SQL Server ... Done.
All done. Press any key to finish...
```

Now replace the code in **Program.cs** by opening the file in your favorite text editor and copying and pasting the code below into the file. This will create a database and a table, and will insert, update, delete, and read a few rows. Don't forget to update the username and password with your own. Save and close the file.

```csharp
using Microsoft.Data.SqlClient;
using System;
using System.Text;

namespace SqlServerSample
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Console.WriteLine("Connect to SQL Server and demo Create, Read, Update and Delete operations.");

                // Build connection string
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                builder.DataSource = "localhost";   // update me
                builder.UserID = "sa";              // update me
                builder.Password = "your_password";      // update me
                builder.InitialCatalog = "master";

                // Connect to SQL
                Console.Write("Connecting to SQL Server ... ");
                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();
                    Console.WriteLine("Done.");

                    // Create a sample database
                    Console.Write("Dropping and creating database 'SampleDB' ... ");
                    String sql = "DROP DATABASE IF EXISTS [SampleDB]; CREATE DATABASE [SampleDB]";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.ExecuteNonQuery();
                        Console.WriteLine("Done.");
                    }

                    // Create a Table and insert some sample data
                    Console.Write("Creating sample table with data, press any key to continue...");
                    Console.ReadKey(true);
                    StringBuilder sb = new StringBuilder();
                    sb.Append("USE SampleDB; ");
                    sb.Append("CREATE TABLE Employees ( ");
                    sb.Append(" Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY, ");
                    sb.Append(" Name NVARCHAR(50), ");
                    sb.Append(" Location NVARCHAR(50) ");
                    sb.Append("); ");
                    sb.Append("INSERT INTO Employees (Name, Location) VALUES ");
                    sb.Append("(N'Jared', N'Australia'), ");
                    sb.Append("(N'Nikita', N'India'), ");
                    sb.Append("(N'Tom', N'Germany'); ");
                    sql = sb.ToString();
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.ExecuteNonQuery();
                        Console.WriteLine("Done.");
                    }

                    // INSERT demo
                    Console.Write("Inserting a new row into table, press any key to continue...");
                    Console.ReadKey(true);
                    sb.Clear();
                    sb.Append("INSERT Employees (Name, Location) ");
                    sb.Append("VALUES (@name, @location);");
                    sql = sb.ToString();
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@name", "Jake");
                        command.Parameters.AddWithValue("@location", "United States");
                        int rowsAffected = command.ExecuteNonQuery();
                        Console.WriteLine(rowsAffected + " row(s) inserted");
                    }

                    // UPDATE demo
                    String userToUpdate = "Nikita";
                    Console.Write("Updating 'Location' for user '" + userToUpdate + "', press any key to continue...");
                    Console.ReadKey(true);
                    sb.Clear();
                    sb.Append("UPDATE Employees SET Location = N'United States' WHERE Name = @name");
                    sql = sb.ToString();
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@name", userToUpdate);
                        int rowsAffected = command.ExecuteNonQuery();
                        Console.WriteLine(rowsAffected + " row(s) updated");
                    }

                    // DELETE demo
                    String userToDelete = "Jared";
                    Console.Write("Deleting user '" + userToDelete + "', press any key to continue...");
                    Console.ReadKey(true);
                    sb.Clear();
                    sb.Append("DELETE FROM Employees WHERE Name = @name;");
                    sql = sb.ToString();
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@name", userToDelete);
                        int rowsAffected = command.ExecuteNonQuery();
                        Console.WriteLine(rowsAffected + " row(s) deleted");
                    }

                    // READ demo
                    Console.WriteLine("Reading data from table, press any key to continue...");
                    Console.ReadKey(true);
                    sql = "SELECT Id, Name, Location FROM Employees;";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Console.WriteLine("{0} {1} {2}", reader.GetInt32(0), reader.GetString(1), reader.GetString(2));
                            }
                        }
                    }
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }

            Console.WriteLine("All done. Press any key to finish...");
            Console.ReadKey(true);
        }
    }
}
```

Build and run your project.

```terminal
dotnet run
```

```results
Connect to SQL Server and demo Create, Read, Update and Delete operations.
Connecting to SQL Server ... Done.
Dropping and creating database 'SampleDB' ... Done.
Creating sample table with data, press any key to continue... Done.
Inserting a new row into table, press any key to continue... 1 row(s) inserted
Updating 'Location' for user 'Nikita', press any key to continue... 1 row(s) updated
Deleting user 'Jared', press any key to continue... 1 row(s) deleted
Reading data from table, press any key to continue...
2 Nikita United States
3 Tom Germany
4 Jake United States
All done. Press any key to finish...
```

> You created your first C# + SQL Server app with .NET Core on Ubuntu! Check out the next section to create a C# app using an ORM!

## Step 2.2 Create a C# app that connects to SQL Server using the Entity Framework Core ORM in .NET Core

Change to your home directory. Create a new .NET Core project. This will create the project directory with a basic .NET Core Program.cs and csproj file.

```terminal
cd ~/
dotnet new console -o SqlServerEFSample
```

```results
The template "Console Application" created successfully.
```

You should already have a file called **SqlServerEFSample.csproj** in your .NET Core project located at: ~/SqlServerEFSample
Open this file in your favorite text editor and replace the contents with the code below to add Entity Framework Core to your project. Save and close the file.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Data.SqlClient" Version="2.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="3.1.6" />
  </ItemGroup>

</Project>
```

For this sample, let's create two tables. The first will hold data about "users". Create a **User.cs** file in your .NET Core project located at: ~/SqlServerEFSample/User.cs

Copy and paste the code below into your newly created **User.cs** file. Save and close the file.

```csharp
using System;
using System.Collections.Generic;

namespace SqlServerEFSample
{
    public class User
    {
        public int UserId { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public virtual IList<Task> Tasks { get; set; }

        public String GetFullName()
        {
            return this.FirstName + " " + this.LastName;
        }
        public override string ToString()
        {
            return "User [id=" + this.UserId + ", name=" + this.GetFullName() + "]";
        }
    }
}
```

Let's create a second table to assign tasks to users. Create a **Task.cs** file in your .NET Core project located at: ~/SqlServerEFSample/Task.cs

Copy and paste the code below into your newly created **Task.cs** file. Save and close the file.

```csharp
using System;

namespace SqlServerEFSample
{
    public class Task
    {
        public int TaskId { get; set; }
        public string Title { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsComplete { get; set; }
        public virtual User AssignedTo { get; set; }

        public override string ToString()
        {
            return "Task [id=" + this.TaskId + ", title=" + this.Title + ", dueDate=" + this.DueDate.ToString() + ", IsComplete=" + this.IsComplete + "]";
        }
    }
}
```

Let's also create a class for the Entity Framework Database context. Use your favorite text editor to create the file **EFSampleContext.cs** file in your .NET Core project located at: ~/SqlServerEFSample/EFSampleContext.cs

Copy and paste the code below into your newly created **EFSampleContext.cs** file. Save and close the file.

```csharp
using Microsoft.EntityFrameworkCore;

namespace SqlServerEFSample
{
    public class EFSampleContext : DbContext
    {
        string _connectionString;
        public EFSampleContext(string connectionString)
        {
            this._connectionString = connectionString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(this._connectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
    }
}
```

Replace the code in the **Program.cs** file in your .NET Core project located at: ~/SqlServerEFSample/Program.cs

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to update the username and password with your own. Save and close the file.

```csharp
using Microsoft.Data.SqlClient;
using System;
using System.Linq;
using System.Collections.Generic;

namespace SqlServerEFSample
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("** C# CRUD sample with Entity Framework Core and SQL Server **\n");
            try
            {
                // Build connection string
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                builder.DataSource = "localhost";   // update me
                builder.UserID = "sa";              // update me
                builder.Password = "your_password";      // update me
                builder.InitialCatalog = "EFSampleDB";

                using (EFSampleContext context = new EFSampleContext(builder.ConnectionString))
                {
                    context.Database.EnsureDeleted();
                    context.Database.EnsureCreated();
                    Console.WriteLine("Created database schema from C# classes.");

                    // Create demo: Create a User instance and save it to the database
                    User newUser = new User { FirstName = "Anna", LastName = "Shrestinian" };
                    context.Users.Add(newUser);
                    context.SaveChanges();
                    Console.WriteLine("\nCreated User: " + newUser.ToString());

                    // Create demo: Create a Task instance and save it to the database
                    Task newTask = new Task() { Title = "Ship Helsinki", IsComplete = false, DueDate = DateTime.Parse("04-01-2017") };
                    context.Tasks.Add(newTask);
                    context.SaveChanges();
                    Console.WriteLine("\nCreated Task: " + newTask.ToString());

                    // Association demo: Assign task to user
                    newTask.AssignedTo = newUser;
                    context.SaveChanges();
                    Console.WriteLine("\nAssigned Task: '" + newTask.Title + "' to user '" + newUser.GetFullName() + "'");

                    // Read demo: find incomplete tasks assigned to user 'Anna'
                    Console.WriteLine("\nIncomplete tasks assigned to 'Anna':");
                    var query = from t in context.Tasks
                                where t.IsComplete == false &&
                                t.AssignedTo.FirstName.Equals("Anna")
                                select t;
                    foreach(var t in query)
                    {
                        Console.WriteLine(t.ToString());
                    }

                    // Update demo: change the 'dueDate' of a task
                    Task taskToUpdate = context.Tasks.First(); // get the first task
                    Console.WriteLine("\nUpdating task: " + taskToUpdate.ToString());
                    taskToUpdate.DueDate = DateTime.Parse("06-30-2016");
                    context.SaveChanges();
                    Console.WriteLine("dueDate changed: " + taskToUpdate.ToString());

                    // Delete demo: delete all tasks with a dueDate in 2016
                    Console.WriteLine("\nDeleting all tasks with a dueDate in 2016");
                    DateTime dueDate2016 = DateTime.Parse("12-31-2016");
                    query = from t in context.Tasks
                            where t.DueDate < dueDate2016
                            select t;
                    foreach(Task t in query)
                    {
                        Console.WriteLine("Deleting task: " + t.ToString());
                        context.Tasks.Remove(t);
                    }
                    context.SaveChanges();

                    // Show tasks after the 'Delete' operation - there should be 0 tasks
                    Console.WriteLine("\nTasks after delete:");
                    List<Task> tasksAfterDelete = (from t in context.Tasks select t).ToList<Task>();
                    if (tasksAfterDelete.Count == 0)
                    {
                        Console.WriteLine("[None]");
                    }
                    else
                    {
                        foreach (Task t in query)
                        {
                            Console.WriteLine(t.ToString());
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            Console.WriteLine("All done. Press any key to finish...");
            Console.ReadKey(true);
        }
    }
}
```

Change directories into the project folder and restore the dependencies in the csproj by running the following commands.

```terminal
cd ~/SqlServerEFSample
dotnet restore
```

```results
COPY
Results
Restoring packages for /Users/usr1/SqlServerEFSample/SqlServerEFSample.csproj...
  Generating MSBuild file /Users/usr1/SqlServerEFSample/obj/SqlServerEFSample.csproj.nuget.g.props.
  Generating MSBuild file /Users/usr1/SqlServerEFSample/obj/SqlServerEFSample.csproj.nuget.g.targets.
  Writing lock file to disk. Path: /Users/usr1/SqlServerEFSample/obj/project.assets.json
  Restore completed in 5.79 sec for /Users/usr1/SqlServerEFSample/SqlServerEFSample.csproj.

  NuGet Config files used:
      /Users/usr1/.nuget/NuGet/NuGet.Config

  Feeds used:
      https://api.nuget.org/v3/index.json
```

Now build and run.

```terminal
dotnet run
```

```results
** C# CRUD sample with Entity Framework Core and SQL Server **

Created database schema from C# classes.

Created User: User [id=1, name=Anna Shrestinian]

Created Task: Task [id=1, title=Ship Helsinki, dueDate=4/1/17 12:00:00 AM, IsComplete=False]

Assigned Task: 'Ship Helsinki' to user 'Anna Shrestinian'

Incomplete tasks assigned to 'Anna':
Task [id=1, title=Ship Helsinki, dueDate=4/1/17 12:00:00 AM, IsComplete=False]

Updating task: Task [id=1, title=Ship Helsinki, dueDate=4/1/17 12:00:00 AM, IsComplete=False]
dueDate changed: Task [id=1, title=Ship Helsinki, dueDate=6/30/16 12:00:00 AM, IsComplete=False]

Deleting all tasks with a dueDate in 2016
Deleting task: Task [id=1, title=Ship Helsinki, dueDate=6/30/16 12:00:00 AM, IsComplete=False]

Tasks after delete:
[None]
All done. Press any key to finish...
```

> Congratulations! You just created two C# apps! Check out the next section to learn about how you can **make your C# apps faster with SQL Server's Columnstore feature**.
