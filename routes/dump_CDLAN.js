const dumpFtp = require('../model/ftpDump');
//const cdlandb = require('../db/cdlan');
const unzip = require('unzip-stream');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.updataSource = (req, res, next) => {
    const enabledPlugins = async () => {

        // TODO 
        let execution = " -- 84 = dataEntry " +
            " INSERT INTO `enabled_modules` (`project_id`, `name`) VALUES (84, 'custom_reports') " +
            " INSERT INTO `enabled_modules` (`project_id`, `name`) VALUES (84, 'agile') " +
            " INSERT INTO `enabled_modules` (`project_id`, `name`) VALUES (84, 'Issuevm') " +
            " INSERT INTO `enabled_modules` (`project_id`, `name`) VALUES (84, 'monitoring_controlling_project') ";
        console.log(" Execution: " + execution);
        //exec(execution, (err, stdout, stderr) => {   if (err) { console.error(`exec error: ${err}`); return; }
        // console.log("Succesfully enabledPlugins ");
        //});
    }
    const migrate = async (value) => {
        try {
            let execution = process.env.DUMP_MIGRATE_DB;
            console.log("Migrate Execution: " + execution);
            exec(execution, (err, stdout, stderr) => {
                if (err) { console.error(`exec error: ${err}`); return; }
                console.log("Succesfully Migrate DB");
            });
            console.log("2 - Migrate ");
            return execution;
        } catch (error) {
            console.error(error)
        }
    }

    const importDumpSQL = async (dumpsql) => {
        try {
            let execution = process.env.DUMP_EXEC + dumpsql;
            console.log("Da eseguire " + execution);
            await exec(execution, (err, stdout, stderr) => {
                if (err) {
                    console.error(`exec error: ${err}`); return;
                }
                console.log("Succesfully imported" + dumpsql);
                return migrate(dumpsql);

            });

        } catch (error) {
            console.error(error)
        }
    }

    const unzipDump = (dump_toImport) => {
        try {

            console.log("3 - unzip dump " + dump_toImport);
            let pathZIP = path.dirname(dump_toImport);
            let pathZIPExtracted = process.env.DUMP_CDLAN_REMOTE_PATH;

            var unzipExtractor = unzip.Extract({ path: pathZIP });
            fs.createReadStream(dump_toImport).pipe(unzipExtractor);
            unzipExtractor.on('error', function (err) {
                throw err;
            });

            unzipExtractor.on('close', () => {
                console.log("Unzip terminato " + dump_toImport);
                let importFileName = path.basename(dump_toImport.substring(0, dump_toImport.length - 3)) + "sql";
                let fileSQL = pathZIP+pathZIPExtracted+importFileName;
                console.log("importFileName SQL: " + fileSQL);
                return importDumpSQL(fileSQL);
            });

        } catch (error) {
            console.error(error)
        }
    }
    const getNamelastDump = async () => {
        try {
            await dumpFtp.connect();
            let filedumpZIP = await dumpFtp.getNameLastFilesDumpZip();
            let filedump = await dumpFtp.downloadFile(filedumpZIP);

            console.log("1 - Scaricato dump " + filedump);
            //  dumpFtp.disconnect();
            return filedump;

        } catch (error) {
            console.error(error)
        }
    }

    const downloadDump = async () => {
        try {
          
                        let dump_toImport = await getNamelastDump();
                        console.log("1 - nomeUltimoDump " + dump_toImport);
          
          //  let dump_toImport = "\\\\192.168.0.130\\csea-nas\\Exprivia\\DumpGP\\backup_22-01-2023.zip";
            dump_toImported = unzipDump(dump_toImport);

        } catch (error) {
            console.error(error)
        }
    }

    const decorator = async () => {
        try {
            return await downloadDump();
            console.log("2 - decorator ");

        } catch (error) {
            console.error(error)
        }
    }

    const toView = async () => {
        try {
            await decorator();
            //console.log(te)
            res.status(200).render('dump');
            console.log("4 - render ");
        } catch (error) {
            console.error(error)
        }
    }

    toView();
};
