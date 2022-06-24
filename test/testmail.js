const expect = require('chai').expect
const Mail_Config = require('./../nomalier/configMail');
const Mail = require('./../nomalier/Mail');

let img = "2022_01_26_18_02_48_RR_ReportRedMine.png";
let subject = "Soggetto della mail"; 
let to = 'flaviooo@gmail.com';
let text = '<h1>Testo text {#dato.autore} della mail</h1> e logo <img src=\"cid:imgBody_0\"/> e h1 <h2>Desc Corpo della mail</h2> e testo p <p>testo fine Testo</p>';

console.log("subject: " + subject);  //console.log("text: "+text);
describe("Invia mail test a: "+ to, () => {
   it("Invia mail - Template Verifica Issues", (done) => {

      //const sendMail = async ({ to, subject,text, img}) => {
      // const sendMail =  ({ to, subject, text }) => {
      const mail = new Mail();
      try {
         //   await mail.send({ to, subject,text, img});
         let obj = {
            options: {
               dato: {
                  autore: "test@csea.it",
                  issues: [
                     "2779     ",
                  ],
                  oggettiIssues: [
                     "test - Accesso a maschera controlli di merito da gestionale settore idrico",
                  ],
                  giorniTrascorsi: [
                     "108",
                  ],
               }
            }
         };
         let path_template = Mail_Config.templateCSEA.path_template;
         mail.send({ to, subject, text, obj, img , path_template});
      } catch (err) {
         console.log(err);
      }
      //};
      done()
   })
})
