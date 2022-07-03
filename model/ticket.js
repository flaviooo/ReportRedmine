const local_db = require('../db/dbMaria');
module.exports = {
/*     async render() {
      try {
        conn = await local_db.getConnection();
        // TEST-  NON SERVE
        sql = "SELECT `custom_field_enumerations`.* FROM `custom_field_enumerations` WHERE `custom_field_enumerations`.`custom_field_id` = 4 AND `custom_field_enumerations`.`active` = TRUE ORDER BY `custom_field_enumerations`.`position` ASC"
        const rows = await conn.query(sql);
        conn.end();
        return rows;
      } catch (err) {
        throw err;
      }
    },
 */    async getDormienti() {
      try {
        conn = await local_db.getConnection();
     let s = " SELECT  `issues`.`id`,  `issues`.`tracker_id` ,`issues`.`subject` , `issues`.`assigned_to_id` , `issues`.`priority_id`, "+
     " `issues`.`author_id`,`issues`.`created_on`, `issues`.`updated_on`, `issues`.`start_date` , `issues`.`estimated_hours`,"+
     " `issue_statuses`.`name` ,  `issue_statuses`.`position`, `projects`.`id` as idProgetto, `projects`.`name` as nomeProgetto "+
     "    FROM `issues` "+
     "    INNER JOIN `projects` ON `projects`.`id` = `issues`.`project_id` "+
     "    INNER JOIN `issue_statuses` ON `issue_statuses`.`id` = `issues`.`status_id`"+
     "    WHERE (projects.status <> 9 AND EXISTS (SELECT 1 AS one FROM enabled_modules em WHERE em.project_id = projects.id AND em.name='issue_tracking'))"+
     "    AND (issues.updated_on <= '2022-06-17 23:59:59.999999' AND (issues.status_id IS NULL OR issues.status_id NOT IN ('4','14','11','5','6','8','13') )"+
     "         )"+
     "    AND  `issues`.`is_private`= 0"+
     "    ORDER BY issues.id DESC";
         console.info("Query Dormienti: "+ s);
       
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
