const dumpFtp = require('../model/ftpDump');
const cdlandb = require('../db/cdlan');
const unzip = require('unzip-stream');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.updataSource = (req, res, next) => {

    const getNamelastDump = async () => {
        try {
            await dumpFtp.connect();
            let filedumpZIP = await dumpFtp.getNameLastFilesDumpZip();
            let filedump = await dumpFtp.downloadFile(filedumpZIP);
            //   let dump_toImport = await cdlan_db.getNamelastDump();
            console.log("1 - Scaricato dump " + filedump);
            dumpFtp.disconnect();
            return filedump;

        } catch (error) {
            console.error(error)
        }
    }
    const migrate2 = async (value) => {
        try {
            return await cdlandb.migrateDump();

            /*   let execution = process.env.DUMP_MIGRATE_DB;
              console.log("Migrate Execution: " + execution);
              exec(execution, (err, stdout, stderr) => {
                if (err) { console.error(`exec error: ${err}`); return; }
                console.log("Succesfully Migrate DB");
              });
              console.log("2 - Migrate ");
              return  execution; */
        } catch (error) {
            console.error(error)
        }
    }

    const importDumpSQL = async (dumpsql) => {
        // cdlandb.importDump(dumpsql);
        try {
            let execution = process.env.DUMP_EXEC + dumpsql;
            // exec(execution, (err, stdout, stderr) => {              if (err) { console.error(`exec error: ${err}`); return; }              console.log("Succesfully imported"+ dumpsql);            });       
        } catch (error) {
            console.error(error)
        }
        console.log("Succesfully imported" + dumpsql);
        return await migrate2(dumpsql);
    }

    const unzipDump = async (dump_toImport) => {
        try {

            console.log("3 - unzip dump " + dump_toImport);
            var unzipExtractor = unzip.Extract({ path: path.dirname(dump_toImport) });
            fs.createReadStream(dump_toImport).pipe(unzipExtractor);
            unzipExtractor.on('error', function (err) {
                throw err;
            });

            unzipExtractor.on('close', () => {
                console.log("Unzip terminato " + dump_toImport);
                let importFileName = dump_toImport.substring(0, dump_toImport.length - 3) + "sql";
                console.log("importFileName SQL: " + importFileName);
                return  importDumpSQL(importFileName);
            });

             
            //  dump_toImported = cdlandb.extract(dump_toImport);
            //return await cdlan_db.dowloadDump(dump_toImport);

        } catch (error) {
            console.error(error)
        }
    }
    const downloadDump = async () => {
        try {

            //    let dump_toImport = await getNamelastDump();
            //    console.log("1 - nomeUltimoDump "+dump_toImport);
            dump_toImport = "\\\\192.168.0.130\\csea-nas\\Exprivia\\DumpGP\\backup_20-01-2023.zip";
            dump_toImported = await unzipDump(dump_toImport);
            return await importDumpSQL(dump_toImported);
            //  console.log("2 -  dump Scaricato "+dump_toImport);
        } catch (error) {
            console.error(error)
        }
    }

    const migrate = async () => {
        try {
            //await cdlan_db.migrateDump();
            return await downloadDump()
            console.log("2 - Migrate ");

        } catch (error) {
            console.error(error)
        }
    }

    const toView = async () => {
        try {
            await migrate();
            //console.log(te)
            res.status(200).render('dump');
            console.log("3 - render ");
        } catch (error) {
            console.error(error)
        }
    }

    toView();
};
