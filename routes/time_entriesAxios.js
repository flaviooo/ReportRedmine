const axios = require('axios');
//const { config } = require('dotenv');
const config_ENV = require('./../config/config');
//console.log(config_ENV.config_CDLAN)

exports.time_entries = function(req, res){
  res.render('time_entries');
};

exports.time_entriesXML = function(req, res){
   async function getTimeEntriesXML() {

  const config = {
      method: 'get',
      url: config_ENV.config_CDLAN.connAPI.url ,
      headers: { 'X-Redmine-API-Key': config_ENV.config_CDLAN.connAPI.password }
  }

  let res = await axios(config)

  console.log(res.request._header);
  console.log(res.data);
  return(res.data);
}

let timeEntryXml = getTimeEntriesXML();
  //res.render('time_entries');
  res.send(timeEntryXml)
};