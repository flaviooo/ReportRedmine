require('dotenv').config();
console.log(process.env.DB_HOST);
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

module.exports = config_db;

