const jadeCompiler = require('./../nomalier/lib/jadeCompiler');
const path = require('path');
let pathRoot = path.resolve(__dirname, '../');
var consulaRapid = require('./../routes/consultaRapid');

let img = "2022_01_26_18_02_48_RR_ReportRedMine.png";
let subject = "TEST - Soggetto della mail"; let to = 'flaviooo@gmail.com';
//let  text = '<h1>Testo text {#dato.autore} della mail</h1> e logo <img src=\"cid:imgBody_0\"/> e h1 <h2>Desc Corpo della mail</h2> e testo p <p>testo fine Testo</p>';
var objTable =[
   {
       "id": 3128,
       "Autore": "pietro.abbatimarescotti@csea.it",
       "Assegnato": "vincenzo.deluca@dedagroup.it",
       "GiorniTrascorsi": 69,
       "updated_on": "21/02/2022",
       "name": "Attività documentale",
       "subject": "[Priorità 0] Perequazione ELT"
   }
];
console.log("subject: " + consulaRapid.view); console.log("to: " + to); //console.log("text: "+text);

/**Compilo Jade  */
//console.log("F "+ path.join(pathRoot  ,'/views/email/emailReportImg'));
jadeCompiler.compile(path.join(pathRoot, '/views/consultaRapid'), objTable, function (err, text) {
   if (err) {
      throw new Error('Problem compiling template(double check relative path): ' + RELATIVE_TEMPLATE_PATH);
   }
   try {
      //   await mail.send({ to, subject,text, img});
      console.log(text);
   
   } catch (err) {
      console.log(err);
   }
});
