const expect = require('chai').expect

//const config = require('./../config/config');
//const config = require('dotenv').config({ path: './../.env' });
const fs = require('fs');
let Client = require('ssh2-sftp-client');
let sftp = new Client();

sftp.connect({
  host: '95.157.76.170',
  port: '22',
  username: 'flaviotuosto',
  password: 'Cse4R3dmine2022*',
  privateKey:  fs.readFileSync( '../etc/key/id_flavio4_pem')
}).then(() => {
  return sftp.list('/tmp');
}).then(data => {
  console.log(data, 'the data info');
}).catch(err => {
  console.log(err, 'catch error');
});

/* 
let config_CDLAN = {
  connSettings : {
    port: process.env.CDLAN_PORT || 22, 
    host:  process.env.CDLAN_HOST || "95.157.76.170",
    username: process.env.CDLAN_USERNAME || 'admincsea',
    interactiveAuth: true,
    tryKeyboard: true,
    password : process.env.CDLAN_PASS || 'password',
    privateKey:  fs.readFileSync(process.env.CDLAN_PATH_PEM || '../etc/key/id_rsa.pem')
  } 
};*/
