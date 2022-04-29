const config_db = require('./config_db');
const mysql = require('mysql');

const conn_db = mysql.createConnection(config_db.connDBsettings);

module.exports = conn_db;