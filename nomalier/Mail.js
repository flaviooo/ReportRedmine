const nodemailer = require('nodemailer');
const Mail_Config = require('./../nomalier/configMail');
const path = require('path');
const jadeCompiler = require('./../nomalier/lib/jadeCompiler');

class Mail {
    constructor() {
        this.options = { 
            from: Mail_Config.googleSetting.from, 
            to: '', 
            subject: '',  
            html: '',
            text: '',
            dato: {},
            attachments: [
                {
                    filename: Mail_Config.templateCSEA.img,
                    path: path.dirname(__dirname, '/public/images/'+Mail_Config.templateCSEA.img),
                    cid: 'logo_colori'//my mistake was putting "cid:logo@cid" here! 
             }
            ]
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
          self.options.attachments= [{
                filename: img,
                path: path.dirname(__dirname) + '/public/images/'+img,
                cid: 'imgBody_0'
            }];

        const transporter = nodemailer.createTransport({ service: 'Gmail', auth: Mail_Config.googleSetting.auth});
         if(transporter !== null) {
            return new Promise((resolve, reject) => {
            //  console.log(self.options);
           jadeCompiler.compile(path.dirname(__dirname) + Mail_Config.templateCSEA.path_template, self.options, function(err, html){
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
