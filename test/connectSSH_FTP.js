const expect = require('chai').expect
//const config = require('./../config/config');
const config = require('dotenv').config({ path: './../.env' });
const fs = require('fs');
let Client = require('ssh2-sftp-client');
let sftp = new Client();


let config_CDLAN = {
  connSettings : {
    port: config.parsed.CDLAN_PORT || 22, 
    host:  config.parsed.CDLAN_HOST || "95.157.76.",
    username: config.parsed.CDLAN_USERNAME || 'admin',
    interactiveAuth: true,
    tryKeyboard: true,
    password : config.parsed.CDLAN_PASS || 'password',
    privateKey:  fs.readFileSync("."+config.parsed.CDLAN_PATH_PEM || '../etc/key/id_rsa.pem')
  } 
};

sftp.connect(config_CDLAN.connSettings)
.then(() => {
  return sftp.list('/home/admincsea/dump/archivio/');
  //return sftp.list('/tmp');
}).then(data => {
  console.log(data, 'the data info');
}).catch(err => {
  console.log(err, 'catch error');
});
