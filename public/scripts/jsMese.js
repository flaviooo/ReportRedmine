$(document).ready(function () {

    _init("tipologiaMeseParam");
    url = "tipologiaMeseParam"
    $("#stype").on('change', function (event) {
        event.preventDefault();
        console.log(event);
        let queryForm = "tipologiaMeseParam" + this.value
        console.log(queryForm);
        //RGraph.reset($("cvs"));
        $("#paramID").html("<i>" + queryForm + "</i>")
        callDraw(queryForm)
    });
});

function _init(url) {
    var annoCorrente = new Date().getFullYear();
    let params = "?meseS=01&meseE=12&anno="+annoCorrente
    $("#paramID").html("<i>" + params + "</i>")
    callDraw(url + params)

}

function callDraw(url) {
    $.ajax({
        type: "GET",
        url: url,
        crossDomain: true,
        success: parser,
        error: function (responseData, textStatus, errorThrown) {
            console.warn(responseData, textStatus, errorThrown);
            alert('Failed - ' + textStatus);
        },
        done: function (data) {
            //console.log( 'data 0: '+ data ); 
        }
        //   console.log( 'data 1: '+ data )

    });
}

function parser(data) {
    var listaMesiPresenti = [];
    $.each(data, function (index, element) {
        $.each(element, function (i, e) {
            if ($.inArray(e, listaMesiPresenti) === -1 && i == 0)
                listaMesiPresenti.push(e);
        });
      //  console.log("listaMesiPresenti " + listaMesiPresenti)
    });

    //dalla lista dei mesi presenti recupero le info correlate
    var dataTemp = []
    var dataJson = []
    $.each(listaMesiPresenti, function (index, element) {
        var ob = []
        //ogni mese
        $.each(data, (ind, ele) => {
            if (ele[0] == element)
                ob.push(ele)
        });
        dataTemp.push(ob)
    });
    dataJson.push(dataTemp)
    var labelkey = ["Problema tecnico", "Funzionalità aggiuntiva", "Richiesta di supporto", "Attività di progetto", "Licenze/scadenze", "Attività generica", "Attività documentale"]

    var dataMonth = []
    $.each(dataJson, (index, element) => {
//Elaborao un mese
        for (const key in element) {
            if (element.hasOwnProperty.call(element, key)) {
                const ele = element[key];
                var valoriSingolaBar = ["0", "0", "0", "0", "0", "0"];
                console.log(key + " : " + ele)
                $.each(ele, function (i, e) {

                    //assegno il valore in percetuale  per singola label
                    valoriSingolaBar[e[2] - 1] = e[4]
                //    console.log("Il valore " + e[4] + "% è associato al tracker " + e[3] + " del mese " + e[0] +
                  //      " è stato memorizzato nella posizione " + [e[2]] + " del singolo Bar " + valoriSingolaBar[e[2] - 1])
                    //  console.log(" la label del valore con indice "+e[2]+ " = "+valoriSingolaBar[e[2]]+" è associato a "+ labelkey[e[2]])
                 //   console.log(" La chiave " + [e[2]] + " identifica il tracker " + labelkey[e[2] - 1])
                });
            }
            dataMonth.push(valoriSingolaBar)   
        }
    });
    console.log(listaMesiPresenti)

    //   for (i=0;i<dataMonth.length; ++i) {
    // This function is in RGraph.common.core.js
    //data[i] = RGraph.log(data[i], 10);
    //      console.log(dataMonth[i])
    //        dataMonth[i] = RGraph.log(dataMonth[i], 10);
    //   }
    RGraph.ObjectRegistry.clear($("cvs"));
    RGraph.ObjectRegistry.remove($("cvs"));
    RGraph.reset($("cvs"));
    bar = new RGraph.Bar({
        id: 'cvs',
        data: dataMonth,
        options: {
            textSize: 10,
            marginTop: 50,
            marginBottom: 50,
            marginLeft: 50,
            xaxisLabelsAngle: 45,
            marginInner: .5,
            xaxisLabelsOffsety: 10,
            //xaxisLabels: listaMesiPresenti,
            //xaxisLabels: getMeseAarry(listaMesiPresenti),
            xaxisLabels: new Date().getMeseNameArr(listaMesiPresenti),
            linewidth: 2,
            //colorsStroke: 'white',
            // colors: ['#aaf', 'rgba(96,128,96,0.5)', '#faa','#afa'],
            backgroundGridVlines: false,
            backgroundGridBorder: false,
            grouping: 'stacked',
            colorsStroke: 'transparent',
            shadow: false,
            labelsAbove: true,
            labelsAboveDecimals: 2,
            //tooltips: '<table border="1" align="center" cellspacing="0"><tr><td>%%{index}</td><td>%{index}</td></tr><tr><td>%%{dataset}</td><td>%{dataset}</td></tr><tr><td>%%{group}</td><td>%{group}</td></tr><tr><td>%%{sequential_index}</td><td>%{sequential_index}</td></tr><tr><td>%%{seq}</td><td>%{seq}</td></tr><tr><td>%%{value}</td><td>%{value}</td></tr><tr><td>%%{value_formatted}</td><td>%{value_formatted}</td></tr><tr><td>%%{property:xaxisLabels[%%{group}]}</td><td>%{property:xaxisLabels[%{group}]}</td></tr><tr><td>%%{prop:title}</td><td>%{prop:title}</td></tr><tr><td>%%{property:myNames[%%{group}]} (custom property)</td><td>%{property:myNames[%{group}]}</td></tr><tr><td>%%{function:getDay(%%{index}, %%{group}, %%{seq})}</td><td>%{function:getDay(%{index}, %{group}, %{seq})}</td></tr><tr><td>%%{key}</td><td>%{key}</td></tr></table>',
            tooltips: '<table border="1" align="center" cellspacing="0">'+
            '<tr><td>%%{index}</td><td>%{index}</td></tr>'+
            '<tr><td>%%{dataset}</td><td>%{dataset}</td></tr>'+
            '<tr><td>%%{group}</td><td>%{group}</td></tr>'+
            '<tr><td>%%{sequential_index}</td><td>%{sequential_index}</td></tr>'+
            '<tr><td>%%{seq}</td><td>%{seq}</td></tr>'+
            '<tr><td>%%{value}</td><td>%{value}</td></tr>'+
            '<tr><td>%%{value_formatted}</td><td>%{value_formatted}</td></tr><tr><td>%%{property:xaxisLabels[%%{group}]}</td><td>%{property:xaxisLabels[%{group}]}</td></tr><tr><td>%%{prop:title}</td><td>%{prop:title}</td></tr><tr><td>%%{property:myNames[%%{group}]} (custom property)</td><td>%{property:myNames[%{group}]}</td></tr>'+
            '<tr><td>%%{function:getDataTracker(%%{index}, %%{group}, %%{seq})}</td><td>%{function:getDataTracker(%{index}, %{group}, %{seq})}</td></tr><tr><td>%%{key}</td><td>%{key}</td></tr></table>',
            //    tooltipsFormattedKeyLabels:['Alf','Bert','Carl'],
            tooltipsFormattedKeyLabels: listaMesiPresenti,
            //tooltipsFormattedKeyColors:['pink','gray','blue'],
            tooltipsPointer: false,
            tooltipsPositionStatic: false,
            tooltipsCss: {
                backgroundColor: 'white',
                color: 'black'
            },
            key: labelkey,
            keyPosition: 'margin',
            keyPositionX: 50,
            keyPositionY: 18,
            yaxisScaleMax: 100,
            keyPositionMarginBoxed: true,
            xaxis: false,
            yaxis: false,
        }
    }).on('draw', function (obj) {
        console.log("RGraph.ObjectRegistry.list() " + RGraph.ObjectRegistry.list());

        for (var i = 0; i < obj.coords.length; ++i) {
            let arr = obj.data_arr[i];
            if (arr !== 0) {
                //Thse are the coordinates of the bar
                var x = obj.coords[i][0],
                    y = obj.coords[i][1],
                    width = obj.coords[i][2],
                    height = obj.coords[i][3];

                obj.context.fillStyle = 'white';

                var ret = RGraph.text({
                    object: obj,
                    font: 'Verdana',
                    size: 10,
                    x: x + (width / 2),
                    y: y + (height / 2),
                    text: obj.data_arr[i].toString() + "%",
                    valign: 'center',
                    halign: 'center'
                });
                let stile = ret.node.style
                ret.node.style.textShadow = '-1px -1px 1px black, 1px 1px 1px black';
                
            }
        }
        
    }).draw()//;
        /* .responsive([
           {maxWidth: null,width:600,height:300,options: {xaxisLabelsOffsety:0,xaxisLabelsAngle:0,textSize: 14},css:{'float':'right'}},
           {maxWidth: 900,width:400,height:200,options: {xaxisLabelsOffsety:5,xaxisLabelsAngle:45,textSize: 10},css:{'float':'none'}}
       ]); */
        .exec(function (obj) {
            // Calculate marginInner here,set it and call 
            RGraph.redraw();
        });

}
function getDataTracker(index, group, seq) {
    var labelkey = ["Problema tecnico (bug)", "Funzionalità aggiuntiva", "Richiesta di supporto", "Attività di progetto", "Licenze e scadenze", "Attività generica"]
    return labelkey[index] + " (indexes: index=" + index + ", group=" + group + ", seq=" + seq + ")";
}
