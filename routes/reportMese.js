const local_db = require('../db/db')
    , path = require('path')
    , validator = require('validator')

exports.getAllMonth = (req, res, next) => {
    console.log("res query "+ req.query)
  //  if (!validator.isNumeric(id) || id == 0) {
   //     res.send('Parameter error: invalid parameters');
   // } else {
        let s = " SELECT  ROUND(SUM(`time_entries`.`hours`),2) AS sum_hour,  `time_entries`.`tyear` , `time_entries`.`tmonth`,`trackers`.`name` " +
        " FROM `time_entries`   " +
        " INNER JOIN `projects` ON `projects`.`id` = `time_entries`.`project_id` " +
        " INNER JOIN `users` ON `users`.`id` = `time_entries`.`user_id` AND `users`.`type` IN ('User', 'AnonymousUser')  " +
        " LEFT OUTER JOIN `enumerations` ON `enumerations`.`id` = `time_entries`.`activity_id` AND `enumerations`.`type` IN ('TimeEntryActivity')  " +
        " LEFT OUTER JOIN issues ON issues.id = time_entries.issue_id   LEFT OUTER JOIN `trackers` ON `trackers`.`id` = `issues`.`tracker_id`   " +
        " WHERE (projects.status <> 9 AND EXISTS (SELECT 1 AS one FROM enabled_modules em WHERE em.project_id = projects.id AND em.name='time_tracking'))    " +
        "   	AND ((time_entries.project_id IS NULL OR time_entries.project_id NOT IN ('181','201')))    " +
        " GROUP BY `trackers`.`name` , `time_entries`.`tyear` , `time_entries`.`tmonth`,`trackers`.`name` " ;
//console.log("getAllMonth "+ s);
        local_db.query(s, (err, result, fields) => {
            if (err) {
                res.send('Query error: ' + err.sqlMessage);
            } else {
                //res.json(rows);
                rows = result;
                // console.log(rows.sum_hour)
                 res.render('reportMese', { title: "Report Mese",  result: rows });
            }
        });

    //}
};

exports.getMonthByParam = (req, res, next) => {
    
    let spent_start = "";
    let spent_end = "";
    let anno = "";
    console.log("res query "+ req.query)
    let value = Object.keys(req.query).length === 0
    console.log("value "+ !value)
    if(Object.keys(req.query).length === 0){
        spent_start = "2021-04-30";
        spent_end = "now()";
        console.log("A "+!Object.keys(req.query).length === 0)
    }else{
        console.log("B "+req.query)
        meseStart = req.query.meseS
        meseEnd = req.query.meseE
        anno = req.query.anno
        spent_start = anno+"-"+meseStart+"-01";
        spent_end = anno+"-"+meseEnd+"-30";
}
    if (!validator.isNumeric(anno) || anno == 0) {
        res.send('Parameter error: invalid parameters');
    } else {
        let s = " SELECT  ROUND(SUM(`time_entries`.`hours`),2) AS sum_hour,  `time_entries`.`tyear` , `time_entries`.`tmonth`,`trackers`.`id`,`trackers`.`name`" +
            " FROM `time_entries`  " +
            " INNER JOIN `projects` ON `projects`.`id` = `time_entries`.`project_id` " +
            " INNER JOIN `users` ON `users`.`id` = `time_entries`.`user_id` AND `users`.`type` IN ('User', 'AnonymousUser')" +
            " LEFT OUTER JOIN `enumerations` ON `enumerations`.`id` = `time_entries`.`activity_id` AND `enumerations`.`type` IN ('TimeEntryActivity')" +
            " LEFT OUTER JOIN issues ON issues.id = time_entries.issue_id   LEFT OUTER JOIN `trackers` ON `trackers`.`id` = `issues`.`tracker_id` " +
            " WHERE (projects.status <> 9 AND EXISTS (SELECT 1 AS one FROM enabled_modules em WHERE em.project_id = projects.id AND em.name='time_tracking'))    " +
            "   AND (" +
            "   (time_entries.spent_on > '"+spent_start+"' AND time_entries.spent_on <=  '"+spent_end+"') " +
            "    AND ((time_entries.project_id IS NULL OR time_entries.project_id NOT IN ('181','201')))" +
            "   )  " +
            "   GROUP BY `trackers`.`name` , `time_entries`.`tyear` , `time_entries`.`tmonth`,`trackers`.`id`,`trackers`.`name` "
        console.log("getMonthByParam "+ s);
        local_db.query(s, (err, result, fields) => {
            if (err) {

                res.send('Query error: ' + err.sqlMessage);
            } else {
                //res.json(rows);
                rows = result;
                rows =  parser4Month(result)
                // console.log(rows.id )
                // console.log(rows);
                // res.render('reportMese', { title: "Report Mese" , result: rows  });
                //res.json(result);
                res.json(rows)
            }
        });

    }
};

function parser4Month(results) {
    var array = [];
    let sum_hours = 0
    results.forEach((element, index) => {
       // console.log("++++++++++++++++++++++++++++++++++++++------ " + index);
        var sommaMeseSelezionato = results.reduce(function (accumulator, current) {
            if (element.tmonth === current["tmonth"])
                return accumulator + (current["sum_hour"] || 0)
            else
                return accumulator
        }, 0).toFixed(2);
        let percent = ((element.sum_hour / sommaMeseSelezionato) * 100).toFixed(2)
       // console.log(element.tmonth + " " + sommaMeseSelezionato + " " + element.sum_hour + " " + percent + " % " + element.name)
        var ob = []
        ob.push(element.tmonth,element.tyear, element.id, element.name, percent, sommaMeseSelezionato)
        // var mesiSelezionato = results.filter(i => (i === element.tmonth))
        array.push(ob);
    });
    return array
}
