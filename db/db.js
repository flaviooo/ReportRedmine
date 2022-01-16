const config_db = require('./config_db');
const mysql = require('mysql');

const conn_db = mysql.createConnection({
    host     : config_db.dbhost,
    user     : config_db.dbusername,
    password : config_db.dbpassword,
    database : config_db.db,
    port     : 3307
     /*     
    host     : config_db.dbhost,
    user     : config_db.dbusername,
    password : config_db.dbpassword,
    database : config_db.db,
    port     : 3307 */
});

module.exports = conn_db;