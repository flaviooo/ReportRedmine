var express = require('express')
  , routes = require('./routes')
  , time_entries = require('./routes/time_entries')
  , time_entriesAxios = require('./routes/time_entriesAxios')
  , reportSAL = require('./routes/reportSAL')
  , ticket = require('./routes/ticket')
  , reportMese = require('./routes/reportMese')
  , verifica = require('./routes/verificaIssues')
  , util = require('./routes/util')
  , consulaRapid = require('./routes/consultaRapid')
  , reportTipologia = require('./routes/reportTipologia')
  , dump_aws = require('./routes/dump_aws')
  , dump_CDLAN = require('./routes/dump_CDLAN')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override')
  , cors = require('cors')
  , swaggerJSDoc = require('swagger-jsdoc')
  , swaggerUi = require('swagger-ui-express');
  const config = require('./config/config')
  
var app = express();


app.set('port', config.config_app.port || process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(cors({origin: '*'}));
app.use(favicon(__dirname + '/public/images/favicon.png'));
const swaggerSpec = swaggerJSDoc(config.config_swagger.options);
app.use(config.config_swagger.swaggerHost, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('stylus').middleware(__dirname + '/public'));

app.use(bodyParser.urlencoded({  extended: true}));
app.use(bodyParser.json());

if (app.get('env') == 'development') {
  app.locals.pretty = true;
}

app.get('/', routes.renderIndex);
app.get('/getTimeProj', routes.getTimeProjJson);
app.get('/ticketProrita', ticket.getPriorita);
app.get('/ticketDormienti', ticket.getDormienti);
app.post('/ticketDormienti', ticket.postDormienti);
//app.get('/ticketDormienti2', ticket.getDormienti_V2);
app.get('/tipologiaMese', reportMese.getAllMonth);
app.get('/tipologiaMeseParam', reportMese.getMonthByParamJson);

app.get('/tipologia', reportTipologia.getTipologia);
app.get('/tipologiaRgraph', reportTipologia.getTipologiaRgraph);
app.get('/getTipologiaProgetti', reportTipologia.getTipologiaProgetti);
app.get('/dump', dump_aws.updataSource);

app.get('/dumpCdLan', dump_CDLAN.updataSource);

app.get('/time_entries',cors(), time_entries.time_entries);
//app.get('/time_entriesJSON', time_entries.time_entriesJSON);
app.get('/time_entriesXML', cors(), time_entriesAxios.time_entriesXML);

app.get('/test', util.test);
app.get('/reportSAL', reportSAL.getPageSal);
app.get('/reportSALline', reportSAL.getSalDataJson);

app.get('/getVerificaIssues', verifica.getIssuesVerificaCollaudo);
app.get('/getRichiesteInfoIssues', verifica.getRichiesteInfoIssues);
app.get('/getTipologiche', util.getIssuesTipologie);

app.get('/consultaRapid', consulaRapid.call);
app.get('/consultaRapidJson', consulaRapid.view);

app.post("/invioMail", verifica.invioMailVerificaCollaudo);

// catch 404 and forward to error handler
 app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //pass error to the next matching route.
  next(err);
});

// handle error, print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  res.render('error', {
      message: err.message,
      error: err
  });
});

if (require.main === module) {
  const server = http.createServer(app);
  const boot = () => {
  server.listen(app.get('port'), function () {
    console.log('Server Avviato Version: ' + process.version);
   // console.log('app local: ' +app.locals);
    console.log(process.platform + " \nExpress server " + process.env.DB_HOST + " listening on port " + app.get('port'));
  });
};
boot();// node app.js

} else {
  console.log("Running as module, Port: " + app.get('port'))
 // exports.boot = boot
  //exports.shutdown = shutdown
  exports.port = app.get('port')
  module.exports = app

}

/* const shutdown = () => {
  console.log("Shutting down");
  server.close(() => {
    console.log("HTTP server closed.");
    // When server has stopped accepting 
    // connections exit the process with
    // exit status 0        
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown); */
process.on('uncaughtException', err => {
  console.log(`Uncaught Exception: ${err.message}`)
 // process.exit(1)
})
process.on('uncaughtException', function (error) {
  console.log(error.stack);
});