$(document).ready(function () {
    let queryForm = "invioMail";
    $('#send_by_button').click(function (e) {
        e.preventDefault();
        let data = "";
        var listaAutori = [];
        var $item = $('#BuyOrders tr input:checked');
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
            var $selezionati = $('#BuyOrders tr').find(':checked').parents("tr");
            var issuesSelected = [];
            var oggettiIssues = [];
            var giorniTrascorsi = [];
            var obj = new Object();
            $.each($selezionati, (i, e) => {
                var autoreA = $(e).find('td:eq(1)').text();
                obj.autore = autore;
                if (autoreA == autore) {
                    
                    var issues = $(e).find('td:eq(0)').text();
                    issuesSelected.push(issues);
                    
                    var oggettoIssues = $(e).find('td:eq(6)').text();
                    oggettiIssues.push(oggettoIssues);

                    var giornotrascorsi = $(e).find('td:eq(3)').text();
                    giorniTrascorsi.push(giornotrascorsi);
                    // issuesSelected.push(JSON.stringify(issues));
                }
            });
            obj.issues = issuesSelected;
            obj.oggettiIssues = oggettiIssues;
            obj.giorniTrascorsi = giorniTrascorsi;
           // console.log(obj);
           // console.log(JSON.stringify(obj));
           // console.log(JSON.parse(JSON.stringify(obj)));
            dataStruct.push(obj);
            // cambia autore
        });

        console.log("data: "+ dataStruct);
        data = JSON.parse(JSON.stringify(dataStruct));
        console.log("data: "+data);
        
        //multiArray.push([project, ob.push($hoursSum)]);
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
                    console.log("Risposta" + jsonobj)
                };
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
});