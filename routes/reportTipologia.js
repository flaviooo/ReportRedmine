//const local_db = require('../db/db');
const ticketTimeStatusService = require('../model/ticketTimeStatus')


exports.getTipologiaRgraph = async (req, res) => {
  var timeTicket = await ticketTimeStatusService.getTipologiaRgraph();
   //toJson risolve il problema bigint
  rows = JSON.parse(toJson(timeTicket));
    // res.render('reportTipologia', { title: "Welcome to Report"   , result: result      });
  res.json(rows);
},

exports.getTipologiaProgetti = async (req, res) => {
    var timeTicket = await ticketTimeStatusService.getTipologiaProgetti();
    result = JSON.parse(toJson(timeTicket));
    res.json(result);
},

  //on load
  exports.getTipologia = async (req, res, next) => {
    var timeTicket = await ticketTimeStatusService.getTipologia();
    //toJson risolve il problema bigint
    rows = JSON.parse( toJson(timeTicket));
    res.render('reportTipologia', { title: "Welcome to Report", result: rows });
  };

function toJson(data) {
  return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
      .replace(/"(-?\d+)n"/g, (_, a) => a);
}
