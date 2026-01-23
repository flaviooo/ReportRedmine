const Client = require('ssh2-sftp-client');
const config = require('../config/config');

class SFTPClient {
    constructor() {
        this.client = new Client();
    }

    async connect() {
        // console.log(`Connecting to ${options.host}:${options.port}`);
        try {
            await this.client.connect(config.config_CDLAN.connSettings);
            console.log('Connected successfully');
            return true;
        } catch (err) {
            console.error('Failed to connect:', err);
            return false;
        }
    }

    async disconnect() {
        await this.client.end();
    }

    async listFiles(remoteDir, fileGlob) {
        console.log(`Listing ${remoteDir} ...`);
        let fileObjects = [];
        try {
            fileObjects = await this.client.list(remoteDir, fileGlob);
        } catch (err) {
            console.error('Listing failed:', err);
            return [];
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
    }

    async getlastFiles(remoteDir) {
        console.log(`Listing ${remoteDir} ...`);
        let fileObjects = [];
        try {
            fileObjects = await this.client.list(remoteDir);
        } catch (err) {
            console.error('Listing failed:', err);
            return "";
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
    }

    async uploadFile(localFile, remoteFile) {
        console.log(`Uploading ${localFile} to ${remoteFile} ...`);
        try {
            await this.client.put(localFile, remoteFile);
            console.log('Upload completed successfully');
            return true;
        } catch (err) {
            console.error('Uploading failed:', err);
            return false;
        }
    }

    async downloadFile(remoteFile, localFile) {
        console.log(`Downloading a ${remoteFile} to ${localFile} ...`);
        try {
           return await this.client.get(remoteFile, localFile);
        } catch (err) {
            console.error('Downloading failed:', err);
            throw err;
        }
    }

    async deleteFile(remoteFile) {
        console.log(`Deleting ${remoteFile}`);
        try {
            await this.client.delete(remoteFile);
            console.log('Delete completed successfully');
            return true;
        } catch (err) {
            console.error('Deleting failed:', err);
            return false;
        }
    }
}

module.exports = new SFTPClient();