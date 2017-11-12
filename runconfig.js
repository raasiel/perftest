var rootConfig = require("./changeme.js")

var config = {
    sql: {

    },
    app: {
        // url: "http://35.185.227.48:9080/api/"
        url: rootConfig.api
    },
    files: [{
        verb: "POST",
        apistem: "issuers",
        file: "[$DATADIR$]/issuer.rpt",
        template: "[$APPDIR$]/data/reqtemplate/issuer.mapping.js",
        returns: "issuer_id",
        active: false
    }, {
        verb: "POST",
        apistem: "funds",
        file: "[$DATADIR$]/fund.rpt",
        template: "[$APPDIR$]/data/reqtemplate/fund.mapping.js",
        active: false
    }, {
        verb: "POST",
        apistem: "securityclasses",
        file: "[$DATADIR$]/security_class.rpt",
        template: "[$APPDIR$]/data/reqtemplate/security_class.mapping.js",
        active: false
    }, {
        verb: "POST",
        apistem: "securitytrusts",
        file: "[$DATADIR$]/security_trust.rpt",
        template: "[$APPDIR$]/data/reqtemplate/security_trust.mapping.js",
        active: false
    }, {
        verb: "POST",
        apistem: "securities",
        file: "[$DATADIR$]/security.rpt",
        template: "[$APPDIR$]/data/reqtemplate/security.mapping.js",
        active: false
    }, {
        verb: "POST",
        apistem: "campaigns",
        file: "[$DATADIR$]/campaign.rpt",
        template: "[$APPDIR$]/data/reqtemplate/campaign.mapping.js",
        active: false,
        pre_http: function (campaignObj) {
            var rptfileFunc = require("./lib/rptfile");
            var utils = require('./lib/util');
            var fileLocation = utils.getProperPath("[$DATADIR$]/campaign_security_mapping.rpt", {
                datadir: rootConfig.datadir
            });
            var securities = [];
            var rptfile = rptfileFunc();
            var columnList = rptfile.getColumns(fileLocation);
            var reader = rptfile.start(fileLocation, columnList);
            var dataObject = reader.next();
            while (dataObject != null) {
                if (dataObject["campaign_id"] == campaignObj["campaign_id"]) {
                    securities.push(dataObject["security_id"])
                }
                dataObject = reader.next();
            }
            campaignObj.mapped_securities = securities;
            campaignObj.campaign_start_date = new Date(campaignObj.campaign_start_date)
            campaignObj.campaign_end_date = new Date(campaignObj.campaign_end_date)
            campaignObj.campaign_run_date = new Date(campaignObj.campaign_run_date)
        }
    }, {
        verb: "POST",
        apistem: "proposals",
        file: "[$DATADIR$]/proposal.rpt",
        template: "[$APPDIR$]/data/reqtemplate/proposal.mapping.js",
        active: false
    }, {
        verb: "POST",
        apistem: "proposals/securityProposalMapping",
        file: "[$DATADIR$]/security_proposal_mapping.rpt",
        template: "[$APPDIR$]/data/reqtemplate/security_proposal_mapping.mapping.js",
        active: false,
        customProvider: function (dataFileLocation) {
            var colFinalSec = [];
            var customReader = {
                next: function () {
                    return colFinalSec.pop();
                },
                isCustomProvider: true
            }

            var rptfileFunc = require("./lib/rptfile");
            var rptfile = rptfileFunc();
            var columnList = rptfile.getColumns(dataFileLocation);
            var reader = rptfile.start(dataFileLocation, columnList);
            var dataObject = reader.next();
            var dicWork = {};

            while (dataObject != null) {
                var campaign = dicWork[dataObject.campaign_id];
                if (campaign == null) {
                    campaign = {};
                    dicWork[dataObject.campaign_id] = campaign;
                }

                var security = campaign[dataObject.security_id];
                if (security == null) {
                    security = {};
                    security.proposals = [];
                    security.proposalkeys = {};
                    campaign[dataObject.security_id] = security;
                }

                if (security.proposalkeys[dataObject.proposal_id] == null) {
                    security.proposalkeys[dataObject.proposal_id] = dataObject.proposal_id;
                    security.proposals.push(dataObject);
                }
                dataObject = reader.next();
            }

            for (var keyCamp in dicWork) {
                var oCamp = dicWork[keyCamp];
                for (var keySec in oCamp) {
                    var oSec = oCamp[keySec];
                    var finalObj = {
                        security_id: keySec,
                        campaign_id: keyCamp,
                        mappedProposals: []
                    }
                    for (var index in oSec.proposals) {
                        var oPropData = oSec.proposals[index];
                        var finalProp = {
                            security_id: keySec,
                            proposal_id: parseInt(oPropData.proposal_id),
                            sequence: parseInt(oPropData.sequence)
                        }
                        finalObj.mappedProposals.push(finalProp);
                    }
                    colFinalSec.push(finalObj);
                }
            }
            return customReader;
        }
    }, {
        verb: "POST",
        apistem: "",
        file: "[$DATADIR$]/TFIleTMP_Log.rpt",
        template: null,
        active: true,
        action: function(){
            var customAction = {
                
                writeRow: function (row, columns) {
                    customAction.insert.writeRow(row, columns);
                },
                init: function (config){
                    var sqlbulkinsert = require('./lib/sqlbulkinsert')();    
                    customAction.insert = sqlbulkinsert;
                    customAction.insert.init(config);
                },
                close: function(){
                    customAction.close();
                    customAction = null;
                },
                getTable: function(sql){
                    const table = new sql.Table('TFILETMP_LOG');
                    table.create = false;
                    table.columns.add('SRFUND', sql.Char(10), { nullable: false });
                    table.columns.add('SRCUSP', sql.Char(9), { nullable: false });
                    table.columns.add('SRACCT', sql.Char(25), { nullable: false });
                    table.columns.add('SRTAX', sql.Char(10), { nullable: false });
                    table.columns.add('SRSEQ#', sql.Numeric(9, 0), { nullable: false });
                    table.columns.add('SRSHRS', sql.Numeric(16, 4), { nullable: false });
                    table.columns.add('SRTAPE', sql.Numeric(4, 0), { nullable: false });
                    table.columns.add('SRTAPT', sql.Char(1), { nullable: false });
                    table.columns.add('SRADR1', sql.Char(40), { nullable: false });
                    table.columns.add('SRADR2', sql.Char(40), { nullable: false });
                    table.columns.add('SRADR3', sql.Char(40), { nullable: false });
                    table.columns.add('SRADR4', sql.Char(40), { nullable: false });
                    table.columns.add('SRADR5', sql.Char(40), { nullable: false });
                    table.columns.add('SRADR6', sql.Char(40), { nullable: false });
                    table.columns.add('SRADR7', sql.Char(40), { nullable: false });
                    table.columns.add('SRADR8', sql.Char(40), { nullable: false });
                    table.columns.add('SRCITY', sql.Char(20), { nullable: false });
                    table.columns.add('SRST', sql.Char(2), { nullable: false });
                    table.columns.add('SRZIP', sql.Char(9), { nullable: false });
                    table.columns.add('SRCOUN', sql.Char(1), { nullable: false });
                    table.columns.add('SRFNM1', sql.Char(20), { nullable: false });
                    table.columns.add('SRLNM1', sql.Char(20), { nullable: false });
                    table.columns.add('SRFNM2', sql.Char(20), { nullable: false });
                    table.columns.add('SRLNM2', sql.Char(20), { nullable: false });
                    table.columns.add('SRBUS', sql.Char(1), { nullable: false });
                    table.columns.add('SRLAY', sql.Char(1), { nullable: false });
                    table.columns.add('SRSM', sql.Char(1), { nullable: false });
                    table.columns.add('SRLEAD', sql.Char(1), { nullable: false });
                    table.columns.add('SRAC1', sql.Numeric(3, 0), { nullable: false });
                    table.columns.add('SRPHN1', sql.Numeric(7, 0), { nullable: false });
                    table.columns.add('SRAC2', sql.Numeric(3, 0), { nullable: false });
                    table.columns.add('SRPHN2', sql.Numeric(7, 0), { nullable: false });
                    table.columns.add('SRAC3', sql.Numeric(3, 0), { nullable: false });
                    table.columns.add('SRPHN3', sql.Numeric(7, 0), { nullable: false });
                    table.columns.add('SRTMEZ', sql.Char(1), { nullable: false });
                    table.columns.add('SRDA', sql.Char(1), { nullable: false });
                    table.columns.add('SRDADT', sql.Numeric(8, 0), { nullable: false });
                    table.columns.add('SRDARC', sql.Char(1), { nullable: false });
                    table.columns.add('SRCCKO', sql.Char(1), { nullable: false });
                    table.columns.add('SRCMP', sql.Char(3), { nullable: false });
                    table.columns.add('SRLCBD', sql.Numeric(8, 0), { nullable: false });
                    table.columns.add('SRLCBT', sql.Numeric(6, 0), { nullable: false });
                    table.columns.add('SRLCBU', sql.Char(10), { nullable: false });
                    table.columns.add('SRLCUD', sql.Numeric(8, 0), { nullable: false });
                    table.columns.add('SRLCUT', sql.Numeric(6, 0), { nullable: false });
                    table.columns.add('SRLCUU', sql.Char(10), { nullable: false });
                    table.columns.add('SRCALL', sql.Numeric(2, 0), { nullable: false });
                    table.columns.add('SRDISP', sql.Numeric(2, 0), { nullable: false });
                    table.columns.add('SRRNA', sql.Numeric(4, 0), { nullable: false });
                    table.columns.add('SRBSY', sql.Numeric(4, 0), { nullable: false });
                    table.columns.add('SRANS', sql.Numeric(4, 0), { nullable: false });
                    table.columns.add('SRATT', sql.Numeric(4, 0), { nullable: false });
                    table.columns.add('SRCDAT', sql.Numeric(8, 0), { nullable: false });
                    table.columns.add('SRCTIM', sql.Numeric(6, 0), { nullable: false });
                    table.columns.add('SRVOTD', sql.Char(1), { nullable: false });
                    table.columns.add('SRTSR', sql.Char(8), { nullable: false });
                    table.columns.add('SRMNUM', sql.Numeric(1, 0), { nullable: false });
                    table.columns.add('SRPP01', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP02', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP03', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP04', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP05', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP06', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP07', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP08', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP09', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP10', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP11', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP12', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP13', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP14', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP15', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP16', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP17', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP18', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP19', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP20', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP21', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP22', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP23', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP24', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP25', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP26', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP27', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP28', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP29', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP30', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP31', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP32', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP33', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP34', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP35', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP36', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP37', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP38', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP39', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP40', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP41', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP42', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP43', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP44', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP45', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP46', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP47', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP48', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP49', sql.Char(1), { nullable: false });
                    table.columns.add('SRPP50', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR01', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR02', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR03', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR04', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR05', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR06', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR07', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR08', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR09', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR10', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR11', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR12', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR13', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR14', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR15', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR16', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR17', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR18', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR19', sql.Char(1), { nullable: false });
                    table.columns.add('SRDR20', sql.Char(1), { nullable: false });
                    table.columns.add('SRTSRC', sql.Char(1), { nullable: false });
                    table.columns.add('SRVDAT', sql.Numeric(8, 0), { nullable: false });
                    table.columns.add('SRUDA1', sql.Char(1), { nullable: false });
                    table.columns.add('SRUDA2', sql.Char(1), { nullable: false });
                    table.columns.add('SRUDA3', sql.Char(1), { nullable: false });
                    table.columns.add('SRUDA4', sql.Char(1), { nullable: false });
                    table.columns.add('SRUDA5', sql.Char(1), { nullable: false });
                    table.columns.add('SRUDA6', sql.Char(1), { nullable: false });
                    table.columns.add('SRUDA7', sql.Char(1), { nullable: false });
                    table.columns.add('SRUDA8', sql.Char(1), { nullable: false });
                    table.columns.add('SRUDA9', sql.Char(1), { nullable: false });
                    table.columns.add('SRUDA0', sql.Char(1), { nullable: false });
                    table.columns.add('SRUDAA', sql.Char(1), { nullable: false });
                    table.columns.add('SRUDAB', sql.Char(1), { nullable: false });
                    table.columns.add('SRUDB1', sql.Char(10), { nullable: false });
                    table.columns.add('SRUDB2', sql.Char(10), { nullable: false });
                    table.columns.add('SRUDB3', sql.Char(10), { nullable: false });
                    table.columns.add('SRUDB4', sql.Char(10), { nullable: false });
                    table.columns.add('SRUDB5', sql.Char(10), { nullable: false });
                    table.columns.add('SRUDB6', sql.Char(10), { nullable: false });
                    table.columns.add('SRUDB7', sql.Char(10), { nullable: false });
                    table.columns.add('SRUDB8', sql.Char(10), { nullable: false });
                    table.columns.add('SRUDB9', sql.Char(10), { nullable: false });
                    table.columns.add('SRUDB0', sql.Char(10), { nullable: false });
                    table.columns.add('SRUDBA', sql.Char(10), { nullable: false });
                    table.columns.add('SRUDBB', sql.Char(10), { nullable: false });
                    table.columns.add('SRUDC1', sql.Char(50), { nullable: false });
                    table.columns.add('SRUDC2', sql.Char(50), { nullable: false });
                    table.columns.add('SRUDC3', sql.Char(50), { nullable: false });
                    table.columns.add('SRUDC4', sql.Char(50), { nullable: false });
                    table.columns.add('SRUDC5', sql.Char(50), { nullable: false });
                    table.columns.add('SRCOM1', sql.Char(60), { nullable: false });
                    table.columns.add('SRCOM2', sql.Char(60), { nullable: false });
                    table.columns.add('SRCOM3', sql.Char(60), { nullable: false });
                    table.columns.add('SRCOM4', sql.Char(60), { nullable: false });
                    table.columns.add('SRCOM5', sql.Char(60), { nullable: false });
                    table.columns.add('SRCKEY', sql.Char(50), { nullable: false });
                    table.columns.add('CRON', sql.DateTime, { nullable: true });
                    table.columns.add('MDON', sql.DateTime, { nullable: true });
                    table.columns.add('ASBATID', sql.VarChar(40), { nullable: true });
                    table.columns.add('ASMDON', sql.DateTime, { nullable: true });
                    table.columns.add('BLMDON', sql.DateTime, { nullable: true });
                    table.columns.add('BLBATID', sql.VarChar(40), { nullable: true });
                    table.columns.add('ERRDSC', sql.VarChar(100), { nullable: true });
                    table.columns.add('IDI', sql.BigInt, { nullable: false });
                    table.columns.add('PROCSTAT', sql.Int, { nullable: true });
            
                    return table;
                }
            }
            return  customAction;
        },
        config:{
            user: rootConfig.user,
            password: rootConfig.password,
            server: rootConfig.server,
            database: rootConfig.database
        }
    }]
}

module.exports = config;