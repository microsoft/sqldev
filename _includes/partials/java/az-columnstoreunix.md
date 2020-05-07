{% include partials/step3/title.md %}

## Step 3.1 Create a Java app to demonstrate Columnstore indexes

To showcase the capabilities of Columnstore indexes, let's create a Java application that creates a sample database and a sample table with 5 million rows and then runs a simple query before and after adding a Columnstore index.

Change to your home directory. Create your Maven starter package. This will create the project directory with a basic Maven project and pom.xml file.

```terminal
cd ~/
mvn archetype:generate -DgroupId=com.sqlsamples -DartifactId=AzureSqlColumnstoreSample -DarchetypeArtifactId=maven-archetype-quickstart -Dversion=1.0.0
```

```results
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building Maven Stub Project (No POM) 1
[INFO] ------------------------------------------------------------------------
...
[INFO] Generating project in Interactive mode
[INFO] Using property: groupId = com.sqlsamples
[INFO] Using property: artifactId = AzureSqlColumnstoreSample
[INFO] Using property: version = 1.0.0
[INFO] Using property: package = com.sqlsamples
Confirm properties configuration:
groupId: com.sqlsamples
artifactId: AzureSqlColumnstoreSample
version: 1.0.0
package: com.sqlsamples
 Y: : Y
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Old (1.x) Archetype: maven-archetype-quickstart:1.0
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: basedir, Value: /home/kate
[INFO] Parameter: package, Value: com.sqlsamples
[INFO] Parameter: groupId, Value: com.sqlsamples
[INFO] Parameter: artifactId, Value: AzureSqlColumnstoreSample
[INFO] Parameter: packageName, Value: com.sqlsamples
[INFO] Parameter: version, Value: 1.0.0
[INFO] project created from Old (1.x) Archetype in dir: /home/kate/AzureSqlColumnstoreSample
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  6.924 s
[INFO] Finished at: 2020-04-21T10:11:58-07:00
[INFO] ------------------------------------------------------------------------
```

You should already have a file called **pom.xml** in your Maven project located at: _\AzureSqlColumnstoreSample_

Open this file in your favorite text editor and replace the contents with the code below to add the Microsoft JDBC Driver for SQL Server to your Maven project and specify the version of Java to compile the project against.

Save and close the file.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.sqlsamples</groupId>
    <artifactId>AzureSqlColumnstoreSample</artifactId>
    <packaging>jar</packaging>
    <version>1.0.0</version>
    <name>AzureSqlColumnstoreSample</name>
    <url>http://maven.apache.org</url>
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>3.8.1</version>
            <scope>test</scope>
        </dependency>
        <!-- add the JDBC Driver -->
        <dependency>
            <groupId>com.microsoft.sqlserver</groupId>
            <artifactId>mssql-jdbc</artifactId>
            <version>8.2.2.jre8</version>
        </dependency>
    <!-- Add Key Vault -->
    <dependency>
    <groupId>com.azure</groupId>
        <artifactId>azure-security-keyvault-secrets</artifactId>
        <version>4.0.1</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-security-keyvault-keys</artifactId>
        <version>4.0.0</version>
    </dependency>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.0.4</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-jdk14</artifactId>
        <version>1.7.25</version>
    </dependency>
    </dependencies>
    <properties>
        <!-- specify which version of Java to build against-->
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>
</project>
```

Change directories into your newly created project.

```terminal
cd AzureSqlColumnstoreSample
```

You should already have a file called **App.java** in your Maven project located at: \AzureSqlColumnstoreSample\src\main\java\com\sqlsamples\App.java

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to update the username and password with your own. Save and close the file.

```java
package com.sqlsamples;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.security.keyvault.secrets.SecretClient;
import com.azure.security.keyvault.secrets.models.KeyVaultSecret;
import com.azure.security.keyvault.secrets.SecretClientBuilder;

public class App {

    public static void main(String[] args) {

        System.out.println("*** Azure SQL Columnstore demo ***");

        // Get the key vault secret
	//
	System.out.println("Fetching Secret from Key Vault.");
	SecretClient secretClient = new SecretClientBuilder()
		 .vaultUrl("https://your_keyvault_name.vault.azure.net/")  // Update me
		 .credential(new DefaultAzureCredentialBuilder().build())
		 .buildClient();
	KeyVaultSecret secret = secretClient.getSecret("AppSecret");
	System.out.println("Secret Fetched.");

        // Update the connection information below
        String connectionUrl = "jdbc:sqlserver://your_server.database.windows.net;databaseName=your_db;user=your_user;password=" + secret.getValue();

        // Load SQL Server JDBC driver and establish connection.
        try {
            // Load SQL Server JDBC driver and establish connection.
            System.out.print("Connecting to Azure SQL ... ");
            try (Connection connection = DriverManager.getConnection(connectionUrl)) {
                System.out.println("Done.");

                // Create an example database
                System.out.print("Dropping Table if already created ... ");
                String sql = "DROP TABLE IF EXISTS [Table_with_3M_rows];";
                try (Statement statement = connection.createStatement()) {
                    statement.executeUpdate(sql);
                    System.out.println("Done.");
                }
                // Insert 3 million rows into the table 'Table_with_3M_rows'
                System.out.print(
                        "Inserting 3 million rows into table 'Table_with_3M_rows'. This takes ~1 minute, please wait ... ");
                sql = new StringBuilder()
                        .append("WITH a AS (SELECT * FROM (VALUES(1),(2),(3),(4),(5),(6),(7),(8),(9),(10)) AS a(a))")
                        .append("SELECT TOP(5000000)").append("ROW_NUMBER() OVER (ORDER BY a.a) AS OrderItemId ")
                        .append(",a.a + b.a + c.a + d.a + e.a + f.a + g.a + h.a AS OrderId ")
                        .append(",a.a * 10 AS Price ")
                        .append(",CONCAT(a.a, N' ', b.a, N' ', c.a, N' ', d.a, N' ', e.a, N' ', f.a, N' ', g.a, N' ', h.a) AS ProductName ")
                        .append("INTO Table_with_3M_rows ")
                        .append("FROM a, a AS b, a AS c, a AS d, a AS e, a AS f, a AS g, a AS h;").toString();
                try (Statement statement = connection.createStatement()) {
                    statement.executeUpdate(sql);
                    System.out.println("Done.");
                }

                // Execute SQL query without a columnstore index
                long elapsedTimeWithoutIndex = SumPrice(connection);
                System.out.println("Query time WITHOUT columnstore index: " + elapsedTimeWithoutIndex + "ms");

                System.out.print("Adding a columnstore to table 'Table_with_3M_rows'  ... ");
                sql = "CREATE CLUSTERED COLUMNSTORE INDEX columnstoreindex ON Table_with_3M_rows;";
                try (Statement statement = connection.createStatement()) {
                    statement.executeUpdate(sql);
                    System.out.println("Done.");
                }

                // Execute the same SQL query again after the columnstore index
                // is added
                long elapsedTimeWithIndex = SumPrice(connection);
                System.out.println("Query time WITH columnstore index: " + elapsedTimeWithIndex + "ms");

                // Calculate performance gain from adding columnstore index
                System.out.println("Performance improvement with columnstore index: "
                        + elapsedTimeWithoutIndex / elapsedTimeWithIndex + "x!");

                connection.close();
            }
        } catch (Exception e) {
            System.out.println("");
            e.printStackTrace();
        }
        finally {

		try (Connection connection = DriverManager.getConnection(connectionUrl)){
                // Delete the Employees table if it exists
		Statement statement = connection.createStatement();
                statement.executeUpdate("Drop table if exists Table_with_3M_rows");
                System.out.println("Table cleaned up.");
		} catch (Exception e) {
	            System.out.println();
        	    e.printStackTrace();
		}
	}
    }

    public static long SumPrice(Connection connection) {
        String sql = "SELECT SUM(Price) FROM Table_with_3M_rows;";
        long startTime = System.currentTimeMillis();
        try (Statement statement = connection.createStatement(); ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                long elapsedTime = System.currentTimeMillis() - startTime;
                return elapsedTime;
            }
        } catch (Exception e) {
            System.out.println("");
            e.printStackTrace();
        }
        return 0;
    }
}
```

Build the project and create a jar package using the following command:

```terminal
cd ~/AzureSqlColumnstoreSample
mvn package
```

```results
[INFO] Scanning for projects...
[INFO] 
[INFO] --------------< com.sqlsamples:AzureSqlColumnstoreSample >--------------
[INFO] Building AzureSqlColumnstoreSample 1.0.0
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
...
[INFO] 
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ AzureSqlColumnstoreSample ---
[INFO] Building jar: /home/kate/AzureSqlColumnstoreSample/target/AzureSqlColumnstoreSample-1.0.0.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  2.620 s
[INFO] Finished at: 2020-04-21T10:14:04-07:00
[INFO] ------------------------------------------------------------------------
```

Now run the application. You can remove the of "-q" in the command below to show info messages from Maven.

```terminal
mvn -q exec:java -Dexec.mainClass=com.sqlsamples.App
```

```results
*** Azure SQL Columnstore demo ***
Fetching Secret from Key Vault.
Secret Fetched.
Connecting to Azure SQL ... Done.
Dropping Table if already created ... Done.
Inserting 3 million rows into table 'Table_with_3M_rows'. This takes ~1 minute, please wait ... Done.
Query time WITHOUT columnstore index: 1482ms
Adding a columnstore to table 'Table_with_3M_rows'  ... Done.
Query time WITH columnstore index: 74ms
Performance improvement with columnstore index: 20x!
Table cleaned up.

```

> Congratulations! You just made your Java app faster using Columnstore Indexes!
