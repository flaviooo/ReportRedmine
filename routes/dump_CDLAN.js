const cdlan_db = require('../db/cdlan');
const extract = require('extract-zip');
const path = require('path');
const Client = require('ssh2').Client;

exports.updataSource = (req, res, next) => {
    console.log("1 - Scarica dump ");
    let dump_toImport = cdlan_db.dowloadDump(req, res, next);

    //cdlan_db.importDump(dump_toImport);
    //cdlan_db.migrateDump(next);
    console.log("FINE");
    res.render('dump');
};
