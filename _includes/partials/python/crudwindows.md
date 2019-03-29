
> In this section you will create a simple Python app. The Python app will perform basic Insert, Update, Delete, and Select.

## Step 2.1 Install the Python driver for SQL Server

```terminal
pip install virtualenv #To create virtual environments to isolate package installations between projects
virtualenv venv
venv\Scripts\activate
pip install pyodbc
```

## Step 2.2 Create a database for your application

Connect to SQL Server using SQLCMD and execute the following statement to create a database called SampleDB.

```terminal
sqlcmd -S localhost -U sa -P your_password -Q "CREATE DATABASE SampleDB;"
```

## Step 2.3 Create a Python app that connects to SQL Server and executes queries

Create a new folder for the sample

```terminal
mkdir SqlServerSample
cd SqlServerSample
```

Execute the T-SQL scripts below in the terminal with sqlcmd to a table and insert some row.

```terminal
sqlcmd -S localhost -U sa -P your_password -Q "USE DATABASE SampleDB; CREATE TABLE Employees (Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY, Name NVARCHAR(50), Location NVARCHAR(50));"
sqlcmd -S localhost -U sa -P your_password -Q "USE DATABASE SampleDB; INSERT INTO Employees (Name, Location) VALUES (N'Jared', N'Australia'), (N'Nikita', N'India'), (N'Tom', N'Germany');"
```

Using your favorite text editor, create a new file called crud.py in the SqlServerSample folder. Paste the code below inside into the new file. This will insert, update, delete, and read a few rows.

```python
import pyodbc
server = 'localhost'
database = 'SampleDB'
username = 'sa'
password = 'your_password'
cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = cnxn.cursor()

print ('Inserting a new row into table')
#Insert Query
tsql = "INSERT INTO Employees (Name, Location) VALUES (?,?);"
with cursor.execute(tsql,'Jake','United States'):
    print ('Successfully Inserted!')


#Update Query
print ('Updating Location for Nikita')
tsql = "UPDATE Employees SET Location = ? WHERE Name = ?"
with cursor.execute(tsql,'Sweden','Nikita'):
    print ('Successfully Updated!')


#Delete Query
print ('Deleting user Jared')
tsql = "DELETE FROM Employees WHERE Name = ?"
with cursor.execute(tsql,'Jared'):
    print ('Successfully Deleted!')


#Select Query
print ('Reading data from table')
tsql = "SELECT Name, Location FROM Employees;"
with cursor.execute(tsql):
    row = cursor.fetchone()
    while row:
        print (str(row[0]) + " " + str(row[1]))
        row = cursor.fetchone()
```

Run your Python script from the terminal.

```terminal
python crud.py
```

```results
Inserting a new row into table
Successfully Inserted!
Updating Location for Nikita
Successfully Updated!
Deleting user Jared
Successfully Deleted!
Reading data from table
Jake United States
```

> Congratulations! You created your first Python app with SQL Server! Check out the next section to learn about how you can make your Python app faster with SQL Server's Columnstore feature.
