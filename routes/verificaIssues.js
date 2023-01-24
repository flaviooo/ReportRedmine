const ticketVerificaService = require('../model/ticketVerifica')
const Mail = require('./../nomalier/Mail');

exports.getRichiesteInfoIssues = async (req, res, next) => {

  var ticketVerifica = await ticketVerificaService.getRichiesteInfoIssues();
  rows = ticketVerifica;
  let sorted = parser4Occorrenze(rows);
  // console.log(sorted);
  res.render('richiesteInfoIssues', { title: "Richieste altre Informazioni", result: rows, tab: sorted });

},
  exports.getIssuesVerificaCollaudo = async (req, res, next) => {
    var ticketVerifica = await ticketVerificaService.getIssuesVerificaCollaudo();
    rows = ticketVerifica;
    let sorted = parser4Occorrenze(rows);
    //    console.log(sorted);
    res.render('verificaIssues', { title: "Verifica Richieste da chiudere", result: rows, tab: sorted });

  },
  exports.invioMailVerificaCollaudo = (req, res, next) => {
    //    console.log(" req query " + req.query);
    // console.log(req.body);    //  console.log(req.route);    //  console.log("params1: " + req.param.params);
    if (!req.body.dati)
      return res.send(422, 'Missing fields! Please be sure to fill out all form data.');
    let notificaInviati = [];
    var dati = JSON.parse(JSON.stringify(req.body.dati));
    let img = "2023_01_24_21_41_57_RR_ReportRedMine.png";
    const mail = new Mail();
    for (let a in dati) {
      //      console.log(a + ": "+ dati[a]);
      let obj = {
        options: {
          dato: {}
        }
      };
      try {
        obj.options.dato = dati[a];
        let subject = "Non dimenticare - " + new Date().toISOString().slice(0, 10);
        let to = obj.options.dato.autore;
        let text = "";
        //     console.log("subject: " + subject); console.log("to: " + to); console.log("text: " + text);
         console.log(obj);
        //   console.log(obj.options.dato.autore);
        //   await mail.send({ to, subject,text, img});
        let path_template = '/views/email/emailReportImg'
        mail.send({ to, subject, text, obj, img, path_template });
        notificaInviati.push(to);
      } catch (err) {
        console.log(err);
        res.send(err);
      }
    }
    // res.setHeader('Content-Type', 'application/json');
    // var result = JSON.stringify(some_json);
    res.json(JSON.stringify(notificaInviati));
    // res.send(notificaInviati);

  };
function parser4Occorrenze(arr) {
  var occurrences = arr.reduce(function (obj, item) {
    obj[item['Autore']] = (obj[item['Autore']] || 0) + 1;
    return obj;
  }, {});

  // console.log(occurrences);
  return Object.entries(occurrences).sort((a, b) => b[1] - a[1]);
}
