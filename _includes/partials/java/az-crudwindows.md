
> In this section you will create two simple Java apps. One of them will perform basic Insert, Update, Delete, and Select, while the second one will make use of [Hibernate](http://hibernate.org/orm/), one of the most popular Java Object-relational mappers, to execute the same operations.

## Step 2.1 Get Connection Information to use in Connection Strings, and Create a Firewall Rule.

{% include partials/get_azure_sql_connection_info.md %}

## Step 2.2 Create a Java app that connects to Azure SQL and executes queries

In your home directory, create your Maven starter package. This will create the project directory with a basic Maven project and pom.xml file. This step can also be performed in an IDE such as NetBeans or Eclipse.
This may cause a number of things to be downloaded.

```terminal
    mvn archetype:generate "-DgroupId=com.sqlsamples" "-DartifactId=AzureSqlSample" "-DarchetypeArtifactId=maven-archetype-quickstart" "-Dversion=1.0.0"
```

```results
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Archetype: maven-archetype-quickstart:1.4
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: groupId, Value: com.sqlsamples
[INFO] Parameter: artifactId, Value: AzureSqlSample
[INFO] Parameter: version, Value: 1.0.0
[INFO] Parameter: package, Value: com.sqlsamples
[INFO] Parameter: packageInPathFormat, Value: com/sqlsamples
[INFO] Parameter: package, Value: com.sqlsamples
[INFO] Parameter: groupId, Value: com.sqlsamples
[INFO] Parameter: artifactId, Value: AzureSqlSample
[INFO] Parameter: version, Value: 1.0.0
[INFO] Project created from Archetype in dir: C:\Users\User\AzureSqlSample
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  59.095 s
[INFO] Finished at: 2020-04-09T12:00:49-07:00
[INFO] ------------------------------------------------------------------------
```

Change directories into your newly created project.

```terminal
    cd AzureSqlSample
```

You should already have a file called **pom.xml** in your Maven project located at: _\AzureSqlSample_

Open this file in your favorite text editor and replace the contents with the code below to add the Microsoft JDBC Driver for SQL Server to your Maven project and specify the version of Java to compile the project against.

Save and close the file.

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.sqlsamples</groupId>
  <artifactId>AzureSqlSample</artifactId>
  <version>1.0.0</version>

  <name>AzureSqlSample</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>com.microsoft.sqlserver</groupId>
        <artifactId>mssql-jdbc</artifactId>
        <version>7.0.0.jre8</version>
    </dependency>
  </dependencies>

  <build>
    <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
      <plugins>
        <!-- clean lifecycle, see https://maven.apache.org/ref/current/maven-core/lifecycles.html#clean_Lifecycle -->
        <plugin>
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.1.0</version>
        </plugin>
        <!-- default lifecycle, jar packaging: see https://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_jar_packaging -->
        <plugin>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.8.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-jar-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-install-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-deploy-plugin</artifactId>
          <version>2.8.2</version>
        </plugin>
        <!-- site lifecycle, see https://maven.apache.org/ref/current/maven-core/lifecycles.html#site_Lifecycle -->
        <plugin>
          <artifactId>maven-site-plugin</artifactId>
          <version>3.7.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-project-info-reports-plugin</artifactId>
          <version>3.0.0</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>
```

You should already have a file called **App.java** in your Maven project located at: AzureSqlSample\src\main\java\com\sqlsamples\App.java

Open this file in your favorite text editor and replace the contents with the code below. Don't forget to replace the username and password with your own. Save and close the file.

```java
package com.sqlsamples;

import java.sql.Connection;
import java.sql.DriverManager;

public class App {

    public static void main(String[] args) {

        String connectionUrl = "jdbc:sqlserver://your_server_name.database.windows.net;databaseName=your_database_name;user=your_user;password=your_password";

        try {
            // Load SQL Server JDBC driver and establish connection.
            System.out.print("Connecting to Azure SQL ... ");
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

Build the project and create a jar package using the following command from your project root (AzureSqlSample):

```terminal
    mvn package
```

```results
[INFO] Scanning for projects...
[INFO] Building jar: C:\Users\User\AzureSqlSample\target\AzureSqlSample-1.0.0.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  22.447 s
[INFO] Finished at: 2020-04-09T12:04:47-07:00
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

        System.out.println("Connect to Azure SQL and demo Create, Read, Update and Delete operations.");

        //Update the username and password below
        String connectionUrl = "jdbc:sqlserver://your_server_name.database.windows.net;databaseName=your_database_name;user=your_user;password=your_password";

        try {
            // Load Azure SQL JDBC driver and establish connection.
            System.out.print("Connecting to Azure SQL ... ");
            try (Connection connection = DriverManager.getConnection(connectionUrl)) {
                System.out.println("Done.");

		// Delete the Employees table if it exists
		try (Statement statement = connection.createStatement()) {
                    statement.executeUpdate("Drop table if exists Employees");
                    System.out.println("Done.");
		} catch (Exception e) {
	            System.out.println();
        	    e.printStackTrace();
		}

                // Create a Table and insert some sample data
                System.out.print("Creating sample table with data, press ENTER to continue...");
                System.in.read();
                String sql = new StringBuilder().append("CREATE TABLE Employees ( ")
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
                connection.close();
                System.out.println("All done.");
            }
        } catch (Exception e) {
            System.out.println();
            e.printStackTrace();
	}
	finally {
	
		try (Connection connection = DriverManager.getConnection(connectionUrl)){
                // Delete the Employees table if it exists
		Statement statement = connection.createStatement();
                statement.executeUpdate("Drop table if exists Employees");
                System.out.println("Table cleaned up.");		
		} catch (Exception e) {
	            System.out.println();
        	    e.printStackTrace();
		}
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
[INFO] Building AuzreSqlSample1.0.0
[INFO] ------------------------------------------------------------------------
...
[INFO] --- maven-jar-plugin:3.0.2:jar (default-jar) @ AzureSqlSample ---
[INFO] Building jar: C:\Users\User\AzureSqlSample\target\AzureSqlSample-1.0.0.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  3.846 s
[INFO] Finished at: 2020-04-09T12:29:52-07:00
[INFO] ------------------------------------------------------------------------
```

Now run the application. You can remove the "-q" in the command below to show info messages from Maven.

```terminal
mvn -q exec:java "-Dexec.mainClass=com.sqlsamples.App"
```

```results
Connect to Azure SQL and demo Create, Read, Update and Delete operations.
Connecting to Azure SQL ... Done.
Done.
Creating sample table with data, press ENTER to continue...
Done.
Inserting a new row into table, press ENTER to continue...1 row(s) inserted
Updating 'Location' for user 'Nikita', press ENTER to continue...
1 row(s) updated
Deleting user 'Jared', press ENTER to continue...1 row(s) deleted
Reading data from table, press ENTER to continue...
2 Nikita United States
3 Tom Germany
4 Jake United States
All done.
Table cleaned up.
```

>You created your first Java + Azure SQL app with Maven! Check out the next section to create a Java App using an ORM!

## Step 2.3 Create a Java app that connects to SQL Server using the popular framework Hibernate

In your home directory, create your Maven starter package. This will create the project directory with a basic Maven project and pom.xml file. This step can also be performed in an IDE such as NetBeans or Eclipse.

```terminal
mvn archetype:generate "-DgroupId=com.sqlsamples" "-DartifactId=AzureSqlHibernateSample" "-DarchetypeArtifactId=maven-archetype-quickstart" "-Dversion=1.0.0"
```

```results
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building Maven Stub Project (No POM) 1
[INFO] ------------------------------------------------------------------------
...
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Old (1.x) Archetype: maven-archetype-quickstart:1.0
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: basedir, Value: C:\Users\User
[INFO] Parameter: package, Value: com.sqlsamples
[INFO] Parameter: groupId, Value: com.sqlsamples
[INFO] Parameter: artifactId, Value: AzureSqlHibernateSample
[INFO] Parameter: packageName, Value: com.sqlsamples
[INFO] Parameter: version, Value: 1.0.0
[INFO] project created from Old (1.x) Archetype in dir: C:\Users\User\AzureSqlHibernateSample
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  6.151 s
[INFO] Finished at: 2020-04-09T13:38:30-07:00
[INFO] ------------------------------------------------------------------------

```

Change directories into your newly created project.

```terminal
cd AzureSqlHibernateSample
```

You should already have a file called **pom.xml** in your Maven project located at: _\AzureSqlHibernateSample_

Open this file in your favorite text editor and replace the contents with the code below to add the Microsoft JDBC Driver for SQL Server and Hibernate to your Maven project and specify the version of Java to compile the project against.

Save and close the file.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.sqlsamples</groupId>
  <artifactId>AzureSqlHibernateSample</artifactId>
  <packaging>jar</packaging>
  <version>1.0.0</version>
  <name>AzureSqlHibernateSample</name>
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
            <version>7.0.0.jre8</version>
        </dependency>
        <!-- add Hibernate -->
        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-core</artifactId>
            <version>5.2.3.Final</version>
        </dependency>
<dependency>
    <groupId>javax.xml.bind</groupId>
     <artifactId>jaxb-api</artifactId>
    <version>2.3.0</version>
 </dependency>
  </dependencies>
 <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
  </properties>
</project>
```

For this sample, let's create two tables. The first will hold data about "users". Create a **User.java** file in your Maven project located at: AzureSqlHibernateSample\src\main\java\com\sqlsamples\User.java

Copy and paste the code below into your newly created **User.java** file. Save and close the file.

```java
package com.sqlsamples;

import java.util.Date;
import javax.persistence.*;
import java.text.SimpleDateFormat;

@Entity
@Table(name = "Tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
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

Let's create a second table to assign tasks to users. Create a **Task.java** file in your Maven project located at: AzureSqlHibernateSample\src\main\java\com\sqlsamples\Task.java.

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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
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

Replace the code in the **App.java** file in your Maven project located at: AzureSqlHibernateSample\src\main\java\com\sqlsamples\App.java.

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
 * Java CRUD sample with Hibernate and Azure SQL
 *
 */
public class App {
    String connectionUrl = "jdbc:sqlserver://your_server_name.database.windows.net"; // update me
    String userName = "your_user"; // update me
    String password = "your_password"; // update me
    String sampleDatabaseName = "your_database"; // update me

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

        System.out.println("**Java CRUD sample with Hibernate and Azure SQL **\n");
        try {
            // We're creating the Hibernate configuration via code. An alternative is to use a 'hibernate.cfg.xml' file.
            Configuration cfg = createHibernateConfiguration();

            // We're mapping POJO classes to Tables via Hibernate Annotations. An alternative is to use Hibernate mapping xml files.
            cfg.addAnnotatedClass(User.class);
            cfg.addAnnotatedClass(Task.class);

	    System.out.println("added classes to config");
        

            // Hibernate needs an existing database. We already have one created.

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
[INFO] Building AzureSqlHibernateSample 1.0.0
[INFO] ------------------------------------------------------------------------
...
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ AzureSqlHibernateSample ---
[INFO] Building jar: C:\Users\User\AzureSqlHibernateSample\target\AzureSqlHibernateSample-1.0.0.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  11.368 s
[INFO] Finished at: 2020-04-09T14:24:57-07:00
[INFO] ------------------------------------------------------------------------
```

Now run the application. You can remove the "-q" in the command below to show info messages from Maven.

```terminal
mvn -q exec:java "-Dexec.mainClass=com.sqlsamples.App"
```

```results
**Java CRUD sample with Hibernate and SQL Server **

Created database schema from Java classes.

Created User: User [id=4, name=Anna Shrestinian]
Created Task: Task [id=5, title=Ship Helsinki, dueDate=Sat 2017.04.01 at 12:00:00 AM PDT, isComplete=false]
Assigned Task: 'Ship Helsinki' to user 'Anna Shrestinian'

Incomplete tasks assigned to 'Anna':
Task [id=5, title=Ship Helsinki, dueDate=Sat 2017.04.01 at 12:00:00 AM PDT, isComplete=false]

Updating task: Task [id=5, title=Ship Helsinki, dueDate=Sat 2017.04.01 at 12:00:00 AM PDT, isComplete=false]
dueDate changed: Task [id=5, title=Ship Helsinki, dueDate=Thu 2016.06.30 at 12:00:00 AM PDT, isComplete=false]

Deleting all tasks with a dueDate in 2016
Deleting task:Task [id=5, title=Ship Helsinki, dueDate=Thu 2016.06.30 at 12:00:00 AM PDT, isComplete=false]

Tasks after delete:
[None]
```

> Congratulations! You created your first two Java apps with Azure SQL! Check out the next section to learn about how you can make your Java apps faster with Azure SQL’s Columnstore feature.
