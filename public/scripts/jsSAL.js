$(document).ready(function () {

    let url = "reportSALline";
    $.ajax({
        type: "GET",
        url: url,
        crossDomain: true,
        success: function (dati) {
            parser(dati);
        },
        error: function (responseData, textStatus, errorThrown) {
            console.warn(responseData, textStatus, errorThrown);
            alert('Failed - ' + textStatus);
        },
        done: function (data) {
            //console.log( 'data 0: '+ data ); 
        }
    }).done(function (data) {
        //   console.log( 'data 1: '+ data )
    });

    function parser(dati) {
        // dati 0:ore, 1:sommaore, 2:week, 3:mese, 4:anno
        var dataLogarit = [];
        for (var i = 0; i < dati[0].length; ++i) {
            dataLogarit[i] = RGraph.log(dati[0][i], 10); // This function is in RGraph.common.core.js
        }      
       // console.log(dataLogarit);
        //console.log('data 2' + dati[0])
        let infoTimeLabel = getInfoTimeLabel(dati);
        let timelabel = getInfoLCmpl(infoTimeLabel);
        drawGraphLine (dati, timelabel);
        drawGraphLines(dati);
        
    }

});
