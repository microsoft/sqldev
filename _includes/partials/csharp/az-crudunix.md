
> In this section you will create two simple C# projects. One of them will perform basic Insert, Update, Delete, and Select, and then we will expand it to use Azure Key Vault.

## Step 2.1 Get Connection Information to use in Connection Strings, and Create a Firewall Rule.

{% include partials/get_azure_sql_connection_info.md %}

## Step 2.2 Create a C# app that connects to Azure SQL and executes queries

Change to your home directory. Create a new .NET Core project. This will create the project directory with a basic .NET Core Program.cs and csproj file.

```terminal
cd ~/
dotnet new console -o AzureSqlSample
```

```results
Getting ready...
The template "Console Application" was created successfully.

Processing post-creating actions...
Running 'dotnet restore' on AzureSqlSample/AzureSqlSample.csproj...
  Restore completed in 126.89ms for /home/usr1/AzureSqlSample.csproj.

Restore succeeded.
```

You should already have a file called **AzureSqlSample.csproj** in your .NET Core project located at: ~/AzureSqlSample

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

You should already have a file called **Program.cs** in your .NET Core project located at: ~/AzureSqlSample

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to replace the connection informatoin with your own. Save and close the file.

{% include partials/csharp/az-sample_1.md %}

Change directories into the project folder and restore the dependencies in the csproj by running the following commands.

```terminal
cd ~/AzureSqlSample
dotnet restore
```

```results
Restoring packages for /Users/usr1/AzureSqlSample/AzureSqlSample.csproj...
  Generating MSBuild file /Users/usr1/AzureSqlSample/obj/AzureSqlSample.csproj.nuget.g.props.
  Generating MSBuild file /Users/usr1/SqlServerSample/obj/AzureSqlSample.csproj.nuget.g.targets.
  Writing lock file to disk. Path: /Users/usr1/AzureSqlSample/obj/project.assets.json
  Restore completed in 5.79 sec for /Users/usr1/AzureSqlSample/AuzreSqlSample.csproj.

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
Connecting to Azure SQL  ... Done.
All done. Press any key to finish...
```

Now replace the code in **Program.cs** by opening the file in your favorite text editor and copying and pasting the code below into the file. This will create a database and a table, and will insert, update, delete, and read a few rows. Don't forget to update the username and password with your own. Save and close the file.

{% include partials/csharp/az-sample_2.md %}

Build and run your project.

```terminal
dotnet run
```

```results
Connect to Azure SQL and demo Create, Read, Update and Delete operations.
Connecting to Azure SQL ... Done.
Creating sample table with data, press any key to continue...Done.
Inserting a new row into table, press any key to continue...1 row(s) inserted
Updating 'Location' for user 'Nikita', press any key to continue...1 row(s) updated
Deleting user 'Jared', press any key to continue...1 row(s) deleted
Reading data from table, press any key to continue...
2 Nikita United States
3 Tom Germany
4 Jake United States
Cleaning up table.
All done. Press any key to finish...
```

> You created your first C# + Azure SQL app with .NET Core on Ubuntu! Check out the next section to secure this app by putting credentials in Azure Key Vault.

## Step 2.3 Secure your app by putting Credentials in Azure Key Vault.

**Create an Azure Key Vault and put your Secret into it.**

{% include partials/create_key_vault_and_store_creds.md %}

**Add required Nuget packages to support Azure Key Vault**

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Data.SqlClient" Version="2.0.0" />
    <PackageReference Include="Microsoft.Azure.Services.AppAuthentication" Version="1.4.0" />
    <PackageReference Include="Microsoft.Azure.KeyVault" Version="3.0.5" />
  </ItemGroup>

</Project>
```

Change directories into the project folder and restore the dependencies in the csproj by running the following commands.

```terminal
cd ~/AzureSqlSample
dotnet restore
```

````results
Restore completed in 2.1 sec for /home/user/AzureSqlSample/AzureSqlSample.csproj.
````

And we also have to add the following code to access the Key Vault from our app.  Note the asyncrony:

{% include partials/csharp/az-sample_4.md %} 

In addition to adding that code, we add the call to it, and change the structure of the Main method by abstracting out the logic of the program into a Task.
Once that is done, your final code should look like the following. It's OK to just copy/paste this code and replace the code in Program.cs with this, updating your database connection info and keyvault name afterwards.

{% include partials/csharp/az-sample_5.md %}

Then, run the program.  Your output should look like this:

```results
Trying to get Password from Key Vault.  Press a key to continue...
Connect to Azure SQL and demo Create, Read, Update and Delete operations.
Connecting to Azure SQL ... Done.
Done.
Creating sample table with data, press any key to continue...Done.
Inserting a new row into table, press any key to continue...1 row(s) inserted
Updating 'Location' for user 'Nikita', press any key to continue...1 row(s) updated
Deleting user 'Jared', press any key to continue...1 row(s) deleted
Reading data from table, press any key to continue...
2 Nikita United States
3 Tom Germany
4 Jake United States
Cleaning up table.
Done.
All done. Press any key to finish...
```

## Step 2.4 Create a C# app that connects to Azure SQL using the Entity Framework ORM in .NET Framework

Change to your home directory. Create a new .NET Core project. This will create the project directory with a basic .NET Core Program.cs and csproj file.

```terminal
cd ~/
dotnet new console -o AzureSqlEFSample
```

```results
The template "Console Application" was created successfully.

Processing post-creation actions...
Running 'dotnet restore' on AzureSqlEFSample/AzureSqlEFSample.csproj...
  Restore completed in 132.61 ms for /home/usr1/AzureSqlEFSample/AzureSqlEFSample.csproj.

Restore succeeded.
```

You should now have a file called **AzureSqlEFSample.csproj** in your .NET Core project located at: ~/AzureSqlEFSample
Open this file in your favorite text editor and replace the contents with the code below to add Entity Framework Core to your project. Save and close the file.


**Add Entity Framework and Azure Key Vault dependencies to your project**
```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="EntityFramework" Version="6.4.0" />
    <PackageReference Include="Microsoft.Azure.KeyVault" Version="3.0.5" />
    <PackageReference Include="Microsoft.Azure.Services.AppAuthentication" Version="1.4.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="3.1.3" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="3.1.3" />
  </ItemGroup>

</Project>
```

For this sample, let’s create two tables. The first will hold data about “users”. Create a User.cs file in your .NET Core project located at: ~/AzureSqlEFSample/User.cs

Copy and paste the following code into the **User.cs** file. Save and close the file.

```csharp
using System;
using System.Collections.Generic;

namespace AzureSqlEFSample
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

Let’s create a second table to assign tasks to users. Create a Task.cs file in your .NET Core project located at: ~/AzureSqlEFSample/Task.cs

```csharp
using System;

namespace AzureSqlEFSample
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

**Create EFSampleContext.cs:**

Let's also create a class for the Entity Framework Database context. Use your favorite text editor to create the file **EFSampleContext.cs** file in your .NET Core project located at: ~/AzureSqlEFSample/EFSampleContext.cs

Copy and paste the code below into your newly created **EFSampleContext.cs** file. Save and close the file.

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace AzureSqlEFSample
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

Replace the code in the **Program.cs** file in your .NET Core project located at: ~/AzureSqlEFSample/Program.cs

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to update the connection information and key vault name with your own. Save and close the file.

```csharp
using System;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace AzureSqlEFSample
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Threading.Tasks.Task task = Program.DoWork(args);
            // Becuase this program takes user input, have a long wait.
            var result = task.Wait(TimeSpan.FromMinutes(30));
        }

        static async System.Threading.Tasks.Task DoWork(string[] args)
        {
            Console.WriteLine("** C# CRUD sample with Entity Framework and Azure SQL DB**\n");

            // Build connection string
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
            builder.DataSource = "your_server_name.database.windows.net";   // update me
            builder.UserID = "your_user";              // update me
            builder.Password = await GetPasswordFromKeyVault();      // taken from Key Vault
            builder.InitialCatalog = "your_db_name"; // Update me

            using (EFSampleContext context = new EFSampleContext(builder.ConnectionString))
            {
                try
                {
                    context.Database.EnsureDeleted();
                    context.Database.EnsureCreated();
                    Console.WriteLine("Created database schema from C# classes.");

                    // Create demo: Create a Task instance and save it to the database
                    Task newTask = new Task() { Title = "Ship Helsinki", IsComplete = false, DueDate = DateTime.Parse("04-01-2017") };
                    context.Tasks.Add(newTask);
                    context.SaveChanges();
                    Console.WriteLine("\nCreated Task: " + newTask.ToString());

                    // Association demo: Assign task to user

                    // Read demo: find incomplete tasks assigned to user 'Anna'
                    Console.WriteLine("\nIncomplete tasks assigned to 'Anna':");
                    var query = from t in context.Tasks
                                where t.IsComplete == false &&
                                t.AssignedTo.FirstName.Equals("Anna")
                                select t;
                    foreach (var t in query)
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
                    List<Task> queryResults = context.Tasks.Where(t => t.DueDate < dueDate2016).ToList();
                    foreach (Task t in queryResults)
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
                catch (SqlException e)
                {
                    Console.WriteLine(e.ToString());
                }
            }

            Console.WriteLine("All done. Press any key to finish...");
            Console.ReadKey(true);
        }

        private static async Task<string> GetPasswordFromKeyVault()
        {
            Console.WriteLine("Trying to get Password from Key Vault.  Press a key to continue...");
            Console.ReadKey(true);
            /* The next four lines of code show you how to use AppAuthentication library to fetch secrets from your key vault */
            AzureServiceTokenProvider azureServiceTokenProvider = new AzureServiceTokenProvider();
            KeyVaultClient keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback));
            SecretBundle secret = await keyVaultClient.GetSecretAsync("https://your_keyvault_name.vault.azure.net/secrets/AppSecret"); // update me
            return secret.Value;
        }
    }
}
```

Change directories into the project folder and restore the dependencies in the csproj by running the following commands.

```terminal
cd ~/SqlServerEFSample
dotnet restore
```

Now build and run.

```terminal
dotnet run
```

```results
** C# CRUD sample with Entity Framework and Azure SQL **

Trying to get Password from Key Vault.  Press a key to continue...

Created Task: Task [id=3, title=Ship Helsinki, dueDate=4/1/2017 12:00:00 AM, IsComplete=False]

Incomplete tasks assigned to 'Anna':

Updating task: Task [id=3, title=Ship Helsinki, dueDate=4/1/2017 12:00:00 AM, IsComplete=False]
dueDate changed: Task [id=3, title=Ship Helsinki, dueDate=6/30/2016 12:00:00 AM, IsComplete=False]

Deleting all tasks with a dueDate in 2016
Deleting task: Task [id=3, title=Ship Helsinki, dueDate=6/30/2016 12:00:00 AM, IsComplete=False]

Tasks after delete:
[None]
All done. Press any key to finish...
```

> Congratulations! You just created two C# apps! Check out the next section to learn about how you can **make your C# apps faster with SQL Server's Columnstore feature**.
