---
layout: page-steps
language: C#
title: Windows
permalink: /csharp/windows/step/2
---

> After getting SQL Server and .NET Framework on your Windows machine, you can now proceed to create your new C# projects. Here we will explore two simple applications. One of them will perform basic Insert, Update, Delete, and Select operations, while the second one will make use of [Entity Framework](https://www.asp.net/entity-framework), a popular object relational mapping (ORM) framework for C# to execute the same operations.

## Step 2.1 Create a C# app that connects to SQL Server and executes queries
Create a C# console application 
1. Launch Visual Studio Community 
1. Click **File -> New -> Project**
1. In the **New project** dialog, click **Windows** located under **Visual C#** in the **Templates** node 
1. Click **Console Application Visual C#** 
1. Name the project _"SqlServerSample"_ 
1. Click **OK** to create the project

Visual Studio creates a new C# Console Application project and opens the file **Program.cs**. Replace the contents of Program.cs by copying and pasting the code below into the file. Don't forget to replace the username and password with your own. Save and close the file.

```csharp
using System;
using System.Text;
using System.Data.SqlClient;

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
Press **F5** to build and run the project.

```results
Connecting to SQL Server ... Done.
Press any key to finish...
```

Now replace the code in **Program.cs** by copying and pasting the code below into the file. This will create a database and a table, and will [insert](https://msdn.microsoft.com/en-us/library/ms174335.aspx), [update](https://msdn.microsoft.com/en-us/library/ms177523.aspx), [delete](https://msdn.microsoft.com/en-us/library/ms189835.aspx), and read a few rows. Don't forget to update the username and password with your own. Save and close the file.

```csharp
using System;
using System.Text;
using System.Data.SqlClient;

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
Press **F5** to build and run your project.

```results
Connect to SQL Server and demo Create, Read, Update and Delete operations.
Connecting to SQL Server ...
Done.
Dropping and creating database 'SampleDB' ... Done.
Creating sample table with data, press any key to continue...
Done.
Inserting a new row into table, press any key to continue...
1 row(s) inserted
Updating 'Location' for user 'Nikita', press any key to continue...
1 row(s) updated
Deleting user 'Jared', press any key to continue...
1 row(s) deleted
Reading data from table, press any key to continue...
2 Nikita United States
3 Tom Germany
4 Jake United States
All done. Press any key to finish...
```

> You created your first C# + SQL Server app with .NET Framework on Windows! Check out the next section to create a C# app using an ORM!

## Step 2.2 Create a C# app that connects to SQL Server using the Entity Framework ORM in .NET Framework

**Create a C# console application**
1. Launch Visual Studio Community 
1. Click **File -> New -> Project** 
1. In the **New project** dialog, click **Windows** located under **Visual C#** in the **Templates** node 
1. Click **Console Application Visual C#** 
1. Name the project "_SqlServerEFSample"_ 
1. Click **OK** to create the project

Visual Studio creates a new C# Console Application project and opens the file **Program.cs**.

**Add Entity Framework dependencies to your project**
1. Open the Package Manager Console in Visual Studio with "Tools -> Nuget Package Manager -> Package Manager Console"
1. Type: "Install-Package EntityFramework" 
1. Hit enter

```results
Attempting to gather dependency information for package 'EntityFramework.6.1.3' with respect to project 'SqlServerEFSample', targeting '.NETFramework,Version=v4.5.2'
Attempting to resolve dependencies for package 'EntityFramework.6.1.3' with DependencyBehavior 'Lowest'
Resolving actions to install package 'EntityFramework.6.1.3'
Resolved actions to install package 'EntityFramework.6.1.3'
  GET https://api.nuget.org/packages/entityframework.6.1.3.nupkg
  OK https://api.nuget.org/packages/entityframework.6.1.3.nupkg 17ms
Installing EntityFramework 6.1.3.
Adding package 'EntityFramework.6.1.3' to folder 'c:\users\usr1\documents\visual studio 2015\Projects\SqlServerEFSample\packages'
Added package 'EntityFramework.6.1.3' to folder 'c:\users\usr1\documents\visual studio 2015\Projects\SqlServerEFSample\packages'
Added package 'EntityFramework.6.1.3' to 'packages.config'
Executing script file 'c:\users\usr1\documents\visual studio 2015\Projects\SqlServerEFSample\packages\EntityFramework.6.1.3\tools\init.ps1'
Executing script file 'c:\users\usr1\documents\visual studio 2015\Projects\SqlServerEFSample\packages\EntityFramework.6.1.3\tools\install.ps1'

Type 'get-help EntityFramework' to see all available Entity Framework commands.
Successfully installed 'EntityFramework 6.1.3' to SqlServerEFSample
```

Close the Package Manager Console. You have successfully added the required Entity Framework dependencies to your project.

For this sample, let's create two tables. The first will hold data about "users" and the other will hold data about “tasks”.

**Create User.cs:**
1. Click **Project -> Add Class**
1. Type "User.cs" in the name field 
1. Click **Add** to add the new class to your project

Copy and paste the following code into the **User.cs** file. Save and close the file.

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
**Create Task.cs:** 
1. Click **Project -> Add Class**
2. Type "Task.cs" in the name field 
3. Click **Add** to add the new class to your project

Copy and paste the following code into the **Task.cs** file. Save and close the file.
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
Create EFSampleContext.cs: 
1. Click Project -> Add Class 
2. Type "EFSampleContext.cs" in the name field 
3. Click Add to add the new class to your project

Copy and paste the following code into the EFSampleContext.cs file. Save and close the file.
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
Replace the code in the **Program.cs** file in your by copying and pasting the code into the file. Don't forget to update the username and password with your own. Save and close the file.
```csharp
using System;
using System.Linq;
using System.Data.SqlClient;
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
Press **F5** to build and run the project.

```results
** C# CRUD sample with Entity Framework and SQL Server **

Created database schema from C# classes.

Created User: User [id=1, name=Anna Shrestinian]

Created Task: Task [id=1, title=Ship Helsinki, dueDate=4/1/2017 12:00:00 AM, IsComplete=False]

Assigned Task: 'Ship Helsinki' to user 'Anna Shrestinian'

Incomplete tasks assigned to 'Anna':
Task [id=1, title=Ship Helsinki, dueDate=4/1/2017 12:00:00 AM, IsComplete=False]

Updating task: Task [id=1, title=Ship Helsinki, dueDate=4/1/2017 12:00:00 AM, IsComplete=False]
dueDate changed: Task [id=1, title=Ship Helsinki, dueDate=6/30/2016 12:00:00 AM, IsComplete=False]

Deleting all tasks with a dueDate in 2016
Deleting task: Task [id=1, title=Ship Helsinki, dueDate=6/30/2016 12:00:00 AM, IsComplete=False]

Tasks after delete:
[None]
All done. Press any key to finish...
```

> Congrats you just created two C# apps! Check out the next section to learn about how you can **make your C# apps faster with SQL Server's Columnstore feature.**
