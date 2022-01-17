const config_db = require('./../db/config_db');
let mysql = require('mysql');

let connection = mysql.createConnection({
  dbdriver: config_db.dbdriver,
  host: config_db.dbhost,
  user: config_db.dbusername,
  password: config_db.dbpassword,
  database: config_db.dbdb,
  port: config_db.dbport
});

connection.connect(function (err) {
  console.log("Connessione a "+connection.config.dbdb+"  " + connection.config.host+":"+connection.config.port)
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});