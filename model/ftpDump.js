//const local_db = require('../db/dbMaria');
const ftp = require('../db/ftpCSEA');
const config = require('./../config/config');

module.exports = {

  async connect() {
    // console.log(`Connecting to ${options.host}:${options.port}`);
    try {
        await ftp.connect(config.config_CDLAN.connSettings);
   
    } catch (err) {
        console.log('Failed to connect:', err);
    }
},
  async disconnect() {
    try {
      const result = await ftp.disconnect();
      return result;
    } catch (err) {
      throw err;
    }
  }  ,
  async getNameLastFilesDumpZip() {
    try {
      console.log(config.config_CDLAN.dump.remotePath)
      const result = await ftp.getlastFiles(config.config_CDLAN.dump.remotePath);
      console.log("getlastFiles "+ result);
      if (result) {
        return result;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },
    async downloadFile (filedumpZIP) {
      try {
        if (!filedumpZIP) {
          throw new Error('filedumpZIP is undefined');
        }
        console.log(filedumpZIP)
        let from = config.config_CDLAN.dump.remotePath  + filedumpZIP;
        let to =  config.config_CDLAN.dump.localPath  + filedumpZIP;
        console.log("Downloading ... From "+ from + " to "+to);
        const result = await ftp.downloadFile(from,to);
        console.log("downloadFile "+ result);
        return to; // Return the local file path
      } catch (err) {
        throw err;
      }
    }
}; 