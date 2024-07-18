const nodemailer = require('nodemailer');
//const config_mail = require('./../nomalier/configMail');
const config = require('./../config/config');
const path = require('path');
const jadeCompiler = require('./../nomalier/lib/jadeCompiler');

class Mail {
    constructor() {
        this.options = { 
            from: config.config_mail.googleSetting.from, 
            to: '', 
            subject: '',  
            html: '',
            text: '',
            dato: {},
            attachments: [
                {
                    filename: config.config_mail.templateCSEA.img,
                    path: path.dirname(__dirname, '/public/images/'+config.config_mail.templateCSEA.img),
                    cid: 'logo_colori'//my mistake was putting "cid:logo@cid" here! 
             }
            ]
            };
    }
         
    send({to, subject, text, obj, img, path_template }) {
        if(nodemailer && this.options) {
          let self = this;
          self.options.to = to;
          self.options.subject = subject;
         // self.options.html = gconfig_mail.templateCSEA.header+html+gconfig_mail.templateCSEA.footer;
          self.options.text = text;
          self.options.dato = obj.options.dato;
          self.options.title = subject;
          self.options.attachments= [{
                filename: img,
                path: path.dirname(__dirname) + '/public/images/'+img,
                cid: 'imgBody_0'
            }];

        const transporter = nodemailer.createTransport({ service: 'Gmail', auth: config.config_mail.googleSetting.auth});
         if(transporter !== null) {
            return new Promise((resolve, reject) => {
            console.log(path.dirname(__dirname) + config.config_mail.templateCSEA.path_template);
            console.log(__dirname + config.config_mail.templateCSEA.path_template);
           jadeCompiler.compile(path.dirname(__dirname) + config.config_mail.templateCSEA.path_template, self.options, function(err, html){

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
