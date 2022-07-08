const local_db = require('../db/dbMaria');
module.exports = {

  async getAllMonth() {
    try {
      conn = await local_db.getConnection();
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
  async getMonthByParam(spent_start, spent_end) {
    try {
      conn = await local_db.getConnection();
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
  } ,
   //SAL
  async getPageSal() {
    try {
      conn = await local_db.getConnection();
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
console.log("getMonthByParam "+ s);


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
  ,
   //SAL
  async getSalDataLineJson(fornitore) {
    try {
      conn = await local_db.getConnection();
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