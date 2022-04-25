const local_db = require('../db/db');
const Mail = require('./../nomalier/Mail');

exports.view = (req, res, next) => {
  console.log("res query " + req.query);
  let query = req.query;
  let idTipologia = query.idTipologia;
  if(typeof idTipologia== "undefined") idTipologia= 14;
  let s = " SELECT  `issues`.`id`,  au.`login` as Autore, ass.`login`as Assegnato,timestampdiff(DAY, `issues`.`updated_on`, now()) as GiorniTrascorsi, " +
    " DATE_FORMAT(`issues`.`updated_on`, '%d/%m/%Y') as updated_on,`projects`.`name`, `trackers`.`name` ,`issues`.`subject` " +
    " FROM `issues` " +
    " INNER JOIN `projects` ON `projects`.`id` = `issues`.`project_id`  " +
    " LEFT JOIN `users` au ON au.`id` = `issues`.`author_id` " +
    " LEFT JOIN `users` ass ON ass.`id` = `issues`.`assigned_to_id` " +
    " LEFT JOIN `trackers` ON `trackers`.`id` = `issues`.`tracker_id`  " +
    " INNER JOIN `issue_statuses` ON `issue_statuses`.`id` = `issues`.`status_id` " +
    " LEFT OUTER JOIN enumerations ON enumerations.id = issues.priority_id  " +
    " WHERE (projects.status <> 9 AND EXISTS (SELECT 1 AS one FROM enabled_modules em WHERE em.project_id = projects.id AND em.name='issue_tracking')) " +
    " AND ((issues.status_id IN ('"+idTipologia+"')) )  and `issues`.`is_private` = 0  " +
    " ORDER BY au.`login` ASC, enumerations.position DESC, issues.updated_on DESC, issues.id DESC  ";
  //  console.log("Richieste da chiudere "+ s);
  local_db.query(s, (err, result, fields) => {
    if (err) {
      res.send('Query error: ' + err.sqlMessage);
    } else {
      //res.json(rows);
      rows = result;
     // res.render('consultaRapid', { title: "Consulta" });
     //res.redirect('/consultaRapid');
         res.render('consultaRapid', { title: "Consulta", result: result });
        // res.writeHead(200, {'Content-Type': 'text/plain'}); 
        // res.write(result, 'utf8');
       // res.write(JSON.stringify(result), 'utf8');
       //  res.end();  
     //
    }
  });
};
  

exports.invioMailVerificaCollaudo = (req, res, next) => {
    console.log(" req query " + req.query);
    // console.log(req.body);    //  console.log(req.route);    //  console.log("params1: " + req.param.params);
    if (!req.body.dati)
      return res.send(422, 'Missing fields! Please be sure to fill out all form data.');
    let notificaInviati = [];
    var dati = JSON.parse(JSON.stringify(req.body.dati));
    let img = "2022_01_26_18_02_48_RR_ReportRedMine.png";
    const mail = new Mail();
    for (let a in dati) {
      //      console.log(a + ": "+ dati[a]);
      let obj = {
        options: {
          dato: {}
        }
      };
      obj.options.dato = dati[a];
      let subject = "Non dimenticarti di noi - " + new Date().toISOString().slice(0, 10);
      let to = 'flaviooo@gmail.com';
      let text = ""; 
      console.log("subject: " + subject); console.log("to: " + to); console.log("text: " + text);
      console.log(obj);
      try {
        //   await mail.send({ to, subject,text, img});
        mail.send({ to, subject, text, obj, img });
        notificaInviati.push(to);
      } catch (err) {
        console.log(err);
        res.send(err);
      }
    }
    // res.setHeader('Content-Type', 'application/json');
    // var result = JSON.stringify(some_json);
    //res.json(rows);
    res.send(notificaInviati);

  };