const path = require('path');
require('dotenv').config({path:__dirname+'./../.env'});

const Mail_Config = {
//module.exports = {
    googleSetting: {
        from: process.env.MAIL_GMAIL_USER || '',
        to: 'flaviooo@gmail.com',
        auth: {
            user: process.env.MAIL_GMAIL_USER || '',
            pass: process.env.MAIL_GMAIL_TOKEN ||''
        }
    },
    templateCSEA: {
        header: "<style> h2 {color: #cccccc; } </style>",
        footer: "<img style=\"width:80px;\" src=\"cid:logo_colori\"/></br>"+
        "<p><b>CSEA - Area Sistemi Informativi</b></p>",
        logoImg : process.env.MAIL_LOGO,
        path_template : process.env.MAIL_PATH_TEMPLATE
    }
};
module.exports = Mail_Config;
