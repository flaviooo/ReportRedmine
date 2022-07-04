const local_db = require('../db/db');
const indexService = require('../model/index');

exports.renderIndex = function(req, res){
  res.render('index', { title: "Tempo Totale Impiegato/Progetti"})
  //res.render('index');
};
exports.getTimeProjJson = async (req, res) => {
  let meseS = req.query.meseS
  let meseE = req.query.meseE
  let anno = req.query.anno
  let spent_start =anno+"-"+meseS+"-01";
  var spent_end =anno+"-"+meseE+"-30";
 
  try {
  var timeTicket = await  indexService.getTime(spent_start,spent_end);
  res.json(timeTicket);
  //return res.status(200).json({ status: 200, data: timeTicket, message: "Succesfully Users Retrieved" });
  //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
  //console.log("mesi selezioniti: " + spent_end)
  
};

exports.getTimeProjJson2= (req, res) => {

  let meseS = req.query.meseS
  let meseE = req.query.meseE
  let anno = req.query.anno
  let spent_start =anno+"-"+meseS+"-01";
  var spent_end =anno+"-"+meseE+"-30";

  //console.log("mesi selezioniti: " + spent_end)

  let s =  " SELECT `projects`.`name` , ROUND(SUM(`time_entries`.`hours`),2) AS sum_hours"+
" FROM `time_entries` "+
"   INNER JOIN `projects` ON `projects`.`id` = `time_entries`.`project_id`   "+
"   INNER JOIN `users` ON `users`.`id` = `time_entries`.`user_id` AND `users`.`type` IN ('User', 'AnonymousUser') "+
"   LEFT OUTER JOIN `enumerations` ON `enumerations`.`id` = `time_entries`.`activity_id` AND `enumerations`.`type` IN ('TimeEntryActivity') "+
"   LEFT OUTER JOIN issues ON issues.id = time_entries.issue_id  "+
"   LEFT OUTER JOIN `trackers` ON `trackers`.`id` = `issues`.`tracker_id`   "+
" WHERE (projects.status <> 9 AND EXISTS (SELECT 1 AS one FROM enabled_modules em WHERE em.project_id = projects.id AND em.name='time_tracking'))"+
//" AND ((time_entries.spent_on >  (DATE_SUB(now(), INTERVAL "+mese+" month)) AND time_entries.spent_on <= now()) "+
"  AND ((time_entries.spent_on > '"+spent_start+"'   AND time_entries.spent_on <= '"+spent_end+"') "+
"  AND ((time_entries.project_id IS NULL OR time_entries.project_id  NOT IN ('181','201'))))"+
" GROUP BY time_entries.project_id";
//   console.info("Query index: "+ s);
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
};
