
function getInfoLCmpl(infoTimeLabel) {
//(nWeek, anno[i], dataWeekStart,dataWeekEnd
let labelCmpl = [];
    $(infoTimeLabel).each((i, info) => {
//        console.log("---------------------------------");
//tempo inizliare settimana
            let start = formatTime(info[2]);
            let end = formatTime(info[3]);

      //  console.log(start+" \n "+ end);
       labelCmpl.push( start+" \n "+ end);
    });
    return labelCmpl;
}

function getInfoTimeLabel(dati) {
          // dati 0:ore, 1:sommaore, 2:week, 3:anno
    let week = dati[2];
    let anno = dati[3];
   // let nMese = dati[3];
    let infoTimeLabel = [];
    aday = new Date();
    $(week).each((i, nWeek) => {
        let dataWeekStart = aday.getDateOfISOWeek(nWeek,anno[i]);
        let dataWeekEnd   = aday.getDateOfISOWeekEnd(nWeek,anno[i]);
        console.log(i+" week " +nWeek+" anno "+anno[i]+"< Inizia  il "+ dataWeekStart+" > Finisce il "+ dataWeekEnd );
        infoTimeLabel.push([nWeek, anno[i], dataWeekStart,dataWeekEnd]);
    });
    return infoTimeLabel;
}

function formatTime(info){
    const d = new Date(info);
    const date = d.getDate() // 23
       const monthIndex = d.getMonth();
   const formatted = `${date}-${monthIndex+1}`;
    return formatted;
}

function drawGraphLines(dati, dataLogarit) {
    bar = new RGraph.Bar({
        id: 'cvs_1',
        data: dati[0],
        options: {
           // yaxisScaleMax: 100,
            backgroundGridVlines: true,
            backgroundGridBorder: false,
            backgroundGridColor: '#999',
            xaxisLabels: dati[2],
            marginLeft: 55,
            marginRight: 55,
            marginBottom: 45,
            colors: ['Gradient(#A18AC5:#D1AAF5)'],
            textColor: '#ccc',
            xaxisTickmarksCount: 0,
            xaxis: false,
            //yaxis: false,
            shadowColor: 'black',
            shadowOffsetx: 0,
            shadowOffsety: 0,
            shadowBlur: 15,
            colorsStroke: 'rgba(0,0,0,0)',
            combinedEffect: 'wave',
            combinedEffectOptions: '{frames: 30}',
            title: 'Giorni uomo',
            titleSize: 15,
            titleBold: true,
            axesColor: '#666',
            spline: true
        }
    });

    var dato= [dati[1],dati[0]];
    line2 = new RGraph.Line({
        id: 'cvs_1',
//data: dato[0],
        data: dataLogarit,
        options: {
            yaxisScaleMax: 600,
            xaxis: false,
            yaxis: false,
            backgroundGrid: false,
            colors: ['#ccc'],
            yaxisPosition: 'right',
            textColor: '#ccc',
            marginLeft: 45,
            marginRight: 45,
            tickmarksStyle: null,
            spline: true,
            combinedEffect: 'trace',
            textSize: 18,
            trendline: true,
            trendlineMargin: 15,
            trendlineDashed: true
        }
    });

    combo = new RGraph.CombinedChart([bar, line2]).draw();

}

//    function drawGraphLine(dati, labelsAboves) {
//     marginLeft = 20;
//     marginRight = 25;
//     myLine = new RGraph.Line({
//         id: 'cvs',
//         data: [dati[0], dati[1]],
//         //  data: [dataLogarit, dati[1]],
//         // data: dati,
//         options: {

//             xaxisLabels: dati[2],
//             //labelsAbove : true ,
//             tooltips: labelsAboves,
//             xaxisLabelsOffsety: 5,
//             xaxisLabelsAngle: 45,
//             marginBottom: 50,
//             tickmarksStyle: 'circle',
//             tickmarksSize: 3,
//             marginLeft: 40,
//             marginRight: 15,
//             colors: ['red', 'black'],
//             key: ['Per settimana', 'Cumulato'],
//             keyColors: ['red', 'black'],
//             keyBackground: 'white',
//             keyPosition: 'margin',
//             //keyPositionMarginBoxed: false,
//             keyPositionX: ((document.getElementById('cvs').width - marginLeft - marginRight) / 2) + marginLeft - 115,
//             // yaxisLabelsCount: 3,
//             yaxisScaleUnitsPost: ' h',
//             //yaxisScaleUnitsPost: '%',
//             linewidth: 5,
//             marginInner: 15,
//             textColor: '#333',
//             backgroundGridVlinesCount: 11,
//             backgroundGridVlines: true,
//             //backgroundGridBorder: false,
//             backgroundGridColor: '#999',

//             xaxis: false,
//             yaxis: false,
//             title: 'Giorni uomo',
//             titleSize: 15,
//             titleBold: true,
//             axesColor: '#666',
//             spline: true,
//             trendline: true,
//             trendlineMargin: 15,
//             trendlineDashed: true,

//         }
//     }).draw();
 
 
     xaxis = new RGraph.Drawing.XAxis({
         id: 'cvs_1',
         y: myLine.canvas.height - 10,
         options: {
             xaxisLabels: labelsAboves,
             xaxisLabelsOffsety: 5,
             /* xaxisLabelsAngle: 45,
             marginBottom: 150,
   */           marginLeft: 30,
             marginRight: 15,
             xaxisColor: '#ccc',
             textColor: '#ccc',
         }
     }).draw();
    
 // }
