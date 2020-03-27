---
layout: page-steps
language: C#
title: Windows
permalink: /csharp/win/az/step/2
---

> After getting Azure SQL and .NET Framework on your Windows machine, you can now proceed to create your new C# projects. Here we will explore two simple applications. One of them will perform basic Insert, Update, Delete, and Select operations, while the second one will make use of [Entity Framework](https://www.asp.net/entity-framework), a popular object relational mapping (ORM) framework for C# to execute the same operations.

## Step 2.1 Get Connection Information to use in Connection Strings, and Create a Firewall Rule.

{% include partials/get_azure_sql_connection_info.md %}

## Step 2.2 Create a C# app that connects to SQL Server and executes queries

**Create a C# console application**

1. Launch Visual Studio Community
1. Click **File -> New -> Project**
1. In the **New project** dialog, click **Windows** located under **Visual C#** in the **Templates** node
1. Click **Console Application Visual C#**
1. Name the project _"AzureSqlSample"_
1. Click **OK** to create the project

Visual Studio creates a new C# Console Application project and opens the file **Program.cs**. Replace the contents of Program.cs by copying and pasting the code below into the file. Don't forget to replace the username and password with your own. Save and close the file.

{% include partials/csharp/az-sample_1.md %}

Press **F5** to build and run the project.

```results
Connecting to Azure SQL ... Done.
Press any key to finish...
```

Now replace the code in **Program.cs** by copying and pasting the code below into the file. This will create a database and a table, and will [insert](https://msdn.microsoft.com/en-us/library/ms174335.aspx), [update](https://msdn.microsoft.com/en-us/library/ms177523.aspx), [delete](https://msdn.microsoft.com/en-us/library/ms189835.aspx), and read a few rows. Don't forget to update the username and password with your own. Save and close the file.
  
{% include partials/csharp/az-sample_2.md %}

Press **F5** to build and run your project.

```results
Connect to Azure SQL and demo Create, Read, Update and Delete operations.
Connecting to Azure SQL  ...
Done.
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

> You created your first C# + Azure SQL app with .NET Framework on Windows! Check out the next section to secure your credentials with Azure Key Vault!

## Step 2.3 Secure your app by putting Credentials in Azure Key Vault.

**Create an Azure Key Vault and put your Secret into it.**

First, you need to create an Azure Key Vault.  Do this by following the instructions [**here**](https://docs.microsoft.com/en-us/azure-stack/user/azure-stack-key-vault-manage-portal?view=azs-2002)
It is recommended that you create a Key Vault in the same resource group as your database and server.

1. From the Azure Portal, select "+ Create a Resource".  Search for "Key Vault" and select that.
1. In the "Create key vault" page, fill out the resource group and key vault name.
1. Select "Review and Create", then "Create".

Now that you have created the Key Vault, you need to add a secret called **AppSecret** to your vault.

1. From the Azure Portal dashboard, select All resources, select the key vault that you created earlier, and then select the Keys tile.
1. In the Keys pane, select Generate/Import.
1. Name your key AppSecret, then make the secret your password.
1. You can leave the values for Content TYpe, activation date, expiration date, and Enabled (Yes) as the defaults.
1. Select Create to start the deployment.

**Install Nuget packages to connect your app to Azure Key Vault**

1. Open the Package Manager Console in Visual Studio with "Tools-> Nuget Package Manager -> Package Manager Console"
1. Type: "Install-Package Microsoft.Azure.Services.AppAuthentication -Version 1.4.0"
1. Hit Enter

```results
Attempting to gather dependency information for package 'Microsoft.Azure.Services.AppAuthentication.1.4.0' with respect to project 'AzureSqlSample', targeting '.NETFramework,Version=v4.6.1'
Gathering dependency information took 1.96 sec
Attempting to resolve dependencies for package 'Microsoft.Azure.Services.AppAuthentication.1.4.0' with DependencyBehavior 'Lowest'
Resolving dependency information took 0 ms
Resolving actions to install package 'Microsoft.Azure.Services.AppAuthentication.1.4.0'
Resolved actions to install package 'Microsoft.Azure.Services.AppAuthentication.1.4.0'
Retrieving package 'Microsoft.Azure.Services.AppAuthentication 1.4.0' from 'nuget.org'.
Retrieving package 'Microsoft.IdentityModel.Clients.ActiveDirectory 5.2.0' from 'nuget.org'.
Retrieving package 'System.Net.Http 4.3.4' from 'nuget.org'.
Retrieving package 'System.Security.Cryptography.Algorithms 4.3.0' from 'nuget.org'.
Retrieving package 'System.Security.Cryptography.Encoding 4.3.0' from 'nuget.org'.
Retrieving package 'System.Security.Cryptography.Primitives 4.3.0' from 'nuget.org'.
Retrieving package 'System.Security.Cryptography.X509Certificates 4.3.0' from 'nuget.org'.
  GET https://api.nuget.org/v3-flatcontainer/system.net.http/4.3.4/system.net.http.4.3.4.nupkg
  GET https://api.nuget.org/v3-flatcontainer/microsoft.identitymodel.clients.activedirectory/5.2.0/microsoft.identitymodel.clients.activedirectory.5.2.0.nupkg
  OK https://api.nuget.org/v3-flatcontainer/microsoft.identitymodel.clients.activedirectory/5.2.0/microsoft.identitymodel.clients.activedirectory.5.2.0.nupkg 4ms
  OK https://api.nuget.org/v3-flatcontainer/system.net.http/4.3.4/system.net.http.4.3.4.nupkg 6ms
Installing Microsoft.IdentityModel.Clients.ActiveDirectory 5.2.0.
Installing System.Net.Http 4.3.4.
  GET https://api.nuget.org/v3-flatcontainer/system.security.cryptography.algorithms/4.3.0/system.security.cryptography.algorithms.4.3.0.nupkg
  GET https://api.nuget.org/v3-flatcontainer/system.security.cryptography.primitives/4.3.0/system.security.cryptography.primitives.4.3.0.nupkg
  OK https://api.nuget.org/v3-flatcontainer/system.security.cryptography.primitives/4.3.0/system.security.cryptography.primitives.4.3.0.nupkg 7ms
Installing System.Security.Cryptography.Primitives 4.3.0.
  OK https://api.nuget.org/v3-flatcontainer/system.security.cryptography.algorithms/4.3.0/system.security.cryptography.algorithms.4.3.0.nupkg 28ms
  GET https://api.nuget.org/v3-flatcontainer/system.security.cryptography.x509certificates/4.3.0/system.security.cryptography.x509certificates.4.3.0.nupkg
Installing System.Security.Cryptography.Algorithms 4.3.0.
  OK https://api.nuget.org/v3-flatcontainer/system.security.cryptography.x509certificates/4.3.0/system.security.cryptography.x509certificates.4.3.0.nupkg 8ms
Installing System.Security.Cryptography.X509Certificates 4.3.0.
  GET https://api.nuget.org/v3-flatcontainer/microsoft.azure.services.appauthentication/1.4.0/microsoft.azure.services.appauthentication.1.4.0.nupkg
  OK https://api.nuget.org/v3-flatcontainer/microsoft.azure.services.appauthentication/1.4.0/microsoft.azure.services.appauthentication.1.4.0.nupkg 11ms
Installing Microsoft.Azure.Services.AppAuthentication 1.4.0.
  GET https://api.nuget.org/v3-flatcontainer/system.security.cryptography.encoding/4.3.0/system.security.cryptography.encoding.4.3.0.nupkg
  OK https://api.nuget.org/v3-flatcontainer/system.security.cryptography.encoding/4.3.0/system.security.cryptography.encoding.4.3.0.nupkg 8ms
Installing System.Security.Cryptography.Encoding 4.3.0.
Adding package 'System.Security.Cryptography.Encoding.4.3.0' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'System.Security.Cryptography.Encoding.4.3.0' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'System.Security.Cryptography.Encoding.4.3.0' to 'packages.config'
Successfully installed 'System.Security.Cryptography.Encoding 4.3.0' to AzureSqlSample
Adding package 'System.Security.Cryptography.Primitives.4.3.0' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'System.Security.Cryptography.Primitives.4.3.0' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'System.Security.Cryptography.Primitives.4.3.0' to 'packages.config'
Successfully installed 'System.Security.Cryptography.Primitives 4.3.0' to AzureSqlSample
Adding package 'System.Security.Cryptography.Algorithms.4.3.0' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'System.Security.Cryptography.Algorithms.4.3.0' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'System.Security.Cryptography.Algorithms.4.3.0' to 'packages.config'
Successfully installed 'System.Security.Cryptography.Algorithms 4.3.0' to AzureSqlSample
Adding package 'System.Security.Cryptography.X509Certificates.4.3.0' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'System.Security.Cryptography.X509Certificates.4.3.0' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'System.Security.Cryptography.X509Certificates.4.3.0' to 'packages.config'
Successfully installed 'System.Security.Cryptography.X509Certificates 4.3.0' to AzureSqlSample
Adding package 'System.Net.Http.4.3.4' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'System.Net.Http.4.3.4' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'System.Net.Http.4.3.4' to 'packages.config'
Successfully installed 'System.Net.Http 4.3.4' to AzureSqlSample
Adding package 'Microsoft.IdentityModel.Clients.ActiveDirectory.5.2.0' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Microsoft.IdentityModel.Clients.ActiveDirectory.5.2.0' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Microsoft.IdentityModel.Clients.ActiveDirectory.5.2.0' to 'packages.config'
Successfully installed 'Microsoft.IdentityModel.Clients.ActiveDirectory 5.2.0' to AzureSqlSample
Adding package 'Microsoft.Azure.Services.AppAuthentication.1.4.0' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Microsoft.Azure.Services.AppAuthentication.1.4.0' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Microsoft.Azure.Services.AppAuthentication.1.4.0' to 'packages.config'
Successfully installed 'Microsoft.Azure.Services.AppAuthentication 1.4.0' to AzureSqlSample
Executing nuget actions took 2.29 sec
Time Elapsed: 00:00:04.3427048
```

1. Type: "Install-Package Microsoft.Azure.KeyVault -Version 3.0.5"
1. Hit Enter


```results
Attempting to gather dependency information for package 'Microsoft.Azure.KeyVault.3.0.5' with respect to project 'AzureSqlSample', targeting '.NETFramework,Version=v4.6.1'
Gathering dependency information took 734.8 ms
Attempting to resolve dependencies for package 'Microsoft.Azure.KeyVault.3.0.5' with DependencyBehavior 'Lowest'
Resolving dependency information took 0 ms
Resolving actions to install package 'Microsoft.Azure.KeyVault.3.0.5'
Resolved actions to install package 'Microsoft.Azure.KeyVault.3.0.5'
Retrieving package 'Microsoft.Azure.KeyVault 3.0.5' from 'nuget.org'.
Retrieving package 'Microsoft.Azure.KeyVault.WebKey 3.0.5' from 'nuget.org'.
Retrieving package 'Microsoft.Rest.ClientRuntime 2.3.20' from 'nuget.org'.
Retrieving package 'Microsoft.Rest.ClientRuntime.Azure 3.3.18' from 'nuget.org'.
Retrieving package 'Newtonsoft.Json 10.0.3' from 'nuget.org'.
  GET https://api.nuget.org/v3-flatcontainer/microsoft.azure.keyvault/3.0.5/microsoft.azure.keyvault.3.0.5.nupkg
  OK https://api.nuget.org/v3-flatcontainer/microsoft.azure.keyvault/3.0.5/microsoft.azure.keyvault.3.0.5.nupkg 6ms
Installing Microsoft.Azure.KeyVault 3.0.5.
  GET https://api.nuget.org/v3-flatcontainer/microsoft.rest.clientruntime.azure/3.3.18/microsoft.rest.clientruntime.azure.3.3.18.nupkg
  OK https://api.nuget.org/v3-flatcontainer/microsoft.rest.clientruntime.azure/3.3.18/microsoft.rest.clientruntime.azure.3.3.18.nupkg 16ms
Installing Microsoft.Rest.ClientRuntime.Azure 3.3.18.
  GET https://api.nuget.org/v3-flatcontainer/microsoft.rest.clientruntime/2.3.20/microsoft.rest.clientruntime.2.3.20.nupkg
  OK https://api.nuget.org/v3-flatcontainer/microsoft.rest.clientruntime/2.3.20/microsoft.rest.clientruntime.2.3.20.nupkg 6ms
Installing Microsoft.Rest.ClientRuntime 2.3.20.
  GET https://api.nuget.org/v3-flatcontainer/microsoft.azure.keyvault.webkey/3.0.5/microsoft.azure.keyvault.webkey.3.0.5.nupkg
  OK https://api.nuget.org/v3-flatcontainer/microsoft.azure.keyvault.webkey/3.0.5/microsoft.azure.keyvault.webkey.3.0.5.nupkg 6ms
Installing Microsoft.Azure.KeyVault.WebKey 3.0.5.
  GET https://api.nuget.org/v3-flatcontainer/newtonsoft.json/10.0.3/newtonsoft.json.10.0.3.nupkg
  OK https://api.nuget.org/v3-flatcontainer/newtonsoft.json/10.0.3/newtonsoft.json.10.0.3.nupkg 6ms
Installing Newtonsoft.Json 10.0.3.
Adding package 'Newtonsoft.Json.10.0.3' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Newtonsoft.Json.10.0.3' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Newtonsoft.Json.10.0.3' to 'packages.config'
Executing script file 'C:\Users\usr1\testproject\website\AzureSqlSample\packages\Newtonsoft.Json.10.0.3\tools\install.ps1'
Successfully installed 'Newtonsoft.Json 10.0.3' to AzureSqlSample
Adding package 'Microsoft.Rest.ClientRuntime.2.3.20' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Microsoft.Rest.ClientRuntime.2.3.20' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Microsoft.Rest.ClientRuntime.2.3.20' to 'packages.config'
Successfully installed 'Microsoft.Rest.ClientRuntime 2.3.20' to AzureSqlSample
Adding package 'Microsoft.Rest.ClientRuntime.Azure.3.3.18' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Microsoft.Rest.ClientRuntime.Azure.3.3.18' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Microsoft.Rest.ClientRuntime.Azure.3.3.18' to 'packages.config'
Successfully installed 'Microsoft.Rest.ClientRuntime.Azure 3.3.18' to AzureSqlSample
Adding package 'Microsoft.Azure.KeyVault.WebKey.3.0.5' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Microsoft.Azure.KeyVault.WebKey.3.0.5' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Microsoft.Azure.KeyVault.WebKey.3.0.5' to 'packages.config'
Successfully installed 'Microsoft.Azure.KeyVault.WebKey 3.0.5' to AzureSqlSample
Adding package 'Microsoft.Azure.KeyVault.3.0.5' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Microsoft.Azure.KeyVault.3.0.5' to folder 'C:\Users\usr1\testproject\website\AzureSqlSample\packages'
Added package 'Microsoft.Azure.KeyVault.3.0.5' to 'packages.config'
Successfully installed 'Microsoft.Azure.KeyVault 3.0.5' to AzureSqlSample
Executing nuget actions took 2.39 sec
Time Elapsed: 00:00:03.2162165

```

**Modify your app to use Key Vault**

We need to add the following to the beginning of our file:

{% include partials/csharp/az-sample_3.md %}

And we also have to add the following code to access the Key Vault from our app.  Note the asyncrony:

{% include partials/csharp/az-sample_4.md %} 

In addition to adding that code, we add the call to it, and change the structure of the Main method by abstracting out the logic of the program into a Task.
Once that is done, your final code should look like the following. It's OK to just copy/paste this code and replace the code in Program.cs with this, updating your database connection info and keyvault name afterwards.

{% include partials/csharp/az-sample_5.md %}

> Congratulations! You just created a C# app and secured your credentials by placing them in Azure Key Vault! Check out the next section to learn about how you can **make your C# apps faster with SQL Server's Columnstore feature.**
