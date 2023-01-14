const local_db = require('../db/dbMaria');
module.exports = {

  async getRichiesteInfoIssues() {
    try {
      conn = await local_db.getConnection();
      let s = " SELECT  `issues`.`id`,  au.`login` as Autore, ass.`login`as Assegnato,timestampdiff(DAY, `issues`.`updated_on`, now()) as GiorniTrascorsi, " +
      " DATE_FORMAT(`issues`.`updated_on`, '%d/%m/%Y') as updated_on,`projects`.`name` AS NomeProgetto, `trackers`.`name`AS tipoRichiesta ,`issues`.`subject` " +
      " FROM `issues` " +
      " INNER JOIN `projects` ON `projects`.`id` = `issues`.`project_id`  " +
      " LEFT JOIN `users` au ON au.`id` = `issues`.`author_id` " +
      " LEFT JOIN `users` ass ON ass.`id` = `issues`.`assigned_to_id` " +
      " LEFT JOIN `trackers` ON `trackers`.`id` = `issues`.`tracker_id`  " +
      " INNER JOIN `issue_statuses` ON `issue_statuses`.`id` = `issues`.`status_id` " +
      " LEFT OUTER JOIN enumerations ON enumerations.id = issues.priority_id  " +
      " WHERE (projects.status <> 9 AND EXISTS (SELECT 1 AS one FROM enabled_modules em WHERE em.project_id = projects.id AND em.name='issue_tracking')) " +
      " AND ((issues.status_id IN ('4')) )  and `issues`.`is_private` = 0  " +
      " ORDER BY au.`login` ASC, enumerations.position DESC, issues.updated_on DESC, issues.id DESC  ";
      console.log("getRichiesteInfoIssues "+ s);

      const result = await conn.query(s,{});
      conn.end();
      rows = result;
      if (rows.length != 0) {
        return rows;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }  ,
  async getIssuesVerificaCollaudo() {
    try {
      conn = await local_db.getConnection();
      let s = " SELECT  `issues`.`id`,  au.`login` as Autore, ass.`login`as Assegnato,timestampdiff(DAY, `issues`.`updated_on`, now()) as GiorniTrascorsi, " +
    " DATE_FORMAT(`issues`.`updated_on`, '%d/%m/%Y') as updated_on,`projects`.`name` AS NomeProgetto, `trackers`.`name`AS tipoRichiesta ,`issues`.`subject` " +
    " FROM `issues` " +
    " INNER JOIN `projects` ON `projects`.`id` = `issues`.`project_id`  " +
    " LEFT JOIN `users` au ON au.`id` = `issues`.`author_id` " +
    " LEFT JOIN `users` ass ON ass.`id` = `issues`.`assigned_to_id` " +
    " LEFT JOIN `trackers` ON `trackers`.`id` = `issues`.`tracker_id`  " +
    " INNER JOIN `issue_statuses` ON `issue_statuses`.`id` = `issues`.`status_id` " +
    " LEFT OUTER JOIN enumerations ON enumerations.id = issues.priority_id  " +
    " WHERE (projects.status <> 9 AND EXISTS (SELECT 1 AS one FROM enabled_modules em WHERE em.project_id = projects.id AND em.name='issue_tracking')) " +
    " AND ((issues.status_id IN ('29')) )  and `issues`.`is_private` = 0  " +
    " ORDER BY au.`login` ASC, enumerations.position DESC, issues.updated_on DESC, issues.id DESC  ";
    console.log("getIssuesVerificaCollaudo "+ s);
      const result = await conn.query(s);
      conn.end();
      rows = result;
      if (rows.length != 0) {
        return rows;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }  
}; 