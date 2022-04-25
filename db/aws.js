const config_AWS = require('./config_AWS')
  , extract = require('extract-zip')
  , path = require('path')
  , Client = require('ssh2').Client
  , { exec } = require('child_process');
  exports.importDump = (DIR , moveTo) => {

let pathImport = path.normalize( DIR + process.env.DUMP_AWS_REMOTE_PATH + path.sep + moveTo);
let  execution = process.env.DUMP_EXEC + pathImport;
console.log("execution: " + execution);
  exec(execution, (err, stdout, stderr) => {
    if (err) { console.error(`exec error: ${err}`); return; }
    console.log("Succesfully imported");
  });
};

exports.migrateDump = () => {
  let execution = process.env.DUMP_MIGRATE_DB;
  console.log("Migrate Execution: " + execution);
  exec(execution, (err, stdout, stderr) => {
    if (err) { console.error(`exec error: ${err}`); return; }
    console.log("Succesfully Migrate DB");
  });
};

exports.dowloadDump = (req, res, next) => {
  var conn = new Client();
  var remotePathToList = process.env.DUMP_AWS_REMOTE_PATH || '/home/bitnami/dump/archivio';
  var localPathToList = process.env.DUMP_LOCAL_PATH || '/dumpAWS';
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
        let moveTo =  path.join(localPathToList, filename);
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
           module.exports.importDump(localPathToList ,  path.basename(importFileName));

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
    console.error('SSH connection stream problem');
    throw err;
  });
  conn.connect(config_AWS.connSettings);
  return localPathToList;
  
};
