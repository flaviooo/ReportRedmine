//const local_db = require('../db/dbMaria');
const ftp = require('../db/ftpCSEA');
const config = require('./../config/config');

module.exports = {

  async connect() {
    // console.log(`Connecting to ${options.host}:${options.port}`);
    try {
        await ftp.connect(config.config_CDLAN.connSettings);
     //   let filename = await ftp.getlastFiles();
      //  console.log(filename)

    } catch (err) {
        console.log('Failed to connect:', err);
    }
},
  async disconnect() {
    try {
      const result = await ftp.disconnect();
      
      rows = result;
      if (rows.length != 0) {
        return rows;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }  ,
  async getlastFiles() {
    try {
    //  console.log(config.config_CDLAN.dump.remotePath)
        const result = await ftp.getlastFiles(config.config_CDLAN.dump.remotePath);
      rows = result;
      console.log(rows)
      if (rows.length != 0) {
        return rows;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }
  
}; 