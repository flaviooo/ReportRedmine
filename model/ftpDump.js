// ftpService.js
const ftp = require('../db/ftpCSEA');   // il tuo modulo che espone connect(), downloadFile(), ecc.
const config = require('./../config/config');

module.exports = {

  // Ottiene i nomi dei file ZIP remoti
  async getNameLastFilesDumpZip() {
    try {
      await ftp.connect(config.config_CDLAN.connSettings);
      console.log("✅ Connessione FTP aperta");

      const result = await ftp.getlastFiles(config.config_CDLAN.dump.remotePath);
      console.log("📦 File trovati:", result);

      await ftp.disconnect();
      console.log("🔌 Connessione FTP chiusa");

      return result && result.length ? result : false;
    } catch (err) {
      console.error("❌ Errore in getNameLastFilesDumpZip:", err.message);
      try { await ftp.disconnect(); } catch {}
      throw err;
    }
  },

  // Scarica un file ZIP specifico
  async downloadFile(filedumpZIP) {
    try {
      await ftp.connect(config.config_CDLAN.connSettings);
      console.log("✅ Connessione FTP aperta");

      const from = config.config_CDLAN.dump.remotePath + filedumpZIP;
      const to = config.config_CDLAN.dump.localPath + filedumpZIP;

      console.log(`⬇️  Downloading: ${from} → ${to}`);

      const result = await ftp.downloadFile(from, to);
      console.log("✅ Download completato:", result);

      await ftp.disconnect();
      console.log("🔌 Connessione FTP chiusa");

      return result && result.length ? result : false;
    } catch (err) {
      console.error("❌ Errore in downloadFile:", err.message);
      try { await ftp.disconnect(); } catch {}
      throw err;
    }
  }
};
