const aws_db = require('../db/aws');
//const { aws_db }  = require('../db/aws');
exports.updataSource = (req, res, next) => {
    console.log("1 - Scarica dump ");
    var s = aws_db.dowloadDump;
    console.log("2 - Scarica DUMP ");
   
    s.call()
        //var t = aws_db.importDump;
        //t.call(;{ 
     
    console.log("FINE");
    res.render('index');
};
module.exports.updataSource;