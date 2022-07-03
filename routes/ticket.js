const local_db = require('../db/db')
, path = require('path')
const validator = require('validator')

exports.getProve = (req, res, next) => {
  id="775";
    //let id = req.params.id; se dovessimo recuperare il parametro id in GEt dall'URL, altrimenti metto solo il codice per effettuare la query
    if(!validator.isNumeric(id) || id == 0){
        res.send('Parameter error: invalid parameters');
    }else{
     let s="SELECT  i.id, trackers.name as \"topoligia\", prj.name, i.subject, authors.login  AS Autore, assignees.login as \"Assegnato A\" " +
" , i.created_on, i.start_date, i.closed_on, issue_statuses.name as \"status\"" +
" , c1.value ,enumerations.name as \"priority\" " +
" FROM issues i" +
" LEFT JOIN trackers  ON trackers.id = i.tracker_id" +
" LEFT JOIN bitnami_redmine.projects  prj ON prj.id = i.project_id " +
" LEFT JOIN users authors  ON authors.id = i.author_id" +
" LEFT JOIN users assignees  ON assignees.id = i.assigned_to_id  " +
" LEFT JOIN enumerations   ON enumerations.id = i.priority_id  AND enumerations.type = 'IssuePriority'" +
" LEFT JOIN issue_statuses ON issue_statuses.id = i.status_id" +
" LEFT JOIN custom_values c1 ON c1.customized_id=i.id AND c1.custom_field_id=14" +
" LEFT JOIN custom_fields cf1 ON cf1.id =c1.custom_field_id " +
" WHERE i.id IS NOT NULL" +
"  and c1.value IS NOT nULL and c1.value <> \"\" " +
" GROUP BY i.id, trackers.name,  assignees.login, c1.value,  issue_statuses.name, enumerations.name  order by c1.value " ;
      console.log(s);
        local_db.query(s, (err, result, fields) => {
            if(err){

                res.send('Query error: ' + err.sqlMessage);
            }else{
                //res.json(rows);
                rows = result;
               // console.log(rows.id )
                //console.log(rows);
                res.render('ticketProrita', {
                  title: "Segnalazioni con Priorità"
                  , result: rows
                });
            }
        });
        
    }
};

exports.getDormienti = (req, res, next) => {
  id="775";
    //let id = req.params.id; se dovessimo recuperare il parametro id in GEt dall'URL, altrimenti metto solo il codice per effettuare la query
    if(!validator.isNumeric(id) || id == 0){
        res.send('Parameter error: invalid parameters');
    }else{
     let s="SELECT  i.id, trackers.name as \"topoligia\", prj.name, i.subject, authors.login  AS Autore, assignees.login as \"Assegnato A\" " +
" , i.created_on, i.start_date, i.closed_on, issue_statuses.name as \"status\"" +
" , c1.value ,enumerations.name as \"priority\" " +
" FROM issues i" +
" LEFT JOIN trackers  ON trackers.id = i.tracker_id" +
" LEFT JOIN bitnami_redmine.projects  prj ON prj.id = i.project_id " +
" LEFT JOIN users authors  ON authors.id = i.author_id" +
" LEFT JOIN users assignees  ON assignees.id = i.assigned_to_id  " +
" LEFT JOIN enumerations   ON enumerations.id = i.priority_id  AND enumerations.type = 'IssuePriority'" +
" LEFT JOIN issue_statuses ON issue_statuses.id = i.status_id" +
" LEFT JOIN custom_values c1 ON c1.customized_id=i.id AND c1.custom_field_id=14" +
" LEFT JOIN custom_fields cf1 ON cf1.id =c1.custom_field_id " +
" WHERE i.id IS NOT NULL" +
"  and c1.value IS NOT nULL and c1.value <> \"\" " +
" GROUP BY i.id, trackers.name,  assignees.login, c1.value,  issue_statuses.name, enumerations.name  order by c1.value " ;
      console.log(s);
        local_db.query(s, (err, result, fields) => {
            if(err){

                res.send('Query error: ' + err.sqlMessage);
            }else{
                //res.json(rows);
                rows = result;
               // console.log(rows.id )
                //console.log(rows);
                res.render('ticketProrita', {
                  title: "Segnalazioni con Priorità"
                  , result: rows
                });
            }
        });
        
    }
};

/* exports.report1 = function(req, res){
  res.render('report1');
}; */