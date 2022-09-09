const axios = require('axios');
//const { config } = require('dotenv');
const config_ENV = require('./../config/config');
//console.log(config_ENV.config_CDLAN)
async function getTimeEntriesXML() {

    const config = {
        method: 'get',
        url: config_ENV.config_CDLAN.connAPI.url ,
        headers: { 'X-Redmine-API-Key': config_ENV.config_CDLAN.connAPI.password }
    }

    let res = await axios(config)

    console.log(res.request._header);
    console.log(res.data);
}

getTimeEntriesXML();