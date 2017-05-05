---
layout: page-steps
language: C#
title: macOS
permalink: /csharp/mac/step/3
---

{% include partials/step3/title.md %}

## Step 3.1
{% include partials/step3/note.md %}

To showcase the capabilities of Columnstore indexes, let's create a C# application that creates a sample database and a sample table with 5 million rows and then runs a simple query before and after adding a Columnstore index.

Change to your home directory. Create a new .NET Core project. This will create the project directory with a basic .NET Core Program.cs and csproj file.

```terminal
cd ~/
dotnet new console -o SqlServerColumnstoreSample
```

You should already have a file called **SqlServerColumnstoreSample.csproj** in your .NET Core project located at: _~/SqlServerColumnstoreSample_

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

You should already have a file called **Program.cs** in your .NET Core project located at: _~/SqlServerColumnstoreSample_

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to replace the username and password with your own. Save and close the file.

{% include partials/csharp/sample_7.md %}

Change directories into the project folder and restore the dependencies in the csproj by running the following commands.

```terminal
cd ~/SqlServerColumnstoreSample
dotnet restore
```

```results
Restoring packages for /Users/usr1/SqlServerColumnstoreSample/SqlServerSample.csproj...
  Generating MSBuild file /Users/usr1/SqlServerColumnstoreSample/obj/SqlServerColumnstoreSample.csproj.nuget.g.props.
  Generating MSBuild file /Users/usr1/SqlServerColumnstoreSample/obj/SqlServerColumnstoreSample.csproj.nuget.g.targets.
  Writing lock file to disk. Path: /Users/usr1/SqlServerColumnstoreSample/obj/project.assets.json
  Restore completed in 5.79 sec for /Users/usr1/SqlServerColumnstoreSample/SqlServerColumnstoreSample.csproj.

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
*** SQL Server Columnstore demo ***
Connecting to SQL Server ... Done.
Dropping and creating database 'SampleDB' ... Done.
Inserting 5 million rows into table 'Table_with_5M_rows'. This takes ~1 minute, please wait ... Done.
Query time WITHOUT columnstore index: 363.09ms
Adding a columnstore to table 'Table_with_5M_rows'  ... Done.
Query time WITH columnstore index: 5.123ms
Performance improvement with columnstore index: 71x!
All done. Press any key to finish...
```

> The performance of the query was greatly improved! 
Now that you've built a few C# apps with SQL Server and .NET Core, continue checking out other SQL Server features.

## Try the mssql extension for Visual Studio Code!
{% include partials/step3/mssql.md %}