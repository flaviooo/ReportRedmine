const dumpFtp = require('../model/ftpDump');
const cdlandb = require('../db/cdlan');
const extract = require('extract-zip');
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
            console.log("1 - Scaricato dump "+filedump);
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
       //cdlandb.importDump(dumpsql);
        try {
        
            let execution = process.env.DUMP_EXEC + dumpsql;
         // exec(execution, (err, stdout, stderr) => {              if (err) { console.error(`exec error: ${err}`); return; }              console.log("Succesfully imported"+ dumpsql);            });       
        } catch (error) {
            console.error(error)
        }
        console.log("Succesfully imported"+ dumpsql);
        return await migrate2(dumpsql);
    }
    const unzipDump = async (dump_toImport) => {
        try {
            console.log("3 - unzip dump "+dump_toImport);
            // let basePath = '\\\\192.168.0.130\\csea-nas\\Exprivia\\DumpGP';
             let basePathZip = '\\home\\admincsea\\dump\\archivio';
             //let from = dump_toImport;
             // = path.basename(dump_toImport);

             let importFileName = dump_toImport.substring(0, dump_toImport.length - 3) + "sql";
             console.log("importFileName SQL: " + path.basename(importFileName));
             console.log("importFileName SQL: " + path.dirname(importFileName));
             console.log("importFileName SQL: " + path.normalize(importFileName));
            // let sqlFile = basePath+basePathZip+"\\"+importFileName;
            
            const inputFile = fs.createReadStream(dump_toImport)
const outputFile = fs.createWriteStream('file.ext')
            let extracted= extract(
                dump_toImport,
                {dir: path.dirname(importFileName)},
                error => {
                  if (error) return reject(error);
                  resolve(path.basename(importFileName));
                }
              );
              const stream = inputFile.pipe(extracted).pipe(outputFile)
stream.on('finish', () => console.log('finished'))

              console.log("Estratto?"+ extracted);
              return importFileName;
            /*  return new Promise((resolve, reject) => {
                  return extract(
                    dump_toImport,
                    {dir: path.dirname(importFileName)},
                    error => {
                      if (error) return reject(error);
                      resolve(path.basename(importFileName));
                    }
                  )
                });
             */    
        } catch (error) {
            console.error(error)
        }
    }
    const downloadDump = async () => {
        try {
            
        //    let dump_toImport = await getNamelastDump();
        //    console.log("1 - nomeUltimoDump "+dump_toImport);
        //dump_toImport ="\\\\192.168.0.130\\csea-nas\\XXXXX\\DumpGP\\backup_20-01-2023.zip";
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
