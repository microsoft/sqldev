
> In this section you will create two simple Java apps. One of them will perform basic Insert, Update, Delete, and Select, while the second one will make use of Hibernate, one of the most popular Node.js Object-relational mappers, to execute the same operations.

## Create a Java app that connects to SQL Server and executes queries

In your home directory, create your Maven starter package. This will create the project directory with a basic Maven project and pom.xml file. This step can also be performed in an IDE such as NetBeans or Eclipse.

```terminal
    mvn archetype:generate "-DgroupId=com.sqlsamples" "-DartifactId=SqlServerSample" "-DarchetypeArtifactId=maven-archetype-quickstart" "-Dversion=1.0.0"
```
```results
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building Maven Stub Project (No POM) 1
[INFO] ------------------------------------------------------------------------
...
...
[INFO] Total time: 20.272 s
[INFO] Finished at: 2016-11-03T21:24:28-07:00
[INFO] Final Memory: 18M/403M
[INFO] ------------------------------------------------------------------------
```
Change directories into your newly created project.

```terminal
    cd SqlServerSample
```

Add the Microsoft JDBC Driver for SQL Server dependency to your Maven project by opening your favorite text editor and copying and pasting the following lines into your **pom.xml** file. Do not overwrite the existing values prepopulated in the file. The JDBC dependency must be pasted within the larger "dependencies" section (<dependency> </dependency>).

Specify the version of Java to compile the project against by adding the "properties" section below into the pom.xml file. Add the <properties> section below after the <dependencies> section.

Save and close the file.

Using your favorite editor, create a file named connect.js in the SqlServerSample folder. Copy and paste the below contents into the file.

```xml
<!-- prepopulated content by Maven -->
<dependencies>
    <dependency>
        <groupId>com.microsoft.sqlserver</groupId>
        <artifactId>mssql-jdbc</artifactId>
        <version>6.1.0.jre8</version>
    </dependency>
    <!-- your existing dependencies -->
</dependencies>
<properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <!-- your existing properties -->
</properties>
```
You should already have a file called **App.java** in your Maven project located at: SqlServerSample\src\main\java\com\sqlsamples\App.java

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to replace the username and password with your own. Save and close the file.

```java
package com.sqlsamples;

import java.sql.Connection;
import java.sql.DriverManager;

public class App {

	public static void main(String[] args) {

		String connectionUrl = "jdbc:sqlserver://localhost:1433;databaseName=master;user=sa;password=your_password";

		try {
			// Load SQL Server JDBC driver and establish connection.
			System.out.print("Connecting to SQL Server ... ");
			try (Connection connection = DriverManager.getConnection(connectionUrl)) {
				System.out.println("Done.");
			}
		} catch (Exception e) {
			System.out.println();
			e.printStackTrace();
		}
	}
}
```
Build the project and create a jar package using the following command:
```terminal
    mvn package
```
```results
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building SqlServerSample 1.0.0
[INFO] ------------------------------------------------------------------------
...
...
[INFO] Finished at: 2016-11-03T21:33:45-07:00
[INFO] Final Memory: 16M/371M
[INFO] ------------------------------------------------------------------------
```
Now run the application. You can remove the "-q" in the command below to show info messages from Maven.

```terminal
mvn -q exec:java "-Dexec.mainClass=com.sqlsamples.App"
```
```results
Connecting to SQL Server ...
Done.
```
Now replace the code in App.java by opening the file in your favorite text editor and copying and pasting the code below into the file. This will create a database and a table, and will insert, update, delete, and read a few rows. Don't forget to update the username and password with your own. Save and close the file.
```java
package com.sqlsamples;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.DriverManager;

public class App {

	public static void main(String[] args) {

		System.out.println("Connect to SQL Server and demo Create, Read, Update and Delete operations.");

        //Update the username and password below
		String connectionUrl = "jdbc:sqlserver://localhost:1433;databaseName=master;user=sa;password=your_password";

		try {
			// Load SQL Server JDBC driver and establish connection.
			System.out.print("Connecting to SQL Server ... ");
			try (Connection connection = DriverManager.getConnection(connectionUrl)) {
				System.out.println("Done.");

				// Create a sample database
				System.out.print("Dropping and creating database 'SampleDB' ... ");
				String sql = "DROP DATABASE IF EXISTS [SampleDB]; CREATE DATABASE [SampleDB]";
				try (Statement statement = connection.createStatement()) {
					statement.executeUpdate(sql);
					System.out.println("Done.");
				}

				// Create a Table and insert some sample data
				System.out.print("Creating sample table with data, press ENTER to continue...");
				System.in.read();
				sql = new StringBuilder().append("USE SampleDB; ").append("CREATE TABLE Employees ( ")
						.append(" Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY, ").append(" Name NVARCHAR(50), ")
						.append(" Location NVARCHAR(50) ").append("); ")
						.append("INSERT INTO Employees (Name, Location) VALUES ").append("(N'Jared', N'Australia'), ")
						.append("(N'Nikita', N'India'), ").append("(N'Tom', N'Germany'); ").toString();
				try (Statement statement = connection.createStatement()) {
					statement.executeUpdate(sql);
					System.out.println("Done.");
				}

				// INSERT demo
				System.out.print("Inserting a new row into table, press ENTER to continue...");
				System.in.read();
				sql = new StringBuilder().append("INSERT Employees (Name, Location) ").append("VALUES (?, ?);")
						.toString();
				try (PreparedStatement statement = connection.prepareStatement(sql)) {
					statement.setString(1, "Jake");
					statement.setString(2, "United States");
					int rowsAffected = statement.executeUpdate();
					System.out.println(rowsAffected + " row(s) inserted");
				}

				// UPDATE demo
				String userToUpdate = "Nikita";
				System.out.print("Updating 'Location' for user '" + userToUpdate + "', press ENTER to continue...");
				System.in.read();
				sql = "UPDATE Employees SET Location = N'United States' WHERE Name = ?";
				try (PreparedStatement statement = connection.prepareStatement(sql)) {
					statement.setString(1, userToUpdate);
					int rowsAffected = statement.executeUpdate();
					System.out.println(rowsAffected + " row(s) updated");
				}

				// DELETE demo
				String userToDelete = "Jared";
				System.out.print("Deleting user '" + userToDelete + "', press ENTER to continue...");
				System.in.read();
				sql = "DELETE FROM Employees WHERE Name = ?;";
				try (PreparedStatement statement = connection.prepareStatement(sql)) {
					statement.setString(1, userToDelete);
					int rowsAffected = statement.executeUpdate();
					System.out.println(rowsAffected + " row(s) deleted");
				}

				// READ demo
				System.out.print("Reading data from table, press ENTER to continue...");
				System.in.read();
				sql = "SELECT Id, Name, Location FROM Employees;";
				try (Statement statement = connection.createStatement();
						ResultSet resultSet = statement.executeQuery(sql)) {
					while (resultSet.next()) {
						System.out.println(
								resultSet.getInt(1) + " " + resultSet.getString(2) + " " + resultSet.getString(3));
					}
				}

				System.out.println("All done.");
			}
		} catch (Exception e) {
			System.out.println();
			e.printStackTrace();
		}
	}
}
```
From the project folder, build the project and create a jar package using the following command:
```terminal
mvn package
```
```results
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building SqlServerSample 1.0.0
[INFO] ------------------------------------------------------------------------
...
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ SqlServerSample ---
[INFO] Building jar: C:\Users\usr1\SqlServerSample\target\SqlServerSample-1.0.0.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 1.687 s
[INFO] Finished at: 2016-11-03T22:06:24-07:00
[INFO] Final Memory: 20M/493M
[INFO] ------------------------------------------------------------------------
```
Now run the application. You can remove the "-q" in the command below to show info messages from Maven.
```terminal
mvn -q exec:java "-Dexec.mainClass=com.sqlsamples.App"
```
```results
Connect to SQL Server and demo Create, Read, Update and Delete operations.
Connecting to SQL Server ...
Done.
Dropping and creating database 'SampleDB' ...
Done.
Creating sample table with data, press ENTER to continue...
Done.
Inserting a new row into table, press ENTER to continue...
1 row(s) inserted
Updating 'Location' for user 'Nikita', press ENTER to continue...
1 row(s) updated
Deleting user 'Jared', press ENTER to continue...
1 row(s) deleted
Reading data from table, press ENTER to continue...
2 Nikita United States
3 Tom Germany
4 Jake United States
All done.
```
>You created your first Java + SQL Server app with Maven! Check out the next section to create a Java App using an ORM!

## Step 2.2 Create a Java app that connects to SQL Server using the popular framework Hibernate

In your home directory, create your Maven starter package. This will create the project directory with a basic Maven project and pom.xml file. This step can also be performed in an IDE such as NetBeans or Eclipse.
```terminal
mvn archetype:generate "-DgroupId=com.sqlsamples" "-DartifactId=SqlServerHibernateSample" "-DarchetypeArtifactId=maven-archetype-quickstart" "-Dversion=1.0.0"
```
```results
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building Maven Stub Project (No POM) 1
[INFO] ------------------------------------------------------------------------
...
[INFO] Using following parameters for creating project from Old (1.x) Archetype: maven-archetype-quickstart:1.0
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: basedir, Value: C:\Users\usr1
[INFO] Parameter: package, Value: com.sqlsamples
[INFO] Parameter: artifactId, Value: SqlServerHibernateSample
[INFO] Parameter: packageName, Value: com.sqlsamples
[INFO] Parameter: version, Value: 1.0.0
[INFO] project created from Old (1.x) Archetype in dir: C:\Users\usr1\SqlServerHibernateSample
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2.945 s
[INFO] Finished at: 2016-11-03T22:09:08-07:00
[INFO] Final Memory: 16M/495M
[INFO] ------------------------------------------------------------------------
```
Change directories into your newly created project.
```terminal
cd SqlServerHibernateSample
```
Add the Microsoft JDBC Driver for SQL Server and Hibernate dependencies to your Maven project by opening your favorite text editor and copying and pasting the following lines into your **pom.xml** file. Do not overwrite the existing values prepopulated in the file. The JDBC and Hibernate dependencies must be pasted within the larger "dependencies" section (<dependency> </dependency>).

Specify the version of Java to compile the project against by adding the "properties" section below into the pom.xml file. Add the <properties> section below after the <dependencies> section.

Save and close the file.

```xml
<!-- prepopulated content by Maven -->
<dependencies>
    <dependency>
        <groupId>com.microsoft.sqlserver</groupId>
        <artifactId>mssql-jdbc</artifactId>
        <version>6.1.0.jre8</version>
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
For this sample, let's create two tables. The first will hold data about "users". Create a **User.java** file in your Maven project located at: SqlServerHibernateSample\src\main\java\com\sqlsamples\User.java

Copy and paste the code below into your newly created **User.java** file. Save and close the file.
```java
package com.sqlsamples;

import java.util.List;
import java.util.ArrayList;
import javax.persistence.*;

@Entity
@Table(name = "Users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String firstName;
	private String lastName;

	// Specify a 1:Many mapping between User and Task via the "user" field in
	// the "Tasks" class.
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Task> tasks = new ArrayList<Task>();

	public User() {
	}

	public User(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFullName() {
		return this.firstName + " " + this.lastName;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	@Override
	public String toString() {
		return "User [id=" + this.id + ", name=" + this.getFullName() + "]";
	}
}
```
Let's create a second table to assign tasks to users. Create a **Task.java** file in your Maven project located at: SqlServerHibernateSample\src\main\java\com\sqlsamples\Task.java.

Copy and paste the code below into your newly created **Task.java** file. Save and close the file.
```java
package com.sqlsamples;

import java.util.Date;
import javax.persistence.*;
import java.text.SimpleDateFormat;

@Entity
@Table(name = "Tasks")
public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private Boolean isComplete;
	@Temporal(TemporalType.TIMESTAMP)
	private Date dueDate;

	// Specify a Many:1 mapping between Task and User
	@ManyToOne
	private User user;

	public Task() {
	}

	public Task(String title, Date dueDate) {
		this.title = title;
		this.dueDate = dueDate;
		this.isComplete = false;
	}

	public Task(String title, Date dueDate, User user) {
		this.title = title;
		this.dueDate = dueDate;
		this.isComplete = false;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getDueDate() {
		return this.dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	@Override
	public String toString() {
		SimpleDateFormat ft = new SimpleDateFormat("E yyyy.MM.dd 'at' hh:mm:ss a zzz");
		return "Task [id=" + this.id + ", title=" + this.title + ", dueDate=" + ft.format(this.dueDate)
				+ ", isComplete=" + this.isComplete.toString() + "]";
	}
}
```
Replace the code in the **App.java** file in your Maven project located at: SqlServerHibernateSample\src\main\java\com\sqlsamples\App.java.

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to update the username and password with your own. Save and close the file.

```java
package com.sqlsamples;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.DriverManager;
import java.text.SimpleDateFormat;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 * Java CRUD sample with Hibernate and SQL Server
 *
 */
public class App {
	String connectionUrl = "jdbc:sqlserver://localhost:1433"; // update me
	String userName = "sa"; // update me
	String password = "your_password"; // update me
	String sampleDatabaseName = "SampleDB";

	// Main entry point
	public static void main(String[] args) {
		App app = new App();
		app.runDemo();
	}

	// Helper to run the demp app
	public void runDemo()
    {
        // Configure Hibernate logging to only log SEVERE errors
        @SuppressWarnings("unused")
        org.jboss.logging.Logger logger = org.jboss.logging.Logger.getLogger("org.hibernate");
        java.util.logging.Logger.getLogger("org.hibernate").setLevel(java.util.logging.Level.SEVERE);

        System.out.println("**Java CRUD sample with Hibernate and SQL Server **\n");
		try {
            // We're creating the Hibernate configuration via code. An alternative is to use a 'hibernate.cfg.xml' file.
            Configuration cfg = createHibernateConfiguration();

            // We're mapping POJO classes to Tables via Hibernate Annotations. An alternative is to use Hibernate mapping xml files.
            cfg.addAnnotatedClass(User.class);
            cfg.addAnnotatedClass(Task.class);

            // Hibernate needs an existing database. Use JDBC to create one for this sample.
            createSampleDatabase();

            // Create the Hibernate SessionFactory and Session.
            // This causes Hibernate to create Tables and Relationships in the database from our Annotated classes.
            try (SessionFactory sessionFactory = cfg.buildSessionFactory();
                 Session session = sessionFactory.openSession()) {

                System.out.println("Created database schema from Java classes.\n");
                session.beginTransaction();

                // Create demo: Create a User instance and save it to the database
                User newUser = new User("Anna", "Shrestinian");
                session.save(newUser);
                System.out.println("Created User: " + newUser.toString());

                // Create demo: Create a Task instance and save it to the database
                SimpleDateFormat sdf = new SimpleDateFormat("MM-dd-yyyy");
                Task newTask = new Task("Ship Helsinki", sdf.parse("04-01-2017"));
                session.save(newTask);
                System.out.println("Created Task: " + newTask.toString());

                // Association demo: Assign task to user
                newTask.setUser(newUser);
                session.save(newTask);
                System.out.println("Assigned Task: '" + newTask.getTitle() + "' to user '" + newUser.getFullName() + "'\n");

                // Read demo: find incomplete tasks assigned to user 'Anna'
                System.out.println("Incomplete tasks assigned to 'Anna':");
                String hqlQuery = "from Task where isComplete = false and user.firstName = :paramFirstName";
                List<Task> incompleteTasks = session.createQuery(hqlQuery, Task.class)
                                             .setParameter("paramFirstName", "Anna")
                                             .getResultList();
                for(Task theTask : incompleteTasks) {
                    System.out.println(theTask.toString());
                }

                // Update demo: change the 'dueDate' of a task
                hqlQuery = "from Task";
                Task taskToUpdate = session.createQuery(hqlQuery, Task.class)
                                    .getResultList()
                                    .get(0); // get the first task
                System.out.println("\nUpdating task: " + taskToUpdate.toString());
                taskToUpdate.setDueDate(sdf.parse("06-30-2016"));
                session.save(taskToUpdate);
                System.out.println("dueDate changed: " + taskToUpdate.toString());

                // Delete demo: delete all tasks with a dueDate in 2016
                System.out.println("\nDeleting all tasks with a dueDate in 2016");
                hqlQuery = "from Task where dueDate < :paramDate";
                List<Task> tasksToDelete = session.createQuery(hqlQuery, Task.class)
                                           .setParameter("paramDate", sdf.parse("12-31-2016"))
                                           .getResultList();
                for(Task theTask : tasksToDelete) {
                    System.out.println("Deleting task:" + theTask.toString());
                    session.delete(theTask);
                }

                // Show tasks after the 'Delete' operation - there should be 0 tasks
                System.out.println("\nTasks after delete:");
                hqlQuery = "from Task";
                List<Task> tasksAfterDelete = session.createQuery(hqlQuery, Task.class)
                                              .getResultList();
                if(tasksAfterDelete.isEmpty()) {
                    System.out.println("[None]");
                }
                else {
                    for(Task theTask : tasksAfterDelete) {
                        System.out.println(theTask.toString());
                    }
                }

                session.getTransaction().commit();
            }
            System.out.println("All done.");

        } catch (Exception e) {
            System.out.println();
            e.printStackTrace();
        }
    }

	// Hibernate needs an existing database. Use JDBC to create one for this
	// sample.
	private void createSampleDatabase() throws java.sql.SQLException {
		// Load SQL Server JDBC driver and establish connection.
		String url = this.connectionUrl + ";databaseName=master;" + "user=" + this.userName + ";password="
				+ this.password;
		System.out.print("Connecting to SQL Server ... ");
		try (Connection connection = DriverManager.getConnection(url)) {
			System.out.println("Done.");

			// Create a sample database
			System.out.print("Dropping and creating database '" + this.sampleDatabaseName + "' ... ");
			String sql = "DROP DATABASE IF EXISTS [" + this.sampleDatabaseName + "]; CREATE DATABASE ["
					+ this.sampleDatabaseName + "]";
			try (Statement statement = connection.createStatement()) {
				statement.executeUpdate(sql);
				System.out.println("Done.\n");
			}
		}
	}

	// Create Hibernate configuration via code instead of using a
	// 'hibernate.cfg.xml' file.
	private Configuration createHibernateConfiguration() {
		String url = this.connectionUrl + ";databaseName=" + this.sampleDatabaseName;
        Configuration cfg = new Configuration()
				.setProperty("hibernate.connection.driver_class", "com.microsoft.sqlserver.jdbc.SQLServerDriver")
				.setProperty("hibernate.connection.url", url)
				.setProperty("hibernate.connection.username", this.userName)
				.setProperty("hibernate.connection.password", this.password)
				.setProperty("hibernate.connection.autocommit", "true")
				.setProperty("hibernate.show_sql", "false");

		// Tell Hibernate to use the 'SQL Server' dialect when dynamically
		// generating SQL queries
		cfg.setProperty("hibernate.dialect", "org.hibernate.dialect.SQLServerDialect");

		// Tell Hibernate to show the generated T-SQL
		cfg.setProperty("hibernate.show_sql", "false");

		// This is ok during development, but not recommended in production
		// See: http://stackoverflow.com/questions/221379/hibernate-hbm2ddl-auto-update-in-production
		cfg.setProperty("hibernate.hbm2ddl.auto", "update");
		return cfg;
	}
}
```
From the project folder, build the project and create a jar package using the following command:
```terminal
mvn package
```
```results
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building SqlServerHibernateSample 1.0.0
[INFO] ------------------------------------------------------------------------
...
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ SqlServerHibernateSample ---
[INFO] Building jar: C:\Users\usr1\SqlServerHibernateSample\target\SqlServerHibernateSample-1.0.0.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 1.834 s
[INFO] Finished at: 2016-11-03T22:18:00-07:00
[INFO] Final Memory: 22M/498M
[INFO] ------------------------------------------------------------------------
```
Now run the application. You can remove the "-q" in the command below to show info messages from Maven.
```terminal
mvn -q exec:java "-Dexec.mainClass=com.sqlsamples.App"
```
```results
**Java CRUD sample with Hibernate and SQL Server **

Connecting to SQL Server ... Done.
Dropping and creating database 'HibernateSampleDB' ... Done.

Created database schema from Java classes.

Created User: User [id=1, name=Anna Shrestinian]
Created Task: Task [id=1, title=Ship Helsinki, dueDate=Sat 2017.04.01 at 12:00:00 AM PDT, isComplete=false]
Assigned Task: 'Ship Helsinki' to user 'Anna Shrestinian'

Incomplete tasks assigned to 'Anna':
Task [id=1, title=Ship Helsinki, dueDate=Sat 2017.04.01 at 12:00:00 AM PDT, isComplete=false]

Updating task: Task [id=1, title=Ship Helsinki, dueDate=Sat 2017.04.01 at 12:00:00 AM PDT, isComplete=false]
dueDate changed: Task [id=1, title=Ship Helsinki, dueDate=Thu 2016.06.30 at 12:00:00 AM PDT, isComplete=false]

Deleting all tasks with a dueDate in 2016
Deleting task:Task [id=1, title=Ship Helsinki, dueDate=Thu 2016.06.30 at 12:00:00 AM PDT, isComplete=false]

Tasks after delete:
[None]
All done.
```
> Congrats you created your first two Java apps with SQL Server! Check out the next section to learn about how you can make your Java apps faster with SQL Server’s Columnstore feature






```javascript
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    // Create connection to database
    var config = {
      userName: 'sa', // update me
      password: 'your_password', // update me
      server: 'localhost',
      options: {
          database: 'SampleDB'
      }
    }
    var connection = new Connection(config);

    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Connected');
      }
    });
```

Run the application.

```terminal
  node connect.js
```

```results
  Connected
```

Using your favorite text editor, create a file called CreateTestData.sql in the SqlServerSample folder. Copy and paste the following the T-SQL code inside it. This will create a schema, table, and insert a few rows.

```sql
CREATE SCHEMA TestSchema;
GO

CREATE TABLE TestSchema.Employees (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(50),
  Location NVARCHAR(50)
);
GO

INSERT INTO TestSchema.Employees (Name, Location) VALUES
(N'Jared', N'Australia'),
(N'Nikita', N'India'),
(N'Tom', N'Germany');
GO

SELECT * FROM TestSchema.Employees;
GO
```

Connect to the database using sqlcmd and run the SQL script to create the schema, table, and insert some rows.

```terminal
  sqlcmd -S localhost -U sa -P your_password -d SampleDB -i ./CreateTestData.sql
```

```results
CREATE SCHEMA TestSchema;

Executed in 0 ms
CREATE TABLE TestSchema.Employees (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(50),
  Location NVARCHAR(50)
);

Executed in 0 ms
INSERT INTO TestSchema.Employees (Name, Location) VALUES
(N'Jared', N'Australia'),
(N'Nikita', N'India'),
(N'Tom', N'Germany');

Executed in 0 ms
SELECT * FROM TestSchema.Employees;
Id  Name    Location
--  ------  ---------
1   Jared   Australia
2   Nikita  India
3   Tom     Germany

3 row(s) returned

Executed in 1 ms
```

Using your favorite text editor, create a new file called crud.js in the SqlServerSample folder. Copy and paste the following code inside it. This will insert, update, delete, and read a few rows.

```javascript
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');

// Create connection to database
var config = {
  userName: 'sa', // update me
  password: 'your_password', // update me
  server: 'localhost',
  options: {
    database: 'SampleDB'
  }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');

    // Execute all functions in the array serially
    async.waterfall([
      function Start(callback) {
        console.log('Starting...');
        callback(null, 'Jake', 'United States');
      },
      function Insert(name, location, callback) {
        console.log("Inserting '" + name + "' into Table...");

        request = new Request(
          'INSERT INTO TestSchema.Employees (Name, Location) OUTPUT INSERTED.Id VALUES (@Name, @Location);',
          function(err, rowCount, rows) {
            if (err) {
              callback(err);
            } else {
              console.log(rowCount + ' row(s) inserted');
              callback(null, 'Nikita', 'United States');
            }
          });
        request.addParameter('Name', TYPES.NVarChar, name);
        request.addParameter('Location', TYPES.NVarChar, location);

        // Execute SQL statement
        connection.execSql(request);
      },
      function Update(name, location, callback) {
        console.log("Updating Location to '" + location + "' for '" + name + "'...");

        // Update the employee record requested
        request = new Request(
          'UPDATE TestSchema.Employees SET Location=@Location WHERE Name = @Name;',
          function(err, rowCount, rows) {
            if (err) {
              callback(err);
            } else {
              console.log(rowCount + ' row(s) updated');
              callback(null, 'Jared');
            }
          });
        request.addParameter('Name', TYPES.NVarChar, name);
        request.addParameter('Location', TYPES.NVarChar, location);

        // Execute SQL statement
        connection.execSql(request);
      },
      function Delete(name, callback) {
        console.log("Deleting '" + name + "' from Table...");

        // Delete the employee record requested
        request = new Request(
          'DELETE FROM TestSchema.Employees WHERE Name = @Name;',
          function(err, rowCount, rows) {
            if (err) {
              callback(err);
            } else {
              console.log(rowCount + ' row(s) deleted');
              callback(null);
            }
          });
        request.addParameter('Name', TYPES.NVarChar, name);

        // Execute SQL statement
        connection.execSql(request);
      },
      function Read(callback) {
        console.log('Reading rows from the Table...');

        // Read all rows from table
        request = new Request(
        'SELECT Id, Name, Location FROM TestSchema.Employees;',
        function(err, rowCount, rows) {
          if (err) {
            callback(err);
          } else {
            console.log(rowCount + ' row(s) returned');
            callback(null);
          }
        });

        // Print the rows read
        var result = ""; request.on('row', function(columns) {
          columns.forEach(function(column) {
            if (column.value === null) {
              console.log('NULL');
            } else {
              result += column.value + " ";
            }
          });
          console.log(result);
          result = "";
        });

        // Execute SQL statement
        connection.execSql(request);
      }
    ],
    function Complete(err, result) {
      if (err) {
        callback(err);
      } else {
        console.log("Done!");
      }
    }
                   )
  }
});
```

Run the crud.js app to see the results

```terminal
  node crud.js
```

```results
Connected
Starting...
Inserting 'Jake' into Table...
1 row(s) inserted
Updating Location to 'United States' for 'Nikita'...
1 row(s) updated
Deleting 'Jared' from Table...
1 row(s) deleted
Reading rows from the Table...
2 Nikita United States
3 Tom Germany
4 Jake United States
3 row(s) returned
Done!
```

## Step 2.2 Create a Node.js app that connects to SQL Server using the popular Sequelize ORM

Create the app directory and initialize Node dependencies.

```terminal
    cd ~/
    mkdir SqlServerSequelizeSample
    cd SqlServerSequelizeSample
    npm init -y
    #Install tedious and Sequelize module in your project folder
    npm install tedious
    npm install sequelize
```
a. Open your favourite text editor and create the file orm.js in the directory SqlServerSequelizeSample. 
b. Paste the contents below into orm.js 
c. Update the variable for password to use your own password specified in the first module. 
d. Save and close orm.js

```javascript
    var Sequelize = require('sequelize');
    var userName = 'sa';
    var password = 'your_password'; // update me
    var hostName = 'localhost';
    var sampleDbName = 'SampleDB';

    // Initialize Sequelize to connect to sample DB
    var sampleDb = new Sequelize(sampleDbName, userName, password, {
        dialect: 'mssql',
        host: hostName,
        port: 1433, // Default port
        logging: false, // disable logging; default: console.log

        dialectOptions: {
            requestTimeout: 30000 // timeout = 30 seconds
        }
    });

    // Define the 'User' model
    var User = sampleDb.define('user', {
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING
    });

    // Define the 'Task' model
    var Task = sampleDb.define('task', {
        title: Sequelize.STRING,
        dueDate: Sequelize.DATE,
        isComplete: Sequelize.BOOLEAN
    });

    // Model a 1:Many relationship between User and Task
    User.hasMany(Task);

    console.log('**Node CRUD sample with Sequelize and MSSQL **');

    // Tell Sequelize to DROP and CREATE tables and relationships in the database
    sampleDb.sync({force: true})
    .then(function() {
        console.log('\nCreated database schema from model.');

        // Create demo: Create a User instance and save it to the database
        User.create({firstName: 'Anna', lastName: 'Shrestinian'})
        .then(function(user) {
            console.log('\nCreated User:', user.get({ plain: true}));

            // Create demo: Create a Task instance and save it to the database
            Task.create({
                title: 'Ship Helsinki', dueDate: new Date(2017,04,01), isComplete: false
            })
            .then(function(task) {
                console.log('\nCreated Task:', task.get({ plain: true}));

                // Association demo: Assign task to user
                user.setTasks([task])
                .then(function() {
                    console.log('\nAssigned task \''
                + task.title
                + '\' to user ' + user.firstName
                + ' ' + user.lastName);

                    // Read demo: find incomplete tasks assigned to user 'Anna''
                    User.findAll({
                        where: { firstName: 'Anna'},
                        include: [{
                            model: Task,
                            where: { isComplete: false }
                        }]
                    })
                    .then(function(users) {
                        console.log('\nIncomplete tasks assigned to Anna:\n',
                    JSON.stringify(users));

                        // Update demo: change the 'dueDate' of a task
                        Task.findById(1).then(function(task) {
                            console.log('\nUpdating task:',
                    task.title + ' ' + task.dueDate);
                            task.update({
                                dueDate: new Date(2016,06,30)
                            })
                            .then(function() {
                                console.log('dueDate changed:',
                        task.title + ' ' + task.dueDate);

                                // Delete demo: delete all tasks with a dueDate in 2016
                                console.log('\nDeleting all tasks with with a dueDate in 2016');
                                Task.destroy({
                                    where: { dueDate: {$lte: new Date(2016,12,31)}}
                                })
                                .then(function() {
                                    Task.findAll()
                                    .then(function(tasks) {
                                        console.log('Tasks in database after delete:',
                            JSON.stringify(tasks));
                                        console.log('\nAll done!');
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
```
Run the orm.js app

```terminal
    node orm.js
```

```results
    **Node CRUD sample with Sequelize and MSSQL **

    Created database schema from model.

    Created User: { id: 1,
      firstName: 'Anna',
      lastName: 'Shrestinian',
      updatedAt: 2016-10-07T03:40:23.000Z,
      createdAt: 2016-10-07T03:40:23.000Z }

    Created Task: { id: 1,
      title: 'Ship Helsinki',
      dueDate: 2017-05-01T07:00:00.000Z,
      isComplete: false,
      updatedAt: 2016-10-07T03:40:23.000Z,
      createdAt: 2016-10-07T03:40:23.000Z }

    Assigned task 'Ship Helsinki' to user Anna Shrestinian

    Incomplete tasks assigned to Anna:
     [{"id":1,"firstName":"Anna","lastName":"Shrestinian",
     "createdAt":"2016-10-07T03:40:23.000Z",
     "updatedAt":"2016-10-07T03:40:23.000Z",
     "tasks":[{"id":1,"title":"Ship Helsinki",
     "dueDate":"2017-05-01T07:00:00.000Z",
     "isComplete":false,
     "createdAt":"2016-10-07T03:40:23.000Z",
     "updatedAt":"2016-10-07T03:40:23.000Z",
     "userId":1}]}]

    Updating task: Ship Helsinki Mon May 01 2017 00:00:00 GMT-0700 (PDT)
    dueDate changed: Ship Helsinki Sat Jul 30 2016 00:00:00 GMT-0700 (PDT)

    Deleting all tasks with with a dueDate in 2016
    Tasks in database after delete: []

    All done!
```

> Congrats you created your first two Node.js apps with SQL Server! Check out the next section to learn about how you can make your Node.js apps faster with SQL Server’s Columnstore feature

