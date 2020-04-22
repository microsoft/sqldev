---
layout: page-steps
language: C#
title: Windows
permalink: /csharp/win/server/step/3
---

{% include partials/step3/title.md %}

## Step 3.1

{% include partials/step3/note.md %}

To showcase the capabilities of Columnstore indexes, let's create a C# application that creates a sample database and a sample table with 5 million rows and then runs a simple query before and after adding a Columnstore index.

**Create a C# console application**
1. Launch Visual Studio Community
1. Click **File -> New -> Project**
1. In the **New project** dialog, click **Windows** located under **Visual C#** in the **Templates** node
1. Click **Console Application Visual C#**
1. Name the project "SqlServerColumnstoreSample"
1. Click **OK** to create the project

Visual Studio creates a new C# Console Application project and opens the file **Program.cs**. Replace the contents of **Program.cs** by copying and pasting the code below into the file. Don't forget to replace the username and password with your own. Save and close the file.

{% include partials/csharp/sample_7.md %}

Press **F5** to build and run your project.

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
