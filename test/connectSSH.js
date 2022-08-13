const expect = require('chai').expect
, Client = require('ssh2').Client
//const config = require('./../config/config');
//const config = require('dotenv').config({ path: './../.env' });
const fs = require('fs');

let config_CDLAN = {
  connSettings : {
    port: process.env.CDLAN_PORT || 22, 
    host:  process.env.CDLAN_HOST || "95.157.76.170",
    username: process.env.CDLAN_USERNAME || 'admincsea',
    interactiveAuth: true,
    tryKeyboard: true,
    password : process.env.CDLAN_PASS || 'Cse4R3dmine2022!',
    privateKey:  fs.readFileSync(process.env.CDLAN_PATH_PEM || '../etc/key/id_rsa.pem')
  }
};
    var conn = new Client();
    var remotePathToList = process.env.DUMP_CDLAN_REMOTE_PATH || '/home/admincsea/dump/archivio';
    var localPathToList = process.env.DUMP_LOCAL_PATH || '/dumpAWS';
    conn.on('keyboard-interactive', function (name, descr, lang, prompts, finish) {
      // For illustration purposes only! It's not safe to do this!
      // You can read it from process.stdin or whatever else...
      console.log('SSH connection keyboard-interactive');
      var password = config.config_CDLAN.CDLAN_PASS_PEM;
      return finish([password]);
      // And remember, server may trigger this event multiple times
      // and for different purposes (not only auth)
    });
    conn.on('ready', function () {
      conn.sftp(function (err, sftp) {
        if (err) throw err;
        // you'll be able to use sftp here. Use sftp to execute tasks like .unlink or chmod etc
        sftp.readdir(remotePathToList, function (err, list) {
          if (err) throw err;
          let filename = "";
          let temp = 0;
          list.forEach(it => {
            let mtime = it.attrs.mtime;
            if (temp < mtime) {
              temp = mtime;
              filename = it.filename;
            }
          });
          console.dir("Ultimo last BackUp: " + filename);
          var moveFrom = remotePathToList + '/' + filename;
          console.dir("Remote Folder: " + moveFrom);
          let moveTo = path.join(localPathToList, filename);
          console.dir("Local Folder: " + moveTo);
  
          sftp.fastGet(moveFrom, moveTo, (downloadError) => {
            if (downloadError) console.log("err: " + downloadError);
            if (downloadError) throw downloadError;
            console.log("Succesfully uploaded " + moveTo);
            try {
  
              //  console.log("EEE " + localPathToList  + path.basename(moveTo));
              //  console.log("VVV" + path.dirname(moveTo));
              //  console.log("XXX " + path.join(path.dirname(moveTo), path.basename(moveTo)));
              extract(path.join(path.dirname(moveTo), path.basename(moveTo)), { dir: localPathToList });
  
              console.log('Extraction complete');
              let importFileName = moveTo.substring(0, moveTo.length - 3) + "sql";
              console.log("test: " + importFileName);
              let pathImport = path.normalize(DIR + process.env.DUMP_AWS_REMOTE_PATH + path.sep + path.basename(moveTo));
              module.exports.importDump(localPathToList, path.basename(pathImport));
  
            } catch (err) {
              // handle any errors
              if (err) throw err;
            }
          });
          // Do not forget to close the connection, otherwise you'll get troubles
          let count = 2;
          count--;
          if (count <= 0) {
            conn.end();
          }
        });
      });
    });
    conn.on('error', (err) => {
      console.error('SSH connection stream problem' + err);
      throw err;
    });
    conn.connect(config_CDLAN.connSettings);
      
  //  let myConn = connection.connect(done)
    console.log(conn)
    expect(conn)
