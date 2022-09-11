require('dotenv').config({ path: './../.env' });
const axios = require('axios');
async function getTimeEntriesXML(){
    
    const connAPI = {
        method: 'get',
        url: process.env.CDLAN_URL_API || 'http://192.168.40.30:3000/time_entries.xml',
        headers: { 'X-Redmine-API-Key': process.env.CDLAN_PASS_API || 'password' },
        password : process.env.CDLAN_PASS_API || 'admincsea'
    }
  
    let res = await axios(connAPI)
 //   console.log(res.request._header);
    console.log(res.data);
}

getTimeEntriesXML();