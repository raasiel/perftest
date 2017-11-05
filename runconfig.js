    var config = {
    sql: {

    },
    app: {
        url: "http://192.168.4.111:8081/api/"
    },
    files: [{
        verb: "POST",
        apistem: "issuers",
        file: "[$APPDIR$]/data/sqldump/issuer.rpt",
        template: "[$APPDIR$]/data/reqtemplate/issuer.mapping.js",
        returns: "issuer_id", 
        active:true
    }, {
        verb: "POST",
        apistem: "funds",
        file: "[$APPDIR$]/data/sqldump/fund.rpt",
        template: "[$APPDIR$]/data/reqtemplate/fund.mapping.js",
        active:false
    }, {
        verb: "POST",
        apistem: "securityclasses",
        file: "[$APPDIR$]/data/sqldump/security_class.rpt",
        template: "[$APPDIR$]/data/reqtemplate/security_class.mapping.js", 
        active:false
    }, {
        verb: "POST",
        apistem: "securities",
        file: "[$APPDIR$]/data/sqldump/security.rpt",
        template: "[$APPDIR$]/data/reqtemplate/security.mapping.js"
    }, {
        verb: "POST",
        apistem: "campaigns",
        file: "[$APPDIR$]/data/sqldump/campaign.rpt",
        template: "[$APPDIR$]/data/reqtemplate/campaign.mapping.js"
    }, {
        verb: "POST",
        apistem: "proposals",
        file: "[$APPDIR$]/data/sqldump/proposal.rpt",
        template: "[$APPDIR$]/data/reqtemplate/proposal.mapping.js"
    }, {
        verb: "POST",
        apistem: "batchSecurityProposalMapping",
        file: "[$APPDIR$]/data/sqldump/security_proposal_mapping.rpt",
        template: "[$APPDIR$]/data/reqtemplate/security_proposal_mapping.mapping.js"
    }
    ]
}

module.exports = config;