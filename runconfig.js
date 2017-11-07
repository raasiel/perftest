    var config = {
    sql: {

    },
    app: {
        // url: "http://35.185.227.48:9080/api/"
        url: "http://192.168.4.111:8081/api/"
    },
    files: [{
        verb: "POST",
        apistem: "issuers",
        file: "[$DATADIR$]/issuer.rpt",
        template: "[$APPDIR$]/data/reqtemplate/issuer.mapping.js",
        returns: "issuer_id", 
        active:false
    }, {
        verb: "POST",
        apistem: "funds",
        file: "[$DATADIR$]/fund.rpt",
        template: "[$APPDIR$]/data/reqtemplate/fund.mapping.js",
        active:false
    }, {
        verb: "POST",
        apistem: "securityclasses",
        file: "[$DATADIR$]/security_class.rpt",
        template: "[$APPDIR$]/data/reqtemplate/security_class.mapping.js", 
        active:false
    }, {
        verb: "POST",
        apistem: "securitytrusts",
        file: "[$DATADIR$]/fund.rpt",
        template: "[$APPDIR$]/data/reqtemplate/security_trust.mapping.js", 
        active:false
    }, {
        verb: "POST",
        apistem: "securities",
        file: "[$DATADIR$]/security.rpt",
        template: "[$APPDIR$]/data/reqtemplate/security.mapping.js",
        active:false
    }, {
        verb: "POST",
        apistem: "campaigns",
        file: "[$DATADIR$]/campaign.rpt",
        template: "[$APPDIR$]/data/reqtemplate/campaign.mapping.js",
        active:false, 
        pre_http:function ( campaignObj ){                        
            var rptfileFunc = require ("./lib/rptfile");
            var utils = require ('./lib/util');
            var fileLocation = utils.getProperPath("[$DATADIR$]/campaign_security_mapping.rpt", {
                datadir:"/home/shafqat/Downloads/sqldump"
            });            
            var securities = [];
            var rptfile = rptfileFunc();
            var columnList = rptfile.getColumns (fileLocation);
            var reader = rptfile.start(fileLocation, columnList);
            var dataObject =  reader.next();
            while (dataObject!=null){
                if (dataObject["campaign_id"]==campaignObj["campaign_id"] ){ 
                                    
                    securities.push (dataObject["security_id"])
                }
                dataObject =  reader.next();
            }
            campaignObj.mapped_securities = securities;
            campaignObj.campaign_start_date = new  Date (campaignObj.campaign_start_date)
            campaignObj.campaign_end_date = new  Date (campaignObj.campaign_end_date)
            campaignObj.campaign_run_date = new  Date (campaignObj.campaign_run_date)            
        }
    }, {
        verb: "POST",
        apistem: "proposals",
        file: "[$DATADIR$]/proposal.rpt",
        template: "[$APPDIR$]/data/reqtemplate/proposal.mapping.js",
        active:false
    }, {
        verb: "POST",
        apistem: "proposals/securityProposalMapping",
        file: "[$DATADIR$]/security_proposal_mapping.rpt",
        template: "[$APPDIR$]/data/reqtemplate/security_proposal_mapping.mapping.js",
        active:true, 
        customProvider: function ( dataFileLocation){
            
            
            var colFinalSec = [];
            var customReader = {
                next : function() {
                    return colFinalSec.pop();
                },
                isCustomProvider : true
            }
                       
            
            var rptfileFunc = require ("./lib/rptfile");
            var rptfile = rptfileFunc();

            var columnList = rptfile.getColumns (dataFileLocation);

            var reader = rptfile.start(dataFileLocation, columnList);
            var dataObject =  reader.next();
            
            var dicWork = {};
            
            while (dataObject!=null){
                
                var campaign = dicWork[dataObject.campaign_id];
                if ( campaign==null){
                    campaign={};
                    dicWork[dataObject.campaign_id] = campaign;
                }

                var security = campaign[dataObject.security_id];
                if ( security==null){
                    security = {};
                    security.proposals = [];
                    security.proposalkeys = {};
                    campaign[dataObject.security_id] = security;
                }

                if ( security.proposalkeys [dataObject.proposal_id]==null  ){
                    security.proposalkeys [dataObject.proposal_id]= dataObject.proposal_id;
                    security.proposals.push (dataObject);
                }
                dataObject =  reader.next();
            }
            
            for( var keyCamp in dicWork){
                var oCamp = dicWork[keyCamp];
                for ( var keySec in oCamp){
                    var oSec  = oCamp [keySec];
                    var finalObj = {
                        security_id: keySec,
                        campaign_id:keyCamp,
                        mappedProposals:[]
                    }
                    for ( var index in oSec.proposals){
                        var oPropData = oSec.proposals[index];
                        var finalProp = {
                            security_id: keySec,
                            proposal_id: parseInt( oPropData.proposal_id),
                            sequence: parseInt (oPropData.sequence)
                        }
                        finalObj.mappedProposals.push (finalProp);
                    }
                    colFinalSec.push (finalObj);
                }
            }
            return customReader;
        }
    }
    ]
}

module.exports = config;