using System;
using System.Data.SqlClient;

namespace SQLBulkImport
{
    public class SQLBulkCopyHelper
    {
        public string ConnectionString { get; set; }
        public DBDataReader Reader { get; set; }

        public SQLBulkCopyHelper(string connStr, DBDataReader reader)
        {
            ConnectionString = connStr;
            Reader = reader;
        }

        public void Inserted(long counter)
        {
            Console.WriteLine(counter);
        }

        public void BulkInsert(string tableName)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                SqlTransaction trans = connection.BeginTransaction();
                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(connection, SqlBulkCopyOptions.Default, trans))
                // using (SqlBulkCopy bulkCopy = new SqlBulkCopy(connection))
                {
                    bulkCopy.BatchSize = 5000;
                    bulkCopy.DestinationTableName = tableName;
                    bulkCopy.SqlRowsCopied += BulkCopy_SqlRowsCopied;
                    Reader.OnInsert = Inserted;
                    try
                    {
                        bulkCopy.WriteToServer(Reader);
                        trans.Commit();
                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        connection.Close();
                        Console.WriteLine(ex.Message);
                    }
                }
                connection.Close();
            }
        }

        private void BulkCopy_SqlRowsCopied(object sender, SqlRowsCopiedEventArgs e)
        {
            Console.WriteLine(e.RowsCopied);
        }
    }
}
