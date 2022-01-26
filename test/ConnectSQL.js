const expect = require('chai').expect
const config_db = require('./../db/config_db');
let mysql = require('mysql');

describe("Connessione DB", () => {
  it("Connesione Al db", (done) => {

    let connection = mysql.createConnection({
      dbdriver: config_db.dbdriver,
      host: config_db.dbhost,
      user: config_db.dbusername,
      password: config_db.dbpassword,
      database: config_db.dbdb,
      port: config_db.dbport
    });

    let myConn = connection.connect(done)
    expect(myConn)
  })
})
