//require('dotenv').config({ path: './../.env' });
const axios = require('axios');
//const { config } = require('dotenv');
const https = require('https');
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
configCsea = {
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
};

let endpointsCSEA = [
    'https://www.csea.it',
    'https://dataentry.csea.it/DataEntryElettrico/login.html',
    'https://dataentrygas.csea.it/DataEntryGas/login.html',
    'https://web.csea.it/DataEntryIdrico/login.html',
    'https://dataentryrifiuti.csea.it/DataEntryRifiuti/login.html',
    'https://anagrafica.csea.it/Anagrafica/webapp/login',
    'https://energivori.csea.it/Energivori/',
     'http://www.ricercadisistema.it',
     'http://www.resmagazine.it/',
     'https://bandirds.csea.it/Sportello/ssoserver2/Login.aspx',
     'https://perequazione.csea.it/perequazione/',
     'https://perequazionegas.csea.it/perequazioneGAS/login.zul',
     'https://elencoesperti.csea.it/ElencoEsperti/pages/BandiEspertiPages/login.zul',
     'https://appalti.csea.it/PortaleAppalti/it/homepage.wp',
//     'https://rab.csea.it/RAB/loginPage',
     'http://banca2.csea.local:8080/flussiBanca/movimenti/display.action',
//     'http://192.168.40.114:8080/flussiBanca/movimenti/display.action',
     'http://web3.csea.local:8080/Gestionale',
     'http://web1.csea.local:8080/Indennitario',
     'http://web1.csea.local:8080/IndennitarioAmm',
      'https://pqs.csea.it',
    // 'http://192.168.40.65/pqs/webapp/toLogin',
     'https://whistleblowing.csea.it/#/',
    // 'http://192.168.40.68/BonusGas/webapp/toLogin',
     // 'http://192.168.40.67/BonusGas/webapp/toLogin nuovo',
    // 'web5.csea.local/BonusGas/webapp/toLogin',
     'https://csea.soluzionipa.it/admin/pagamenti/dati_ente',
     'http://piumalinux.csea.local:8080/share/page/',
     //'http://avcp.csea.local/avcp_2017/',
    'http://avcp.csea.local/avcp_2022',
     'https://serviziweb.inaz.it/portalecsea/default.aspx',
    // 'https://analytics.google.com/analytics/web/'
];

async function doRequests(urls) {

    const fetchUrl = (url) => axios.get(url, configCsea);
  //  console.log("****************************************"+fetchUrl);
    const promises = urls.map(fetchUrl);

    let responses = await Promise.all(promises).catch(function(err) {
        // log that I have an error, return the entire array;
        if(err){
            console.log('A promise failed to resolve', err.hostname);
            console.log('A promise failed to resolve', err.stack);
            console.log('A promise failed to resolve', err.request._currentUrl);
           // console.log('A promise failed to resolve', err.response.status);
           // console.log('A promise failed to resolve', err.config.url);
        }
       return promises;
    });

    responses.forEach(resp => {
        let msg = ``;
        try {
            console.log("URL response "+resp.config.url)
          msg = `${resp.config.url} -> ${resp.headers.server} : ${resp.status}`;
          console.log(" resp "+msg);    
    // console.log(" resp "+ msg);    
        } catch (error) {
            console.log(" respo "+error);    
        }
        
    });
}
/* async function doSingleRequests(url) {

    axios.get(url, configCsea)
        .then((response) => {
                let row =  response.pop();
            console.log(" Status " + row.status + " URL " + row.config.url);
        }
        ).catch(
            err => 
            console.log("RR "+err));


}
 *///getStatuServerCSEA();
doRequests(endpointsCSEA);
//doSingleRequests('https://dataentryrifiuti.csea.it/DataEntryRifiuti/login.html');



