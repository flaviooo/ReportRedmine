const nodemailer = require('nodemailer');
const gmail_config = require('./../nomalier/configMail');
const path = require('path');
//const { text } = require('body-parser');

let logoImg = "csea_2.png";
class Mail {
    constructor() {
        this.options = { 
            from: gmail_config.googleSetting.from, to: '', 
            subject: '',  
            html: '',
            text: '',
            attachments: []
            };
    }
    send({to, subject, text ,html, img }) {
        if(nodemailer && this.options) {
          let self = this;
          self.options.to = to;
          self.options.subject = subject;
          self.options.html = gmail_config.templateCSEA.header+text+gmail_config.templateCSEA.footer;
          self.options.text = '';
          self.options.attachments= [
            {
                filename: img,
                path: path.dirname(__dirname) + '\\public/images/'+img,
                cid: 'imgBody_0'
            },
            {
                filename: logoImg,
                path: path.join(__dirname, '../public/images/'+logoImg),
                cid: 'logo_colori'//my mistake was putting "cid:logo@cid" here! 
         }
            ];

        const transporter = nodemailer.createTransport({ service: 'Gmail', auth: gmail_config.googleSetting.auth});
     
        if(transporter !== null) {
            return new Promise((resolve, reject) => {
            //  console.log(self.options);
                    transporter.sendMail(self.options, (error, info) => {
              //  transporter.sendMail(gmail_config.googleSetting, (error, info) => {
                        if(error) {
                            console.log(error);
                         //   reject(Error('Failed'));
                        } else {
                            console.log("Message sent: %s", info.messageId);
                           //  resolve('OK');
                        }
                    });
                });
            }else{
                console.log(error);
            }
        }else{
            console.log(error);
        }
    }
}
module.exports = Mail;
