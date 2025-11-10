//require('dotenv').config({ path: '../../.env' });
const config = require('../config/config');
const axios = require('axios');
async function getTimeEntriesXML(){
    
    console.log(config.config_CDLAN.connAPI);
    let res = await axios(config.config_CDLAN.connAPI)
      //  console.log(res.request._header);
 console.log(res.data);
 }

getTimeEntriesXML();