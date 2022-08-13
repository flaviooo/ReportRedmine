const config = require('../config/config')
  , extract = require('extract-zip')
  , path = require('path')
  , Client = require('ssh2').Client
  , { exec } = require('child_process');

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
  let moveTo = "";
  
  var conn = new Client();
  conn.connect(config.config_CDLAN.connSettings);
  
  conn.on('close',function(){
    console.log("close")
  });
  
  conn.on('end',function(){
    console.log("end")
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
        moveTo = path.join(localPathToList, filename);
        console.dir("Local Folder: " + moveTo);

        sftp.fastGet(moveFrom, moveTo, (downloadError) => {
          if (downloadError) console.log("err: " + downloadError);
          if (downloadError) throw downloadError;
          console.log("Succesfully uploaded " + moveTo);
        
        // Do not forget to close the connection, otherwise you'll get troubles
        let count = 2;
        count--;
        if (count <= 0) {
          conn.end();
        }

      });
      try {
        console.log("EEa " +moveTo);
        console.log("EEE " +path.dirname(moveTo)+path.sep+path.basename(moveTo));
        console.log("VVV " +  path.basename(moveTo));
        console.log("XXX " + localPathToList);
 //extract(path.join(path.dirname(moveTo), path.basename(moveTo)), { dir: localPathToList },  (err) => {
        extract(path.join(path.dirname(moveTo), path.basename(moveTo)), { dir: localPathToList },  (err) => {
                     if (!err) {
                      console.log('Extraction ');

                      console.log('Extraction complete');
                      let importFileName = moveTo.substring(0, moveTo.length - 3) + "sql";
                      console.log("test: " + importFileName);
                      let pathImport = path.normalize(localPathToList + process.env.DUMP_CDLAN_REMOTE_PATH + path.sep + path.basename(importFileName));
                      console.log("test: " + pathImport);
                      
                      module.exports.importDump(pathImport);
          
        } else {
          console.error(err);
        }
        return moveTo;
     });

    } catch (err) {
      // handle any errors
      if (err) throw err;
    }
  });

    });
  });
  conn.on('error', (err) => {
    console.error('SSH connection stream problem');
    throw err;
  });
  
 

};
