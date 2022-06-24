const local_db = require('../db/db')
    , path = require('path')
    , validator = require('validator');

exports.getPageSal = (req, res, next) => {
    console.log("res query "+ req.query.fornitore);
    let s = " SELECT SUM(`time_entries`.`hours`) AS sum_hours, `time_entries`.`tyear` AS time_entries_tyear, `time_entries`.`tmonth` AS time_entries_tmonth, `time_entries`.`tweek` AS time_entries_tweek "+
        " FROM `time_entries`  "+
        " INNER JOIN `projects` ON `projects`.`id` = `time_entries`.`project_id`  "+
        " INNER JOIN `users` ON `users`.`id` = `time_entries`.`user_id` AND `users`.`type` IN ('User', 'AnonymousUser')  "+
        " LEFT OUTER JOIN `enumerations` ON `enumerations`.`id` = `time_entries`.`activity_id` AND `enumerations`.`type` IN ('TimeEntryActivity')  "+
        " LEFT OUTER JOIN issues ON issues.id = time_entries.issue_id  "+
        " LEFT JOIN issue_statuses  ist ON ist.id = issues.status_id   "+
         " WHERE ( projects.status <> 9 AND EXISTS (SELECT 1 AS one FROM enabled_modules em  WHERE em.project_id = projects.id AND em.name='time_tracking')) "+
          " AND  (time_entries.id  IN (SELECT time_entries.id FROM time_entries LEFT OUTER JOIN custom_values ON custom_values.customized_type='TimeEntry'  "+
          " AND  custom_values.customized_id=time_entries.id AND custom_values.custom_field_id=4  "+
        " WHERE (custom_values.value IN ('25')) AND (1=1)))  "+
          " GROUP BY  `time_entries`.`tyear`, `time_entries`.`tmonth`, `time_entries`.`tweek`  ";

//console.log("get SAL "+ s);
        local_db.query(s, (err, result, fields) => {
            if (err) {
                res.send('Query error: ' + err.sqlMessage);
            } else {
                rows = result;//parserSAL(result);
                res.render('reportSAL', { title: "Report SAL",  result: rows });
            }
        });        
};

exports.getData = (req, res, next) => {
    console.log("res query "+ req.query.fornitore);
    let fornitore = req.query.fornitore;
    
  //  if (!validator.isNumeric(id) || id == 0) {
   //     res.send('Parameter error: invalid parameters');
   // } else {
        let s = " SELECT SUM(`time_entries`.`hours`) AS sum_hours, `time_entries`.`tyear` AS time_entries_tyear, `time_entries`.`tweek` AS time_entries_tweek "+
        " FROM `time_entries`  "+
        " INNER JOIN `projects` ON `projects`.`id` = `time_entries`.`project_id`  "+
        " INNER JOIN `users` ON `users`.`id` = `time_entries`.`user_id` AND `users`.`type` IN ('User', 'AnonymousUser')  "+
        " LEFT OUTER JOIN `enumerations` ON `enumerations`.`id` = `time_entries`.`activity_id` AND `enumerations`.`type` IN ('TimeEntryActivity')  "+
        " LEFT OUTER JOIN issues ON issues.id = time_entries.issue_id  "+
        " LEFT JOIN issue_statuses  ist ON ist.id = issues.status_id   "+
         " WHERE ( projects.status <> 9 AND EXISTS (SELECT 1 AS one FROM enabled_modules em  WHERE em.project_id = projects.id AND em.name='time_tracking')) "+
          " AND  (time_entries.id  IN (SELECT time_entries.id FROM time_entries LEFT OUTER JOIN custom_values ON custom_values.customized_type='TimeEntry'  "+
          " AND  custom_values.customized_id=time_entries.id AND custom_values.custom_field_id=4  "+
        " WHERE (custom_values.value IN ('"+fornitore+"')) AND (1=1)))  "+
          " GROUP BY  `time_entries`.`tyear`, `time_entries`.`tweek`  ";

 console.log("get SAL "+ s);
        local_db.query(s, (err, result, fields) => {
            if (err) {
                res.send('Query error: ' + err.sqlMessage);
            } else { 
            //    console.log(result);              
                rows = parserSAL(result);
//                 console.log(rows)
                 res.json(rows);
                // res.render('reportSAL', { title: "Report SAL",  result: rows });
            }
        });

    //}
};

function parserSAL(results) {
    var array = [];

    var obOre = [];
    var obSum = [];
    var nWeek = [];
   // var nMese = [];
    var nAnno = [];
    var sum_hours= 0;
    
    results.forEach((element, index) => {
        let hour = element.sum_hours;
        sum_hours = sum_hours + hour;
        obSum.push(sum_hours);
        obOre.push(hour);
        nWeek.push(element.time_entries_tweek);
       // nMese.push(element.time_entries_tmonth);
        nAnno.push(element.time_entries_tyear);

    });
    array.push(obOre , obSum, nWeek, nAnno );
//console.log(ob+ "vvvvvv "+obSUM)
    return array;
}
