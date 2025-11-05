const config = require('../config/config')
  , extract = require('extract-zip')
  , path = require('path')
  , Client = require('ssh2').Client
  , { exec } = require('child_process');

exports.importDump = (pathImport) => {
 // let pathImported = path.normalize(process.env.DUMP_CDLAN_REMOTE_PATH + path.sep + path.basename(pathImport));
 console.log("path.basename(pathImport) :" + path.basename(pathImport));
 console.log("path.basename(pathImport) -normalize :" + path.normalize(path.basename(pathImport)));
 let pathImported = path.normalize(process.env.DUMP_CDLAN_REMOTE_PATH + path.sep + pathImport);
  
  let execution = process.env.DUMP_EXEC + pathImported;
  console.log("Eseguo: "+execution);
  exec(execution, (err, stdout, stderr) => {
    if (err) { console.error(`exec error: ${err}`); return; }
    console.log("Succesfully imported"+ pathImport);
  });
};

exports.getNamelastDump = async () =>{

  var remotePathToList = process.env.DUMP_CDLAN_REMOTE_PATH || '/home/admincsea/dump/archivio';
  var localPathToList = process.env.DUMP_LOCAL_PATH || '/tmp';
  
  var conn = await new Client();
  
 (async () => {
    try {
      conn.on('ready', function () {
       conn.sftp(function  (err, sftp) {
          if (err) throw err;
          // you'll be able to use sftp here. Use sftp to execute tasks like .unlink or chmod etc
          console.log(remotePathToList)
          let filename = "";
        
          let lastFilename = sftp.readdir(remotePathToList, function (err, list) {
              if (err) throw err;
              let temp = 0;
              list.forEach(it => {
                let mtime = it.attrs.mtime;
                  if (temp < mtime) {
                    temp = mtime;
                    filename = it.filename;
                  // console.log(mtime + " - " + filename)
                  }
                //console.dir("Ultimo last BackUp0: " + filename);
                var moveFrom = remotePathToList + '/' + filename;
                console.dir("Remote Folder: " + moveFrom);
          
                let moveTo = path.join(localPathToList, filename);
                console.dir("Local Folder: " + moveTo);
                       
                       
              });
              
              sftp.fastGet(moveFrom, moveTo, (downloadError) => {
                if (downloadError) console.log("err: " + downloadError);
                if (downloadError) throw downloadError;
                console.log("Succesfully uploaded " + moveTo);
              });
          console.dir("Ultimo last BackUp0: " + filename);
          console.dir("Ultimo last BackUp1: " +lastFilename);
          let count = 2;
          count--;
          if (count <= 0) {
            conn.end();
          }
          });
        });
      }).connect(config.config_CDLAN.connSettings);
    
      conn.on('end', function () {
        console.log("Event End");
      });
      conn.on('error', (err) => {
        console.error('SSH connection stream problem'+err);
        throw err;
      });
    
      conn.on('close', function () {
        console.log("Event close");
      });
    
      // return await moveTo;
    
      // Download the image from the FTP server and send it as response
    }
    catch(err) {
      console.log(err)
    }
 })();
 }

exports.migrateDump = () => {
  
};

exports.enabledPlugins = () => {

};

exports.dowloadDump = (dump_toImport) => {
  console.log(" sTART dump " +dump_toImport);
  
  var remotePathToList = process.env.DUMP_CDLAN_REMOTE_PATH || '/home/admincsea/dump/archivio';
  var localPathToList = process.env.DUMP_LOCAL_PATH || '/tmp';
  
  console.log(" Execution: " + localPathToList);
  var conn = new Client();
  conn.on('ready', function () {

    conn.sftp(function async (err, sftp) {
      if (err) throw err;
      // you'll be able to use sftp here. Use sftp to execute tasks like .unlink or chmod etc
      console.log(remotePathToList)
       sftp.readdir(remotePathToList, function (err, list) {
      let  filename = dump_toImport
      console.dir("Ultimo last BackUp: " + filename);
      var moveFrom = remotePathToList + '/' + filename;
      console.dir("Remote Folder: " + moveFrom);

      let moveTo = path.join(localPathToList, dump_toImport);
      console.dir("Local Folder: " + moveTo);
      sftp.fastGet(moveFrom, moveTo, (downloadError) => {
          if (downloadError) console.log("err: " + downloadError);
          if (downloadError) throw downloadError;
          console.log("Succesfully uploaded " + moveTo);
          try {

            console.log("EEE " + localPathToList + path.basename(moveTo));
            console.log("VVV" + path.dirname(moveTo));
            console.log("XXX " + path.join(path.dirname(moveTo), path.basename(moveTo)));
            console.log("Start Export");
            extract(path.join(path.dirname(moveTo), path.basename(moveTo)), { dir: localPathToList },()=>{
             console.log('Extraction complete');
             let importFileName = moveTo.substring(0, moveTo.length - 3) + "sql";
             console.log("test: " + importFileName);

             let pathImport = path.normalize(localPathToList + process.env.DUMP_CDLAN_REMOTE_PATH + path.sep + path.basename(importFileName));
             console.log("Start Import");
             module.exports.importDump(pathImport);
             console.log("End Import");
           });
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
    console.error('SSH connection stream problem'+err);
    throw err;
  });

  conn.on('close', function () {
    console.log("Event close");
  });

  conn.connect(config.config_CDLAN.connSettings);
  return moveTo;
};
function getFile(remoteFile, localFile) {
  conn.on('ready', function () {
  conn.sftp(function (err, sftp) {
      if (err) throw err;
      var rstream = sftp.createReadStream(remoteFile);
      var wstream = fs.createWriteStream(localFile);
      rstream.pipe(wstream);
      rstream.on('error', function (err) { // To handle remote file issues
          console.log(err.message);
          conn.end();
          rstream.destroy();
          wstream.destroy();
      });
      rstream.on('end', function () {
          conn.end();
      });
      wstream.on('finish', function () {
          console.log(`${remoteFile} has successfully download to ${localFile}!`);
      });
  });
}).connect(m_ssh2Credentials);
}