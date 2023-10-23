const expect = require('chai').expect;
const config = require('../config/config');
const fs = require('fs');
let mysql = require('mysql');
//console.log(process.env)
console.log("Config: "+config.config_app.host)
console.log("Process: "+process.env.CDLAN_PATH_PEM)
console.log("Config PEM: "+config.config_CDLAN.connSettings.privateKey)
let esito =  fs.readFileSync('.././etc/key/id_rsa' || './etc/key/AWS_KEY.pem')  
 console.log(esito)
  
 /*    let myConn = connection.connect(done)
    console.log(esito)
    expect(myConn) */
