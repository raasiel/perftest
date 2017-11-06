var pathReplaceOptions = {
    datadir:"/home/shafqat/Downloads/sqldump"
}

var _ = console.log;

var config = require ( "./runconfig.js");
var rptfileFunc = require ("./lib/rptfile")
var request = require('request');
var utils = require ("./lib/util");
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');


for(var runIndex in config.files){
    var fileRunSpec = config.files[runIndex];

    if (fileRunSpec.active==true){
        var webServiceUrl = config.app.url + fileRunSpec.apistem;    
        var dataFileLocation = utils.getProperPath (fileRunSpec.file, pathReplaceOptions)
        var rptfile = rptfileFunc();
        //_ (["data file ", dataFileLocation])
        var columnList = rptfile.getColumns (dataFileLocation);
        var template = require (utils.getProperPath(fileRunSpec.template));
        var tempEng = require ("./lib/templateEngine")(template);
        var reader = rptfile.start(dataFileLocation, columnList);

        var dataObject =  reader.next();
        while (dataObject!=null){
            var reqToSend = tempEng.getNew (dataObject);   
            makeCall (webServiceUrl, reqToSend)     
            dataObject =  reader.next();
        }
    }
}

function makeCall (url, obj){
    _( "Calling ", url, obj )
    request.post({
        url: url,
        headers: {
           "Content-Type": "application/json"
        },
        body: obj,
        json:true
   }, function(error, response, body){
      console.log(error);
      console.log(JSON.stringify(response));
      console.log(body);
   });
}
