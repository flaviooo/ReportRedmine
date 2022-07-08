//const local_db = require('../db/db');
const ticketTimeStatusService = require('../model/ticketTimeStatus')

exports.getTipologiaRgraph = async (req, res) => {
  var timeTicket = await ticketTimeStatusService.getTipologiaRgraph();
  rows = toJson(timeTicket);
  // res.render('reportTipologia', { title: "Welcome to Report"   , result: result      });
  res.json(rows);
},

exports.getTipologiaProgetti = async (req, res) => {
    var timeTicket = await ticketTimeStatusService.getTipologiaProgetti();
    result = toJson(timeTicket);
    res.json(result);
},

  //on load
  exports.getTipologia = async (req, res, next) => {
    var timeTicket = await ticketTimeStatusService.getTipologia();
    //toJson risolve il problema bigint
    rows = toJson(timeTicket);
    // console.log(rows.id )
    //console.log(rows);
    res.render('reportTipologia', { title: "Welcome to Report", result: rows });
  };
 function toObject(timeTicket) {
    return JSON.parse(JSON.stringify(timeTicket, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
}
function toJson(data) {
  return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
      .replace(/"(-?\d+)n"/g, (_, a) => a);
}

/* exports.report1 = function(req, res){
  res.render('report1');
}; */