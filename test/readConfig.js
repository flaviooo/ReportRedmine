const expect = require('chai').expect
const config = require('../config/config');
const fs = require('fs');
let mysql = require('mysql');
//console.log(process.env)
console.log(process.env.CDLAN_PATH_PEM)

//   let esito =  fs.readFileSync('./etc/key/id_rsa.pem' || './etc/key/AWS_KEY.pem')
let esito =  fs.readFileSync('../etc/key/id_rsa.pem' || './etc/key/AWS_KEY.pem')  
 console.log(esito)
  
 /*    let myConn = connection.connect(done)
    console.log(esito)
    expect(myConn) */
