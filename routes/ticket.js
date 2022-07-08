const local_db = require('../db/db')
, ticketService = require('../model/ticket')
, path = require('path')
const validator = require('validator')

exports.getPriorita = async (req, res, next) => {
  try {
    var timeTicket = await ticketService.getPriorita();
    res.render('ticketProrita', {
      title: "Segnalazioni con Priorità",
      result: timeTicket
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}
exports.getDormienti = async (req, res, next) => {
  try {
    var inactiveTicket = await ticketService.getDormienti();
    res.render('dormienti', {
      title: "Segnalazioni Dormienti",
      result: inactiveTicket
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}
exports.getDormienti_V2 = async (req, res, next) => {
  if (!validator.isNumeric(id) || id == 0) {
    res.send('Parameter error: invalid parameters');
  } else {
    var inactive2Ticket = await ticketService.getDormienti2();
 
        rows = result;
        // console.log(rows.id )
        //console.log(rows);
        res.render('ticketProrita', {
          title: "Segnalazioni Dormienti"
          , result: inactive2Ticket
        });
  }
 };

  
/* exports.report1 = function(req, res){
  res.render('report1');
}; */