var sql = require('mssql');

function table_tfiletmp_log() {
    this.tfiletemplog_table = function(){
        const table = new sql.Table('TFILETMP_LOG');
        table.create = false;
        table.columns.add('SRFUND', sql.char(10), { nullable: false });
        table.columns.add('SRCUSP', sql.char(9), { nullable: false });
        table.columns.add('SRACCT', sql.char(25), { nullable: false });
        table.columns.add('SRTAX', sql.char(10), { nullable: false });
        table.columns.add('SRSEQ#', sql.numeric(9, 0), { nullable: false });
        table.columns.add('SRSHRS', sql.numeric(16, 4), { nullable: false });
        table.columns.add('SRTAPE', sql.numeric(4, 0), { nullable: false });
        table.columns.add('SRTAPT', sql.char(1), { nullable: false });
        table.columns.add('SRADR1', sql.char(40), { nullable: false });
        table.columns.add('SRADR2', sql.char(40), { nullable: false });
        table.columns.add('SRADR3', sql.char(40), { nullable: false });
        table.columns.add('SRADR4', sql.char(40), { nullable: false });
        table.columns.add('SRADR5', sql.char(40), { nullable: false });
        table.columns.add('SRADR6', sql.char(40), { nullable: false });
        table.columns.add('SRADR7', sql.char(40), { nullable: false });
        table.columns.add('SRADR8', sql.char(40), { nullable: false });
        table.columns.add('SRCITY', sql.char(20), { nullable: false });
        table.columns.add('SRST', sql.char(2), { nullable: false });
        table.columns.add('SRZIP', sql.char(9), { nullable: false });
        table.columns.add('SRCOUN', sql.char(1), { nullable: false });
        table.columns.add('SRFNM1', sql.char(20), { nullable: false });
        table.columns.add('SRLNM1', sql.char(20), { nullable: false });
        table.columns.add('SRFNM2', sql.char(20), { nullable: false });
        table.columns.add('SRLNM2', sql.char(20), { nullable: false });
        table.columns.add('SRBUS', sql.char(1), { nullable: false });
        table.columns.add('SRLAY', sql.char(1), { nullable: false });
        table.columns.add('SRSM', sql.char(1), { nullable: false });
        table.columns.add('SRLEAD', sql.char(1), { nullable: false });
        table.columns.add('SRAC1', sql.numeric(3, 0), { nullable: false });
        table.columns.add('SRPHN1', sql.numeric(7, 0), { nullable: false });
        table.columns.add('SRAC2', sql.numeric(3, 0), { nullable: false });
        table.columns.add('SRPHN2', sql.numeric(7, 0), { nullable: false });
        table.columns.add('SRAC3', sql.numeric(3, 0), { nullable: false });
        table.columns.add('SRPHN3', sql.numeric(7, 0), { nullable: false });
        table.columns.add('SRTMEZ', sql.char(1), { nullable: false });
        table.columns.add('SRDA', sql.char(1), { nullable: false });
        table.columns.add('SRDADT', sql.numeric(8, 0), { nullable: false });
        table.columns.add('SRDARC', sql.char(1), { nullable: false });
        table.columns.add('SRCCKO', sql.char(1), { nullable: false });
        table.columns.add('SRCMP', sql.char(3), { nullable: false });
        table.columns.add('SRLCBD', sql.numeric(8, 0), { nullable: false });
        table.columns.add('SRLCBT', sql.numeric(6, 0), { nullable: false });
        table.columns.add('SRLCBU', sql.char(10), { nullable: false });
        table.columns.add('SRLCUD', sql.numeric(8, 0), { nullable: false });
        table.columns.add('SRLCUT', sql.numeric(6, 0), { nullable: false });
        table.columns.add('SRLCUU', sql.char(10), { nullable: false });
        table.columns.add('SRCALL', sql.numeric(2, 0), { nullable: false });
        table.columns.add('SRDISP', sql.numeric(2, 0), { nullable: false });
        table.columns.add('SRRNA', sql.numeric(4, 0), { nullable: false });
        table.columns.add('SRBSY', sql.numeric(4, 0), { nullable: false });
        table.columns.add('SRANS', sql.numeric(4, 0), { nullable: false });
        table.columns.add('SRATT', sql.numeric(4, 0), { nullable: false });
        table.columns.add('SRCDAT', sql.numeric(8, 0), { nullable: false });
        table.columns.add('SRCTIM', sql.numeric(6, 0), { nullable: false });
        table.columns.add('SRVOTD', sql.char(1), { nullable: false });
        table.columns.add('SRTSR', sql.char(8), { nullable: false });
        table.columns.add('SRMNUM', sql.numeric(1, 0), { nullable: false });
        table.columns.add('SRPP01', sql.char(1), { nullable: false });
        table.columns.add('SRPP02', sql.char(1), { nullable: false });
        table.columns.add('SRPP03', sql.char(1), { nullable: false });
        table.columns.add('SRPP04', sql.char(1), { nullable: false });
        table.columns.add('SRPP05', sql.char(1), { nullable: false });
        table.columns.add('SRPP06', sql.char(1), { nullable: false });
        table.columns.add('SRPP07', sql.char(1), { nullable: false });
        table.columns.add('SRPP08', sql.char(1), { nullable: false });
        table.columns.add('SRPP09', sql.char(1), { nullable: false });
        table.columns.add('SRPP10', sql.char(1), { nullable: false });
        table.columns.add('SRPP11', sql.char(1), { nullable: false });
        table.columns.add('SRPP12', sql.char(1), { nullable: false });
        table.columns.add('SRPP13', sql.char(1), { nullable: false });
        table.columns.add('SRPP14', sql.char(1), { nullable: false });
        table.columns.add('SRPP15', sql.char(1), { nullable: false });
        table.columns.add('SRPP16', sql.char(1), { nullable: false });
        table.columns.add('SRPP17', sql.char(1), { nullable: false });
        table.columns.add('SRPP18', sql.char(1), { nullable: false });
        table.columns.add('SRPP19', sql.char(1), { nullable: false });
        table.columns.add('SRPP20', sql.char(1), { nullable: false });
        table.columns.add('SRPP21', sql.char(1), { nullable: false });
        table.columns.add('SRPP22', sql.char(1), { nullable: false });
        table.columns.add('SRPP23', sql.char(1), { nullable: false });
        table.columns.add('SRPP24', sql.char(1), { nullable: false });
        table.columns.add('SRPP25', sql.char(1), { nullable: false });
        table.columns.add('SRPP26', sql.char(1), { nullable: false });
        table.columns.add('SRPP27', sql.char(1), { nullable: false });
        table.columns.add('SRPP28', sql.char(1), { nullable: false });
        table.columns.add('SRPP29', sql.char(1), { nullable: false });
        table.columns.add('SRPP30', sql.char(1), { nullable: false });
        table.columns.add('SRPP31', sql.char(1), { nullable: false });
        table.columns.add('SRPP32', sql.char(1), { nullable: false });
        table.columns.add('SRPP33', sql.char(1), { nullable: false });
        table.columns.add('SRPP34', sql.char(1), { nullable: false });
        table.columns.add('SRPP35', sql.char(1), { nullable: false });
        table.columns.add('SRPP36', sql.char(1), { nullable: false });
        table.columns.add('SRPP37', sql.char(1), { nullable: false });
        table.columns.add('SRPP38', sql.char(1), { nullable: false });
        table.columns.add('SRPP39', sql.char(1), { nullable: false });
        table.columns.add('SRPP40', sql.char(1), { nullable: false });
        table.columns.add('SRPP41', sql.char(1), { nullable: false });
        table.columns.add('SRPP42', sql.char(1), { nullable: false });
        table.columns.add('SRPP43', sql.char(1), { nullable: false });
        table.columns.add('SRPP44', sql.char(1), { nullable: false });
        table.columns.add('SRPP45', sql.char(1), { nullable: false });
        table.columns.add('SRPP46', sql.char(1), { nullable: false });
        table.columns.add('SRPP47', sql.char(1), { nullable: false });
        table.columns.add('SRPP48', sql.char(1), { nullable: false });
        table.columns.add('SRPP49', sql.char(1), { nullable: false });
        table.columns.add('SRPP50', sql.char(1), { nullable: false });
        table.columns.add('SRDR01', sql.char(1), { nullable: false });
        table.columns.add('SRDR02', sql.char(1), { nullable: false });
        table.columns.add('SRDR03', sql.char(1), { nullable: false });
        table.columns.add('SRDR04', sql.char(1), { nullable: false });
        table.columns.add('SRDR05', sql.char(1), { nullable: false });
        table.columns.add('SRDR06', sql.char(1), { nullable: false });
        table.columns.add('SRDR07', sql.char(1), { nullable: false });
        table.columns.add('SRDR08', sql.char(1), { nullable: false });
        table.columns.add('SRDR09', sql.char(1), { nullable: false });
        table.columns.add('SRDR10', sql.char(1), { nullable: false });
        table.columns.add('SRDR11', sql.char(1), { nullable: false });
        table.columns.add('SRDR12', sql.char(1), { nullable: false });
        table.columns.add('SRDR13', sql.char(1), { nullable: false });
        table.columns.add('SRDR14', sql.char(1), { nullable: false });
        table.columns.add('SRDR15', sql.char(1), { nullable: false });
        table.columns.add('SRDR16', sql.char(1), { nullable: false });
        table.columns.add('SRDR17', sql.char(1), { nullable: false });
        table.columns.add('SRDR18', sql.char(1), { nullable: false });
        table.columns.add('SRDR19', sql.char(1), { nullable: false });
        table.columns.add('SRDR20', sql.char(1), { nullable: false });
        table.columns.add('SRTSRC', sql.char(1), { nullable: false });
        table.columns.add('SRVDAT', sql.numeric(8, 0), { nullable: false });
        table.columns.add('SRUDA1', sql.char(1), { nullable: false });
        table.columns.add('SRUDA2', sql.char(1), { nullable: false });
        table.columns.add('SRUDA3', sql.char(1), { nullable: false });
        table.columns.add('SRUDA4', sql.char(1), { nullable: false });
        table.columns.add('SRUDA5', sql.char(1), { nullable: false });
        table.columns.add('SRUDA6', sql.char(1), { nullable: false });
        table.columns.add('SRUDA7', sql.char(1), { nullable: false });
        table.columns.add('SRUDA8', sql.char(1), { nullable: false });
        table.columns.add('SRUDA9', sql.char(1), { nullable: false });
        table.columns.add('SRUDA0', sql.char(1), { nullable: false });
        table.columns.add('SRUDAA', sql.char(1), { nullable: false });
        table.columns.add('SRUDAB', sql.char(1), { nullable: false });
        table.columns.add('SRUDB1', sql.char(10), { nullable: false });
        table.columns.add('SRUDB2', sql.char(10), { nullable: false });
        table.columns.add('SRUDB3', sql.char(10), { nullable: false });
        table.columns.add('SRUDB4', sql.char(10), { nullable: false });
        table.columns.add('SRUDB5', sql.char(10), { nullable: false });
        table.columns.add('SRUDB6', sql.char(10), { nullable: false });
        table.columns.add('SRUDB7', sql.char(10), { nullable: false });
        table.columns.add('SRUDB8', sql.char(10), { nullable: false });
        table.columns.add('SRUDB9', sql.char(10), { nullable: false });
        table.columns.add('SRUDB0', sql.char(10), { nullable: false });
        table.columns.add('SRUDBA', sql.char(10), { nullable: false });
        table.columns.add('SRUDBB', sql.char(10), { nullable: false });
        table.columns.add('SRUDC1', sql.char(50), { nullable: false });
        table.columns.add('SRUDC2', sql.char(50), { nullable: false });
        table.columns.add('SRUDC3', sql.char(50), { nullable: false });
        table.columns.add('SRUDC4', sql.char(50), { nullable: false });
        table.columns.add('SRUDC5', sql.char(50), { nullable: false });
        table.columns.add('SRCOM1', sql.char(60), { nullable: false });
        table.columns.add('SRCOM2', sql.char(60), { nullable: false });
        table.columns.add('SRCOM3', sql.char(60), { nullable: false });
        table.columns.add('SRCOM4', sql.char(60), { nullable: false });
        table.columns.add('SRCOM5', sql.char(60), { nullable: false });
        table.columns.add('SRCKEY', sql.char(50), { nullable: false });
        table.columns.add('CRON', sql.datetime, { nullable: true });
        table.columns.add('MDON', sql.datetime, { nullable: true });
        table.columns.add('ASBATID', sql.varchar(40), { nullable: true });
        table.columns.add('ASMDON', sql.datetime, { nullable: true });
        table.columns.add('BLMDON', sql.datetime, { nullable: true });
        table.columns.add('BLBATID', sql.varchar(40), { nullable: true });
        table.columns.add('ERRDSC', sql.varchar(100), { nullable: true });
        table.columns.add('IDI', sql.bigint, { nullable: false });
        table.columns.add('PROCSTAT', sql.int, { nullable: true });

        return table;
    };
};

