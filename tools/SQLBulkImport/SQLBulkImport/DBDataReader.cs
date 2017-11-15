using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Common;

namespace SQLBulkImport
{
    public class DBDataReader : DbDataReader
    {
        public delegate void OnBulkInsert(long counter);
        RptReader _reader = null;
        Dictionary<string, string> _data = null;
        public int FlushRate { get; set; }
        public OnBulkInsert OnInsert { get; set; }
        long counter = 0;
        bool _isClosed = false;

        public class RPTReaderEnu : IEnumerator
        {
            DBDataReader _dataReader = null;
            public RPTReaderEnu(DBDataReader dbDataReader)
            {
                _dataReader = dbDataReader;
            }
            public object Current => _dataReader.GetCurrent();

            public bool MoveNext()
            {
                return _dataReader.Read();
            }

            public void Reset()
            {
                throw new NotImplementedException();
            }
        }

        public DBDataReader(RptReader reader)
        {
            _reader = reader;
            this.FlushRate = 5000;
        }

        public Dictionary<string, string> GetCurrent()
        {
            return _data;
        }

        public override object this[int ordinal] => GetValue(ordinal);

        public override object this[string name] => GetValue(GetOrdinal(name));

        public override int Depth => throw new NotImplementedException();

        public override int FieldCount => _reader.ColumnDefs.Count;

        public override bool HasRows => !_reader.IsClosed;

        public override bool IsClosed => _reader.IsClosed;

        public override int RecordsAffected => -1;

        public override bool GetBoolean(int ordinal)
        {
            return (bool)GetValue(ordinal);
        }

        public override byte GetByte(int ordinal)
        {
            return (byte)GetValue(ordinal);
        }

        public override long GetBytes(int ordinal, long dataOffset, byte[] buffer, int bufferOffset, int length)
        {
            throw new NotImplementedException();
        }

        public override char GetChar(int ordinal)
        {
            return (char)GetValue(ordinal);
        }

        public override long GetChars(int ordinal, long dataOffset, char[] buffer, int bufferOffset, int length)
        {
            throw new NotImplementedException();
        }

        public override string GetDataTypeName(int ordinal)
        {
            return GetFieldType(ordinal).Name;
        }

        public override DateTime GetDateTime(int ordinal)
        {
            return (DateTime)GetValue(ordinal);
        }

        public override decimal GetDecimal(int ordinal)
        {
            return (decimal)GetValue(ordinal);
        }

        public override double GetDouble(int ordinal)
        {
            return (double)GetValue(ordinal);
        }

        public override IEnumerator GetEnumerator()
        {
            return new RPTReaderEnu(this);
        }

        public override Type GetFieldType(int ordinal)
        {
            var def = _reader.ColumnDefs[ordinal];
            return _reader.GetTypeForField(def.Name);
        }

        public override float GetFloat(int ordinal)
        {
            return (float)GetValue(ordinal);
        }

        public override Guid GetGuid(int ordinal)
        {
            return (Guid)GetValue(ordinal);
        }

        public override short GetInt16(int ordinal)
        {
            return (short)GetValue(ordinal);
        }

        public override int GetInt32(int ordinal)
        {
            return (int)GetValue(ordinal);
        }

        public override long GetInt64(int ordinal)
        {
            return (long)GetValue(ordinal);
        }

        public override string GetName(int ordinal)
        {
            return _reader.ColumnDefs[ordinal].Name;
        }

        public override int GetOrdinal(string name)
        {
            return _reader.ColumnNames[name].Ordinal;
        }

        public override string GetString(int ordinal)
        {
            return (string)GetValue(ordinal);
        }

        public override object GetValue(int ordinal)
        {
            var c = _reader.ColumnDefs[ordinal];
            var t = _reader.GetTypeForField(c.Name);
            object valToReturn = GetValueForType(_data[c.Name], t.FullName);
            return valToReturn;
        }

        private object GetValueForType(string value, string typename)
        {
            object valToReturn = null;
            switch (typename)
            {
                case "System.String":
                    valToReturn = value;
                    break;
                case "System.Int32":
                    int val = 0;
                    int.TryParse(value, out val);
                    valToReturn = val;
                    break;
                case "System.Decimal":
                    decimal val2 = 0;
                    decimal.TryParse(value, out val2);
                    valToReturn = val2;
                    break;
                case "System.Int64":
                    long val3 = 0;
                    long.TryParse(value, out val3);
                    valToReturn = val3;
                    break;
                case "System.DateTime":
                    DateTime val4 = DateTime.MinValue;
                    DateTime.TryParse(value, out val4);
                    if (val4 == DateTime.MinValue)
                    {
                        valToReturn = null;
                    }
                    else
                    {
                        valToReturn = val4;
                    }
                    break;
                default:
                    valToReturn = value;
                    break;
            }
            return valToReturn;
        }

        public override int GetValues(object[] values)
        {
            throw new NotImplementedException();
        }

        public override bool IsDBNull(int ordinal)
        {
            throw new NotImplementedException();
        }

        public override bool NextResult()
        {
            throw new NotImplementedException();
        }

        public override bool Read()
        {
            _data = _reader.ReadLine();
            if (_data != null)
            {
                counter++;
                if (counter % FlushRate == 0)
                {
                    if (this.OnInsert != null)
                    {
                        this.OnInsert(counter);
                    }
                }
                return true;
            }
            else
            {
                _isClosed = true;
                return false;
            }
        }
    }
}
