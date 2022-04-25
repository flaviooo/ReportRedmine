$(document).ready(function () {

    var nome ="";
    $("#getTipologie").on('change', function (event) {
        event.preventDefault();
        console.log(event);
        nome = $(this).children("option:selected").text();
        //value =  $("#getTipologie option:selected");
        updateTipologica(this.value, nome);
        $("#paramID").html("<i>" + nome + "</i>").show().fadeIn().delay(2000);
    });

    $('#idTabella').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Italian.json"
        },
        "lengthMenu": [10, 50, 100, 150, 200, 300]
    });

//    $("#flash").hide();
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
  
    function init(initQuery) {
        console.log("INIT");
        
        //  updateTipoligia(this.value, nome); 
    }

});

getTipologiche("getTipologiche");
            
function getTipologiche(queryGetTipologie){
    
    $.ajax({
        type: 'get',
        url: queryGetTipologie,
        success: function (data) {
            var jsonstr = JSON.stringify(data);
            var jsonobj = JSON.parse(jsonstr);
            if (data != null) {
                var $select = $("#getTipologie").empty();
                $select.append('<option></option>');
                $.each(jsonobj, function (key, value) {
                    var $option = $('<option>');
                    $option.val(value.id).text(value.name);
                    $select.append($option);
                });
               
            }else{
                console.log("No data");
            }
            let optSelezionata = $("#getTipologie option:selected").text();
            $("#paramID").html("<i>"+optSelezionata+"</i>").show().fadeIn().delay(2000);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }

    });

}
    function updateTipologica(idTipologia, nome) {
        console.log("idTipologia: " + idTipologia);
        
        $.ajax({
            type: 'GET',
            // data: data,
            // contentType: 'application/json',
            url: "consultaRapid?idTipologia=" + idTipologia,
            //on success, received data is used as 'data' function input
            success: function (data) {
                //      var jsonstr = JSON.stringify(data);
                //     var jsonobj = JSON.parse(jsonstr);
                //   if (data != null) {
                //     $("#paramID").html("<i>"+nome+"</i>");
               // $('body').html(data);
              // $('body').replaceWith(data);
               var newDoc = document.open("text/html", "replace");
                  newDoc.write(data);
                 newDoc.close();
                $("#paramID").html("<i>" + nome + "</i>").show().fadeIn().delay(2000);
                //    console.log("Risposta" + jsonobj);
                
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

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
                var jsonstr = JSON.stringify(data);
                var jsonobj = JSON.parse(jsonstr);
                if (data != null) {
                    console.log("Risposta" + jsonobj);
                    $("#flash").text("Invio effettuato: " + jsonobj.join(", ")).show() //  .parent()
                        .fadeIn().delay(2000)
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