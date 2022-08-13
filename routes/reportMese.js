//const local_db = require('../db/db')
const ticketTimeService = require('../model/ticketTime')
    , path = require('path')
    , validator = require('validator')

exports.getAllMonth = async (req, res, next) => {
    console.log("res query "+ req.query)
  //  if (!validator.isNumeric(id) || id == 0) {
   //     res.send('Parameter error: invalid parameters');
   // } else {    
    var timeTicket = await  ticketTimeService.getAllMonth();
                //res.json(rows);
                // console.log(rows.sum_hour)
                 res.render('reportMese', { title: "Report Mese",  result: timeTicket });
};

exports.getMonthByParamJson = async (req, res, next) => {
    
    let spent_start = "";
    let spent_end = "";
    let anno = "";
    console.log("res query "+ req.query)

    if(Object.keys(req.query).length === 0){
        spent_start = "2021-04-30";
        spent_end = "now()";
        console.log("A "+!Object.keys(req.query).length === 0)
    }else{
    //    console.log("B "+req.query)
        meseStart = req.query.meseS
        meseEnd = req.query.meseE
        anno = req.query.anno
        spent_start = anno+"-"+meseStart+"-01";
        spent_end = anno+"-"+meseEnd+"-30";
}
    if (!validator.isNumeric(anno) || anno == 0) {
        res.send('Parameter error: invalid parameters');
    } else {
        var timeTicket = await  ticketTimeService.getMonthByParam(spent_start, spent_end);
        //res.json(rows);
                rows =  parser4Month(timeTicket)
                // console.log(rows.id )
                // console.log(rows);
                // res.render('reportMese', { title: "Report Mese" , result: rows  });
                //res.json(result);
                res.json(rows)
           
    }
};

function parser4Month(results) {
    var array = [];
    let sum_hours = 0
    results.forEach((element, index) => {
        var ob = []
       // console.log("++++++++++++++++++++++++++++++++++++++------ " + index);
        var sommaMeseSelezionato = results.reduce(function (accumulator, current) {
            if (element.tmonth === current["tmonth"])
                return accumulator + (current["sum_hour"] || 0)
            else
                return accumulator
        }, 0).toFixed(2);
        let percent = ((element.sum_hour / sommaMeseSelezionato) * 100).toFixed(2)
        ob.push(element.tmonth,element.tyear, element.id, element.name, percent, sommaMeseSelezionato)
        array.push(ob);
    });
    return array
}
