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
        return new Promise((resolve, reject) => {
            try {
                let execution = process.env.DUMP_MIGRATE_DB;
                console.log("Migrate Execution: " + execution);
                exec(execution, (err, stdout, stderr) => {
                    if (err) {
                        console.error(`exec error: ${err}`);
                        reject(err);
                        return;
                    }
                    console.log("Succesfully Migrate DB");
                    resolve();
                });
                console.log("2 - Migrate ");
            } catch (error) {
                reject(error);
            }
        });
    }

    const importDumpSQL = async (dumpsql) => {
        return new Promise((resolve, reject) => {
            try {
                let execution = process.env.DUMP_EXEC + dumpsql;
                console.log("Da eseguire " + execution);
                exec(execution, (err, stdout, stderr) => {
                    if (err) {
                        console.error(`exec error: ${err}`);
                        reject(err);
                        return;
                    }
                    console.log("Succesfully imported " + dumpsql);
                    migrate(dumpsql).then(() => resolve()).catch(reject);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

const unzipDump = (dump_toImport) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("3 - unzip dump " + dump_toImport);
                if (!dump_toImport) {
                    reject(new Error('dump_toImport is undefined'));
                    return;
                }
                let pathZIP = path.dirname(dump_toImport);
                let pathZIPExtracted = process.env.DUMP_LOCAL_PATH_FILE_SQL || '/';
                var unzipExtractor = unzip.Extract({ path: pathZIP });
                fs.createReadStream(dump_toImport).pipe(unzipExtractor);
                unzipExtractor.on('error', function (err) {
                    reject(err);
                });
                unzipExtractor.on('close', () => {
                    console.log("Unzip terminato " + dump_toImport);
                    let importFileName = path.basename(dump_toImport.substring(0, dump_toImport.length - 3)) + "sql";
                    let fileSQL = pathZIP+pathZIPExtracted+importFileName;
                    console.log("importFileName SQL: " + fileSQL);
                    importDumpSQL(fileSQL).then(() => resolve(fileSQL)).catch(reject);
                });
            } catch (error) {
                reject(error);
            }
        });
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
            if (!dump_toImport) {
                throw new Error('dump_toImport is undefined from getNamelastDump');
            }
            //  let dump_toImport = "\\\\192.168.0.130\\csea-nas\\Exprivia\\DumpGP\\backup_22-01-2023.zip";
            dump_toImported = await unzipDump(dump_toImport);
            await dumpFtp.disconnect();
        } catch (error) {
            console.error(error)
            throw error;
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
