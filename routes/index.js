const indexService = require('../model/index');

exports.renderIndex = function(req, res){
  res.render('index', { title: "Tempo Totale Impiegato/Progetti"})
  //res.render('index');
};
/**
 * @openapi
 * /getTimeProj:
 *   get:
 *     summary: Restituisce i dati dei progetti in un intervallo di tempo
 *     description: Richiede i parametri `meseS`, `meseE` e `anno` come query string per calcolare l'intervallo di date.
 *     parameters:
 *       - in: query
 *         name: meseS
 *         required: true
 *         schema:
 *           type: string
 *           example: "01"
 *         description: Mese di inizio (formato MM)
 *       - in: query
 *         name: meseE
 *         required: true
 *         schema:
 *           type: string
 *           example: "03"
 *         description: Mese di fine (formato MM)
 *       - in: query
 *         name: anno
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025"
 *         description: Anno per il range temporale
 *     responses:
 *       200:
 *         description: Ritorna i dati del progetto nel range richiesto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 data: []
 *       400:
 *         description: Parametri mancanti o invalidi
 */
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

