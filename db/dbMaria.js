const mariadb = require("mariadb");
const config = require('../config/config');

const pool = mariadb.createPool(config.config_db.connDBsettings);

module.exports = {
  getConnection() {
    return new Promise(function (res, rej) {
      pool.getConnection({
        supportBigNumbers: true,
        bigNumberStrings: true
})
        .then(function (conn) {
          res(conn);
        })
        .catch(function (error) {
          rej(error);
        });
    });
  }
};