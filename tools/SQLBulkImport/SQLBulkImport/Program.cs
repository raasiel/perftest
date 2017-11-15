using System;
using System.Collections.Generic;

namespace SQLBulkImport
{
    class Program
    {
        static long _counter = 0;
        static void Main(string[] args)
        {
            if (args.Length > 2)
            {
                Dictionary<string, string> settings = new Dictionary<string, string>();
                foreach (string arg in args)
                {
                    string key = arg.Substring(0, arg.IndexOf('=')).Trim().ToLower();
                    string value = arg.Substring(arg.IndexOf('=') + 1);
                    settings[key] = value;
                }

                string data_file = string.Empty;
                string table_name = string.Empty;
                string sql_connection_string = string.Empty;

                if (settings.ContainsKey(Constants.ARGS_KEY_TABLE_NAME))
                {
                    table_name = settings[Constants.ARGS_KEY_TABLE_NAME];
                }
                if (settings.ContainsKey(Constants.ARGS_KEY_DATA_FILE_PATH))
                {
                    data_file = settings[Constants.ARGS_KEY_DATA_FILE_PATH];
                }
                if (settings.ContainsKey(Constants.ARGS_KEY_SQL_CONNECTION_STRING))
                {
                    sql_connection_string = settings[Constants.ARGS_KEY_SQL_CONNECTION_STRING];
                }

                if ((!string.IsNullOrEmpty(table_name))
                    && (!string.IsNullOrEmpty(data_file))
                    && (!string.IsNullOrEmpty(sql_connection_string)))
                {
                    string schema_file_name = string.Format("{0}_schema.txt", table_name);
                    RptReader rptReader = new RptReader(data_file, schema_file_name);
                    var canRun = true;
                    while (canRun == true)
                    {
                        DoInsert(rptReader, sql_connection_string, table_name);
                        canRun = rptReader.IsJustReset();
                    }
                }
            }
            else
            {
                Console.WriteLine("No arguments found.");
            }
        }

        public static void DoInsert(RptReader rreader, string connectionString, string tableName)
        {
            DBDataReader reader = new DBDataReader(rreader);
            SQLBulkCopyHelper helper = new SQLBulkCopyHelper(connectionString, reader);
            helper.BulkInsert(tableName);
            _counter += 5000;
            Console.WriteLine(_counter + " Data import complete");
        }
    }
}