//const local_db = require('../db/db')
const ticketTimeService = require('../model/ticketTime')
    , path = require('path')
    , validator = require('validator');

exports.getPageSal = async (req, res, next) => {
    //   console.log("res query "+ req.query.fornitore);
    console.log("res query " + req.query.fornitore);
    let fornitore = req.query.fornitore;
    if(fornitore!=null){
    timeTicket = await ticketTimeService.getPageSal(fornitore);
    rows = parserSAL(timeTicket);
    res.render('reportSAL', { title: "Report SAL", result: rows });
}else{
    rows= [];
    res.render('reportSAL', { title: "Report SAL", result: rows });
}
};

exports.getSalDataJson = async (req, res, next) => {
    console.log("res query " + req.query.fornitore);
    let fornitore = req.query.fornitore;
    var timeTicket = await ticketTimeService.getPageSal(fornitore);

    rows = parserSAL(timeTicket);
    res.json(rows);
    // res.render('reportSAL', { title: "Report SAL",  result: rows });
};

function parserSAL(results) {
    var array = [];
    var obOre = [];
    var obSum = [];
    var nWeek = [];
    var nAnno = [];
    // var nMese = [];
    var sum_hours = 0;

    results.forEach((element, index) => {
        let hour = element.sum_hours;
        sum_hours = sum_hours + hour;
        obSum.push(sum_hours);
        obOre.push(hour);
        nWeek.push(element.time_entries_tweek);
        // nMese.push(element.time_entries_tmonth);
        nAnno.push(element.time_entries_tyear);

    });
    array.push(obOre, obSum, nWeek, nAnno);
    //console.log(ob+ "vvvvvv "+obSUM)
    return array;
}
