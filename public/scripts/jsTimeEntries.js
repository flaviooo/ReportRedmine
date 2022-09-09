$(document).ready(function () {
    let url = "http://192.168.40.30:3000/time_entries.xml"
    url = "https://gestioneprogetti.csea.it/time_entries.xml";
    url = "http://localhost:3000/time_entries.xml"
    url = "http://192.168.40.30:3000/time_entries.xml"
    
    url = "http://localhost:4000/time_entriesXML"
    
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        dataCharset: 'xml',
        crossDomain: true,
        success: function (response) {
            var xmlDoc = $.parseXML(response);
           var $xml0 = $(xmlDoc);
           console.log(response);
           // jsonParser(response)
            xmlParser($xml0)
            //calcola($xml0)
            //parser1($xml0)
            test($xml0)
            //           console.log($xml0);

        },
        error: function (responseData, textStatus, errorThrown) {
            console.warn(responseData, textStatus, errorThrown);
            alert('Failed - ' + textStatus);
        },
        done: function (data) { console.log('data ' + data); }
    }).done(function (data) {
        //   console.log( 'data '+ data )
    });

});

function jsonParser(response){
   // console.log(response);
   var $time_entry = JSON.parse(JSON.stringify(response));
    console.log($time_entry);
  //  $time_entry.each(function () {
    $.each($time_entry, function(index, element) {
        var $ele = JSON.parse(JSON.stringify(element));

        $.each($ele, function(i, e) {
            console.log($(this).find('id').text())
        })
            /* 
        var id = $(this).find('id').text();
        var hours = $(this).find('hours').text();
        var issue = $(this).find('issue').attr('id');
        var project = $(this).find('project').attr('name');
        var user = $(this).find('user').attr('name');
        var tr = $("<tr/>");
        tr.append("<td>" + id + "</td>");
        tr.append("<td>" + hours + "</td>");
        tr.append("<td>" + issue + "</td>");
        tr.append("<td>" + project + "</td>");
        tr.append("<td>" + user + "</td>");

        $("#BuyOrders").append(tr); */
}
)};                     

function xmlParser(xml) {
    const LIMIT = 25;
    var $xml0 = $(xml);
    // let temp =$(xml0); //.find("time_entry").each(function () {
    var totRecords = $xml0.find("time_entries").attr('total_count');;
    var pagesqty = Math.floor(totRecords / 100);

    if (totRecords % LIMIT > 0) {
        pagesqty += 1;
        console.log("pagesqty: " + pagesqty);
        console.log("totRecords: " + totRecords);

    }
    let i = LIMIT;
    let data = "";
    while (i < totRecords) {

        console.log("limit=" + 100 + "&offset=" + i + "&id=");
        let dataQuery = "time_entry.xml?offset=" + i + "&limit=100";
        console.log("totRecords: " + dataQuery);
        i += 100;
    }

    var $time_entry = $xml0.find("time_entry");
    $time_entry.each(function () {

        var id = $(this).find('id').text();
        var hours = $(this).find('hours').text();
        var issue = $(this).find('issue').attr('id');
        var project = $(this).find('project').attr('name');
        var user = $(this).find('user').attr('name');
        var tr = $("<tr/>");
        tr.append("<td>" + id + "</td>");
        tr.append("<td>" + hours + "</td>");
        tr.append("<td>" + issue + "</td>");
        tr.append("<td>" + project + "</td>");
        tr.append("<td>" + user + "</td>");

        $("#BuyOrders").append(tr);

        //$("ul").append('<li>' +id+ ' - ' +hours+ '</li>');
    });


    /*
      $(".main").append('<div class="idSegna"><div class="idSegna">' 
      + $(this).find("id").text() + '</div><div class="issue">' 
      + $(this).find("issue").text() + '</div><div class="date">Published ' 
      + $(this).find("created_on").text() + '</div></div>');
      $(".book").fadeIn(1000);
  */
    // });
}

function test($xml) {
    var multiArray = [];
    var $time_entry2 = $xml.find("time_entry");
    var progetti = [];

    $time_entry2.find("project").each(function () {

        var projTemp = $(this).attr('name');
        if (!(projTemp in progetti))
            progetti.push(projTemp);
    });
    const uniqueProgetti = [...new Set(progetti)]
    console.log(uniqueProgetti)

   
    //progetti = $time_entry2.find('project').attr('name');
    bar_data  = [];
    for (let index = 0; index < uniqueProgetti.length; index++) {
        const progetto = uniqueProgetti[index];
        var hoursSum = 0
        
        $time_entry2.each(function () {
            var projTemp = $(this).find('project').attr('name');
            var $hours = $(this).find('hours').text();
            if(projTemp==progetto){
                hoursSum = Number($hours) + hoursSum
                console.log(projTemp+ ' --> '  + Number($hours)+'--> '+hoursSum)
            }
        });
        bar_data.push(hoursSum.toFixed(2));

    //    multiArray.push([ project, ob.push(hoursSum)]);
        console.log("*** "+ bar_data);
        
    }

    // Initialise the Bar chart data and a few other variables
    //bar_data  = [40, 45, 33, 39, 57, 49, 50, 54, 48, 41, 45, 48];
    line_data = [];
    total     = 0;
    
    // Loop through the bar chart data and create the Line chart data
    bar_data.forEach(function (v, k, a)
    {
        total += v;
        line_data[k] = k > 0 ? total / (k + 1) : null;
    });

    bar = new RGraph.Bar({
        id:  'cvs',
        data: bar_data,
        options: {
           // xaxisLabels: ['1 Jan','2 Jan','3 Jan','4 Jan','5 Jan','6 Jan','7 Jan','8 Jan','9 Jan','10 Jan','11 Jan','12 Jan'],
            xaxisLabels: uniqueProgetti,
            xaxisLabelsAngle: 45,
            xaxisLabelsOffsety: 10,
            colors: ['#4472C4','black'],
            xaxis: false,
            yaxis: false,
            backgroundGridBorder: false,
            backgroundGridVlines: false,
            marginInner: 10,
            marginLeft: 100,
            marginBottom: 180,
            title: 'A Bar chart with a moving average line',
            titleSize: 16,
            titleBold: true,
            yaxisScaleUnitsPre: 'Ore',
            key: ['Ore', 'Progetto'],
            keyPosition: 'margin'
        }
    }).draw();
    
    
    line = new RGraph.Line({
        id: 'cvs',
        data: line_data,
        options: {
            shadow: false,
            backgroundGrid: false,
            xaxis: false,
            yaxis: false,
            marginInner: 30,
            colors: ['#334E7B'],
            yaxisScaleMax: bar.max,
            linewidth: 3
        }
    }).draw();

    
}


function calcola($xml) {
    var $time_entry2 = $xml.find("time_entry");
    //  console.log($time_entry2)
    var hoursSum = 0
    $time_entry2.each(function () {

        var id = $(this).find('id').text();
        var $hours = $(this).find('hours').text();
        var issue = $(this).find('issue').attr('id');
        var project = $(this).find('project').attr('name');
        var user = $(this).find('user').attr('name');
        hoursSum = Number($hours) + Number(hoursSum)

        //$("ul").append('<li>' +id+ ' - ' +hours+ '</li>');
    });
    $("h1").append(' ' + hoursSum);
}

function parser1($xml) {

    /*    data: [
           [3.5 - 1.19,1.19],
           [4 - 1.5, 1.5],
           [4.5 - 1.75, 1.75],
           [5.1 - 2.25, 2.25],
           [6 - 3.5, 3.5],
           [7.75 - 7.75, 7.75],
     */
    var $time_entry2 = $xml.find("time_entry");
    //    console.log('data 2' + $time_entry2)
    var label = []
    var dataJoson = []
    var $hoursSum = 0
    var multiArray = [];

    var $progetti = $time_entry2.map(function () {
        return $(this).find('project').attr('name');
    }).get();

    //console.log('Indice A ' +index + 'Indice' +element)
    var project = $(this).find('project').attr('name');
    var $hours = $(this).find('hours').text();
    //   console.log(project +' <-> ' + $hours)
    $.each($time_entry2, function (index, element) {
        var project = $(this).find('project').attr('name');
        if (multiArray.pro)
            $.each($time_entry2, function (index, element) {
                var $hours = $(this).find('hours').text();
                $hoursSum = Number($hours) + $hoursSum
            });
        //console.log(project + ' <-> ' + $hoursSum)
        $hoursSum = 0;
        var ob = []
        multiArray.push([project, ob.push($hoursSum)]);
        label.push(project);
        dataJoson.push(ob)
    });
    //console.log(dataJoson)
}