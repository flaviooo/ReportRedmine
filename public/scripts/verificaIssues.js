$(document).ready(function () {

    //  console.log(sorted);
    initTable();
    gestioneOccorenze();
  
    let queryForm = "invioMail";
    $("#getTipologie").on('change', function (event) {
        event.preventDefault();
        console.log(event);
        let queryForm = "getTimeProj" + this.value
        console.log(queryForm);
        $("#paramID").html("<i>" + queryForm + "</i>")
        // callDraw(queryForm)
    });

    $('#send_by_button').click(function (e) {
        e.preventDefault();
        let data = "";
        var listaAutori = [];
        var $item = $('#idTabella tr input:checked');
        $item.each(function (e) {
            $autore = $(this).attr('name');
            if ($.inArray($autore, listaAutori) === -1)
                listaAutori.push($autore);
        });
        console.log("listaAutori " + listaAutori);
        //const uniqueAutori = [...new Set(listaAutori)]
        /* una volta selezionati gli autori della segnalazione 
        ** raggruppo tutte le segnalazioni per autore 
        */
        var dataStruct = [];
        $(listaAutori).each((i, autore) => {
            var $selezionati = $('#idTabella tr').find(':checked').parents("tr");
            var issuesSelected = [];
            var oggettiIssues = [];
            var giorniTrascorsi = [];
            var obj = {};
            $.each($selezionati, (i, e) => {
                var autoreA = $(e).find('td:eq(1)').text();
                obj.autore = autore;
                if (autoreA == autore) {

                    var issues = $(e).find('td:eq(0)').text();
                    issuesSelected.push(issues);

                    var oggettoIssues = $(e).find('td:eq(7)').text();
                    oggettiIssues.push(oggettoIssues);

                    var giornotrascorsi = $(e).find('td:eq(3)').text();
                    giorniTrascorsi.push(giornotrascorsi);
                    // issuesSelected.push(JSON.stringify(issues));
                }
            });
            obj.issues = issuesSelected;
            obj.oggettiIssues = oggettiIssues;
            obj.giorniTrascorsi = giorniTrascorsi;
            dataStruct.push(obj);
            // cambia autore
        });

       // console.log("data: " + dataStruct);
        data = JSON.parse(JSON.stringify(dataStruct));
        var postData = {
            dati: data
        };
        inviaMail(queryForm, postData);
    });

    function inviaMail(queryForm, data) {
        //        console.log(queryForm);
        console.log(data);

        $.ajax({
            type: 'POST',
            data: data,
            // contentType: 'application/json',
            url: queryForm,
            //on success, received data is used as 'data' function input
            success: function (data) {
                //  window.alert('Request sent; data received.');
                var jsonstr = JSON.stringify(data);
                var jsonobj = JSON.parse(jsonstr);
                //if the 'nick' member of the JSON does not equal to the predeclared string (as it was initialized), then the backend script was executed, meaning that communication has been established
                if (data != null) {
                    //  document.getElementById("modify").innerHTML = "JSON changed!\n" + jsonstr;
                    console.log("Risposta" + jsonobj);
                    $("#flash").text("Invio effettuato: " + jsonobj.join(", "))
                        .show()
                        //  .parent()
                        .fadeIn()
                        .delay(2000)
                        .fadeOut('slow', function () {
                            $("#flash").text('');
                        });
                };
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
});
function gestioneOccorenze(){
    $('#occ').hide();
    $('#noviewGraphOccorenzeUser').hide();

    $('#viewGraphOccorenzeUser').click(function (e) {
        $('#noviewGraphOccorenzeUser').show();
        $('#viewGraphOccorenzeUser').hide();     
        $('#occ').show();
        viewGraphOccorenzeUtente(sorted);	    
    });
    $('#noviewGraphOccorenzeUser').click(function (e) {
        $('#occ').hide();  
        
        $('#noviewGraphOccorenzeUser').hide();
        $('#viewGraphOccorenzeUser').show();     	    
    });

}

function initTable() {
    console.log("INIT");
   // $("#flash").hide();
    $("#deCheckAll").hide();
    $("#checkAll").click(function () {

        $("table tr :checkbox").prop("checked", true);
        $("#checkAll").hide();
        $("#deCheckAll").show();

    });
    $("#deCheckAll").click(function () {

        $("table tr :checkbox").prop("checked", false);
        $("#checkAll").show();
        $("#deCheckAll").hide();

    });

    var campoSearch = $('#idTabella thead tr').children('th').eq(1);
    var title = $('#example thead th').eq($(campoSearch).index()).text();
    $(campoSearch).html('<input type="text" placeholder="Search ' + title + '" />');

    var table = $('#idTabella').DataTable({

        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Italian.json"
        },
        "lengthMenu": [50, 100, 150, 200, 300],
    });

    table.columns(1).every(function () {
        var that = this;
        $('input', this.footer()).on('keyup change', function () {
            that.search(this.value).draw();
        });
    });
    //  table.columns(2).search(  ).draw();

}

function viewGraphOccorenzeUtente(sorted) {
 //   let sortParseData = JSON.parse(JSON.stringify(sorted));
//    console.log(sortParseData);
    let etichette = [];
    let datiCVS = [];
    var datiSplit = sorted.split(",");
    $.each(datiSplit, function (indice, valore) {
        // console.log(indice + ': ' + valore);
        var nameSurmane = valore.split("@");
        (indice % 2 == 1) ? datiCVS.push(valore) : etichette.push(nameSurmane[0]);
    });

    RGraph.reset($("cvs"));
    new RGraph.HBar({
        id: 'cvs2',
        data: datiCVS,
        adjustable: true,
        options: {
            colorsSequential: true,
            // marginLeft: 100,
            marginInner: 5,
            textAccessiblePointerevents: true,
            labelsAbove: true,
            yaxisLabels: etichette,
            textSize: 12,
            xaxis: false
        }
    }).grow();
}
