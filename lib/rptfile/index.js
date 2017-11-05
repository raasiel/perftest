
/**
 * Created by shafqat on 9/12/14.
 */
function DataReader(filename, columns) {
    var context = {};
    context.filename = filename;
    context.columns = columns;

    var readlines = require('n-readlines');
    var liner = new readlines(filename);

    this.next = function () {
        var linedata = liner.next().toString("ascii");
        if (linedata != false) {
            var ret = {};
            for (index in context.columns) {
                var colDef = context.columns[index];
                var colValue = linedata.substr(colDef.start, colDef.length).trim();
                ret[colDef.name] = colValue
            }
            return ret;
        } else {
            return null;
        }
    }

    this.close = function () {
        liner = null;
        readlines = null;
        context = null;
    }

}

function RptFile() {

    this.getColumns = function (filename) {
        var readlines = require('n-readlines');
        var liner = new readlines(filename);
        var firstLine = liner.next().toString('ascii');
        var secondLine = liner.next().toString('ascii');
        var colLengths = secondLine.split(" ");
        var counter = 0;
        var colsToRet = [];
        for (index in colLengths) {
            var splitData = colLengths[index];
            var colDef = {};
            colDef.start = counter;
            colDef.length = splitData.length;
            counter = counter + colDef.length + 1;
            colDef.name = firstLine.substr(colDef.start + 3, colDef.length).toString().trim();
            //console.log ([splitData, colDef, counter])
            colsToRet.push(colDef);
        }
        return colsToRet;
    };


    this.start = function (filename, columns) {
        var reader = new DataReader(filename, columns);
        reader.next();
        reader.next();
        return reader;
    }

    return this;
};



module.exports = RptFile;