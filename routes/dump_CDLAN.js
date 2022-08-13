const cdlan_db = require('../db/cdlan');
const extract = require('extract-zip');
const path = require('path');

exports.updataSource = (req, res, next) => {
    console.log("1 - Scarica dump ");
    let dump_toImport = cdlan_db.dowloadDump(req, res,next);

    var localPathToList = process.env.DUMP_LOCAL_PATH || '/dumpAWS';
    console.dir("Local Folder: " + dump_toImport);

    extract(path.join(path.dirname(dump_toImport), path.basename(dump_toImport)), { dir: localPathToList },  (err) => {
        // handle err
                     if (!err) {
                      console.log('Extraction ');

                      console.log('Extraction complete');
                      let importFileName = dump_toImport.substring(0, dump_toImport.length - 3) + "sql";
                      console.log("test: " + importFileName);
                      let pathImport = path.normalize(localPathToList + process.env.DUMP_CDLAN_REMOTE_PATH + path.sep + path.basename(importFileName));
                      console.log("test: " + pathImport);
                      
                      module.exports.importDump(pathImport);
          
        } else {
          console.error(err);
        }
     });

    
    console.log("2 - DUMP Scaricato"+ dumpImpoted);
    
    console.log("3 - Migration DUMP ");
    cdlan_db.migrateDump(next);
    
    console.log("FINE");
    res.render('dump');
};
