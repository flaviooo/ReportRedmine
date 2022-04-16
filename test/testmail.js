const Mail = require('./../nomalier/Mail');

let  img = "2022_01_26_18_02_48_RR_ReportRedMine.png";
let subject = "Soggetto della mail"; let to ='flaviooo@gmail.com'; 
let  text = '<h1>Testo text {#dato.autore} della mail</h1> e logo <img src=\"cid:imgBody_0\"/> e h1 <h2>Desc Corpo della mail</h2> e testo p <p>testo fine Testo</p>';
 
console.log("subject: "+subject); console.log("to: "+to); //console.log("text: "+text);
//const sendMail = async ({ to, subject,text, img}) => {
// const sendMail =  ({ to, subject, text }) => {
   const mail = new Mail();
   try {
//   await mail.send({ to, subject,text, img});
var dato = {autore : "Flavio"};
      mail.send({ to, subject, text, dato, img});
     } catch(err) {
        console.log(err);
     }
//};
