var express = require('express')
  , routes = require('./routes')
  , time_entries = require('./routes/time_entries')
  , reportSAL = require('./routes/reportSAL')
  , ticket = require('./routes/ticket')
  , reportMese = require('./routes/reportMese')
  , verifica = require('./routes/verificaIssues')
  , util = require('./routes/util')
  , consulaRapid = require('./routes/consultaRapid')
  , reportTipologia = require('./routes/reportTipologia')
  , dump_aws = require('./routes/dump_aws')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override');

//const  cors = require('cors');
var app = express();
//app.use(cors());

app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('stylus').middleware(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

if (app.get('env') == 'development') {
  app.locals.pretty = true;
}

app.get('/', routes.renderIndex);
app.get('/getTimeProj', routes.getTimeProjJson);

app.get('/ticketProrita', ticket.getPriorita);
app.get('/ticketDormienti', ticket.getDormienti);
app.get('/ticketDormienti2', ticket.getDormienti_V2);

app.get('/tipologiaMese', reportMese.getAllMonth);
app.get('/tipologiaMeseParam', reportMese.getMonthByParamJson);

app.get('/tipologia', reportTipologia.getTipologia);
app.get('/tipologiaRgraph', reportTipologia.getTipologiaRgraph);
app.get('/getTipologiaProgetti', reportTipologia.getTipologiaProgetti);
app.get('/dump', dump_aws.updataSource);
app.get('/time_entries', time_entries.time_entries);

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
/* app.use(function(req, res, next) {
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
 */

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




const shutdown = () => {
  console.log("Shutting down");
  server.close(() => {
    console.log("HTTP server closed.");
    // When server has stopped accepting 
    // connections exit the process with
    // exit status 0        
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);

