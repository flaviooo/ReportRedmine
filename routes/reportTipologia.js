const local_db = require('../db/db');

//exports.getTipologiaRgraph= (req, res, next) => {
 exports.getTipologiaRgraph= (req, res) => {
    let s="SELECT  t.name as Tipologia, count(i.id) as totale , sum(ist.is_closed) as Chiuse, count(i.id) - sum(ist.is_closed) as Aperte  "+
     "FROM bitnami_redmine.issue_statuses ist "+
     "left join issues i ON i.status_id = ist.id "+
     "LEFT JOIN trackers  t ON t.id = i.tracker_id "+
     "left join projects p on p.id = i.project_id "+
     "where 1=1  "+
     "group by tipologia  having Aperte >=0  ";
      console.log("Query: "+ s);
       local_db.query(s, (err, result, fields) => {
            if(err){
              res.send('Query error: ' + err.sqlMessage);
            }else{
               // res.json(result);
               // rows = result;
               // console.log(rows.id )
                //console.log(rows);
                
               // res.render('reportTipologia', { title: "Welcome to Report"   , result: result      });
                res.json(result);
            }
        });

},
 
exports.getTipologiaProgetti = (req, res) => {

  let s=" SELECT p.name , count(i.id) as totale , sum(ist.is_closed) as Chiuse, count(i.id) - sum(ist.is_closed) as Aperte "+ 
  " FROM bitnami_redmine.issue_statuses ist "+
  " left join issues i ON i.status_id = ist.id "+ 
  " LEFT JOIN trackers  t ON t.id = i.tracker_id "+
  " left join projects p on p.id = i.project_id "+
  " where 1=1 "+
  " group by p.name  having Aperte >=0 ";
    console.log("Query: "+ s);
     local_db.query(s, (err, result, fields) => {
          if(err){
              res.send('Query error: ' + err.sqlMessage);
          }else{
             // res.json(result);
             // rows = result;
             // console.log(rows.id )
              //console.log(rows);
             // res.render('reportTipologia', { title: "Welcome to Report"   , result: result      });
              res.json(result);
          }
      });

},

//on load
exports.getTipologia = (req, res, next) => {
     let s="SELECT  t.name as Tipologia, count(i.id) as totale , sum(ist.is_closed) as Chiuse, count(i.id) - sum(ist.is_closed) as Aperte  "+
     "FROM bitnami_redmine.issue_statuses ist "+
     "left join issues i ON i.status_id = ist.id "+
     "LEFT JOIN trackers  t ON t.id = i.tracker_id "+
     "left join projects p on p.id = i.project_id "+
     "where 1=1  "+
     "group by tipologia having Aperte >=0 ";
      console.log("Query: "+s);
        local_db.query(s, (err, result, fields) => {
            if(err){

                res.send('Query error: ' + err.sqlMessage);
            }else{
                //res.json(rows);
                rows = result;
               // console.log(rows.id )
                //console.log(rows);
                res.render('reportTipologia', {
                  title: "Welcome to Report"
                  , result: rows
                });
            }
        });
};

/* exports.report1 = function(req, res){
  res.render('report1');
}; */