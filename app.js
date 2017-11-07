var pathReplaceOptions = {
    datadir:"/home/azad/sql-dump"
}

var _ = console.log;

var config = require ( "./runconfig.js");
var rptfileFunc = require ("./lib/rptfile")
var request = require('request');
var utils = require ('./lib/util');
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var sync = require('synchronize');
var sql = require('mssql');

sync.fiber(function() {
for(var runIndex in config.files){
    var fileRunSpec = config.files[runIndex];
    if (fileRunSpec.active==true){
        var webServiceUrl = config.app.url + fileRunSpec.apistem;    
        var dataFileLocation = utils.getProperPath (fileRunSpec.file, pathReplaceOptions)
        var rptfile = rptfileFunc();
        var columnList = rptfile.getColumns (dataFileLocation);
        var template = require (utils.getProperPath(fileRunSpec.template));
        var tempEng = require ("./lib/templateEngine")(template);
        var reader = rptfile.start(dataFileLocation, columnList);

        var dataObject =  reader.next();
        while (dataObject!=null){
            var reqToSend = tempEng.getNew (dataObject);   
            if ( fileRunSpec["pre_http"]!=null){
                fileRunSpec.pre_http(reqToSend)
            };
            
            var dataRet=  sync.await(
                request.post({
                    url: webServiceUrl,
                    headers: {
                       "Content-Type": "application/json"
                    },
                    body: reqToSend,
                    json:true,
               }, 
               sync.defer()
            ));
            console.log (dataRet.body);
            dataObject =  reader.next();
        }
    }
}
});

function makeCall (url, obj){
   request.post({
        url: url,
        headers: {
           "Content-Type": "application/json"
        },
        body: obj,
        json:true,
   }, function(error, response, body){
      console.log(error);
      console.log(JSON.stringify(response));
      console.log(body);
   });
}

// const sqlPool = new sql.ConnectionPool({
//     user: 'sa',
//     password: 'orion123@',
//     server: '192.168.4.111',
//     database: 'ProxyVoting'
// })

// sqlPool.connect(err => {
//   console.log(['connected', err]);  
//   var ret = sqlPool.request().query('select * from security where issuer_id = 1', (error, result) => {
//       console.log(result);
//       sqlPool.close();
//   });
// })

// .then(pool => {
//     return pool.request().query('select * from security where issuer_id = 1');
// }).then(result => {
//     console.log(result);
//     //console.log('success');
// })

// (async function(){
//     try{
//         const pool = await sql.connect(sqlConfig);
//         const result = await sql.query('select * from security where issuer_id = 1');
//         console.log(result);
//     }
//     catch(err){
//         console.log(err);
//     }
// })()


// sql.on('error', err => {
//     console.log(err);
// })