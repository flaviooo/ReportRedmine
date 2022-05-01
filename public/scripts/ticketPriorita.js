$(document).ready(function () {
    var campoSearch = $('#BuyOrders thead tr').children('th').eq(5);
    var title = $('#BuyOrders thead th').eq( $(campoSearch).index() ).text();
    $(campoSearch).html( '<input type="text" placeholder="Search '+title+'" />' );

  var table = $('#BuyOrders').DataTable({
                 "language": {"url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Italian.json" },
                 "lengthMenu": [ 50, 100, 150, 200, 300 ]
    });
table.columns(5).every( function () {
    var that = this;

    $( 'input', this.footer() ).on( 'keyup change', function () {
        that.search( this.value ).draw();
    } );
} );
});