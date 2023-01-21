$(document).ready(function () {

   
    var $value =$("#stype").find('option:selected').val();  
    console.log($value);
url =$value;
    callDati($value);
    function callDati(url) {
        $.ajax({
            type: "GET",
            url: url,
            crossDomain: true,
            success: function (dati) {
                parser(dati);
            },
            error: function (responseData, textStatus, errorThrown) {
                alert('Failed - ' + textStatus);
            },
            done: function (data) {
                //console.log( 'data 0: '+ data ); 
            }
        }).done(function (data) {
            //   console.log( 'data 1: '+ data )
        });
    }
    function parser(dati) {
        // dati 0:ore, 1:sommaore, 2:week, 3:mese, 4:anno
        //FIXME Inserire controlli
         var dataLogarit = [];
         for (var i = 0; i < dati[0].length; ++i) {
             dataLogarit[i] = RGraph.log(dati[0][i], 10)*100; // This function is in RGraph.common.core.js
         }      
       // console.log(dataLogarit);
        //console.log('data 2' + dati[0])
        let infoTimeLabel = getInfoTimeLabel(dati);
        let timelabel = getInfoLCmpl(infoTimeLabel);
        //drawGraphLine (dati, timelabel);
        drawGraphLines(dati, dataLogarit);
        
    }
    $("#stype").on('change', function (event) {
        event.preventDefault();
        console.log(event);
        let queryForm = "reportSALline" + this.value
        //queryForm = "reportSAL" + this.value
        console.log(queryForm);
     //   RGraph.reset($("cvs"));
        RGraph.reset($("cvs_1"));
        $("#paramID").html("<i>"+queryForm+"</i>")
        callDati(queryForm);
    });
});
