$(document).ready(function () {
    _init("getTimeProj");    
    $("#stype").on('change', function (event) {
        event.preventDefault();
        console.log(event);
        let queryForm = "getTimeProj" + this.value
        console.log(queryForm);
        //RGraph.reset($("cvs"));
        $("#paramID").html("<i>"+queryForm+"</i>")
        callDraw(queryForm)
    });
});

function _init(url){
    let params = "?meseS=10&meseE=12&anno=2021"
    $("#paramID").html("<i>"+params+"</i>")
    callDraw(url + params)

}
function callDraw(url) {

    $.ajax({
        type: "GET",
        url: url,
        crossDomain: true,
        success: function (response) {
           // console.log(response);
            paser(response);

        },
        error: function (responseData, textStatus, errorThrown) {
            console.warn(responseData, textStatus, errorThrown);
            alert('Failed - ' + textStatus);
        },
        done: function (data) { console.log('data ' + data); }
    }).done(function (data) {
        //   console.log( 'data '+ data )
    });
}
function paser(response) {
    var progetti = [];
    var label = [];

    $.each(response, function (index, element) {
        //console.log('data 3' +index)
        label.push(element.name);
        progetti.push(element.sum_hours);
    });
    drawReports(progetti, label)
}
function drawReports(progetti, label) {

//    RGraph.reset($("cvs"));
   // RGraph.reset($("cvs3"));
   // RGraph.reset($("cvs2"));

    var report = new RGraph.Pie({
        id: 'cvs',
        // data: [25,8,6,3,5,2,8,6,4,3,2,1],
        data: progetti,
        options: {
            yaxisScaleUnitsPost: ' ',
            colors: ["rgb(128,243,32)", "rgb(214,7,143)", "rgb(1,191,202)", "rgb(229,156,4)", "rgb(106,24,237)", "rgb(60,254,91)", "rgb(251,47,73)", "rgb(15,122,246)", "rgb(172,218,9)", "rgb(176,1,185)", "rgb(13,225,162)", "rgb(249,112,20)", "rgb(64,55,253)", "rgb(101,252,52)"],
            colorsStroke: "rgba(0,0,0,0)",
            labels: label,
            labelsSticks: [true, true, true, true, true, true, true, true, true, true, true, true, false, false],
            labelsSticksLength: 20,
            labelsSticksColors: "black",
            labelsList: false,
            labelsIngraph: true,
            labelsIngraphColor: "Black",
            labelsIngraphFont: "Arial",
            labelsIngraphSize: 5,
            labelsIngraphBold: null,
            labelsIngraphItalic: null,
            labelsIngraphBounding: true,
            //labelsIngraphSpecific: ['52%', '14%', '9%', '8%', '5%', '3%', '', '', '', '', '', '', '', ''],
            marginTop: 0,
            marginBottom: 0,
            shadow: true,
            shadowColor: "#bbb",
            shadowOffsetx: 0,
            shadowOffsety: 10,
            shadowBlur: 15,
            textSize: 8,
            textColor: "black",
            textAccessible: false,
            tooltips: label,
            radius: 140,
            variant: "donut3d",
            variantThreedDepth: 25,
            exploded: 25,
            origin: 3.455751918948773
        }
    });//.on('click', function (e, shape) { alert('The Line chart click event'); });

    var report2 = new RGraph.Bar({
        id: 'cvs2',
        data: progetti,
        options: {
            //xaxisLabels: ['1 Jan','2 Jan','3 Jan','4 Jan','5 Jan','6 Jan','7 Jan','8 Jan','9 Jan','10 Jan','11 Jan','12 Jan'],
            xaxisLabels: label,
            xaxisLabelsAngle: 45,
            xaxisLabelsOffsety: 15,
            colors: ['#4472C4', 'black'],
            xaxis: false,
            yaxis: false,
            backgroundGridBorder: false,
            backgroundGridVlines: false,
            marginInner: 5,
            title: 'Bar chart Tempo Impiegato',
            titleSize: 12,
            titleBold: true,
            yaxisScaleUnitsPre: ' h ',
            key: ['Totale Tempo Per Progetto'],
            keyPosition: 'margin'
        }
    });

 
    report.grow({frames: 5});
   // report2.grow({frames: 10});
   // report2.draw();
}