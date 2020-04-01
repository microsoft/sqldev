
> In this section you will create two simple C# projects. One of them will perform basic Insert, Update, Delete, and Select, and then we will expand it to use Azure Key Vault. <TODO: Linky>

## Step 2.1 Get Connection Information to use in Connection Strings, and Create a Firewall Rule.

{% include partials/get_azure_sql_connection_info.md %}

## Step 2.2 Create a C# app that connects to Azure SQL and executes queries

Change to your home directory. Create a new .NET Core project. This will create the project directory with a basic .NET Core Program.cs and csproj file.

```terminal
cd ~/
dotnet new console -o AzureSqlSample
```

```results
The template "Console Application" created successfully.
```

You should already have a file called **AzureSqlSample.csproj** in your .NET Core project located at: ~/AzureSqlSample

Open this file in your favorite text editor and replace the contents with the code below to add System.Data.SqlClient to your project. Save and close the file.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp2.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="System.Data.SqlClient" Version="4.4.0" />
  </ItemGroup>

</Project>
```

You should already have a file called **Program.cs** in your .NET Core project located at: ~/AzureSqlSample

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to replace the username and password with your own. Save and close the file.

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

First, you need to create an Azure Key Vault.  
It is recommended that you create a Key Vault in the same resource group as your database and server.

1. From the Azure Portal, select "+ Create a Resource".  Search for "Key Vault" and select that.
1. In the "Create key vault" page, fill out the resource group and key vault name.
1. Select "Review and Create", then "Create".

For future reference, there are more details [**here**](https://docs.microsoft.com/en-us/azure-stack/user/azure-stack-key-vault-manage-portal?view=azs-2002).

Now that you have created the Key Vault, you need to add a secret called **AppSecret** to your vault.

1. From the Azure Portal dashboard, select All resources, select the key vault that you created earlier, and then select the Keys tile.
1. In the Keys pane, select Generate/Import.
1. Name your key AppSecret, then make the secret your password.
1. You can leave the values for Content Type, activation date, expiration date, and Enabled (Yes) as the defaults.
1. Select Create to start the deployment.

**Add required Nuget packages to support Azure Key Vault**

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp2.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="System.Data.SqlClient" Version="4.4.0" />
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

<TODO: Results>

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
The template "Console Application" created successfully.
```

You should already have a file called **AzureSqlEFSample.csproj** in your .NET Core project located at: ~/AzureSqlEFSample
Open this file in your favorite text editor and replace the contents with the code below to add Entity Framework Core to your project. Save and close the file.


**Add Entity Framework and Azure Key Vault dependencies to your project**
```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp2.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="System.Data.SqlClient" Version="4.4.0" />
    <PackageReference Include="Microsoft.Azure.Services.AppAuthentication" Version="1.4.0" />
    <PackageReference Include="Microsoft.Azure.KeyVault" Version="3.0.5" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="6.4.0"/>
  </ItemGroup>

</Project>
```

```results
TODO
```


For this sample, let's create two tables. The first will hold data about "users" and the other will hold data about “tasks”.

**Create User.cs:**

For this sample, let's create two tables. The first will hold data about "users". Create a **User.cs** file in your .NET Core project located at: ~/AzureSqlEFSample/User.cs

Copy and paste the code below into your newly created **User.cs** file. Save and close the file.

Copy and paste the following code into the **User.cs** file. Save and close the file.

{% include partials/csharp/az-sample_users.md %}

**Create Task.cs:**

Let's create a second table to assign tasks to users. Create a **Task.cs** file in your .NET Core project located at: ~/AzureSqlEFSample/Task.cs

Copy and paste the code below into your newly created **Task.cs** file. Save and close the file.

{% include partials/csharp/az-sample_task.md %}

**Create EFSampleContext.cs:**

Let's also create a class for the Entity Framework Database context. Use your favorite text editor to create the file **EFSampleContext.cs** file in your .NET Core project located at: ~/AzureSqlEFSample/EFSampleContext.cs

Copy and paste the code below into your newly created **EFSampleContext.cs** file. Save and close the file.

{% include partials/csharp/az-sample_6.md %}

Replace the code in the **Program.cs** file in your .NET Core project located at: ~/AzureSqlEFSample/Program.cs

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to update the connection information and key vault name with your own. Save and close the file.

{% include partials/csharp/az-sample_8.md %}

Change directories into the project folder and restore the dependencies in the csproj by running the following commands.

```terminal
cd ~/SqlServerEFSample
dotnet restore
```

```results
TODO
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

> Congratulations! You just created two C# apps! Check out the next section to learn about how you can **make your C# apps faster with SQL Server's Columnstore feature**.
