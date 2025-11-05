//var Redmine = require('node-redmine');
const Redmine = require('axios-redmine')
const config_ENV = require('./../config/config');


exports.time_entries = function(req, res){
  res.render('time_entries');
};

exports.time_entriesJSON = function(req, res){


var config = {
  apiKey: process.env.REDMINE_APIKEY || 'dc68e7275b90ebcd609269b40eb65c9f1841376e'
};

var redmine = new Redmine(config_ENV.config_CDLAN.connAPI.url, config);

const dumpTimeEntry = fields => {
  for (const item in fields) {
    console.log('  ' + item + ': ' + JSON.stringify(fields[item]))
  }
}
/**
 * Dump issue
 */
var dump_issue = function(issue) {
  console.log('Dumping issue:');
  for (var item in issue) {
    console.log('  ' + item + ': ' + JSON.stringify(issue[item]));
  }
};
redmine
  .time_entries()
  .then(response => {
    console.log(response.data)
    for (const i in response.data.time_entries) {
      dumpTimeEntry(response.data.time_entries[i])
    }
   // rows = JSON.parse(toJson(response.data));
    res.json(response.data);
 
 
  })
  .catch(err => {
    console.log(err.message)
    console.log(err.request.method)
    console.log(err.request.path)
  })

redmine.time_entries(function(err, data) {
  if (err) throw err;

  console.log(data);
/*  for (var i in data.time_entries) {
    dump_time_entry(data.time_entries[i]);
  }*/
});

 var dump_time_entry = function(fields) {
  for (var item in fields) {
    console.log('  ' + item + ': ' + JSON.stringify(fields[item]));
  }
};

redmine.issues({limit: 2}, function(err, data) {
  if (err) throw err;
 
  for (var i in data.issues) {
    dump_issue(data.issues[i]);
  }
 
//  console.log('total_count: ' + data.total_count);
});
    //res.render('time_entries');
  
  };