---
layout: page-steps
language: C#
title: Windows
permalink: /csharp/win/server/step/2
---

> After getting SQL Server and .NET Framework on your Windows machine, you can now proceed to create your new C# projects. Here we will explore two simple applications. One of them will perform basic Insert, Update, Delete, and Select operations, while the second one will make use of [Entity Framework](https://www.asp.net/entity-framework), a popular object relational mapping (ORM) framework for C# to execute the same operations.

## Step 2.1 Create a C# app that connects to SQL Server and executes queries

**Create a C# console application**

1. Launch Visual Studio Community
1. Click **File -> New -> Project**
1. In the **New project** dialog, click **Windows** located under **Visual C#** in the **Templates** node
1. Click **Console Application Visual C#**
1. Name the project _"SqlServerSample"_
1. Click **OK** to create the project

Visual Studio creates a new C# Console Application project and opens the file **Program.cs**. Replace the contents of Program.cs by copying and pasting the code below into the file. Don't forget to replace the username and password with your own. Save and close the file.

{% include partials/csharp/sample_1.md %}

Press **F5** to build and run the project.

```results
Connecting to SQL Server ... Done.
Press any key to finish...
```

Now replace the code in **Program.cs** by copying and pasting the code below into the file. This will create a database and a table, and will [insert](https://docs.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql), [update](https://docs.microsoft.com/en-us/sql/t-sql/queries/update-transact-sql), [delete](https://docs.microsoft.com/en-us/sql/t-sql/statements/delete-transact-sql), and read a few rows. Don't forget to update the username and password with your own. Save and close the file.

{% include partials/csharp/sample_2.md %}

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

{% include partials/csharp/sample_3.md %}

**Create Task.cs:**

1. Click **Project -> Add Class**
2. Type "Task.cs" in the name field
3. Click **Add** to add the new class to your project

Copy and paste the following code into the **Task.cs** file. Save and close the file.
{% include partials/csharp/sample_4.md %}

**Create EFSampleContext.cs:**

1. Click Project -> Add Class
2. Type "EFSampleContext.cs" in the name field
3. Click Add to add the new class to your project

Copy and paste the following code into the **EFSampleContext.cs** file. Save and close the file.
{% include partials/csharp/sample_5.md %}

Replace the code in the **Program.cs** file in your by copying and pasting the code into the file. Don't forget to update the username and password with your own. Save and close the file.
{% include partials/csharp/sample_6.md %}

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

> Congratulations! You just created two C# apps! Check out the next section to learn about how you can **make your C# apps faster with SQL Server's Columnstore feature.**
