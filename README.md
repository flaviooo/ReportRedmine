Node.js Bootstrap RedMine Report
===

A quick and easy Node.js + Jade template project
![Image](https://raw.githubusercontent.com/flaviooo/ReportRedmine/main/public/images/2022_01_26_18_02_48_RR_ReportRedMine.png)
##### Also available for [GIT URL](https://github.com/flaviooo/ReportRedmine)
_ Assuming you have already installed Node...
-dev
## Usage
- Clone repository. >git clone https://github.com/flaviooo/ReportRedmine.git
- insert keyfile './etc/key/id_rsa_csea'
- Open a command prompt, navigate to the folder, and enter: npm install
- npm install nodemon --save-dev
- Config .env variable (es. Sample.env)
- Create DB : 
    mysql -uredmine  -p
    mysql -uredmine  -p$passwd
    CREATE USER 'redmine'@'localhost' IDENTIFIED BY '$passwd';
    GRANT ALL PRIVILEGES ON *.* TO 'redmine'@'localhost';
    FLUSH PRIVILEGES;

    drop schema bitnami_redmine;
    create schema bitnami_redmine;
    exit


```  
```
- Next, run the app by entering: node app
- Browse to http://localhost:4000


## install NVM NODE NPM ubtutu20.4
https://nextgentips.com/2022/01/27/how-to-install-redmine-on-ubuntu-20-04/


-- npm install
-- npm i -g forever
## RedMine Report Dependencies