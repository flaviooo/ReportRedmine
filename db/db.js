//const config_db = require('./config_db');
const config = require('../config/config.js');
const mysql = require('mysql');

const conn_db = mysql.createConnection(config.config_db.connDBsettings);

module.exports = conn_db;