// AWS_SSH  Connetion param
fs = require('fs');
const confg_AWS = {
    host: process.env.AWS_HOST || "127.0.0.1", //'3.138.103.144', //remote host ip 
    port: process.env.AWS_PORT || 22,  //port used for scp 
    username: process.env.AWS_USERNAME || 'bitnami', //username to authenticate
    privateKey: fs.readFileSync(process.env.AWS_PATH_PEM || './etc/key/AWS_KEY.pem')
  };
module.exports = confg_AWS ;