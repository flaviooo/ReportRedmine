const config_db = require('../config/config');
const mysql = require('mysql');

const conn_db = mysql.createConnection(config_db.connDBsettings);

module.exports = conn_db;