const local_db = require('../db/db');

exports.index = function(req, res){
  res.render('index', { title: "Tempo Totale Impiegato/Progetti"})
  //res.render('index');
};

exports.getTimeProj= (req, res) => {
  let mese = req.query.mese
  let anno = req.query.anno
  let spent_start =anno+"-"+mese+"-30 23:59:59.999999";
  // var spent_end ="2021-12-31 23:59:59.999999";
  console.log("spent_start: " + spent_start)

  let s = " SELECT `projects`.`name` , ROUND(SUM(`time_entries`.`hours`),2) AS sum_hours  "+
  " FROM `time_entries`  "+
  " INNER JOIN `projects` ON `projects`.`id` = `time_entries`.`project_id`  "+
  " INNER JOIN `users` ON `users`.`id` = `time_entries`.`user_id` AND `users`.`type` IN ('User', 'AnonymousUser')  "+
  " LEFT OUTER JOIN `enumerations` ON `enumerations`.`id` = `time_entries`.`activity_id` AND `enumerations`.`type` IN ('TimeEntryActivity')  "+
  " LEFT OUTER JOIN issues ON issues.id = time_entries.issue_id  "+
  " LEFT OUTER JOIN `trackers` ON `trackers`.`id` = `issues`.`tracker_id` "+
  "  WHERE (projects.status <> 9 AND EXISTS (SELECT 1 AS one FROM enabled_modules em WHERE em.project_id = projects.id AND em.name='time_tracking'))  "+
  "  AND ((time_entries.spent_on > '"+ spent_start +"' AND time_entries.spent_on <= now()) "+
  //  "  AND ((time_entries.spent_on > '2021-10-31 23:59:59.999999' AND time_entries.spent_on <= '2021-11-30 23:59:59.999999')  "+
  "  AND ((time_entries.project_id IS NULL OR time_entries.project_id NOT IN ('181','201')))) "+
  "  GROUP BY time_entries.project_id -- ,  trackers.name -- , `time_entries`.`tyear`, `time_entries`.`tmonth`, `time_entries`.`tweek`, `time_entries`.`spent_on` "+
  " order by projects.name ";
   console.info("Query getTimeProj: "+ s);
  local_db.query(s, (err, result, fields) => {
    if(err){
      console.log(err)
      res.send('Query error: ' + err.sqlMessage);
    }else{
            //var restulJson = res.json(result);
             rows = result;
            // console.log(rows.id )
             //console.log(rows);
             //res.render('index', { title: " Report CSEA" , result: rows , tempo: spent_start});
            res.json(result);
         }
   });
}
