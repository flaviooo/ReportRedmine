const local_db = require('../db/db');
var rows;
exports.getIssuesTipologie = (req, res, next) => {
      console.log("res query " + req.query);
let s = "SELECT id, name, is_closed, position, default_done_ratio FROM bitnami_redmine.issue_statuses; ";
  //console.log("IssuesTipologie "+ s);
local_db.query(s, (err, result, fields) => {
  if (err) {
    res.send('Query error: ' + err.sqlMessage);
  } else {
    //res.json(rows);
    rows = result;
    // console.log(rows);
    // console.log(rows.sum_hour)
    //res.render('verificaIssues', { title: "Verifica Richieste da chiudere", result: rows });
    res.json(rows);
  }
});

}