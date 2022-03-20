const local_db = require('../db/db');

exports.getIssuesVerificaCollaudo = (req, res, next) => {
    console.log("res query "+ req.query);
    let s = " SELECT  `issues`.`id`,  au.`login` as Autore, ass.`login`as Assegnato,timestampdiff(DAY, `issues`.`updated_on`, now()) as GiorniTrascorsi, " +
    " DATE_FORMAT(`issues`.`updated_on`, '%d/%m/%Y') as updated_on,`projects`.`name`, `trackers`.`name` ,`issues`.`subject` " +
    " FROM `issues` " +
    " INNER JOIN `projects` ON `projects`.`id` = `issues`.`project_id`  " +
    " LEFT JOIN `users` au ON au.`id` = `issues`.`author_id` " +
    " LEFT JOIN `users` ass ON ass.`id` = `issues`.`assigned_to_id` " +
    " LEFT JOIN `trackers` ON `trackers`.`id` = `issues`.`tracker_id`  " +
    " INNER JOIN `issue_statuses` ON `issue_statuses`.`id` = `issues`.`status_id` " +
    " LEFT OUTER JOIN enumerations ON enumerations.id = issues.priority_id  " +
    " WHERE (projects.status <> 9 AND EXISTS (SELECT 1 AS one FROM enabled_modules em WHERE em.project_id = projects.id AND em.name='issue_tracking')) " +
    " AND ((issues.status_id IN ('11')) )  and `issues`.`is_private` = 0  " +
    " ORDER BY au.`login` ASC, enumerations.position DESC, issues.updated_on DESC, issues.id DESC  " ;
    console.log("Richieste da chiudere "+ s);
        local_db.query(s, (err, result, fields) => {
            if (err) {
                res.send('Query error: ' + err.sqlMessage);
            } else {
                //res.json(rows);
                rows = result;
                console.log(rows);

                // console.log(rows.sum_hour)
                 res.render('verificaIssues', { title: "Verifica Richieste da chiudere",  result: rows });
            }
        });

};
