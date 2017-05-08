---
layout: page-steps
language: Go
title: macOS
permalink: /go/mac/step/2
---

> After getting SQL Server and .NET Core on your Mac, you can now proceed to create your new C# projects. Here we will explore two simple applications. One of them will perform basic Insert, Update, Delete, and Select operations, while the second one will make use of Entity Framework Core, a popular object relational mapping (ORM) framework for .NET Core to execute the same operations.

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
    <TargetFramework>netcoreapp1.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="System.Data.SqlClient" Version="4.3.0" />
  </ItemGroup>

</Project>
```

You should already have a file called **Program.cs** in your .NET Core project located at: _~/SqlServerSample_

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to replace the username and password with your own. Save and close the file.

{% include partials/csharp/sample_1.md %}

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

{% include partials/csharp/sample_2.md %}

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

> You created your first C# + SQL Server app with .NET Core on your Mac! Check out the next section to create a C# app using an ORM!

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
    <TargetFramework>netcoreapp1.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="System.Data.SqlClient" Version="4.3.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="1.1.1" />
  </ItemGroup>

</Project>
```

For this sample, let's create two tables. The first will hold data about "users". Create a **User.cs** file in your .NET Core project located at: _~/SqlServerEFSample/User.cs_
Copy and paste the code below into your newly created **User.cs** file. Save and close the file.

{% include partials/csharp/sample_3.md %}

Let's create a second table to assign tasks to users. Create a **Task.cs** file in your .NET Core project located at: _~/SqlServerEFSample/Task.cs_

Copy and paste the code below into your newly created **Task.cs** file. Save and close the file.

{% include partials/csharp/sample_4.md %}

Let's also create a class for the Entity Framework Database context. Use your favorite text editor to create the file **EFSampleContext.cs** file in your .NET Core project located at: _~/SqlServerEFSample/EFSampleContext.cs_

Copy and paste the code below into your newly created **EFSampleContext.cs** file. Save and close the file.

{% include partials/csharp/sample_5.md %}

Replace the code in the **Program.cs** file in your .NET Core project located at: _~/SqlServerEFSample/Program.cs_

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to update the username and password with your own. Save and close the file.

{% include partials/csharp/sample_6.md %}

Change directories into the project folder and restore the dependencies in the csproj by running the following commands.

```terminal
cd ~/SqlServerEFSample
dotnet restore
```

```results
Restoring packages for /Users/usr1/SqlServerEFSample/SqlServerEFSample.csproj...
  Generating MSBuild file /Users/usr1/SqlServerEFSample/obj/SqlServerEFSample.csproj.nuget.g.props.
  Generating MSBuild file /Users/usr1/SqlServerEFSample/obj/SqlServerEFSample.csproj.nuget.g.targets.
  Writing lock file to disk. Path: /Users/usr1/SqlServerEFSample/obj/project.assets.json
  Restore completed in 5.79 sec for /Users/usr1/SqlServerEFSample/SqlServerEFSample.csproj.

  NuGet Config files used:
      /Users/usr1/.nuget/NuGet/NuGet.Config

  Feeds used:
      https://api.nuget.org/v3/index.json
```results

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

> Congrats you just created two C# apps! Check out the next section to learn about how you can make your C# apps faster with SQL Server's Columnstore feature.