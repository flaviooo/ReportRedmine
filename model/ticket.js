const local_db = require('../db/dbMaria');
module.exports = {

  async getDormienti() {
    try {
      conn = await local_db.getConnection();
      let s = " SELECT  `issues`.`id`,  `issues`.`tracker_id` ,`issues`.`subject` , `issues`.`assigned_to_id` , `issues`.`priority_id`, " +
        " `issues`.`author_id`,`issues`.`created_on`, `issues`.`updated_on`, `issues`.`start_date` , `issues`.`estimated_hours`," +
        " `issue_statuses`.`name` ,  `issue_statuses`.`position`, `projects`.`id` as idProgetto, `projects`.`name` as nomeProgetto " +
        "    FROM `issues` " +
        "    INNER JOIN `projects` ON `projects`.`id` = `issues`.`project_id` " +
        "    INNER JOIN `issue_statuses` ON `issue_statuses`.`id` = `issues`.`status_id`" +
        "    WHERE (projects.status <> 9 AND EXISTS (SELECT 1 AS one FROM enabled_modules em WHERE em.project_id = projects.id AND em.name='issue_tracking'))" +
        "    AND (issues.updated_on <= '2022-06-17 23:59:59.999999' AND (issues.status_id IS NULL OR issues.status_id NOT IN ('4','14','11','5','6','8','13') )" +
        "    )" +
        "    AND  `issues`.`is_private`= 0" +
        "    ORDER BY issues.id DESC";
      console.info("Query Dormienti: " + s);

      const result = await conn.query(s,);
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
  async getPriorita() {
    try {
      conn = await local_db.getConnection();
      let s = "SELECT  i.id, trackers.name as \"topoligia\", prj.name, i.subject, authors.login  AS Autore, assignees.login as \"Assegnato A\" " +
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
        " GROUP BY i.id, trackers.name,  assignees.login, c1.value,  issue_statuses.name, enumerations.name  order by c1.value ";
      console.log(s);
      const result = await conn.query(s,);
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