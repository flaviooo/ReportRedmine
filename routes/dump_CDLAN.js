const cdlan_db = require('../db/cdlan');
const extract = require('extract-zip');
const path = require('path');
const Client = require('ssh2').Client;

exports.updataSource = (req, res, next) => {
    console.log("1 - Scarica dump ");
    let dump_toImport = cdlan_db.dowloadDump(req, res, next);
    
    var remotePathToList = process.env.DUMP_CDLAN_REMOTE_PATH || '/home/admincsea/dump/archivio';
    var localPathToList = process.env.DUMP_LOCAL_PATH || '/dumpAWS';
    dump_toImport = "\\\\192.168.0.130\\csea-nas\\Exprivia\\DumpGP\\home\\admincsea\\dump\\archivio\\backup_19-08-2022.sql"
    cdlan_db.importDump(dump_toImport);
                console.log("2 - DUMP Scaricato" + dump_toImport);

                console.log("3 - Migration DUMP ");
    
                cdlan_db.migrateDump(next);

                console.log("FINE");
                res.render('dump');
    };
