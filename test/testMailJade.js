const Mail = require('./../nomalier/Mail');
const jadeCompiler = require('./../nomalier/lib/jadeCompiler');
const path = require('path');
let pathRoot = path.resolve(__dirname, '../');

let img = "2022_01_26_18_02_48_RR_ReportRedMine.png";
let subject = "TEST - Soggetto della mail"; let to = 'flaviooo@gmail.com';
//let  text = '<h1>Testo text {#dato.autore} della mail</h1> e logo <img src=\"cid:imgBody_0\"/> e h1 <h2>Desc Corpo della mail</h2> e testo p <p>testo fine Testo</p>';

console.log("subject: " + subject); console.log("to: " + to); //console.log("text: "+text);
//const sendMail = async ({ to, subject,text, img}) => {
// const sendMail =  ({ to, subject, text }) => {
const mail = new Mail();
var obj = {
   options: {
      dato: { 
         autore: 'viola.gigantelli@csea.it',
         issues: [ '1957     ', '1950     ' ],
         oggettiIssues: ['Segnalazione errore firma dichiarazione TIVDIS 2020', 'Errore Calcolo TIT 2020' ],
         giorniTrascorsi: [ '13', '14' ]
      }
   }
};
/**Compilo Jade  */
//console.log("F "+ path.join(pathRoot  ,'/views/email/emailReportImg'));
jadeCompiler.compile(path.join(pathRoot, '/views/email/emailReportImgTEST'), obj.options, function (err, text) {
   if (err) {
      throw new Error('Problem compiling template(double check relative path): ' + RELATIVE_TEMPLATE_PATH);
   }
   try {
      //   await mail.send({ to, subject,text, img});
      mail.send({ to, subject, text, obj, img });
   } catch (err) {
      console.log(err);
   }
});
