
function caricaTipologica(){}

Date.prototype.getDateOfISOWeek = function(w, y){
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;

},
Date.prototype.getDateOfISOWeekEnd = function(w, y){
    var simple    = new Date(y, 0, 1 + (w - 1) * 7);
    var simpleEnd = new Date(y, 0, (1 + (w )) * 7);
  
    // da testare
    //simple = new Date(Date.UTC(y, 0, 1 + (w - 1) * 7));
    var dow = simpleEnd.getDay();
    var ISOweekStart = simple;
    var ISOweekEnd = simple;
    var dateend = new Date(simple);
    
    if (dow <= 4){
        //new console.error();
        console.error("Non Gestito")
    }else{
   //     ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        ISOweekEnd.setDate( dateend.getDate() + 6);
     }
    return ISOweekEnd;
},


Date.prototype.getCurrentWeekNumber = function () {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
},
// console.log('The current ISO week number is ' + new Date().getWeekNumber());

Date.prototype.getMeseNameArr = function(numMesi) {
    let mesi = [];
    var labelkey = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
   
    $.each(numMesi, (m,e) =>{
        console.log(e);
        mesi.push(labelkey[e-1]);
    });
    return mesi;
},

Date.prototype.getMeseName = function(numMese) {
   
    var labelkey = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
    return labelkey[numMese-1];
};

Date.prototype.getDayName = function(numDay) {
   
    var labelkey = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
    return labelkey[numDay-1];
};
