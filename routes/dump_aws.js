const aws_db = require('../db/aws');
//const { aws_db }  = require('../db/aws');
exports.updataSource = (req, res, next) => {
    console.log("1 - Scarica dump ");
    var dumpImpoted = aws_db.dowloadDump(req, res, next);
    
    console.log("2 - DUMP Scaricato"+ dumpImpoted);
    
    console.log("3 - Migration DUMP ");
    aws_db.migrateDump();
    
    console.log("FINE");
    res.render('dump');
};
