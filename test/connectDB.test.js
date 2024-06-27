const expect = require('chai').expect
const {config_db} = require('../config/config');
let mysql = require('mysql');

//describe("Connessione DB", () => {
//  it("Connesione Al db", (done) => {

    let connection = mysql.createConnection({
      dbdriver: config_db.dbdriver,
      host: config_db.connDBsettings.host,
      user: config_db.connDBsettings.user,
      password: config_db.connDBsettings.password,
      database: config_db.connDBsettings.database,
      port: config_db.connDBsettings.port
    });

    let myConn = connection.connect()
   // console.log(myConn.state())
    connection.end();
 //   expect(myConn)

//  })
//})
