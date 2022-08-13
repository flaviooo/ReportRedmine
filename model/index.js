const local_db = require('../db/dbMaria');
module.exports = {
  
/*     async index() {
     
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
 */    async getTime(spent_start, spent_end) {
      try {
        conn = await local_db.getConnection();
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
         console.info("Query index: "+ s);
       
        const result = await conn.query(s, spent_start,spent_end);
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
