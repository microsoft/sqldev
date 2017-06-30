{% include partials/step3/title.md %}

## Step 3.1 Create a Java app to demonstrate Columnstore indexes

To showcase the capabilities of Columnstore indexes, let's create a Java application that creates a sample database and a sample table with 5 million rows and then runs a simple query before and after adding a Columnstore index.

Change to your home directory. Create your Maven starter package. This will create the project directory with a basic Maven project and pom.xml file.

```terminal
cd ~/
mvn archetype:generate -DgroupId=com.sqlsamples -DartifactId=SqlServerColumnstoreSample -DarchetypeArtifactId=maven-archetype-quickstart -Dversion=1.0.0
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
[INFO] Using property: artifactId = SqlServerColumnstoreSample
[INFO] Using property: version = 1.0.0
[INFO] Using property: package = com.sqlsamples
Confirm properties configuration:
groupId: com.sqlsamples
artifactId: SqlServerColumnstoreSample
version: 1.0.0
package: com.sqlsamples
...
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 18.520 s
[INFO] Finished at: 2016-10-15T13:49:20-07:00
[INFO] Final Memory: 14M/208M
[INFO] ------------------------------------------------------------------------
```
Add the Microsoft JDBC Driver for SQL Server dependency to your Maven project by opening your favorite text editor and copying and pasting the following lines into your **pom.xml** file. Do not overwrite the existing values prepopulated in the file. The JDBC dependency must be pasted within the larger "dependencies" section (<dependency> </dependency>).

Specify the version of Java to compile the project against by adding the "properties" section below into the pom.xml file. Add the <properties> section below after the <dependencies> section.

Save and close the file.

```xml
<!-- prepopulated content by Maven -->
<dependencies>
    <dependency>
        <groupId>com.microsoft.sqlserver</groupId>
        <artifactId>mssql-jdbc</artifactId>
        <version>6.2.0.jre8</version>
    </dependency>
    <!-- your existing dependencies -->
</dependencies>
<properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <!-- your existing properties -->
</properties>
<!-- prepopulated content by Maven -->
```
Change directories into your newly created project.

```terminal
cd ~/SqlServerColumnstoreSample
```

You should already have a file called **App.java** in your Maven project located at: ~/SqlServerColumnstoreSample/src/main/java/com/sqlsamples/App.java

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to update the username and password with your own. Save and close the file.

```java
package com.sqlsamples;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class App {

	public static void main(String[] args) {

		System.out.println("*** SQL Server Columnstore demo ***");

		// Update the username and password below
		String connectionUrl = "jdbc:sqlserver://localhost:1433;databaseName=master;user=sa;password=your_password";

		// Load SQL Server JDBC driver and establish connection.
		try {
			// Load SQL Server JDBC driver and establish connection.
			System.out.print("Connecting to SQL Server ... ");
			try (Connection connection = DriverManager.getConnection(connectionUrl)) {
				System.out.println("Done.");

				// Create an example database
				System.out.print("Dropping and creating database 'SampleDB' ... ");
				String sql = "DROP DATABASE IF EXISTS [SampleDB]; CREATE DATABASE [SampleDB]";
				try (Statement statement = connection.createStatement()) {
					statement.executeUpdate(sql);
					System.out.println("Done.");
				}
				// Insert 5 million rows into the table 'Table_with_5M_rows'
				System.out.print(
						"Inserting 5 million rows into table 'Table_with_5M_rows'. This takes ~1 minute, please wait ... ");
				sql = new StringBuilder().append("USE SampleDB; ")
						.append("WITH a AS (SELECT * FROM (VALUES(1),(2),(3),(4),(5),(6),(7),(8),(9),(10)) AS a(a))")
						.append("SELECT TOP(5000000)").append("ROW_NUMBER() OVER (ORDER BY a.a) AS OrderItemId ")
						.append(",a.a + b.a + c.a + d.a + e.a + f.a + g.a + h.a AS OrderId ")
						.append(",a.a * 10 AS Price ")
						.append(",CONCAT(a.a, N' ', b.a, N' ', c.a, N' ', d.a, N' ', e.a, N' ', f.a, N' ', g.a, N' ', h.a) AS ProductName ")
						.append("INTO Table_with_5M_rows ")
						.append("FROM a, a AS b, a AS c, a AS d, a AS e, a AS f, a AS g, a AS h;").toString();
				try (Statement statement = connection.createStatement()) {
					statement.executeUpdate(sql);
					System.out.println("Done.");
				}

				// Execute SQL query without a columnstore index
				long elapsedTimeWithoutIndex = SumPrice(connection);
				System.out.println("Query time WITHOUT columnstore index: " + elapsedTimeWithoutIndex + "ms");

				System.out.print("Adding a columnstore to table 'Table_with_5M_rows'  ... ");
				sql = "CREATE CLUSTERED COLUMNSTORE INDEX columnstoreindex ON Table_with_5M_rows;";
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

			}
		} catch (Exception e) {
			System.out.println("");
			e.printStackTrace();
		}
	}

	public static long SumPrice(Connection connection) {
		String sql = "SELECT SUM(Price) FROM Table_with_5M_rows;";
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
cd ~/SqlServerColumnstoreSample
mvn package
```
```results
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building SqlServerColumnstoreSample 1.0.0
[INFO] ------------------------------------------------------------------------
...
[INFO] Building jar: /Users/usr1/SqlServerColumnstoreSample/target/SqlServerColumnstoreSample-1.0.0.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2.173 s
[INFO] Finished at: 2016-10-15T13:59:15-07:00
[INFO] Final Memory: 17M/207M
[INFO] ------------------------------------------------------------------------
```

Now run the application. You can remove the of "-q" in the command below to show info messages from Maven.

```terminal
mvn -q exec:java -Dexec.mainClass=com.sqlsamples.App
```
```results
*** SQL Server Columnstore demo ***
Connecting to SQL Server ... Done.
Dropping and creating database 'SampleDB' ... Done.
Inserting 5 million rows into table 'Table_with_5M_rows'. This takes ~1 minute, please wait ... Done.
Query time WITHOUT columnstore index: 363ms
Adding a columnstore to table 'Table_with_5M_rows'  ... Done.
Query time WITH columnstore index: 5ms
Performance improvement with columnstore index: 71x!
```
> Congrats you just made your Java app faster using Columnstore Indexes! 
