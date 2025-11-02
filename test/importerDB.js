//import dotenv from 'dotenv';
//import path from 'path';
//import { exec } from 'child_process';
//import { fileURLToPath } from 'url';

const dotenv = require('dotenv');
const path = require('path');
const { exec } = require('child_process');


// Carica .env dalla cartella padre
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Controlla variabili
if (!process.env.DUMP_LOCAL_PATH || !process.env.DUMP_EXEC) {
  console.error("❌ Missing environment variables. Check your .env file.");
  process.exit(1);
}

// Legge argomenti CLI
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Usage: node test/importerDB.js \\csea-nas.csea.local\CSEA-NAS\Exprivia\DumpGP\  home/admincsea/dump/archivio backup_22-05-2025.zip");
  process.exit(1);
}

//const DIR = args[0];
const moveTo = args[0];

// Costruisce il path completo del file dump
const dumpFilePath = path.resolve( process.env.DUMP_LOCAL_PATH, moveTo);

// Costruisce il comando da eseguire (attenzione allo spazio dopo <)
const command = `${process.env.DUMP_EXEC} "${dumpFilePath}"`;

console.log("Comando eseguito:", command);

// Esegue il comando
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error("Errore esecuzione:", error);
    return;
  }
  if (stderr) {
    console.error("stderr:", stderr);
  }
  console.log("Output:", stdout);
});
