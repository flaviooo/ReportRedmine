let Client = require('ssh2-sftp-client');
const config = require('../config/config');
/* class SFTPClient {
    constructor() {
        this.client = new Client();
    }
  }
 */
  client = new Client();
    
module.exports = {
    
      async connect() {
        // console.log(`Connecting to ${options.host}:${options.port}`);
        try {
            await client.connect(config.config_CDLAN.connSettings);
        } catch (err) {
            console.log('Failed to connect:', err);
        }
    },

    async disconnect() {
        await client.end();
    },

    async listFiles(remoteDir, fileGlob) {
        console.log(`Listing ${remoteDir} ...`);
        let fileObjects;
        try {
            fileObjects = await this.client.list(remoteDir, fileGlob);
        } catch (err) {
            console.log('Listing failed:', err);
        }

        const fileNames = [];
        for (const file of fileObjects) {
            if (file.type === 'd') {
                console.log(`${new Date(file.modifyTime).toISOString()} PRE ${file.name}`);
            } else {
                console.log(`${new Date(file.modifyTime).toISOString()} ${file.size} ${file.name}`);
            }

            fileNames.push(file.name);
        }
        return fileNames;
    },

    async getlastFiles(remoteDir) {
        console.log(`Listing ${remoteDir} ...`);
        let fileObjects;
        try {
            fileObjects = await client.list(remoteDir);
        } catch (err) {
            console.log('Listing failed:', err);
        }

        let filename = "";
        let temp = 0;
        for (const file of fileObjects) {
            if (file.type === 'd') {
                console.log(`${new Date(file.modifyTime).toISOString()} PRE ${file.name}`);
            } else {

                let mtime = file.modifyTime;
                if (temp < mtime) {
                    temp = mtime;
                    filename = file.name;                   
                }
            }
            // fileNames.push(file.name);
        }
       // console.log("Download SQL ZIP Effettuato! "+ filename);
        return filename;
    },

    async uploadFile(localFile, remoteFile) {
        console.log(`Uploading ${localFile} to ${remoteFile} ...`);
        try {
            await this.client.put(localFile, remoteFile);
        } catch (err) {
            console.error('Uploading failed:', err);
        }
    },

    async downloadFile(remoteFile, localFile) {
        console.log(`Downloading a ${remoteFile} to ${localFile} ...`);
        try {
           return await client.get(remoteFile, localFile);
        } catch (err) {
            console.error('Downloading failed:', err);
        }
    },

    async deleteFile(remoteFile) {
        console.log(`Deleting ${remoteFile}`);
        try {
            await this.client.delete(remoteFile);
        } catch (err) {
            console.error('Deleting failed:', err);
        }
    }
};