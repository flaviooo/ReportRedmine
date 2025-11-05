//require('dotenv').config({ path: '../.env' });
require('dotenv').config();
const fs = require('fs');

console.log("***************** Read Config Start *****************************************");
console.log("Test Reading Configuration APP: "+process.env.HOST+":"+process.env.PORT);
console.log("Test Reading Configuration BD: "+process.env.DB_HOST+":"+process.env.DB_PORT+ " "+process.env.DB_USERNAME);
console.log("Test Reading Configuration CDLAN: "+process.env.CDLAN_HOST+":"+process.env.CDLAN_PORT+" "+process.env.CDLAN_USERNAME);
console.log("Test Reading Configuration Mail: "+process.env.MAIL_GMAIL_USER);
console.log("Test Reading Configuration SWAGGER: "+process.env.SWAGGER_HOST);
console.log("Test Reading Configuration Time Entries: "+process.env.CDLAN_URL_API);
console.log("***************** Read Config END   *********************************************");

const config_app = {
    host: process.env.HOST || "127.0.0.1",
    port: process.env.PORT || 4000,
    timeEntries: process.env.TIME_ENTRIES    
};

const config_CDLAN = {

    port: process.env.CDLAN_PORT || 22,  //port used for scp 
    connSettings: {
        port: process.env.CDLAN_PORT || 22,
        host: process.env.CDLAN_HOST || "95.157.76.170",
        username: process.env.CDLAN_USERNAME || 'admincsea',
        password: process.env.CDLAN_PASS_PEM || 'admincsea',
        pathPEM : process.env.CDLAN_PATH_PEM || './etc/key/id_rsa_csea',
        uploadOnSave: true,
        privateKey: fs.readFileSync( process.env.CDLAN_PATH_PEM ||  './etc/key/id_flavio4_pem')
       // privateKey: fs.readFileSync( '.././etc/key/id_flavio4_pem'|| process.env.CDLAN_PATH_PEM )
    },
    connAPI: {
        method: 'get',
        url: process.env.CDLAN_URL_API || 'http://192.168.40.30:3000/time_entries.xml',
        headers: { 'X-Redmine-API-Key': process.env.CDLAN_PASS_API },
        password : process.env.CDLAN_PASS_API || 'admincsea'
    },
    dump:{
        localPath : process.env.DUMP_LOCAL_PATH || '//',
        remotePath: process.env.DUMP_CDLAN_REMOTE_PATH || '/home/admincsea/dump/archivio',
        localPathFileSql : process.env.DUMP_LOCAL_PATH || '//',
    }
};

const config_db = {
    // "dbdriver": "mysql",
    connDBsettings: {
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
            pass: process.env.MAIL_GMAIL_TOKEN || ''
        }
    },
    templateCSEA: {
        header: "<style> h2 {color: #cccccc; } </style>",
        footer: "<img style=\"width:80px;\" src=\"cid:logo_colori\"/></br>" +
            "<p><b>CSEA - Area Sistemi Informativi</b></p>",
        logoImg: process.env.MAIL_LOGO,
        path_template: process.env.MAIL_PATH_TEMPLATE
    }
};

//
// SWAGGER CONFIG
//
const swaggerHost = process.env.SWAGGER_HOST || '/api-docs';
const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 3001;

const config_swagger = {
  swaggerHost,
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API CSEA',
      version: '1.0.0',
      description: 'Documentazione automatica delle API Express',
    },
    servers: [
      {
        url: `http://${host}:${port}${swaggerHost}`, // Es: http://localhost:4000/api-docs
        description: 'Server locale di sviluppo',
      },
    ],
  },
  options: {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API CSEA',
        version: '1.0.0',
        description: 'Documentazione automatica delle API Express',
      }
    },
    apis: ['./routes/**/*.js', './controllers/**/*.js'], // dove ci sono i blocchi @openapi
  }
};

module.exports = {
    
    config_app: config_app,
    config_CDLAN: config_CDLAN,
    config_db: config_db,
    config_mail: config_mail,
    config_swagger: config_swagger  
};
//module.exports = confg_AWS,config_mail,config_db ;
//module.exports = config_mail;
//module.exports = config_db;
