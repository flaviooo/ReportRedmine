const nodemailer = require('nodemailer');
const gmail_config = require('./../nomalier/configMail');
const path = require('path');
const jadeCompiler = require('./../nomalier/lib/jadeCompiler');
const { text } = require('body-parser');

let logoImg = "csea_2.png";
class Mail {
    constructor() {
        this.options = { 
            from: gmail_config.googleSetting.from, 
            to: '', 
            subject: '',  
            html: '',
            text: '',
            dato: {},
            attachments: []
            };
    }
    send({to, subject, text, obj, img }) {
        if(nodemailer && this.options) {
          let self = this;
         self.options.to = to;
          self.options.subject = subject;
         // self.options.html = gmail_config.templateCSEA.header+html+gmail_config.templateCSEA.footer;
          self.options.text = text;
          self.options.dato = obj.options.dato;
          self.options.title = subject;
          //self.options.rightColumnList = ['item #1', 'item #2', 'item #3', 'item #4'];
          //self.options.firstName = "PrimoNome";
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
            let pathRoot = path.resolve(__dirname, '../');
            //console.log("F "+ path.join(pathRoot  ,'/views/email/emailReportImg'));
            jadeCompiler.compile(path.join(pathRoot  ,'/views/email/emailReportImg'), self.options, function(err, html){
                if(err){
                  throw new Error('Problem compiling template(double check relative path): ' + RELATIVE_TEMPLATE_PATH);
                }
            self.options.html = html;
            transporter.sendMail(self.options, (error, info) => {
                        if(error) {
                            console.log(error);
                         //   reject(Error('Failed'));
                        } else {
                            console.log("Message sent: %s", info.messageId);
                           //  resolve('OK');
                        }
                    });
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
