function format ( id ) {
    return `<form enctype="multipart/form-data" class="needs-validation" id="form-file_${id}" >
        <input type="hidden" name="id_product" id="id_${id}" value="${id}">
        <div class="card-body py-3">
            <div class="row">
                <div class="col">
                    <div  class="row">
                        <input multiple class="form-control file_compras_${id}" onchange="download_file_compras(${id});" type="file" name="file_compras[]"
                            id="file_compras_${id}">
                            <div class="invalid-feedback">
                                <strong class="msg_file_${id}" id="msg_file_${id}"></strong>
                            </div>
                    </div>
                    <div class="row mt-2">
                        <div id="file-contend" class=" card-body p-3">
                            <div id="list-file_${id}" class="row">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>`
};

$(document).ready(function() {

    
   
    var dt = $('#example').DataTable( {
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        columnDefs: [
            {
                targets: 0,
                data: null,
                orderable: false,
                className: 'details-control',
                defaultContent: ''
              }
        ]
    } );
   
    
    var detailRows = [];
    $('#example tbody').on( 'click', 'tr td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = dt.row( tr );
        var idx = $.inArray( tr.attr('id'), detailRows );
 
        if ( row.child.isShown() ) {
            tr.removeClass( 'details' );
            row.child.hide();
            detailRows.splice( idx, 1 );
        }
        else {
            tr.addClass( 'details' );
            row.child(format(tr.attr('id')) ).show();
            // Add to the 'open' array
            if ( idx === -1 ) {
                detailRows.push( tr.attr('id') );
            }
            list_files_compras(tr.attr('id') );
        }
    } );
    
    // On each draw, loop over the `detailRows` array and show any child rows
    dt.on( 'draw', function () {
        $.each( detailRows, function ( i, id ) {
            $('#'+id+' td.details-control').trigger( 'click' );
        } );
    } );
});