Node.js Bootstrap RedMine Report
===

A quick and easy Node.js + Jade template project

##### Also available for [GIT URL](https://github.com/flaviooo/ReportRedmine)

## Usage
- Clone repository.
- Open a command prompt, navigate to the folder, and enter: npm install
- Config db/config_db.js
  const config_db = {

    "dbdriver": "mysql",
    "dbhost": "127.0.0.1",
    "dbusername": "root",
    "dbpassword": "password",
    "db": "bitnami_redmine",
    "dbport": 3307
    
}
module.exports = config_db;

- Config DB/config_AWS.js'
fs = require('fs')
const confg_AWS = {
    host: 'xxx.xxx.xxx.xxx', //remote host ip 
    port: 22, //port used for scp 
    username: 'bitnami', //username to authenticate
    privateKey: fs.readFileSync('./etc/key/AWS_music_chiave_Ori.pem')
  }
module.exports = confg_AWS ;

- Next, run the app by entering: node app
- Browse to http://localhost:3000

## RedMine Report Dependencies
- npm install express --save
- npm install dotenv --save 
- npm install ssh2 --savejs
- npm install extract-zip --save
- npm i fs


## Contents:

- layout.jade
- header.jade
- footer.jade
- index.jade

