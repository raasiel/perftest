var map = {
    "campaign_id":"$campaign_id",
    "issuer_id": "$issuer_id",
    "campaign_title": "$campaign_title",
    "campaign_start_date": "$campaign_start_date",
    "campaign_end_date": "$campaign_end_date",
    "campaign_run_date": "$campaign_run_date",
    "campaign_code": "$campaign_code",
    // "mapped_securities": [
    //   "353612302"
    // ]
    "mapped_securities": "@[mapped_securities]"
}


module.exports = map;