require('dotenv').config();
console.log(process.env.DB_HOST);
const config_db = {
   // "dbdriver": "mysql",
    "dbhost": process.env.DB_HOST || "127.0.0.1",
    "dbusername": process.env.DB_USERNAME || "root",
    "dbpassword": process.env.DB_PASSWORD || "password",
    "dbdb": process.env.DB_DB || "bitnami_redmine",
    "dbport": process.env.DB_PORT || 3307
};
module.exports = config_db;

