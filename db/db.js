const config_db = require('./config_db');
console.log(config_db)
const mysql = require('mysql');

const conn_db = mysql.createConnection({
    dbdriver: config_db.dbdriver,
    host: config_db.dbhost,
    user: config_db.dbusername,
    password: config_db.dbpassword,
    database: config_db.dbdb,
    port: config_db.dbport
});

module.exports = conn_db;