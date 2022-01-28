const config = require('./config_AWS')
  , extract = require('extract-zip')
  , path = require('path')
  , Client = require('ssh2').Client
  , { exec } = require('child_process')

function importDump(moveTo) {

  //  importTo.fileDump = moveTo;
  //  console.log("File da importare: " + importTo.fileDump);
  //  'set global innodb_large_prefix=on|set global innodb_file_format=Barracuda|set global innodb_file_per_table=true '+
  let execution = process.env.PATHMYSQLCMD_IMPORT +
    " --host=${process.env.DUMPHOST_IMPORT}  --password=${process.env.DUMPPASSWORD_IMPORT}" +
    " --user=${process.env.DUMPUSER_IMPORT} --port=${process.env.DUMPPORT_IMPORT}" +
    " --default-character-set=utf8 --comments  ${process.env.DUMPDATABASE_IMPORT} <" + moveTo;

  execution = "C:\\Bitnami\\redmine-4.2.3-1\\mysql\\bin\\mysql.exe  --protocol=tcp --host=127.0.0.1 --user=root --password="+process.env.DUMPPASSWORD_IMPORT+" --port=3307 --default-character-set=utf8 --database=bitnami_redmine  < " + moveTo;

  console.log("execution: " + execution);
  exec(execution, (err, stdout, stderr) => {
    if (err) { console.error(`exec error: ${err}`); return; }
    console.log("Succesfully imported");
  });
}

exports.dowloadDump = (req, res, next) => {
  var moveTo = "";
  var conn = new Client();

  var connSettings = {
    port: config.port,
    host: config.host,
    username: config.username,
    privateKey: config.privateKey
  };

  var remotePathToList = process.env.remotePathToList || '/home/bitnami/dump/archivio';
  var localPathToList = process.env.localPathToList || '/dumpAWS';
  conn.on('ready', function () {
    conn.sftp(function (err, sftp) {
      if (err) throw err;
      // you'll be able to use sftp here. Use sftp to execute tasks like .unlink or chmod etc
      let ultimaModifica = 0;
      sftp.readdir(remotePathToList, function (err, list) {
        if (err) throw err;
        let filename = "";
        let temp = 0
        list.forEach(it => {
          let mtime = it.attrs.mtime
          // temp = (mtime > temp) ? mtime : temp
          if (temp < mtime) {
            temp = mtime
            filename = it.filename
          }
        });
        console.dir("Ultimo last BackUp: " + filename);

        var moveFrom = remotePathToList + '/' + filename;
        //  moveFrom = '/home/bitnami/dump/archivio/backup_16-11-2021.zip'
        console.dir("Remote Folder: " + moveFrom);

        // var moveTo = localPathToList +'\\' + list[0].filename;
        moveTo = path.join(__dirname, localPathToList, filename)
        moveToP = path.join(__dirname, localPathToList,remotePathToList, filename)
        console.dir("Local Folder: " + moveTo);
        console.log(ultimaModifica)
        sftp.fastGet(moveFrom, moveTo, (downloadError) => {
          if (downloadError) console.log("err: " + downloadError);
          if (downloadError) throw downloadError;
          console.log("Succesfully uploaded " + moveTo);
          try {
            //  console.log("tttt "+ path.dirname(moveTo) + "+" + path.basename(importFileName+"sql"))
            let importFileName = moveToP.substring(0, moveToP.length - 3);
            console.log("test: " + moveTo.substring(0, moveTo.length - 3) + "sql")
            let pathArchivio = "home\\bitnami\\dump\\archivio\\"
            importDump(importFileName + "sql");
            console.log("EEE " + path.basename(moveTo) + "+" + path.dirname(moveTo))
            console.log("XXX " + path.join(path.dirname(moveTo), path.basename(moveTo)))
            extract("db\\dumpAWS\\" + path.basename(moveTo), { dir: path.dirname(moveTo) })
            console.log('Extraction complete')


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
  conn.connect(connSettings);
  return moveTo
};
