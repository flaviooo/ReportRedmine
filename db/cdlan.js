const config = require('../config/config')
  , extract = require('extract-zip')
  , path = require('path')
  , Client = require('ssh2').Client
  , { exec } = require('child_process');
//  var conn = new Client(config.config_CDLAN.connSettings);
// conn.connect(config.config_CDLAN.connSettings);


exports.importDump = (pathImport) => {

  let execution = process.env.DUMP_EXEC + pathImport;
  console.log("execution: " + execution);
  exec(execution, (err, stdout, stderr) => {
    if (err) { console.error(`exec error: ${err}`); return; }
    console.log("Succesfully imported");
  });
};

exports.migrateDump = (next) => {
  let execution = process.env.DUMP_MIGRATE_DB;
  console.log("Migrate Execution: " + execution);
  exec(execution, (err, stdout, stderr) => {
    if (err) { console.error(`exec error: ${err}`); return; }
    console.log("Succesfully Migrate DB");
  });
};
exports.enabledPlugins = () => {

  // TODO 
  let execution = " -- 84 = dataEntry " +
    " INSERT INTO `enabled_modules` (`project_id`, `name`) VALUES (84, 'custom_reports') " +
    " INSERT INTO `enabled_modules` (`project_id`, `name`) VALUES (84, 'agile') " +
    " INSERT INTO `enabled_modules` (`project_id`, `name`) VALUES (84, 'Issuevm') " +
    " INSERT INTO `enabled_modules` (`project_id`, `name`) VALUES (84, 'monitoring_controlling_project') ";
  console.log(" Execution: " + execution);
  exec(execution, (err, stdout, stderr) => {
    if (err) { console.error(`exec error: ${err}`); return; }
    console.log("Succesfully Migrate DB");
  });
};

exports.dowloadDump = (req, res, next) => {

  var remotePathToList = process.env.DUMP_CDLAN_REMOTE_PATH || '/home/admincsea/dump/archivio';
  var localPathToList = process.env.DUMP_LOCAL_PATH || '/dumpAWS';

  var conn = new Client();

  conn.on('ready', function () {
    conn.sftp(function (err, sftp) {
      if (err) throw err;
      // you'll be able to use sftp here. Use sftp to execute tasks like .unlink or chmod etc
      console.log(remotePathToList)
      sftp.readdir(remotePathToList, function (err, list) {
        if (err) throw err;
        let filename = "";
        let temp = 0;
        list.forEach(it => {
          let mtime = it.attrs.mtime;
          if (temp < mtime) {
            temp = mtime;
            filename = it.filename;
            console.log(mtime + " - " + filename)

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

            console.log("EEE " + localPathToList + path.basename(moveTo));
            console.log("VVV" + path.dirname(moveTo));
            console.log("XXX " + path.join(path.dirname(moveTo), path.basename(moveTo)));
           extract(path.join(path.dirname(moveTo), path.basename(moveTo)), { dir: localPathToList },()=>{
            console.log('Extraction complete');
            
           });

            let importFileName = moveTo.substring(0, moveTo.length - 3) + "sql";
            console.log("test: " + importFileName);

            let pathImport = path.normalize(localPathToList + process.env.DUMP_CDLAN_REMOTE_PATH + path.sep + path.basename(importFileName));
            
            module.exports.importDump(pathImport);

          } catch (err) {
            // handle any errors
            if (err) throw err;
          }
        });
       // extract(path.join(path.dirname(moveTo), path.basename(moveTo)), { dir: localPathToList })
          
        // Do not forget to close the connection, otherwise you'll get troubles
        let count = 2;
        count--;
        if (count <= 0) {
          conn.end();
        }
      });
    });
  });

  conn.on('end', function () {
    console.log("Event End");
  });
  conn.on('error', (err) => {
    console.error('SSH connection stream problem');
    throw err;
  });

  conn.on('close', function () {
    console.log("Event close");
  });

  conn.connect(config.config_CDLAN.connSettings);

  return localPathToList;
};
