$(document).ready(function () {
    $("#cvs").hide();
    $("#cvs2").hide();
    $("#cvs3").hide();
   
    $('#tipologiaRgraph').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $("#cvs").show();
    $("#cvs2").hide();
    $("#cvs3").hide();
        let url="tipologiaRgraph";
        $.ajax({
            type: "GET",
            url: url,
            crossDomain: true,
           // dataType: 'text',
           // dataCharset: 'xml',
            success: parser,
            error: function (responseData, textStatus, errorThrown) {
                console.warn(responseData, textStatus, errorThrown);
                alert('Failed - ' + textStatus);
            },
            done: function( data ) {
                 //console.log( 'data 0: '+ data ); 
                } 
       }).done( function( data ) { 
        //   console.log( 'data 1: '+ data )
           
        });
     });

     $('#getTipologiaProgetti').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $("#cvs").hide();
        $("#cvs_rgraph_domtext_wrapper").hide();
        $("#cvs3").show();
        $("#cvs2").show();
            let url="getTipologiaProgetti";
            $.ajax({
                type: "GET",
                url: url,
                crossDomain: true,
               success: parserGetTipologiaProgetti,
                error: function (responseData, textStatus, errorThrown) {
                    console.warn(responseData, textStatus, errorThrown);
                    alert('Failed - ' + textStatus);
                },
                done: function( data ) { } 
           }).done( function( data ) { 
               //console.log( 'data 1: '+ data )
            });
         });
    
});
    
     function parserGetTipologiaProgetti(xml){
// console.log('data 2' + xml)
var etichette = []
var dataJson = []
var dataCVS3 = []
$.each(xml, function(index, element) {
   
    etichette.push(element.name);
    var ob = []
    dataCVS3[index] = [element.Aperte, element.Chiuse ];
 
    ob.push(element.Aperte);
    ob.push(element.Chiuse);
    ob.push(element.totale);
    dataJson.push(ob)
  
});

RGraph.reset($("cvs"));
new RGraph.HBar({
    id: 'cvs2',
    data: dataJson,
    options: {
        yaxisLabels: etichette,
        marginLeftAuto: true,
        marginInner: 25,
        grouping: 'grouped',
        backgroundGridHlines: false,
        backgroundGridBorder: false,
        backgroundGridVlinesCount: 33,
        xaxis: false,
        yaxis: false,
        colors: ['#7CB5EC','#B03060','#FFF060'],
        xaxisLabelsCount: etichette.length/2,
        xaxisScaleMax: 399.9,
        xaxisScaleDecimals: 0.1,
        xaxisTitle: 'CSEA - ASI',
        xaxisTitleY: 910,
        xaxisTitleColor: '#aaa',
        key: ['Chiuse','Aperte','Totali'],
        keyPosition: 'margin',
        keyLabelsBold: true
    }
}).grow({frames: 60});

new RGraph.HBar({
    id: 'cvs3',
    data: dataCVS3,
    options: {
        yaxisLabels: etichette,
        marginLeftAuto: true,
        grouping: 'stacked',
        colors: ['red','rgba(0,0,255,0.25)'],
        key: ['Aperte','Chiuse'],
        keyPosition: 'margin',
        titleY: '-10',
        title: '10 year difference of Cochlea implant rates (%)',
        titleBold: true,
        titleSize: 16,
        marginTop: 50,
        xaxis: false,
        xaxisScaleUnitsPost: '%',
        backgroundGridHlines: false,
        backgroundGridBorder: false
    }
}).grow();
}

function parser(xml) {
   // console.log('data 2' + xml)
    var label = []
    var dataJoson = []
    $.each(xml, function(index, element) {
     //   console.log('data 3' +index)
        label.push(element.Tipologia);
        var ob = []
        ob.push(element.Aperte);
        ob.push(element.Chiuse);
        ob.push(element.totale);
        dataJoson.push(ob)
    });
    RGraph.reset($("cvs"));
    bar = new RGraph.Bar({
        id: 'cvs',
       // data: [[3, 4, 6], [2, 5, 3], [1, 5, 2], [1, 4, 6], [1, 6, 8]],
       data: dataJoson,
        options: {
           // xaxisLabels: ['Mal', 'Barry', 'Gary', 'Neil', 'Kim'],
           xaxisLabels: label,
            colors: ['Gradient(#99f:#27afe9:#058DC7:#058DC7)', 'Gradient(#94f776:#50B332:#B1E59F)', 'Gradient(#fe783e:#EC561B:#F59F7D)'],
            marginInner: 15,
            marginLeft: 45,
            tooltips: '<b>Results</b><br />%{key}',
            tooltipsFormattedKeyLabels: ['06:00','12:00','18:00'],
            tooltipsFormattedKeyColors:['red','green','blue'],
            tooltipsFormattedUnitsPost: '%',
                tooltipsCss: {
                    fontSize: '16pt',
                    textAlign: 'left'
                 },
            textSize: 9,
            colorsStroke: 'white',
            linewidth: 2,
            shadowOffsetx: 1,
            shadowOffsety: 0,
            shadowBlur: 1,
            backgroundGridVlines: true,
            backgroundGridBorder: false,
            yaxis: false,
            xaxisScaleZerostart: true,
            xaxis: false,
            combinedEffect: 'wave',
            combinedEffectCallback: function () { $a('Finished the bar effect!') },
            combinedEffectOptions: '{frames: 90}'
        }
    }).draw();
}