const local_db = require('../db/dbMaria');
module.exports = {

  async getTipologiaRgraph() {
    try {
      conn = await local_db.getConnection();
      let s = "SELECT  t.name as Tipologia, count(i.id) as totale , sum(ist.is_closed) as Chiuse, count(i.id) - sum(ist.is_closed) as Aperte  " +
      "FROM bitnami_redmine.issue_statuses ist " +
      "left join issues i ON i.status_id = ist.id " +
      "LEFT JOIN trackers  t ON t.id = i.tracker_id " +
      "left join projects p on p.id = i.project_id " +
      "where 1=1  " +
      "group by tipologia  having Aperte >=0  ";
    console.log("Query getTipologiaRgraph: " + s);
  
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
  }  ,
  async getTipologiaProgetti() {
    try {
      conn = await local_db.getConnection();
      
    let s = " SELECT p.name , round(count(i.id),0) as totale , sum(ist.is_closed) as Chiuse, count(i.id) - sum(ist.is_closed) as Aperte " +
    " FROM bitnami_redmine.issue_statuses ist " +
    " left join issues i ON i.status_id = ist.id " +
    " LEFT JOIN trackers  t ON t.id = i.tracker_id " +
    " left join projects p on p.id = i.project_id " +
    " where 1=1 " +
    " group by p.name  having Aperte >=0 ";
  console.log("Query getTipologiaProgetti: " + s);
 

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
  } ,
  async getTipologia() {
    try {
      conn = await local_db.getConnection();
      let s = "SELECT  t.name as Tipologia, round( count(i.id),0)  as totale , sum(ist.is_closed) as Chiuse, count(i.id) - sum(ist.is_closed) as Aperte  " +
      "FROM bitnami_redmine.issue_statuses ist " +
      "left join issues i ON i.status_id = ist.id " +
      "LEFT JOIN trackers  t ON t.id = i.tracker_id " +
      "left join projects p on p.id = i.project_id " +
      "where 1=1  " +
      "group by tipologia having Aperte >=0 ";
    console.log("Query getTipologia: " + s);
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