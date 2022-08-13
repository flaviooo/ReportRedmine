//const local_db = require('../db/db');
utilsService = require('../model/utils')
var rows;
exports.getIssuesTipologie = async (req, res, next) => {
      console.log("res query " + req.query);
      var utils = await utilsService.getIssuesTipologie();
    rows = utils;
    //res.render('verificaIssues', { title: "Verifica Richieste da chiudere", result: rows });
    res.json(rows);
},
exports.getFornotioriList = async (req, res, next) => {
  console.log("res query " + req.query);
  var utils = await utilsService.getFornotioriList();
rows = utils;
//res.render('verificaIssues', { title: "Verifica Richieste da chiudere", result: rows });
res.json(rows);
}

exports.test = (req, res, next) => {
  res.render('test');
}
