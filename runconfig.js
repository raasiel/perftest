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
        dependency: {
            file: "[$DATADIR$]/campaign_security_mapping.rpt",
            template: "[$APPDIR$]/data/reqtemplate/campaign_security_mapping.mapping.js"
        },
        active:true
    }, {
        verb: "POST",
        apistem: "proposals",
        file: "[$DATADIR$]/proposal.rpt",
        template: "[$APPDIR$]/data/reqtemplate/proposal.mapping.js",
        active:false
    }, {
        verb: "POST",
        apistem: "batchSecurityProposalMapping",
        file: "[$DATADIR$]/security_proposal_mapping.rpt",
        template: "[$APPDIR$]/data/reqtemplate/security_proposal_mapping.mapping.js",
        active:false
    }
    ]
}

module.exports = config;