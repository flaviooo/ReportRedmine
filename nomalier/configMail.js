require('dotenv').config();
const path = require('path');
let logoImg = "csea_2.png";
const Gmail_Config = {
//module.exports = {
    googleSetting: {
        from: process.env.GMAIL_USER || 'flaviooo@gmail.com',
        to: 'flaviooo@gmail.com',
  /*      attachments: [
            {
                   filename: logoImg,
                   path: path.join(__dirname, '../public/images/'+logoImg),
                   cid: 'logo_colori'//my mistake was putting "cid:logo@cid" here! 
            }
         ],*/         
        auth: {
            user: process.env.GMAIL_USER || 'flaviooo@gmail.com',
            pass: process.env.GMAIL_TOKEN ||'bzbdjwqapisrftsd'
        }
    },
    templateCSEA: {
        header: "<style> h2 {color: #cccccc; } </style>",
        footer: "<img style=\"width:80px;\" src=\"cid:logo_colori\"/></br>"+
        "<p><b>CSEA - Area Sistemi Informativi</b></p>"
    }
};
module.exports = Gmail_Config ;