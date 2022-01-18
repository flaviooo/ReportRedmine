Node.js Bootstrap RedMine Report
===

A quick and easy Node.js + Jade template project

##### Also available for [GIT URL](https://github.com/flaviooo/ReportRedmine)

## Usage
- Clone repository.
- Open a command prompt, navigate to the folder, and enter: npm install
- Config .env variable
- Config DB/config_AWS.js'
- Database Migrate 
```
cd C:\Bitnami\redmine-4.2.3-1/apps/redmine\htdocs
C:\Bitnami\redmine-4.2.3-1/ruby\bin\ruby.exe bin\rake db:migrate RAILS_ENV="production"

```
- Next, run the app by entering: node app
- Browse to http://localhost:3000

## RedMine Report Dependencies

- npm install express --save
- npm install dotenv --save 
- npm install ssh2 --savejs
- npm install extract-zip --save
- npm i fs


## Contents:

- layout.jade
- header.jade
- footer.jade
- index.jade

