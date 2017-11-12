
function BulkImport() {
    var sql = require('mssql');
    var me = this;
    me.counter = 0;
    me.init = function (config) {
        // me.pool = new sql.ConnectionPool(config);
        me.table = config.table(sql);
        me.config = config;
    }
    me.close = function () {

    }
    me.writeRow = function (row, columns) {
        var rowtosend = [];
        for (var colindex in columns) {
            var colname = columns[colindex];
            rowtosend.push(row[colname]);
        }
        me.table.rows.add(rowtosend);
        me.counter++;
        if (me.counter == 1) {
            me.counter = 0;
            if(me.pool == null){
                me.pool = new sql.ConnectionPool(me.config);
            }
            me.pool.connect(err => {
                console.log(['connected', err]);
                const request = new sql.Request();
                request.bulk(me.table, (err, result) => {
                     if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('1000 rows inserted successfully');
                    }
                    me.pool.close();
                });

                // md.pool.request().bulk(me.table, (error, result) => {
                //     if(error){
                //         console.log(['error', error]);
                //     } else{
                //         console.log(result);    
                //     }
                //     me.pool.close();
                // });
            });

            // const request = new sql.Request(me.pool);
            // request.bulk(me.table, (err, result) => {
            //     if (err) {
            //         console.log(err);
            //     }
            //     else {
            //         console.log('1000 rows inserted successfully');
            //     }
            // })
        }
    }
    return me;
}

module.exports = BulkImport