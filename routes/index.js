const indexService = require('../model/index');

exports.renderIndex = function(req, res){
  res.render('index', { title: "Tempo Totale Impiegato/Progetti"})
  //res.render('index');
};
exports.getTimeProjJson = async (req, res) => {
  let meseS = req.query.meseS
  let meseE = req.query.meseE
  let anno = req.query.anno
  let spent_start =anno+"-"+meseS+"-01";
  var spent_end =anno+"-"+meseE+"-30";
 
  try {
  var timeTicket = await  indexService.getTime(spent_start,spent_end);
  res.json(timeTicket);
  //return res.status(200).json({ status: 200, data: timeTicket, message: "Succesfully Users Retrieved" });
  //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
  //console.log("mesi selezioniti: " + spent_end)
  
};

