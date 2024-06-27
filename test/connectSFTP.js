// sftp.js
// Use this sample code to connect to your SFTP To Go server and run some file operations using Node.js.
// 1) Paste this code into a new file (sftp.js)
// 2) Install dependencies
//   npm install ssh2-sftp-client@^8.0.0
// 3) Run the script
//   node sftp.js
const config = require('dotenv').config({ path: '../../.env' });
const fs = require('fs');
let Client = require('ssh2-sftp-client');

class SFTPClient {
    constructor() {
        this.client = new Client();
    }

    // async connect(options) {
    async connect() {
        console.log(config.parsed.CDLAN_PORT);
        // console.log(`Connecting to ${options.host}:${options.port}`);
            let option ={
                host: config.parsed.CDLAN_HOST,
                port: config.parsed.CDLAN_PORT,
                username : config.parsed.CDLAN_USERNAME,
                privateKey:  fs.readFileSync( '../etc/key/id_flavio4_pem')
//              ,  debug: true
            };
         console.log(`Connecting to ${config.parsed.CDLAN_PORT}:${config.parsed.CDLAN_PORT}`);
        try {
            await this.client.connect(option);
        } catch (err) {
            console.log('Failed to connect:', err);
        }
    }

    async disconnect() {
        await this.client.end();
    }

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
    }

    async getlastFiles(remoteDir) {
        console.log(`Listing ${remoteDir} ...`);
        let fileObjects;
        try {
            fileObjects = await this.client.list(remoteDir);
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
        return filename;
    }

    async uploadFile(localFile, remoteFile) {
        console.log(`Uploading ${localFile} to ${remoteFile} ...`);
        try {
            await this.client.put(localFile, remoteFile);
        } catch (err) {
            console.error('Uploading failed:', err);
        }
    }

    async downloadFile(remoteFile, localFile) {
        console.log(`Downloading ${remoteFile} to ${localFile} ...`);
        try {
            await this.client.get(remoteFile, localFile);
        } catch (err) {
            console.error('Downloading failed:', err);
        }
    }

    async deleteFile(remoteFile) {
        console.log(`Deleting ${remoteFile}`);
        try {
            await this.client.delete(remoteFile);
        } catch (err) {
            console.error('Deleting failed:', err);
        }
    }
}

(async () => {

    //* Open the connection
    const client = new SFTPClient();
    await client.connect();
      //* List working directory files
//    await client.listFiles(config_CDLAN.connSettings.remotePath);

    let pathLastDump = await client.getlastFiles(config_CDLAN.dump.remotePath);
    console.log("pathLastDump:" + pathLastDump);
    //* Upload local file to remote file
    // await client.uploadFile("./local.txt", "./remote.txt");

    //* Download remote file to local file
    // await client.downloadFile("./remote.txt", "./download.txt");
    await client.downloadFile(config_CDLAN.dump.remotePath + "/" + pathLastDump, config_CDLAN.dump.localPath+pathLastDump
     || "./download.zip");

    //* Delete remote file
    // await client.deleteFile("./remote.txt");

    //* Close the connection
    await client.disconnect();
})();

let config_CDLAN = {

    connSettings: {
        port: process.env.CDLAN_PORT || 22,
        host: process.env.CDLAN_HOST || "00.157.76.170",
        username: process.env.CDLAN_USERNAME || 'admincsea',
        interactiveAuth: true,
        tryKeyboard: true,
        password: process.env.CDLAN_PASS || 'password',
        privateKey: fs.readFileSync('../etc/key/id_flavio4_pem')
    },
    dump:{
        localPath : process.env.DUMP_LOCAL_PATH || '//',
        remotePath: process.env.DUMP_CDLAN_REMOTE_PATH || '/home/admincsea/dump/archivio'
    }
};

