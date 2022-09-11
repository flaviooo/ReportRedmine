const axios = require('axios');
const xml2js = require('xml2js');

//const { config } = require('dotenv');
const config_ENV = require('./../config/config');
//console.log(config_ENV.config_CDLAN)

exports.time_entries = function (req, res) {
  res.render('time_entries');
};

exports.time_entriesXML2 = function (req, res) {

  const getTimeEntriesXML = async () => {
    try {
      const config = {
        method: 'get',
        url: config_ENV.config_CDLAN.connAPI.url + '?&limit=100',
        headers: { 'X-Redmine-API-Key': config_ENV.config_CDLAN.connAPI.password }
      }
      return await axios(config)
    } catch (error) {
      console.error(error)
    }
  }

  const count_ = async () => {
    const timeEntries = await getTimeEntriesXML()
    let totRecords = 0;
    const LIMIT = 100
    if (timeEntries.data) {
      console.log(`Got ${Object.entries(timeEntries.data).length} timeentry`)
      const parser = new xml2js.Parser({ attrkey: "total_count" });
      parser.parseString(timeEntries.data, function (error, result) {
        if (error === null) {
          totRecords = result.time_entries.total_count.total_count
        }
        else {
          console.log(error);
        }
      });

      //let totRecords = Object.entries(timeEntries.data).length;
      var pagesqty = Math.floor(totRecords / 100);

      if (totRecords % LIMIT > 0) {
        pagesqty += 1;
        console.log("pagesqty: " + pagesqty);
        console.log("totRecords: " + totRecords);
      }

      let i = LIMIT;
      listURLs = [];
      while (i < totRecords) {

        //  console.log("limit=" + 100 + "&offset=" + i + "&id=");
        let dataQuery = "?offset=" + i + "&limit=100";
        console.log("totRecords: " + dataQuery);
        i += 100;
        listURLs.push(config_ENV.config_app.timeEntries + '/' + dataQuery);
      }
      doRequests(listURLs)

    }
    // res.send(timeEntries.data)
    return timeEntries.data
  }

  const doRequests = async (urls) => {
    const _config = {
      method: 'get',
   //   url: config_ENV.config_CDLAN.connAPI.url + '?&limit=100',
      headers: { 'X-Redmine-API-Key': config_ENV.config_CDLAN.connAPI.password }
    }

    const fetchUrl = (url) => axios.get(url ,_config);

    const promises = urls.map(fetchUrl);
    let responses = await Promise.all(promises);
    responses.forEach(resp => {
      let msg = `${resp.config.url} -> ${resp.headers.server}: ${resp.status}`;
           console.log(msg);
           const fs = require('fs');

          fs.appendFileSync('message.txt', resp.data);
    });
  }

  const toView = async () => {

    let te = await count_();
    //console.log(te)
    res.header("Content-Type", "application/xml");
    res.status(200).send(te);
  }

  toView();
};
