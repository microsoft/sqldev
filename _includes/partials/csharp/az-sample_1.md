```csharp
using Microsoft.Data.SqlClient;
using System;
using System.Text;

namespace AzureSqlSample
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                // Build connection string
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                builder.DataSource = "your_server.database.database.windows.net";   // update me
                builder.UserID = "your_user";              // update me
                builder.Password = "your_password";        // update me
                builder.InitialCatalog = "your_database";  // update me

                // Connect to Azure SQL
                Console.Write("Connecting to Azure SQL ... ");
                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();
                    Console.WriteLine("Done.");
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }

            Console.WriteLine("All done. Press any key to finish...");
            Console.ReadKey(true);
        }
    }
}
```