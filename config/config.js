// require('dotenv').config({ path: './../.env' });
require('dotenv').config();
console.log(process.env.DB_HOST);
console.log(process.env.CDLAN_PATH_PEM);
const path = require('path');
const fs = require('fs');

const config_AWS = {
    host: process.env.AWS_HOST || "127.0.0.1", 
    port: process.env.AWS_PORT || 22,  //port used for scp 
    username: process.env.AWS_USERNAME || 'bitnami', //username to authenticate
    privateKey: fs.readFileSync(process.env.AWS_PATH_PEM || './etc/key/NO.PEM'),
    
    connSettings : {
      port: process.env.AWS_PORT || 22, 
      host:  process.env.AWS_HOST || "127.0.0.1",
      username: process.env.AWS_USERNAME || 'bitnami',
      privateKey:  fs.readFileSync(process.env.AWS_PATH_PEM || './etc/key/NO.PEM')
     }

    };

const config_CDLAN = {
    port: process.env.CDLAN_PORT || 22,  //port used for scp 
    
    connSettings : {
      port: process.env.CDLAN_PORT || 22, 
      host:  process.env.CDLAN_HOST || "95.157.76.170",
      username: process.env.CDLAN_USERNAME || 'admincsea',
      password: process.env.CDLAN_PASS_PEM || 'admincsea',
      uploadOnSave: true,
      privateKey:  fs.readFileSync(process.env.CDLAN_PATH_PEM || './etc/key/id_rsa_csea')
    }
  };

const config_db = {
   // "dbdriver": "mysql",
    connDBsettings:  {
//        dbdriver: config_db.dbdriver,
        host: process.env.DB_HOST || "127.0.0.1",
        user: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "password",
        database: process.env.DB_DB || "bitnami_redmine",
        port: process.env.DB_PORT || 3307,
    }
};
const config_mail = {
        googleSetting: {
            from: process.env.MAIL_GMAIL_USER || '',
            to: 'flaviooo@gmail.com',
            auth: {
                user: process.env.MAIL_GMAIL_USER || '',
                pass: process.env.MAIL_GMAIL_TOKEN ||''
            }
        },
        templateCSEA: {
            header: "<style> h2 {color: #cccccc; } </style>",
            footer: "<img style=\"width:80px;\" src=\"cid:logo_colori\"/></br>"+
            "<p><b>CSEA - Area Sistemi Informativi</b></p>",
            logoImg : process.env.MAIL_LOGO,
            path_template : process.env.MAIL_PATH_TEMPLATE
        }
    };

    module.exports = {
        config_CDLAN : config_CDLAN,
        config_AWS   : config_AWS,
        config_db    : config_db,
        config_mail  : config_mail
      }
//module.exports = confg_AWS,config_mail,config_db ;
//module.exports = config_mail;
//module.exports = config_db;