var express = require('express')
  , routes = require('./routes')
  , time_entries = require('./routes/time_entries')  
  , ticketProrita = require('./routes/ticketProrita')
  , reportMese = require('./routes/reportMese')
  , verifica = require('./routes/verificaIssues')
  , reportTipologia = require('./routes/reportTipologia')
  , test_aws = require('./test/test_aws')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override');

//const  cors = require('cors');
var app = express();
//app.use(cors());
console.log(process.env.DB_HOST);
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
express.json();
express.urlencoded({ extended: false });
app.use(methodOverride('_method'));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') == 'development') {
	app.locals.pretty = true;
}

app.get('/', routes.index);
app.get('/getTimeProj', routes.getTimeProj);

app.get('/ticketProrita', ticketProrita.getProve);
app.get('/tipologia', reportTipologia.getTipologia);

app.get('/tipologiaMese', reportMese.getAllMonth);
app.get('/tipologiaMeseParam', reportMese.getMonthByParam);

app.get('/tipologiaRgraph', reportTipologia.getTipologiaRgraph);
app.get('/getTipologiaProgetti', reportTipologia.getTipologiaProgetti);
app.get('/test', test_aws.updataSource);
app.get('/time_entries', time_entries.time_entries);

app.get('/getVerificaIssues', verifica.getIssuesVerificaCollaudo);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
