using System;
using System.Collections.Generic;
using System.IO;

namespace SQLBulkImport
{
    public class RptReader
    {
        StreamReader _reader = null;
        List<ColumnDef> _columns = new List<ColumnDef>();
        Dictionary<string, ColumnDef> _dicColumns = new Dictionary<string, ColumnDef>();
        private Dictionary<string, Type> _fieldTypes = new Dictionary<string, Type>();

        public int FlushAfter = 5000;
        public long _counter = 0;

        public struct ColumnDef
        {
            public string Name;
            public int Start;
            public int Length;
            public int Ordinal;
        }

        public List<ColumnDef> ColumnDefs
        {
            get
            {
                return _columns;
            }
        }

        public bool IsClosed
        {
            get
            {
                return !_reader.EndOfStream;
            }
        }

        public Dictionary<string, ColumnDef> ColumnNames
        {
            get
            {
                return _dicColumns;
            }
        }

        public Type GetTypeForField(string fieldName)
        {
            if (_fieldTypes.ContainsKey(fieldName.ToLower().Trim()))
            {
                return _fieldTypes[fieldName.ToLower().Trim()];
            }
            else
            {
                return typeof(string);
            }
        }

        public RptReader(string filename, string schemafile)
        {
            string[] scehma = File.ReadAllLines(schemafile);
            foreach (string scLine in scehma)
            {
                string[] items = scLine.Split("=".ToCharArray());
                string fieldName = items[0].ToLower().Trim();
                string typeName = items[1].Trim();
                try
                {
                    Type t = Type.GetType(typeName);
                    if (t != null)
                    {
                        _fieldTypes[fieldName] = t;
                    }
                }
                catch (Exception ex)
                {

                }
            }

            _reader = File.OpenText(filename);
            var names = _reader.ReadLine();
            var line2 = _reader.ReadLine();
            string[] colLengths = line2.Split(" ".ToCharArray());
            int index = 0;

            foreach (string collength in colLengths)
            {
                string colName = names.Substring(index, index + collength.Length <= names.Length ? collength.Length : names.Length - index);
                ColumnDef cdef = new ColumnDef() { Name = colName.Trim().ToLower() };
                cdef.Start = index;
                cdef.Length = collength.Length;

                if (cdef.Start + cdef.Length > names.Length)
                {
                    cdef.Length = names.Length - cdef.Start - 1;
                }
                index = cdef.Start + cdef.Length + 1;
                cdef.Ordinal = _columns.Count;
                _columns.Add(cdef);
                _dicColumns[cdef.Name] = cdef;
            }
        }

        public Dictionary<string, string> ReadLine()
        {
            try
            {
                if (_reader.EndOfStream == true)
                {
                    return null;
                }
                _counter++;
                if (_counter >= FlushAfter)
                {
                    _counter = 0;
                    return null;
                }

                var line = _reader.ReadLine();                

                Dictionary<string, string> dic = new Dictionary<string, string>();
                for (int i = 0; i < _columns.Count; i++)
                {
                    var cdef = _columns[i];
                    var valueStringUntrimmed = line.Substring(cdef.Start, cdef.Start + cdef.Length > line.Length ? line.Length - cdef.Start : cdef.Length);
                    var valueString = valueStringUntrimmed.Trim();
                    dic[cdef.Name] = valueString;
                }
                return dic;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public bool IsJustReset ()
        {
            if (_counter == 0)
            {
                return true;
            }
            return false;
        }
    }
}
