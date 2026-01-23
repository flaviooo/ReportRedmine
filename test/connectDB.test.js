const expect = require('chai').expect
const config = require('../config/config');
//const {config_db} = require('../config/config');
let mysql = require('mysql');

//console.log({config_db})
//describe("Connessione DB", () => {
//  it("Connesione Al db", (done) => {
  
    let connection = mysql.createConnection(config.config_db);

    let myConn = connection.connect()
    console.log(connection.state)
    connection.end();
 //   expect(myConn)

//  })
process.exit(0);
