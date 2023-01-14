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
 //console.log(req.query.giorniFa)
 let giorniFA = req.query.giorniFa;
  try {
    var inactiveTicket = await ticketService.getDormienti(giorniFA);
    //console.log(inactiveTicket)
    //bigInt convert 
    result = JSON.parse(toJson(inactiveTicket));
    result.sort((a, b) =>  parseFloat(a.GGDormienteDa) - parseFloat(b.GGDormienteDa));
   // console.log(result)
    res.render('dormienti', {
      title: "Segnalazioni Dormienti",
      result: result
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.postDormienti = async (req, res, next) => {
  //console.log(req.query.giorniFa)
  let giorniFA = req.query.giorniFa;
   try {
     //console.log(inactiveTicket)
     //bigInt convert 
     var inactiveTicket = await ticketService.getDormienti(giorniFA);
     result = JSON.parse(toJson(inactiveTicket));
     result.sort((a, b) =>  parseFloat(a.GGDormienteDa) - parseFloat(b.GGDormienteDa));
    // console.log(result)
     res.render('dormienti', {
       title: "Segnalazioni Dormienti",
       result: result
     });
   } catch (e) {
     return res.status(400).json({ status: 400, message: e.message });
   }
 }
exports.getDormienti_V2 = async (req, res, next) => {
    var inactive2Ticket = await ticketService.getDormienti2();
 
        rows = inactive2Ticket;
        // console.log(rows.id )
        //console.log(rows);
        res.render('dormienti', {
          title: "Segnalazioni Dormienti v2"
          , result: inactive2Ticket
        });
  };
  function toJson(data) {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
        .replace(/"(-?\d+)n"/g, (_, a) => a);
  }
  