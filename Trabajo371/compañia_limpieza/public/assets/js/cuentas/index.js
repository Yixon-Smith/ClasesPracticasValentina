$(document).ready(function(){
  list_cuenta_pagar();
  list_cuenta_cobrar()
  list_pago_recividos_facturas();
  list_compras_pagadas();
  $("#clientes_clie_id,#countries_id").select2();
  // filter_option_facturas_emitidas();
  // filter_option_facturas_pago_recibido();
  // filter_option_cuenta_pagar("code_compra");
  // filter_option_compras_pagadas("code_compra")
  $('#aler_vacio_list').removeClass('show').css("display", "none");

//   $('#miTable').dataTable({
//     "language": {
//         "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
//     },
//     "order": [[ 0, 'desc' ]],
//     dom: 'Bfrtip',
//     "ajax": "data/arrays.txt"
//     // buttons: [
//     //     'copy', 'csv', 'excel', 'pdf', 'print'
//     // ]
// });

$("#select_retencion").select2({
  dropdownParent: $("#myModal")
});

$('#buscar_facturada_emitidas').attr("readonly","readonly");
$('#buscar_pago_recibido').attr("readonly","readonly");
$('#buscar_compras_emitidas').attr("readonly","readonly");
$('#buscar_compras_pagadas').attr("readonly","readonly");

$(".alert_succsess").hide();
$('#box_sin_retenciones').hide();
$('.alert_error').css('display','none');
});


const loader = document.querySelector("#loading");
function displayLoading() {
    loader.classList.add("loader-box");
    // $("#codigo-producto").addClass('list_items');
    // $("#codigo-producto").removeClass('is-valid');
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("loader-box");
    }, 5000);
  }

  // hiding loading
  function hideLoading() {
    loader.classList.remove("loader-box");
  }
function messeg(m,t) {
    if (t=="success") {
        $.notify(
            '<i class="fa fa-bell-o"></i><strong>Excelente</strong> ' +m+
                "",
            {
                type: t,
                allow_dismiss: true,
                delay: 2000,
                showProgressbar: false,
                timer: 300,
            }
        );
        return false;
    }
    $.notify(
        '<i class="fa fa-bell-o"></i><strong>!oops¡</strong> ' +m+
            "",
        {
            type: t,
            allow_dismiss: true,
            delay: 2000,
            showProgressbar: false,
            timer: 300,
        }
    );
}


  $("#view-file-pagar").hide();
  var checkbox_final_pagar = document.getElementById('option-file-pagar');
  checkbox_final_pagar.addEventListener("change", validaCheckboxpagar, false);
  function validaCheckboxpagar()
{
  var checkedc = checkbox_final_pagar.checked;
  console.log(checkedc);
  if(checkedc){
    $("#view-file-pagar").show();
  }else{
    $("#view-file-pagar").hide();
  }
}

$("#view-file-cobrar").hide();
var checkbox_final_cot_cobrar = document.getElementById('option-file-cobrar');
checkbox_final_cot_cobrar.addEventListener("change", validaCheckboxcobrar, false);
function validaCheckboxcobrar()
{
  var checkedc = checkbox_final_cot_cobrar.checked;
  console.log(checkedc);
  if(checkedc){
    $("#view-file-cobrar").show();
  }else{
    $("#view-file-cobrar").hide();
  }
}


$("#view-file-anticipacion").hide();
var option_fle_anticipacion = document.getElementById('option_fle_anticipacion');
option_fle_anticipacion.addEventListener("change", validaCheckboxanticipa, false);
function validaCheckboxanticipa()
{
  var checkedc = option_fle_anticipacion.checked;
  console.log(checkedc);
  if(checkedc){
    $("#view-file-anticipacion").show();
  }else{
    $("#view-file-anticipacion").hide();
  }
}


$("#btn_add_aticipacion").on("click", function (e) {
  const data={
    id:$('#id_a').val(),
    anticipo:$('.anticipo_input').val(),
    optio_cuentas:$('#cuentas_option').val(),
    checket_file:document.getElementById('option_fle_anticipacion').checked,
    url : document.getElementById('url_anticipacion').value,
  }

var formData = new FormData(document.getElementById("form-file-anticipacion"));


if (data.checket_file) {
  console.log(data);

          $.ajax({
                url: data.url,
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function(res){
                msg = JSON.parse(res)
                console.log(msg);



                if (msg.status ==200) {
                  messeg(msg.success,"success");
                  var $el = $('.upd');
                  $el.wrap('<form>').closest('form').get(0).reset();
                  $el.unwrap();
                  $(".modal_anticipacion").modal("hide");
                  $('.upd').removeClass('is-invalid');
                  list_cuenta_cobrar();
                  list_cuenta_pagar();
                }else{
                  messeg(msg.error,"danger");
                  $('.upd').addClass('is-invalid');
                  $('.msg_file').text(msg.error);
                }

            }).fail(function(res){
                console.log(res)
            });
}else{
  const data_P={
    id_a:$('#id_a').val(),
    anticipo:$('.anticipo_input').val(),
    optio_cuentas:$('#cuentas_option').val(),
    checket_file:document.getElementById('option_fle_anticipacion').checked,
    sin_file : true,
  }
var url = "/api/cuentas/store/aticipacion";
  fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data_P), // data can be `string` or {object}!
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
  }).then((res) => res.json())
    .catch((errors) => console.error("Error:", errors))
    .then((response) =>{
          console.log(response);
          if (response.status==200) {
            messeg(response.success,'success');
            $(".modal_anticipacion").modal("hide");
            list_cuenta_cobrar();
            list_cuenta_pagar();
          }else{


          }


      });
}


});


function modal_pagar(id) {
  console.log(id);
  list_rows_compras(id)
 $('#fecha_transaccion').removeClass('is-invalid').removeClass('is-valid');
$('#monto_pagar').removeClass('is-invalid').removeClass('is-valid');


$('#fecha_transaccion').val("");
$('#monto_pagar').val("");

  $('.upd').removeClass('is-invalid');
  $(".modal_pagar").modal("show");
}

function modal_anticipcion(option,id) {
  let val="";
  if (option==2) {
    val="pagar";
  }else if (option==1) {
    val="cobrar";
  }
  $('#cuentas_option').val(val);
  $('#id_a').val(id);
  $(".modal_anticipacion").modal("show");

}

function modal_file_adjunto(id_compra) {
console.log(id_compra);
list_files_compras(id_compra)
  $(".modal_files_compras").modal("show");

}


//-------------------------------------------------------------------------------Cuentas por pagar-------------------------------------------------------------------------------


function filter_option_cuenta_pagar(value) {
    // console.log(value);
    $('#buscar_compras_emitidas').removeAttr("readonly","readonly");
    let f = (value=="")?"code_compra":value;
    input = document.querySelector('#buscar_compras_emitidas');
    input.addEventListener('keyup', e =>{
      // console.log(value+":"+input.value);
      if (input.value=="") {
        if (input.value<=2) {
          list_cuenta_pagar();
          return false;
        }
      }else{
      const sendGetRequest = async () => {
        try {
            const resp = await axios.get("cuentas/buscar_compras_emitidas/"+input.value+"/"+f);
            console.log(resp.data);

            var table = "";
            if (resp.data.data=="") {
                $("#view_vacio_list_compras_emitidas").show();
            }else{

            for (let i = 0; i < resp.data.data.length; i++) {
                table +='<tr class="iten">';
                // 2= ANULADO
                table +='<td>';
                table +='<a href="/compra/'+resp.data.data[i].id_compras+'"><span class="text-secundary">'+resp.data.data[i].code+'</span></a>'
                table +='</td>';


                table +='<td>';
                table +='<div class="media iten-contenid"><div class="media-body"><a href="#"><span>'+resp.data.data[i].nombre_proveedor+'</span></a></div></div>';
                table +='</td>';

                table +='<td>';
                table +=' <a href="javascript:void(0)"><span class="text-secundary">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.data[i].moneda }).format(resp.data.data[i].total)+'</span></a> ';
                table +='</td>';


                if (resp.data.data[i].total_conversion==null) {
                  table +='<td> <div onclick="convercion_pagar('+resp.data.data[i].id_compras+')" class="c-p btn-add-fecha-radicacion convercion_pagar"  title="Porfavor ingrese la conversion para continuar"><span  class="badge badge-danger"><i class="fa fa-money mx-2"></i></i>Pendiente..</span></div></td>';
                }else{

                  if (resp.data.data[i].moneda=="EUR"||resp.data.data[i].moneda=="USD") {
                    table +='<td>';
                    // table +=' <a href="javascript:void(0)"><span class="text-secundary">'+resp.data.data[i].total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')+'</span></a> ';
                    table +=' <a href="javascript:void(0)"  ><span class="text-secundary">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.data[i].total_conversion)+' <i onclick="editar_reconvercion('+resp.data.data[i].id_compras+')" class="fa fa-pencil mx-1"></i></span></a> ';

                    table +='</td>';
                  }else{
                    table +='<td>';
                    // table +=' <a href="javascript:void(0)"><span class="text-secundary">'+resp.data.data[i].total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')+'</span></a> ';
                    table +=' <a href="javascript:void(0)"  ><span class="text-secundary">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.data[i].total_conversion)+'</span></a> ';

                    table +='</td>';
                  }

                }

                // columna de aprobacion
                  table +='<td>';
                  table +='<span>'+resp.data.data[i].fecha_creacion+'</span>';
                  table +='</td>';
                //  end columna de aprobacion

                if (resp.data.data[i].f_v_file_proveedor==null) {
                  table +='<td> <div onclick="convercion_pagar('+resp.data.data[i].id_compras+')" class="c-p btn-add-fecha-radicacion convercion_pagar"  title="Porfavor ingrese la conversion para continuar"><span  class="badge badge-danger">Pendiente..</span></div></td>';
                }else{
                    table +='<td>';
                    table +='<span>'+resp.data.data[i].f_v_file_proveedor+'</span>';
                    table +='</td>';

                }

                table +='<td>';
                  table +='<span title="ver archivos adjuntado"  onclick="modal_file_adjunto('+resp.data.data[i].id_compras+')" class="badge c-p pill-badge-primary m-l-10"><i class="f-z fa fa-file-o"></i></span>';
                  if (resp.data.data[i].file_proveedor) {
                  table +='<span title="ver factura del proveedor"  onclick="showFileproveedor('+resp.data.data[i].id_compras+')" class="badge c-p pill-badge-secondary m-l-10"><i class="f-z fa fa-file-pdf-o"></i></span> <i onclick="editar_file_proveedor('+resp.data.data[i].id_compras+')" class="fa c-p fa-pencil mx-1"></i>';

                  }

                table +='</td>';




                table +='<td>';
                if (!resp.data.data[i].file_proveedor) {
                table +='<button class="btn-option-blue " onclick="modal_facturas_proveedor('+resp.data.data[i].id_compras+')"  title="Subir archivo"><i class="fa fa-upload"></i></button>';

                }

                if (resp.data.data[i].total_conversion==null) {
                  table +='<div onclick="convercion_pagar('+resp.data.data[i].id_compras+')" class="c-p btn-add-fecha-radicacion convercion_pagar"  title="Porfavor ingrese la conversion para continuar"><span  class="badge badge-info">Esta orden de compra esta en '+resp.data.data[i].moneda+'</span></div>';
                }else{
                  table +='<span title="Agrega retenciones aquí"  onclick="modal_retencion_cobrar('+resp.data.data[i].id_compras+',0)" class="badge c-p pill-badge-info m-l-5"><i class="f-z fa fa-percent"></i></span>';
                  if (!resp.data.data[i].anticipo) {
                    table +='<span title="Agregar anticipo aquí" onclick="modal_anticipcion(2,'+resp.data.data[i].id_compras+')" class="badge c-p pill-badge-secondary m-l-5"><i class="f-z  fa fa-hashtag"></i></span>';
                  }else{

                  }


                  table +='<span title="Agrega un abono aquí"  onclick="modal_pagar('+resp.data.data[i].id_compras+')"class="badge c-p pill-badge-primary m-l-5"><i class="f-z fa fa-tag"></i></span>';
                  table +='<a href="/cuentas/detalles/'+resp.data.data[i].id_compras+'/pagar"><span title="ver movimientos"  class="badge c-p pill-badge-warning m-l-5"><i class="f-z fa fa-tasks"></i></span></a>';
                }




                table +='</td>';

                table +='</tr>';

            }



                  var x="";
                for (let d = 0; d < resp.data.links.length; d++) {
                  var r= resp.data.current_page-1;
                  if (resp.data.links[d].url==null) {
                    x+='<li class="page-item previous disabled"><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" >Atras</a></li>';
                    break;
                  }else{
                    x+='<li class="page-item "><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" >Atras</a></li>';
                    break;
                  }
                }
                for (let j = 1; j <= resp.data.last_page; j++) {
                if (resp.data.current_page==j) {
                  x+='<li class="page-item active"><a class="page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                }else{
                  x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                }

                }
                var s= resp.data.current_page+1;

                if (resp.data.current_page>=resp.data.last_page) {
                  x+='<li class="page-item next disabled"><a data-page="" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';

                }else{
                  x+='<li class="page-item next "><a data-page="'+s+'" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';
                }
                $("#view_vacio_list_compras_pagadas").hide();
              }
              $(".page-iten-compras").html(x);
            $("#total_registro_compras_emitidas").text(resp.data.total);
            $("#list_compras_emitidas").html(table);



       $('.page-endorsement').on('click', function () {
        const page = $(this).data( 'page' )
                    console.log(page);
                    console.log(resp.data.last_page);
                    $('.page-link-endorsements').removeClass('active')
                    $('.page-endorsement-'+page).addClass('active')

                    if((page-1) < 1 ){
                        $('.page-link-endorsement-previous').data('page', 1)
                        $('.page-link-endorsement-next').data('page', 2)
                    }else if ((page+1) <= resp.data.last_page ) {
                        $('.page-link-endorsement-next').data('page', page+1)
                        $('.page-link-endorsement-previous').data('page', page-1)
                    }else if((page+1) > resp.data.last_page ){
                        $('.page-link-endorsement-next').data('page', resp.data.last_page)
                        $('.page-link-endorsement-previous').data('page', resp.data.last_page-1)
                    }
                    ist_cuenta_pagar(page);

       });
          } catch (err) {
            // Handle Error Here
            console.log(err);
        }
    };
    sendGetRequest();

    }
    })
  }




  function filter_option_compras_pagadas(value) {
    // console.log(value);
    $('#buscar_compras_pagadas').removeAttr("readonly","readonly");
    let f = (value=="")?"code_compra":value;
    input = document.querySelector('#buscar_compras_pagadas');
    input.addEventListener('keyup', e =>{
      // console.log(value+":"+input.value);
      if (input.value=="") {
        if (input.value<=2) {
          list_compras_pagadas();
          // return false;
        }
      }else{
      const sendGetRequest = async () => {
        try {
            const resp = await axios.get("cuentas/buscar_compras_pagadas/"+input.value+"/"+f);
            console.log(resp.data);

            var table = "";
            if (resp.data.data=="") {
                $("#view_vacio_list_compras_pagadas").show();
            }else{

            for (let i = 0; i < resp.data.data.length; i++) {
              table +='<tr class="iten">';
              // 2= ANULADO
              table +='<td>';
              table +='<a href="/compra/'+resp.data.data[i].id_compras+'"><span class="text-secundary">'+resp.data.data[i].code+'</span></a>'
              table +='</td>';


              table +='<td>';
              table +='<div class="media iten-contenid"><div class="media-body"><a href="#"><span>'+resp.data.data[i].nombre_proveedor+'</span></a></div></div>';
              table +='</td>';

              table +='<td>';
              table +=' <a href="javascript:void(0)"><span class="text-secundary">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.data[i].moneda }).format(resp.data.data[i].total)+'</span></a> ';
              table +='</td>';

              if (resp.data.data[i].total_conversion==null) {
                table +='<td> <div onclick="convercion_pagar('+resp.data.data[i].id_compras+')" class="c-p btn-add-fecha-radicacion convercion_pagar"  title="Porfavor ingrese la conversion para continuar"><span  class="badge badge-danger"><i class="fa fa-money mx-2"></i></i>Pendiente..</span></div></td>';
              }else{

                if (resp.data.data[i].moneda=="EUR"||resp.data.data[i].moneda=="USD") {
                  table +='<td>';
                  // table +=' <a href="javascript:void(0)"><span class="text-secundary">'+resp.data.data[i].total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')+'</span></a> ';
                  table +=' <a href="javascript:void(0)"  ><span class="text-secundary">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.data[i].total_conversion)+' </span></a> ';

                  table +='</td>';
                }else{
                  table +='<td>';
                  // table +=' <a href="javascript:void(0)"><span class="text-secundary">'+resp.data.data[i].total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')+'</span></a> ';
                  table +=' <a href="javascript:void(0)"  ><span class="text-secundary">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.data[i].total_conversion)+'</span></a> ';

                  table +='</td>';
                }

              }

              // columna de aprobacion
                table +='<td>';
                table +='<span>'+resp.data.data[i].fecha_creacion+'</span>';
                table +='</td>';
              //  end columna de aprobacion

              table +='<td>';
                table +='<span title="ver archivo adjuntado "  onclick="modal_file_adjunto('+resp.data.data[i].id_compras+')" class="badge c-p pill-badge-primary m-l-10"><i class="f-z fa fa-file-o"></i></span>';
                if (resp.data.data[i].file_proveedor) {
                  table +='<span title="ver factura del proveedor"  onclick="showFileproveedor('+resp.data.data[i].id_compras+')" class="badge c-p pill-badge-secondary m-l-10"><i class="f-z fa fa-file-pdf-o"></i></span> <i onclick="editar_file_proveedor('+resp.data.data[i].id_compras+')" class="fa c-p fa-pencil mx-1"></i>';

                  }

              table +='</td>';




              table +='<td>';
                // if (!resp.data.data[i].anticipo) {
                //   table +='<span title="ver archivo adjuntado del cliente" onclick="modal_anticipcion(2,'+resp.data.data[i].id_compras+')" class="badge c-p pill-badge-secondary m-l-5"><i class="f-z  fa fa-hashtag"></i></span>';
                // }else{

                // }


                // table +='<span title="ver archivo adjuntado del cliente"  onclick="modal_pagar('+resp.data.data[i].id_compras+')"class="badge c-p pill-badge-primary m-l-5"><i class="f-z fa fa-tag"></i></span>';
                table +='<a href="/cuentas/detalles/'+resp.data.data[i].id_compras+'/pagar"><span title="ver archivo"  class="badge c-p pill-badge-warning m-l-5"><i class="f-z fa fa-tasks"></i></span></a>';
                if (!resp.data.data[i].file_proveedor) {
                  table +='<button class="btn-option-blue " onclick="modal_facturas_proveedor('+resp.data.data[i].id_compras+')"  title="Subir archivo"><i class="fa fa-upload"></i></button>';

                  }


              table +='</td>';

              table +='</tr>';

            }



                  var x="";
                for (let d = 0; d < resp.data.links.length; d++) {
                  var r= resp.data.current_page-1;
                  if (resp.data.links[d].url==null) {
                    x+='<li class="page-item previous disabled"><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" >Atras</a></li>';
                    break;
                  }else{
                    x+='<li class="page-item "><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" >Atras</a></li>';
                    break;
                  }
                }
                for (let j = 1; j <= resp.data.last_page; j++) {
                if (resp.data.current_page==j) {
                  x+='<li class="page-item active"><a class="page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                }else{
                  x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                }

                }
                var s= resp.data.current_page+1;

                if (resp.data.current_page>=resp.data.last_page) {
                  x+='<li class="page-item next disabled"><a data-page="" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';

                }else{
                  x+='<li class="page-item next "><a data-page="'+s+'" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';
                }
                $("#view_vacio_list_compras_pagadas").hide();
              }
              $(".page-iten-informe").html(x);
              $("#total_registros_compras_pagadas").text(resp.data.total);
              $("#list_compras_pagadas").html(table);




       $('.page-endorsement').on('click', function () {
        const page = $(this).data( 'page' )
                    console.log(page);
                    console.log(resp.data.last_page);
                    $('.page-link-endorsements').removeClass('active')
                    $('.page-endorsement-'+page).addClass('active')

                    if((page-1) < 1 ){
                        $('.page-link-endorsement-previous').data('page', 1)
                        $('.page-link-endorsement-next').data('page', 2)
                    }else if ((page+1) <= resp.data.last_page ) {
                        $('.page-link-endorsement-next').data('page', page+1)
                        $('.page-link-endorsement-previous').data('page', page-1)
                    }else if((page+1) > resp.data.last_page ){
                        $('.page-link-endorsement-next').data('page', resp.data.last_page)
                        $('.page-link-endorsement-previous').data('page', resp.data.last_page-1)
                    }
                    list_compras_pagadas(page);

       });
          } catch (err) {
            // Handle Error Here
            console.log(err);
        }
    };
    sendGetRequest();

    }
    })
  }


function list_rows_compras(id) {

    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/get_compras_row/" + id);
            console.log(resp.data);
            var table = "";
          let n=0,suma=0,sum_iva=0;
              for (let i = 0; i < resp.data.compras_rows.length; i++) {
                n++;
                suma+=resp.data.compras_rows[i].total;
                sum_iva+=resp.data.compras_rows[i].iva;
              table +='<tr class="iten">';
              // 2= ANULADO
              table +='<td>';
              table +='<span >'+n+'</span>'
              table +='</td>';


              table +='<td>';
              table +='<div class="media iten-contenid"><div class="media-body"><a href="#"><span>'+resp.data.compras_rows[i].name+' | '+resp.data.compras_rows[i].description+'</span></a></div></div>';
              table +='</td>';

              table +='<td>';
              table +='<span class="class="h6"">'+resp.data.compras_rows[i].cantidad+'</span> ';
              table +='</td>';


              // columna de aprobacion
                table +='<td>';
                table +='<span class="h6">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.compras[0].moneda }).format(resp.data.compras_rows[i].valor_unitario)+'</span>';
                table +='</td>';
              //  end columna de aprobacion

              table +='<td>';
                table +='<span class="h6" >'+Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.compras[0].moneda }).format(resp.data.compras_rows[i].total)+'</span>';


              table +='</td>';


              table +='</tr>';


            }
            console.log(suma);
            $('#sub_total1').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.compras[0].moneda }).format(suma));
            // $('#iva_pagar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sum_iva));
            $('#valor_iva').text(sum_iva+"%");
            $('#total_general_pagar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.compras[0].moneda }).format(resp.data.compras[0].total));
            $('#input_monto_general_p').val(resp.data.compras[0].total);
            $('#moneda_p').val(resp.data.compras[0].moneda);

            if (resp.data.compras[0].moneda=='COP') {
              $('#view_box_convercion').hide();
              $('#view_box_convercion1').hide();
            }else{
              $('#view_box_convercion').show();
              $('#view_box_convercion1').show();
            }

            $('#valor_trm_pagar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.compras[0].trm));
            $('#total_general_convertido_pagar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.compras[0].total_conversion));


            let verif_antici=(resp.data.anticipo_p=="")?0:resp.data.anticipo_p[0].anticipo;
            console.log(verif_antici);
            let verif_monto_pend=(resp.data.monto_pendiente_p=="")?0:resp.data.monto_pendiente_p[0].saldo_pendiente;

            let verif_antici_valor=(resp.data.anticipo_p=="")?0:resp.data.anticipo_p[0].valor_anticipo;

            $('#valor_anticipo_pagar').text(verif_antici+"%");
            $('#valor_anticipo_p').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(verif_antici_valor));

            $('#valor_monto_pendiente').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(verif_monto_pend));
            $('#input_valor_pendiente_p').val(verif_monto_pend);
            $('#id').val(resp.data.compras[0].id);
            $("#list_intens_pagar").html(table);
            cpf_p(0)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}


function list_cuenta_pagar(num="") {
  var valor = (num=="")?1:num;
//   displayLoading();
  const sendGetRequest = async () => {
        try {
            const resp = await axios.get("get_cuentas_por_pagar?page="+valor);
            console.log(resp.data)
            // hideLoading();
            var table = "";
            if (resp.data.data=="") {
              $("#view_vacio_list_compras_emitidas").show();
          }else{
            for (let i = 0; i < resp.data.data.length; i++) {
              table +='<tr class="iten">';
              // 2= ANULADO
              table +='<td>';
              table +='<a href="/compra/'+resp.data.data[i].id_compras+'"><span class="text-secundary">'+resp.data.data[i].code+'</span></a>'
              table +='</td>';


              table +='<td>';
              table +='<div class="media iten-contenid"><div class="media-body"><a href="#"><span>'+resp.data.data[i].nombre_proveedor+'</span></a></div></div>';
              table +='</td>';

              table +='<td>';
              table +=' <a href="javascript:void(0)"><span class="text-secundary">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.data[i].moneda }).format(resp.data.data[i].total)+'</span></a> ';
              table +='</td>';


              if (resp.data.data[i].total_conversion==null) {
                table +='<td> <div onclick="convercion_pagar('+resp.data.data[i].id_compras+')" class="c-p btn-add-fecha-radicacion convercion_pagar"  title="Porfavor ingrese la conversion para continuar"><span  class="badge badge-danger"><i class="fa fa-money mx-2"></i></i>Pendiente..</span></div></td>';
              }else{

                if (resp.data.data[i].moneda=="EUR"||resp.data.data[i].moneda=="USD") {
                  table +='<td>';
                  // table +=' <a href="javascript:void(0)"><span class="text-secundary">'+resp.data.data[i].total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')+'</span></a> ';
                  table +=' <a href="javascript:void(0)"  ><span class="text-secundary">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.data[i].total_conversion)+' <i onclick="editar_reconvercion('+resp.data.data[i].id_compras+')" class="fa fa-pencil mx-1"></i></span></a> ';

                  table +='</td>';
                }else{
                  table +='<td>';
                  // table +=' <a href="javascript:void(0)"><span class="text-secundary">'+resp.data.data[i].total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')+'</span></a> ';
                  table +=' <a href="javascript:void(0)"  ><span class="text-secundary">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.data[i].total_conversion)+'</span></a> ';

                  table +='</td>';
                }

              }

              // columna de aprobacion
                table +='<td>';
                table +='<span>'+resp.data.data[i].fecha_creacion+'</span>';
                table +='</td>';
              //  end columna de aprobacion

              if (resp.data.data[i].f_v_file_proveedor==null) {
                table +='<td> <div onclick="convercion_pagar('+resp.data.data[i].id_compras+')" class="c-p btn-add-fecha-radicacion convercion_pagar"  title="Porfavor ingrese la conversion para continuar"><span  class="badge badge-danger">Pendiente..</span></div></td>';
              }else{
                  table +='<td>';
                  table +='<span>'+resp.data.data[i].f_v_file_proveedor+'</span>';
                  table +='</td>';

              }

              table +='<td>';
                table +='<span title="ver archivos adjuntado"  onclick="modal_file_adjunto('+resp.data.data[i].id_compras+')" class="badge c-p pill-badge-primary m-l-10"><i class="f-z fa fa-file-o"></i></span>';
                if (resp.data.data[i].file_proveedor) {
                table +='<span title="ver factura del proveedor"  onclick="showFileproveedor('+resp.data.data[i].id_compras+')" class="badge c-p pill-badge-secondary m-l-10"><i class="f-z fa fa-file-pdf-o"></i></span> <i onclick="editar_file_proveedor('+resp.data.data[i].id_compras+')" class="fa c-p fa-pencil mx-1"></i>';

                }

              table +='</td>';




              table +='<td>';
              if (!resp.data.data[i].file_proveedor) {
              table +='<button class="btn-option-blue " onclick="modal_facturas_proveedor('+resp.data.data[i].id_compras+')"  title="Subir archivo"><i class="fa fa-upload"></i></button>';

              }

              if (resp.data.data[i].total_conversion==null) {
                table +='<div onclick="convercion_pagar('+resp.data.data[i].id_compras+')" class="c-p btn-add-fecha-radicacion convercion_pagar"  title="Porfavor ingrese la conversion para continuar"><span  class="badge badge-info">Esta orden de compra esta en '+resp.data.data[i].moneda+'</span></div>';
              }else{
                table +='<span title="Agrega retenciones aquí"  onclick="modal_retencion_cobrar('+resp.data.data[i].id_compras+',0)" class="badge c-p pill-badge-info m-l-5"><i class="f-z fa fa-percent"></i></span>';
                if (!resp.data.data[i].anticipo) {
                  table +='<span title="Agregar anticipo aquí" onclick="modal_anticipcion(2,'+resp.data.data[i].id_compras+')" class="badge c-p pill-badge-secondary m-l-5"><i class="f-z  fa fa-hashtag"></i></span>';
                }else{

                }


                table +='<span title="Agrega un abono aquí"  onclick="modal_pagar('+resp.data.data[i].id_compras+')"class="badge c-p pill-badge-primary m-l-5"><i class="f-z fa fa-tag"></i></span>';
                table +='<a href="/cuentas/detalles/'+resp.data.data[i].id_compras+'/pagar"><span title="ver movimientos"  class="badge c-p pill-badge-warning m-l-5"><i class="f-z fa fa-tasks"></i></span></a>';
              }




              table +='</td>';

              table +='</tr>';


            }

            $("#view_vacio_list_compras_emitidas").hide();
          }

                  var x="";
                for (let d = 0; d < resp.data.links.length; d++) {
                  var r= resp.data.current_page-1;
                  if (resp.data.links[d].url==null) {
                    x+='<li class="page-item previous disabled"><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" >Atras</a></li>';
                    break;
                  }else{
                    x+='<li class="page-item "><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" >Atras</a></li>';
                    break;
                  }
                }
                for (let j = 1; j <= resp.data.last_page; j++) {
                if (resp.data.current_page==j) {
                  x+='<li class="page-item active"><a class="page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                }else{
                  x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                }

                }
                var s= resp.data.current_page+1;

                if (resp.data.current_page>=resp.data.last_page) {
                  x+='<li class="page-item next disabled"><a data-page="" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';

                }else{
                  x+='<li class="page-item next "><a data-page="'+s+'" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';
                }
            $(".page-iten-compras").html(x);
            $("#total_registro_compras_emitidas").text(resp.data.total);
            $("#list_compras_emitidas").html(table);



       $('.page-endorsement').on('click', function () {
        const page = $(this).data( 'page' )
                    console.log(page);
                    console.log(resp.data.last_page);
                    $('.page-link-endorsements').removeClass('active')
                    $('.page-endorsement-'+page).addClass('active')

                    if((page-1) < 1 ){
                        $('.page-link-endorsement-previous').data('page', 1)
                        $('.page-link-endorsement-next').data('page', 2)
                    }else if ((page+1) <= resp.data.last_page ) {
                        $('.page-link-endorsement-next').data('page', page+1)
                        $('.page-link-endorsement-previous').data('page', page-1)
                    }else if((page+1) > resp.data.last_page ){
                        $('.page-link-endorsement-next').data('page', resp.data.last_page)
                        $('.page-link-endorsement-previous').data('page', resp.data.last_page-1)
                    }
                    list_cuenta_pagar(page);

       });
          } catch (err) {
            // Handle Error Here
            console.log(err);
        }
    };
    sendGetRequest();
}

function editar_file_proveedor(id) {
    const sendGetRequest = async () => {
      try {
          const resp = await axios.get("/detalle-file-proveedor/"+id);
          console.log(resp.data);
          $('#link_file').html('<h6 title="'+resp.data.name_file+'" >Archivo: <a target="_blank" href="/'+resp.data.url+'" class="text-success">'+resp.data.name_file+'</a></h6>')
          $('#name_file_proveedor').text(resp.data.name_file)
          $('#id_file_proveedor_edit').val(resp.data.id);
          $('#fecha_vencimiento_ed').val(resp.data.fecha_vencimiento);

          $('.modal_add_file_proveedor_edit').modal('show');
      } catch (err) {
          // Handle Error Here
      }
  };
  sendGetRequest();
}

function showFileproveedor(id){
  console.log(id);
  const sendGetRequest = async () => {
      try {
          const resp = await axios.get("/view-file-proveedor/"+id);
          // console.log(resp.data.response.url);
          window.open("/"+resp.data.response.url,'_blank');

      } catch (err) {
          // Handle Error Here
      }
  };
  sendGetRequest();


}

function modal_facturas_proveedor(id) {
  console.log(id);
  $('#id_compras_modal_file_proveedor').val(id);
  $('.modal_add_file_proveedor').modal('show');
}

$('#btn-guardar-file-proveedor').on('click',function(){
  var url = document.getElementById('url_store_file_proveedor');
  var formData = new FormData(document.getElementById("form-file-proveedor"));
  $('#btn_loader').addClass('fa fa-spin fa-spinner');
  $.ajax({
      url: url.value,
      type: "post",
      dataType: "html",
      data: formData,
      cache: false,
      contentType: false,
      processData: false
  }).done(function(res){
      msg = JSON.parse(res)
      console.log(msg);
      if (msg.status ==200) {
        $('.file-proveedor').val(null);
        $('.modal_add_file_proveedor').modal('hide');
        list_cuenta_pagar();
        $('.file-proveedor').removeClass('is-invalid');
        $('#fecha_vencimiento').removeClass('is-invalid');
      }else{
          if (msg.f) {
            $('#fecha_vencimiento').addClass('is-invalid');
            $('.file-proveedor').removeClass('is-invalid');
          }
        $('.file-proveedor').addClass('is-invalid');
        $('#msg_file').text(msg.error);
        $('#btn_loader').removeClass('fa fa-spin fa-spinner');
      }

  }).fail(function(res){
      console.log(res)
  });
});

$('#btn-guardar-file-proveedor_edit').on('click',function(){
  var url = document.getElementById('url_store_file_proveedor-edit');
  var formData = new FormData(document.getElementById("form-file-proveedor_edit"));
  $('#btn_loader').addClass('fa fa-spin fa-spinner');
  $.ajax({
      url: url.value,
      type: "post",
      dataType: "html",
      data: formData,
      cache: false,
      contentType: false,
      processData: false
  }).done(function(res){
      msg = JSON.parse(res)
      console.log(msg);
      if (msg.status ==200) {
        $('.file-proveedor').val(null);
        $('.modal_add_file_proveedor_edit').modal('hide');
        list_cuenta_pagar();
        $('.file-proveedor').removeClass('is-invalid');
        $('#fecha_vencimiento_ed').removeClass('is-invalid');
      }else{
        if (msg.f) {
            $('#fecha_vencimiento_ed').addClass('is-invalid');
            $('.file-proveedor').removeClass('is-invalid');
          }
        $('.file-proveedor').addClass('is-invalid');
        $('#msg_file').text(msg.error);
        $('#btn_loader').removeClass('fa fa-spin fa-spinner');
      }

  }).fail(function(res){
      console.log(res)
  });
});

$('#btn-cancelar-file-proveedor-edit').on('click',function(){
  $('.modal_add_file_proveedor_edit').modal('hide');
  $('.file-proveedor').removeClass('is-invalid');

});


$('#btn-cancelar-file-proveedor').on('click',function(){
  $('.modal_add_file_proveedor').modal('hide');
  $('.file-proveedor').removeClass('is-invalid');

});

function convercion_pagar(id_compras) {
  $('#trm_valor').val("");
  $('#Fecha_convercion').val("");
  $('#total_convertido').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: "COP"}).format(0))
  get_compras(id_compras);
  $('.modal_conversion_pagar').modal('show');

  console.log(id_compras);
}

function editar_reconvercion(id_compras) {
  const sendGetRequest = async () => {
    try {
        const resp = await axios.get("/compras/all/"+id_compras);
        // console.log(resp.data);
        $('#total_convercion_pagar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.moneda }).format(resp.data.total));
        $('#total_convercion_p').val(resp.data.total);

        $('#total_convertido').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: "COP"}).format(resp.data.total_conversion));
        $('#total_convertido_p').val(resp.data.total_conversion);
        $('#trm_valor').val(resp.data.trm);
        $('#id_compras').val(resp.data.id);
        $('#Fecha_convercion').val(resp.data.fecha_convercion);
        $('.modal_conversion_pagar').modal('show');
        moneda_comp(resp.data.moneda);
    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();

}


function get_compras(id) {
  const sendGetRequest = async () => {
    try {
        const resp = await axios.get("/compras/all/"+id);
        // console.log(resp.data);
        $('#total_convercion_pagar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.moneda }).format(resp.data.total))
        $('#total_convercion_p').val(resp.data.total);
        $('#id_compras').val(id);

      switch (resp.data.moneda) {
        case "USD":
          moneda_comp(resp.data.moneda)
          $('#mostrar_moneda').text(resp.data.moneda);
          break;
        case "EUR":

          moneda_comp(resp.data.moneda)
          $('#mostrar_moneda').text(resp.data.moneda);
          break;

        default:
          break;
      }

    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();
}

// function moneda_usd(mond) {

//       input = document.querySelector('#trm_valor');
//       input.addEventListener('keyup', e =>{
//           let total_g= $('#total_convercion_p').val();
//           let trm = 0;
//           if (input.value=="") {
//               trm=1;
//               $('#sub_total1_inmpu').val(total_g);
//           }else{
//               trm=input.value;
//           }

//           let valor_usd= parseFloat(total_g)*parseFloat(trm);
//           console.log("usd:"+valor_usd);
//           $('#total_convertido').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(valor_usd))
//           $('#total_convertido_p').val(valor_usd);

//       });
//       $('#type_moneda').val(mond);
// }

// function moneda_eur(mond) {

//   input = document.querySelector('#trm_valor');
//   input.addEventListener('keyup', e =>{
//       let total_g= $('#total_convercion_p').val();
//       let trm = 0;
//       if (input.value=="") {
//           trm=1;
//           $('#sub_total1_inmpu').val(total_g);
//       }else{
//           trm=input.value;
//       }

//       let valor_usd= parseFloat(total_g)*parseFloat(trm);
//       console.log("usd:"+valor_usd);
//       $('#total_convertido').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(valor_usd))

//   });
//   $('#type_moneda').val(mond);
// }

function moneda_comp(mond) {
  input = document.querySelector('#trm_valor');
  input.addEventListener('keyup', e =>{
      let total_g= $('#total_convercion_p').val();
      let trm = 0;
      if (input.value=="") {
          trm=0;
      }else{
          trm=input.value;
      }

      let valor_usd= parseFloat(total_g)*parseFloat(trm);
      console.log("usd:"+valor_usd);
      $('#total_convertido').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: "COP"}).format(valor_usd))
      $('#total_convertido_p').val(valor_usd);

  });
  $('#type_moneda').val(mond);
}

$("#btn_convertir_p").on("click", function (e) {
  const data = {
    id_compras:$('#id_compras').val(),
    fecha_comvercion:$('#Fecha_convercion').val(),
    monto_convercion:$('#total_convertido_p').val(),
    trm:$('#trm_valor').val()
  }

  // console.log(data);
  if (data.fecha_comvercion=="") {
    $('#Fecha_convercion').addClass('is-invalid');
  }else{
    $('#Fecha_convercion').removeClass('is-invalid').addClass('is-valid');
  }

  if (data.trm=="") {
    $('#trm_valor').addClass('is-invalid');
  }else{
    $('#trm_valor').removeClass('is-invalid').addClass('is-valid');
  }

  if (data.trm==""||data.fecha_comvercion=="") {
    return false;
  }

  const sendGetRequest = async () => {
    try {
        const resp = await axios.put("/compras/update_convercion",data);
        console.log(resp.data);
        if (resp.data.status==200) {
          $('.modal_conversion_pagar').modal('hide');
          $('#trm_valor').val("");
          $('#id_compras').val("");
          $('#Fecha_convercion').val("");
          $('#total_convertido').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: "COP"}).format(0))
          list_cuenta_pagar();
          $('#trm_valor').removeClass('is-invalid').removeClass('is-valid');
          $('#Fecha_convercion').removeClass('is-invalid').removeClass('is-valid');
        }


    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();


});



function list_compras_pagadas(num="") {
  var valor = (num=="")?1:num;
  const sendGetRequest = async () => {
        try {
            const resp = await axios.get("get_compras_pagadas?page="+valor);
            console.log(resp.data)
            var table = "";
            if (resp.data.data=="") {
              $("#view_vacio_list_compras_pagadas").show();
          }else{
            for (let i = 0; i < resp.data.data.length; i++) {
              table +='<tr class="iten">';
              // 2= ANULADO
              table +='<td>';
              table +='<a href="/compra/'+resp.data.data[i].id_compras+'"><span class="text-secundary">'+resp.data.data[i].code+'</span></a>'
              table +='</td>';


              table +='<td>';
              table +='<div class="media iten-contenid"><div class="media-body"><a href="#"><span>'+resp.data.data[i].nombre_proveedor+'</span></a></div></div>';
              table +='</td>';

              table +='<td>';
              table +=' <a href="javascript:void(0)"><span class="text-secundary">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.data[i].moneda }).format(resp.data.data[i].total)+'</span></a> ';
              table +='</td>';

              if (resp.data.data[i].total_conversion==null) {
                table +='<td> <div onclick="convercion_pagar('+resp.data.data[i].id_compras+')" class="c-p btn-add-fecha-radicacion convercion_pagar"  title="Porfavor ingrese la conversion para continuar"><span  class="badge badge-danger"><i class="fa fa-money mx-2"></i></i>Pendiente..</span></div></td>';
              }else{

                if (resp.data.data[i].moneda=="EUR"||resp.data.data[i].moneda=="USD") {
                  table +='<td>';
                  // table +=' <a href="javascript:void(0)"><span class="text-secundary">'+resp.data.data[i].total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')+'</span></a> ';
                  table +=' <a href="javascript:void(0)"  ><span class="text-secundary">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.data[i].total_conversion)+' </span></a> ';

                  table +='</td>';
                }else{
                  table +='<td>';
                  // table +=' <a href="javascript:void(0)"><span class="text-secundary">'+resp.data.data[i].total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')+'</span></a> ';
                  table +=' <a href="javascript:void(0)"  ><span class="text-secundary">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.data[i].total_conversion)+'</span></a> ';

                  table +='</td>';
                }

              }

              // columna de aprobacion
                table +='<td>';
                table +='<span>'+resp.data.data[i].fecha_creacion+'</span>';
                table +='</td>';
              //  end columna de aprobacion

              table +='<td>';
                table +='<span title="ver archivo adjuntado "  onclick="modal_file_adjunto('+resp.data.data[i].id_compras+')" class="badge c-p pill-badge-primary m-l-10"><i class="f-z fa fa-file-o"></i></span>';
                if (resp.data.data[i].file_proveedor) {
                  table +='<span title="ver factura del proveedor"  onclick="showFileproveedor('+resp.data.data[i].id_compras+')" class="badge c-p pill-badge-secondary m-l-10"><i class="f-z fa fa-file-pdf-o"></i></span> <i onclick="editar_file_proveedor('+resp.data.data[i].id_compras+')" class="fa c-p fa-pencil mx-1"></i>';

                  }

              table +='</td>';




              table +='<td>';
                // if (!resp.data.data[i].anticipo) {
                //   table +='<span title="ver archivo adjuntado del cliente" onclick="modal_anticipcion(2,'+resp.data.data[i].id_compras+')" class="badge c-p pill-badge-secondary m-l-5"><i class="f-z  fa fa-hashtag"></i></span>';
                // }else{

                // }


                // table +='<span title="ver archivo adjuntado del cliente"  onclick="modal_pagar('+resp.data.data[i].id_compras+')"class="badge c-p pill-badge-primary m-l-5"><i class="f-z fa fa-tag"></i></span>';
                table +='<a href="/cuentas/detalles/'+resp.data.data[i].id_compras+'/pagar"><span title="ver archivo"  class="badge c-p pill-badge-warning m-l-5"><i class="f-z fa fa-tasks"></i></span></a>';
                if (!resp.data.data[i].file_proveedor) {
                  table +='<button class="btn-option-blue " onclick="modal_facturas_proveedor('+resp.data.data[i].id_compras+')"  title="Subir archivo"><i class="fa fa-upload"></i></button>';

                  }


              table +='</td>';

              table +='</tr>';


            }

            $("#view_vacio_list_compras_pagadas").hide();
          }

                  var x="";
                for (let d = 0; d < resp.data.links.length; d++) {
                  var r= resp.data.current_page-1;
                  if (resp.data.links[d].url==null) {
                    x+='<li class="page-item previous disabled"><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" >Atras</a></li>';
                    break;
                  }else{
                    x+='<li class="page-item "><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" >Atras</a></li>';
                    break;
                  }
                }
                for (let j = 1; j <= resp.data.last_page; j++) {
                if (resp.data.current_page==j) {
                  x+='<li class="page-item active"><a class="page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                }else{
                  x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                }

                }
                var s= resp.data.current_page+1;

                if (resp.data.current_page>=resp.data.last_page) {
                  x+='<li class="page-item next disabled"><a data-page="" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';

                }else{
                  x+='<li class="page-item next "><a data-page="'+s+'" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';
                }
            $(".page-iten-informe").html(x);
            $("#total_registros_compras_pagadas").text(resp.data.total);
            $("#list_compras_pagadas").html(table);



       $('.page-endorsement').on('click', function () {
        const page = $(this).data( 'page' )
                    console.log(page);
                    console.log(resp.data.last_page);
                    $('.page-link-endorsements').removeClass('active')
                    $('.page-endorsement-'+page).addClass('active')

                    if((page-1) < 1 ){
                        $('.page-link-endorsement-previous').data('page', 1)
                        $('.page-link-endorsement-next').data('page', 2)
                    }else if ((page+1) <= resp.data.last_page ) {
                        $('.page-link-endorsement-next').data('page', page+1)
                        $('.page-link-endorsement-previous').data('page', page-1)
                    }else if((page+1) > resp.data.last_page ){
                        $('.page-link-endorsement-next').data('page', resp.data.last_page)
                        $('.page-link-endorsement-previous').data('page', resp.data.last_page-1)
                    }
                    list_compras_pagadas(page);

       });
          } catch (err) {
            // Handle Error Here
            console.log(err);
        }
    };
    sendGetRequest();
}



$("#add_resumen_pagar").on("click", function (e) {
  const data={
    fecha_transaccion:$('#fecha_transaccion').val(),
    monto_pagar:$('#monto_pagar').val(),
    checket_file:document.getElementById('option-file-pagar').checked,
    url : document.getElementById('url_resumen').value,
  }
  // console.log(data);
if (data.fecha_transaccion=="") {
  $('#fecha_transaccion').addClass('is-invalid');
}else{
  $('#fecha_transaccion').removeClass('is-invalid').addClass('is-valid');
}
if (data.monto_pagar=="") {
  $('#monto_pagar').addClass('is-invalid');
}else{
  $('#monto_pagar').removeClass('is-invalid').addClass('is-valid');
}

 if (data.monto_pagar==""||data.fecha_transaccion=="") {
  // $('#monto_pagar').addClass('is-invalid');
  // $('#fecha_transaccion').addClass('is-invalid');
   return false;
 }
var formData = new FormData(document.getElementById("form-resumen-pagar"));
$('#monto_pagar').removeClass('is-invalid');
$('#fecha_transaccion').removeClass('is-invalid');
  if (data.checket_file) {
            $.ajax({
                url: data.url,
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function(res){
                msg = JSON.parse(res)

                if (msg.status ==200) {
                  messeg(msg.success,"success");
                  $('#fecha_transaccion').val("");
                  $('#fecha_transaccion_r_c').val("");
                  $('#monto_pagar_r_c').val("");
                  $('#monto_pagar').val("");
                  $("#file").val(null);
                  $(".modal_cobrar").modal("hide");
                  $(".modal_pagar").modal("hide");
                  document.getElementById('option-file-pagar').onchecked
                  $('.upd').removeClass('is-invalid');
                  list_cuenta_cobrar();
                  list_cuenta_pagar();
                }else{

                  if (msg.verfi) {
                    $('.msg_monto').text(msg.error+" : "+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(msg.monto));
                    $('#monto_pagar').addClass('is-invalid');
                    console.log(msg.error);
                  }

                  if (msg.vacio_file) {
                    messeg(msg.error,"danger");
                    $('.upd').addClass('is-invalid');
                    $('.msg_file').text(msg.error);
                    $('#monto_pagar').removeClass('is-valid').addClass('is-invalid');
                  }else{
                    $('.upd').removeClass('is-invalid').addClass('is-valid');
                    $('.msg_file').text("");
                  }
                  console.log(msg);
                  // messeg(msg.error,"danger");
                  // $('.upd').addClass('is-invalid');
                  // $('.msg_file').text(msg.error);
                }

            }).fail(function(res){
                console.log(res)
            });
  }else{

    const data_P={
    id:$('#id').val(),
    fecha_transaccion:$('#fecha_transaccion').val(),
    monto_pagar:$('#monto_pagar').val(),
    modulo:$('#modulo').val(),
    sin_file : true,
  }
  console.log(data_P);
var url = "/api/cuentas/store/resumen_cobrar";
  fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data_P), // data can be `string` or {object}!
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
  }).then((res) => res.json())
    .catch((errors) => console.error("Error:", errors))
    .then((response) =>{
      console.log(response);
          if (response.status==200) {
            messeg(response.success,'success');
            $('#fecha_transaccion').val("");
                  $('#fecha_transaccion_r_c').val("");
                  $('#monto_pagar_r_c').val("");
                  $('#monto_pagar').val("");
            $("#file").val(null);
            list_cuenta_pagar();

            $(".modal_cobrar").modal("hide");
             $(".modal_pagar").modal("hide");
             document.getElementById('option-file-pagar').onchecked
              $('.upd').removeClass('is-invalid');
            list_cuenta_cobrar();
          }else{
            if (response.verfi) {
              $('.msg_monto').text(response.error);
              $('#monto_pagar').addClass('is-invalid');
              console.log(response.error);
            }else{
              messeg(response.error,"danger");
              $('.upd').addClass('is-invalid');
              $('.msg_file').text(response.error);
            }
            console.log(response.error);
            $('#monto_pagar').addClass('is-invalid');
            $('.msg_monto').text(response.error+" "+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(response.monto));

          }


      });
  }

});




function list_files_compras(compra_orden) {
    let id = compra_orden;

    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/files_fomr_compras/" + id);

            // console.log(resp.data);
            var table = "";
            if (resp.data=="") {
                $('#file-contend').addClass('bg-grei-p');
                table +=' <div id="view_vacio"  class="text-center alert-vacio w-100">Sin archivos</div>';
            }else{
                $('#file-contend').removeClass('bg-grei-p');
                // console.log(resp.data);
             for (let i = 0; i < resp.data.length; i++) {
                 let  exten= resp.data[i].extenc;
                 let ex="";
                 switch (exten) {
                     case 'pdf':
                     ex="fa fa-file-pdf-o";
                         break;
                    case 'docx':
                        ex="fa fa-file-word-o"
                        break;
                    case 'doc':
                        ex="fa fa-file-word-o"
                        break;
                    case 'xlsm':
                        ex="fa fa-file-excel-o"
                        break;
                    case 'jpeg':
                        ex="fa fa-file-picture-o"
                        break;
                    case 'jpg':
                        ex="fa fa-file-picture-o"
                        break;
                    case 'png':
                        ex="fa fa-file-picture-o"
                        break;
                    case 'pptx':
                        ex="fa fa-file-powerpoint-o"
                        break;
                    case 'txt':
                        ex="fa fa-file-text-o"
                        break;

                     default:
                     ex="fa fa-file-o"
                         break;
                 }
                 table += '<div  class="col-3 my-3 px-0 text-center col-md-2">';
                table += '<span    title="'+resp.data[i].name+'" class="files-view"><i onclick="showFile('+resp.data[i].id+')" class="'+ex+'"></i></span>';
                 table += '<div class="mt-2 c-p" onclick="showFile('+resp.data[i].id+')" ><span class="badge badge-light text-dark">Ver</span></div>';
                table += '</div>';
             }
            }
             $('#list-fileh').html(table);

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

function showFile(id){
    // console.log(id);
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/view-file-compras/"+id);
            // console.log(resp.data.response.url);
            window.open("/"+resp.data.response.url,'_blank');

        } catch (err) {
            // Handle Error Here
        }
    };
    sendGetRequest();


}



//-------------------------------------------------------------------------------End Cuentas por pagar-------------------------------------------------------------------------------


//-------------------------------------------------------------------------------Cuentas por cobrar-------------------------------------------------------------------------------


function modal_cobrar(id) {
  console.log(id);
  list_rows_facturas(id)
  $('#monto_pagar_r_c').removeClass('is-invalid').removeClass('is-valid');
  $('#fecha_transaccion_r_c').removeClass('is-invalid').removeClass('is-valid');
  $('#monto_pagar_r_c').val("");
  $('#fecha_transaccion_r_c').val("");
  // buscar_resumen_cobrar(id)
  $('.upd').removeClass('is-invalid');
  $(".modal_cobrar").modal("show");
}

// function buscar_resumen_cobrar(id) {
//   const sendGetRequest = async () => {
//         try {
//           const resp = await axios.get("/get_monto_resumen_cobrar/" + id);
//           console.log(resp.data);

//         } catch (err) {
//             // Handle Error Here
//             console.error(err);
//         }
//     };
//     sendGetRequest();
// }


$("#btn_add_retencion_cobrar").on("click", function (e) {
  const data = {
    id: $('#id').val(),
    option_mold: $('#cuentas_option_retenc').val(),
    retencion:$('.list_retencion').val()
  }
  // console.log(data);
if (data.retencion=="null") {
  $('#aler_vacio_list').addClass('show').css("display", "block");

}else{
  swal({
    title: "¡CUIDADO!",
    text:"¿Está seguro que deseas agregar esta retención?.\r\nNo podrás revertir los cambios.",
    icon: "info",
    buttons:{
        cancel: "Cancelar",
        catch: {
            text: "Aprobar",
        },
    },
    dangerMode: false,
  }).then((willDelete) => {
        if (willDelete) {
          var url = "/api/cuentas/store/retencion/aplicar";
          fetch(url, {
              method: "POST", // or 'PUT'
              body: JSON.stringify(data), // data can be `string` or {object}!
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
              },
          }).then((res) => res.json())
            .catch((errors) => console.error("Error:", errors))
            .then((response) =>{
                  // console.log(response);
                  if (response.status==200) {
                    messeg(response.success,'success');
                    $('#aler_vacio_list').removeClass('show').css("display", "none");
                    $(".modal_retencion_cobrar").modal("hide");
                    list_cuenta_cobrar();
                  }else{

                    $('#aler_vacio_list').removeClass('show').css("display", "none");
                    if (response.status==404) {
                      $(".alert_error").addClass('show');
                      $('.alert_error').css('display','block');
                      const h = setInterval(function () {
                        let i=0;
                        i++
                        $(".alert_error").removeClass('show');
                        $('.alert_error').css('display','none');
                        if (i=1) {
                          clearInterval(h);
                          }
                       }, 6000);
                    }


                  }


              });

        }else{
          $(".modal_retencion_cobrar").modal("hide");
          $('#aler_vacio_list').removeClass('show');
        }
    })
}


});

$(".cerrar_anticipacion").on("click", function (e) {
  $('#aler_vacio_list').removeClass('show').css("display", "none");
});
function traer_retencio(id) {
  console.log(id);
}


$("#btn-cerrar-cobrar").on("click", function (e) {
  $('#fecha_transaccion').val("");
  $('#fecha_transaccion_r_c').val("");
  $('#monto_pagar_r_c').val("");
 $('#monto_pagar').val("");
  $("#file").val(null);
  $(".modal_cobrar").modal("hide");
 $('.upd').removeClass('is-invalid');
});


$("#rellenar_input").on("click", function (e) {
  let sume_gener=$('#input_monto_general').val();
  let valo_pendi= $('#input_valor_pendiente').val();

  if (valo_pendi==""|| valo_pendi==0) {

    $('#view_monto_cobrar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: $('#moneda_c').val() }).format(sume_gener));
    $('#monto_pagar_r_c').val(sume_gener);
  }else{
    $('#view_monto_cobrar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: $('#moneda_c').val() }).format(valo_pendi));

    $('#monto_pagar_r_c').val(valo_pendi);

  }



});

$("#rellenar_input_p").on("click", function (e) {
  let sume_gener=$('#input_monto_general_p').val();
  let valo_pendi= $('#input_valor_pendiente_p').val();

  if (valo_pendi==""|| valo_pendi==0) {

    $('#view_monto_pagar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency:'COP'}).format(sume_gener));
    $('#monto_pagar').val(sume_gener);
  }else{
    $('#view_monto_pagar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(valo_pendi));

    $('#monto_pagar').val(valo_pendi);

  }



});

$("#add_resumen_cobrar").on("click", function (e) {
  const data={
    fecha_transaccion:$('#fecha_transaccion_r_c').val(),
    monto_pagar:$('#monto_pagar_r_c').val(),
    checket_file:document.getElementById('option-file-cobrar').checked,
    url : document.getElementById('url_resumen_cobrar').value,
  }
  // console.log(data);

  if (data.monto_pagar=="") {
    $('#monto_pagar_r_c').addClass('is-invalid');
    $('.msg_monto_c').text("campo es requerido");
  }else{
    $('#monto_pagar_r_c').removeClass('is-invalid').addClass('is-valid');
  }

  if (data.fecha_transaccion=="") {
    $('#fecha_transaccion_r_c').addClass('is-invalid');
  }else{
    $('#fecha_transaccion_r_c').removeClass('is-invalid').addClass('is-valid');
  }
  if (data.monto_pagar==""||data.fecha_transaccion=="") {
    $('.msg_file').text("");
    $('.msg_monto_c').text("");
    // $('#fecha_transaccion_r_c').addClass('is-invalid');
    // $('#monto_pagar_r_c').addClass('is-invalid');
     return false;
   }
var formData = new FormData(document.getElementById("form-resumen-cobrar"));
$('#fecha_transaccion_r_c').removeClass('is-invalid');
$('#monto_pagar_r_c').removeClass('is-invalid');
  if (data.checket_file) {
            $.ajax({
                url: data.url,
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function(res){
                msg = JSON.parse(res)

                if (msg.status ==200) {
                  messeg(msg.success,"success");
                  $('#fecha_transaccion').val("");
                  $('#fecha_transaccion_r_c').val("");
                  $('#monto_pagar_r_c').val("");
                  $('#monto_pagar').val("");
                  $("#file").val(null);
                  $(".modal_cobrar").modal("hide");
                  $('.upd').removeClass('is-invalid');

                  list_cuenta_cobrar();
                }else{

                  if (msg.verfi) {
                    $('.msg_monto_c').text(msg.error+" : "+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(msg.monto));
                    $('#monto_pagar_r_c').removeClass('is-valid').addClass('is-invalid');
                    // console.log(msg.error);
                  }
                  if (msg.vacio_file) {
                    messeg(msg.error,"danger");
                    $('.upd').addClass('is-invalid');
                    $('.msg_file').text(msg.error);
                    $('#monto_pagar_r_c').removeClass('is-valid').removeClass('is-invalid');
                  }else{
                    $('.upd').removeClass('is-invalid').addClass('is-valid');
                    $('.msg_file').text("");
                  }

                }

            }).fail(function(res){
                console.log(res)
            });
  }else{

    const data_P={
    id:$('#id_r_c').val(),
    fecha_transaccion:$('#fecha_transaccion_r_c').val(),
    monto_pagar:$('#monto_pagar_r_c').val(),
    sin_file : true,
  }
  // console.log(data_P);
  var url = "/api/cuentas/store/resumen/cobrar";
  fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data_P), // data can be `string` or {object}!
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
  }).then((res) => res.json())
    .catch((errors) => console.error("Error:", errors))
    .then((response) =>{

          if (response.status==200) {
            messeg(response.success,'success');
            $('#fecha_transaccion').val("");
                  $('#fecha_transaccion_r_c').val("");
                  $('#monto_pagar_r_c').val("");
                  $('#monto_pagar').val("");
            $("#file").val(null);
            $(".modal_cobrar").modal("hide");
              $('.upd').removeClass('is-invalid');
            list_cuenta_cobrar();
          }else if (response.status==404){
            // console.log(response.monto);

            if (response.verfi) {
              $('.msg_monto_c').text(response.error+" : "+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(response.monto));
              $('#monto_pagar_r_c').addClass('is-invalid');
              // console.log(response);
            }else{
              messeg(response.error,"danger");
              $('.upd').addClass('is-invalid');
              $('.msg_file').text(response.error);
            }

            // $('#monto_pagar_r_c').addClass('is-invalid');
            // $('.msg_monto').text(response.error+" "+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(response.monto));

          }


      });
  }

});

function modal_retencion_cobrar(id,option) {
  let h = "";
  if (option==1) {
    h="cobrar";
  }else{
    h="pagar";
  }
  get_retenciones_all();
  $('#cuentas_option_retenc').val(h);
  $('#id').val(id);
  get_retencion_list(id,h);
  $(".modal_retencion_cobrar").modal("show");
}

function get_retenciones_all() {
  const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/get_retenciones");
            //  console.log(resp.data);
            var cadena = "";
            cadena += '<option value="null">Seleccione una retención</option>';
            for (let i = 0; i < resp.data.length; i++) {
                // console.log(resp.data)
                cadena +=
                    '<option value="' +
                    resp.data[i].ret_id +
                    '">' +
                    resp.data[i].ret_concepto+
                    " | "+parseFloat(resp.data[i].porcentaje)+"%</option>";
            }
            $(".list_retencion").html(cadena);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

function get_retencion_list(id,option) {
  const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/cuentas/get_retenciones/"+id+"/"+option);
             console.log(resp.data);
             var cadena = "";
            var n=0;
             if (resp.data=="") {
               $('#ocultar_box_retencion_emitidas').hide();
             }else{
              for (let i = 0; i < resp.data.length; i++) {
                n++;
                // console.log(resp.data)


            cadena += '<div class="list-group-item list-group-item-action flex-column align-items-start"  data-bs-original-title="" title="">';
            cadena += '<div class="row">';
            cadena += '<div class="col-12 col-md-12">';
            cadena += '<p class="mb-1">'+n+' - '+resp.data[i].ret_concepto+' | '+resp.data[i].porcentaje+'%</p>';
            cadena += '</div>';
            // cadena += '<div  onclick="quitar_retencion('+resp.data[i].id+')" class="col-12 col-md-1 div-delete-reten">';
            // cadena += '<span><i class="fa fa-trash-o"></i></span>';
            // cadena += '</div>';
            cadena += '</div>';
            cadena += '</div>';

            }
            $('#ocultar_box_retencion_emitidas').show();

             }

            $(".list_retencion_emitidas").html(cadena);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

//eliminar rentencion

// function quitar_retencion(id) {
//   // console.log(id);
//   let option = $('#cuentas_option_retenc').val();
//   const sendGetRequest = async () => {
//       try {
//           const resp = await axios.delete("/quitar_retencion/"+id+"/"+option);
//           console.log(resp.data);
//           // if (resp.data.status==200) {
//           //     list_files_facturas();
//           //     messeg(resp.data.success,'success');
//           // }

//       } catch (err) {
//           // Handle Error Here
//       }
//   };
//   sendGetRequest();
// }


function modal_retencion_add(id,option) {
  let h = "";
  if (option==1) {
    h="cobrar";
  }else{
    h="pagar";
  }
  // get_retenciones_all();
  // $('#cuentas_option_retenc').val(h);
  $('#id').val(id);
  buscar_retenciones(id);
  $(".modal_retencion").modal("show");
}

function buscar_retenciones(id) {
  const sendGetRequest = async () => {
    try {
        const resp = await axios.get("/buscar_rentenciones/"+id);
        console.log(resp.data);
        if (resp.data.r_iva) {
          $('#box_rete_iva').hide();
        }else{
          $('#box_rete_iva').show();
        }

        if (resp.data.r_fuente) {
          $('#box_rete_fuente').hide();
        }else{
          $('#box_rete_fuente').show();
        }

        if (resp.data.r_ica) {
          $('#box_rete_ica').hide();
        }else{
          $('#box_rete_ica').show();
        }

        if (resp.data.r_iva&&resp.data.r_fuente&&resp.data.r_ica) {

          $('#box_sin_retenciones').show();
        }else{
          $('#box_sin_retenciones').hide();
        }

    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();
}
$(".cerrar_anticipacion_cobrar").on("click", function (e) {
  $('#rete_iva').val(" ");
  $('#rete_fuente').val(" ");
  $('#rete_ica').val(" ");
});

$("#btn_add_retencion_factura").on("click", function (e) {
  const data={
    id:$('#id').val(),
    rete_iva: $('#rete_iva').val(),
    rete_fuente:$('#rete_fuente').val(),
    rete_ica:$('#rete_ica').val()
  }

  console.log(data);
  // var url = "/api/cuentas/store/retenciones_facturas";
  // fetch(url, {
  //     method: "POST", // or 'PUT'
  //     body: JSON.stringify(data), // data can be `string` or {object}!
  //     headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //     },
  // }).then((res) => res.json())
  //   .catch((errors) => console.error("Error:", errors))
  //   .then((response) =>{
  //        console.log(response);
  //         if (response.status==200) {
  //           messeg(response.success,'success');
  //           $('#rete_iva').val(" ");
  //           $('#rete_fuente').val(" ");
  //           $('#rete_ica').val(" ");
  //           $('.modal_retencion').modal('hide');
  //           list_cuenta_cobrar();
  //         }


  //     });

});

function verifi_porcent(valor,input="",btn="",sm_error="") {
  console.log(valor);
  if (valor<0||valor>100) {
    $('#'+input).addClass('is-invalid');
    $('#'+sm_error).text("Error, el porcentaje es de 0% a 100%.")
    $('#'+btn).hide(100);
    // return false;
  }else if(valor.length>5){
    $('#'+input).addClass('is-invalid');
    $('#'+sm_error).text("Error, Solo se aceptan 4 caracteres.")
    $('#'+btn).hide(100);
  }else{
    $('#'+input).removeClass('is-invalid').addClass('is-valid');
    $('#'+btn).show(100);
  }

  if (valor.length<1) {
    $('#'+input).removeClass('is-invalid').removeClass('is-valid');
  }

}

function soloNumeros(e){
  tecla = (document.all) ? e.keyCode : e.which;
//Tecla de retroceso para borrar, siempre la permite
if (tecla==8){
  return true;
}
if (tecla==13){
  return true;
}
// Patron de entrada, en este caso solo acepta numeros
  patron =/[0-9.]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}

// agregar rete iva
$("#btn_rete_iva").on("click", function (e) {
  const data={
    id:$('#id').val(),
    rete_iva: $('#rete_iva').val(),
    rete_fuente:0,
    rete_ica:0
  }
  var url = "/api/cuentas/store/retenciones_facturas";
  fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
  }).then((res) => res.json())
    .catch((errors) => console.error("Error:", errors))
    .then((response) =>{
         console.log(response);
          if (response.status==200) {
            messeg(response.success,'success');
            $('#box_rete_iva').hide();
            $(".alert_succsess").show();
            buscar_retenciones(data.id);

            const h = setInterval(function () {
              let i=0;
              i++
              $(".alert_succsess").hide();
              if (i=1) {
                clearInterval(h);
                }
             }, 6000);
             $(".alert_error").removeClass('show');
          }else if(response.status==404){
            messeg(response.error,'danger');
            $(".alert_error").addClass('show');
            $('.alert_error').css('display','block');
            const h = setInterval(function () {
              let i=0;
              i++
              $(".alert_error").removeClass('show');
              $('.alert_error').css('display','none');
              if (i=1) {
                clearInterval(h);
                }
             }, 6000);

          }


      });

});

//agregar rete fuenta
$("#btn_rete_fuente").on("click", function (e) {
  const data={
    id:$('#id').val(),
    rete_iva:0,
    rete_fuente:$('#rete_fuente').val(),
    rete_ica:0
  }
  var url = "/api/cuentas/store/retenciones_facturas";
  fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
  }).then((res) => res.json())
    .catch((errors) => console.error("Error:", errors))
    .then((response) =>{
         console.log(response);
          if (response.status==200) {
            messeg(response.success,'success');
            $('#box_rete_fuente').hide();
            buscar_retenciones(data.id);
            $(".alert_succsess").show();
            let i=0;
            const h = setInterval(function () {
              i++
              $(".alert_succsess").hide();
              if (i=1) {
                clearInterval(h);
                }
             }, 6000);

          }else if(response.status==404){
            messeg(response.error,'danger');
            $(".alert_error").addClass('show');
            $('.alert_error').css('display','block');
            const h = setInterval(function () {
              let i=0;
              i++
              $(".alert_error").removeClass('show');
              $('.alert_error').css('display','none');
              if (i=1) {
                clearInterval(h);
                }
             }, 6000);
          }


      });

});

//agregar tete ica
$("#btn_rete_ica").on("click", function (e) {
  const data={
    id:$('#id').val(),
    rete_iva:0,
    rete_fuente:0,
    rete_ica:$('#rete_ica').val()
  }
  var url = "/api/cuentas/store/retenciones_facturas";
  fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
  }).then((res) => res.json())
    .catch((errors) => console.error("Error:", errors))
    .then((response) =>{
         console.log(response);
          if (response.status==200) {
            messeg(response.success,'success');
            $('#box_rete_ica').hide();
            $(".alert_succsess").show();
            buscar_retenciones(data.id);
            let i=0;
            const h = setInterval(function () {
              i++
              $(".alert_succsess").hide();
              if (i=1) {
                clearInterval(h);
                }
             }, 6000);

          }else if(response.status==404){
            messeg(response.error,'danger');
            $(".alert_error").addClass('show');
            $('.alert_error').css('display','block');
            const h = setInterval(function () {
              let i=0;
              i++
              $(".alert_error").removeClass('show');
              $('.alert_error').css('display','none');
              if (i=1) {
                clearInterval(h);
                }
             }, 6000);
          }


      });

});




function list_rows_facturas(id) {

    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/get_factureas_rows/" + id);
            // console.log(resp.data);
            var table = "";
          let n=0,suma=0,suma_gen=0;
              for (let i = 0; i < resp.data.apus.length; i++) {
                n++;
                suma= parseInt(resp.data.apus[i].cantidad)*resp.data.apus[i].tmpapu_suma_general;
                suma_gen+=suma;
              table +='<tr class="iten">';
              // 2= ANULADO
              table +='<td>';
              table +='<span >'+n+'</span>'
              table +='</td>';


              table +='<td>';
              table +='<div class="media iten-contenid"><div class="media-body"><a href="#"><span>'+resp.data.apus[i].tmpapu_descripcion+'</span></a></div></div>';
              table +='</td>';

              table +='<td>';
              table +='<span class="class="h6"">'+resp.data.apus[i].cantidad+'</span> ';
              table +='</td>';


              // columna de aprobacion
                table +='<td>';
                table +='<span class="h6">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.apus[i].tmpapu_suma_general)+'</span>';
                table +='</td>';
              //  end columna de aprobacion

              table +='<td>';
                table +='<span class="h6" >'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(suma)+'</span>';


              table +='</td>';


              table +='</tr>';


            }
            // console.log(suma_gen);
            console.log();
            $('#sub_total_cobrar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.facturas[0].moneda }).format(suma_gen));
            let iv = (resp.data.facturas[0].iva==null)?0:resp.data.facturas[0].iva;
            $('#iva_compra').text(iv+"%");
            $('#valor_iva_cobrar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.facturas[0].moneda }).format(resp.data.facturas[0].valor_iva));

            let t= parseFloat(resp.data.facturas[0].total_general)
            // $('#total_general_pagar_cobrar').text(resp.data.facturas[0].moneda+" "+t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            $('#total_general_pagar_cobrar').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.facturas[0].moneda }).format(t));
            $('#input_monto_general').val(t);
            $('#moneda_c').val(resp.data.facturas[0].moneda);
            let verif_antici=(resp.data.anticipo=="")?0:resp.data.anticipo[0].anticipo;
            // console.log(verif_antici);
            let verif_monto_pend=(resp.data.monto_pendiente=="")?0:resp.data.monto_pendiente[0].saldo_pendiente;

            let verif_antici_valor=(resp.data.anticipo=="")?0:resp.data.anticipo[0].valor_anticipo;

            $('#valor_anticipo').text(verif_antici+"%");
            $('#valor_anticipo_monto').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.facturas[0].moneda }).format(verif_antici_valor));

            $('#valor_pendiente').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.facturas[0].moneda }).format(verif_monto_pend));
            $('#input_valor_pendiente').val(verif_monto_pend);
            $("#list_intens_cobrar").html(table);
            $('#id_r_c').val(resp.data.facturas[0].id);
            cpf(0);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

function list_cuenta_cobrar(num="") {
  var valor = (num=="")?1:num;
  displayLoading();
  const sendGetRequest = async () => {
        try {
            const resp = await axios.get("get_cuentas_por_cobrar?page="+valor);
            // console.log(resp.data)
            hideLoading();
            var table = "";
            if (resp.data.data=="") {
              $("#view_vacio_list_cuentas_por_cobrar").show();
          }else{
            for (let i = 0; i < resp.data.data.length; i++) {
              table +='<tr class="iten">';
              // 2= ANULADO
              table +='<td>';
              table +='<a href="/facturas/'+resp.data.data[i].id_facturas+'/show"><span class="text-secundary">'+resp.data.data[i].code+'</span></a>'
              table +='</td>';


              table +='<td>';
              table +='<span>'+resp.data.data[i].fecha_creacion+'</span>';
              table +='</td>';

              if (resp.data.data[i].fecha_radicacion==null) {
                table +='<td> <div class="c-p btn-add-fecha-radicacion"  title="Porfavor agrega fecha de radicación"><span  class="badge badge-danger"><i class="fa fa-bell-o mx-2"></i>Pendiente..</span></div></td>';
               }else{
                table +='<td> <span class="text-success">'+resp.data.data[i].fecha_radicacion+' | '+resp.data.data[i].hora_radicacion+'</span></td>';

               }              // columna de aprobacion
                table +='<td>';
                table +='<span>'+Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.data[i].moneda }).format(resp.data.data[i].total_general)+'</span>';
                table +='</td>';

              table +='<td>';

                table +='<span title="Agregar retenciones "  onclick="modal_retencion_add('+resp.data.data[i].id_facturas+',1)" class="badge c-p pill-badge-info m-l-5"><i class="f-z fa fa-percent"></i></span>';

                if (!resp.data.data[i].anticipo) {
                  table +='<span title="Agregar anticipo " onclick="modal_anticipcion(1,'+resp.data.data[i].id_facturas+')"  class="badge c-p pill-badge-secondary m-l-5"><i class="f-z fa fa-hashtag"></i></span>';
                }else{

                }


                table +='<span title="Agregar abono" onclick="modal_cobrar('+resp.data.data[i].id_cotizacion+')"  class="badge c-p pill-badge-primary m-l-5"><i class="f-z fa fa-tag"></i></span>';
                table +='<a href="/cuentas/detalles/'+resp.data.data[i].id_facturas+'/cobrar"><span title="Ver detalles de movimientos"  class="badge c-p pill-badge-warning m-l-5"><i class="f-z fa fa-tasks"></i></span></a>';

              table +='</td>';

              table +='</tr>';


            }

            $("#view_vacio_list_cuentas_por_cobrar").hide();
          }

                  var x="";
                for (let d = 0; d < resp.data.links.length; d++) {
                  var r= resp.data.current_page-1;
                  if (resp.data.links[d].url==null) {
                    x+='<li class="page-item previous disabled"><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" >Atras</a></li>';
                    break;
                  }else{
                    x+='<li class="page-item "><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" >Atras</a></li>';
                    break;
                  }
                }
                for (let j = 1; j <= resp.data.last_page; j++) {
                if (resp.data.current_page==j) {
                  x+='<li class="page-item active"><a class="page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                }else{
                  x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                }

                }
                var s= resp.data.current_page+1;

                if (resp.data.current_page>=resp.data.last_page) {
                  x+='<li class="page-item next disabled"><a data-page="" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';

                }else{
                  x+='<li class="page-item next "><a data-page="'+s+'" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';
                }
            $(".page-iten-facturas").html(x);
            $("#total_registros_list_cobrar").text(resp.data.total);
            $("#list_cuentas_por_cobrar").html(table);



       $('.page-endorsement').on('click', function () {
        const page = $(this).data( 'page' )
                    console.log(page);
                    console.log(resp.data.last_page);
                    $('.page-link-endorsements').removeClass('active')
                    $('.page-endorsement-'+page).addClass('active')

                    if((page-1) < 1 ){
                        $('.page-link-endorsement-previous').data('page', 1)
                        $('.page-link-endorsement-next').data('page', 2)
                    }else if ((page+1) <= resp.data.last_page ) {
                        $('.page-link-endorsement-next').data('page', page+1)
                        $('.page-link-endorsement-previous').data('page', page-1)
                    }else if((page+1) > resp.data.last_page ){
                        $('.page-link-endorsement-next').data('page', resp.data.last_page)
                        $('.page-link-endorsement-previous').data('page', resp.data.last_page-1)
                    }
                    list_cuenta_cobrar(page);

       });
          } catch (err) {
            // Handle Error Here
            console.log(err);
        }
    };
    sendGetRequest();
}



function list_pago_recividos_facturas(num="") {
  var valor = (num=="")?1:num;
  const sendGetRequest = async () => {
        try {
            const resp = await axios.get("get_pagos_recibido?page="+valor);
            // console.log(resp.data)
            var table = "";
            if (resp.data.data=="") {
              $("#view_vacio_list_pago_recibido").show();
          }else{
            for (let i = 0; i < resp.data.data.length; i++) {
              table +='<tr class="iten">';
              // 2= ANULADO
              table +='<td>';
              table +='<a href="/facturas/'+resp.data.data[i].id_facturas+'/show"><span class="text-secundary">'+resp.data.data[i].code+'</span></a>'
              table +='</td>';


              table +='<td>';
              table +='<span>'+resp.data.data[i].fecha_creacion+'</span>';
              table +='</td>';

              if (resp.data.data[i].fecha_radicacion==null) {
                table +='<td> <div class="c-p btn-add-fecha-radicacion"  title="Porfavor agrega fecha de radicación"><span  class="badge badge-danger"><i class="fa fa-bell-o mx-2"></i>Pendiente..</span></div></td>';
               }else{
                table +='<td> <span class="text-success">'+resp.data.data[i].fecha_radicacion+' | '+resp.data.data[i].hora_radicacion+'</span></td>';

               }              // columna de aprobacion
                table +='<td>';
                table +='<span>'+Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.data[i].moneda }).format(resp.data.data[i].total_general)+'</span>';
                table +='</td>';

              table +='<td>';
                // if (!resp.data.data[i].anticipo) {
                //   table +='<span title="ver archivo adjuntado del cliente" onclick="modal_anticipcion(1,'+resp.data.data[i].id_facturas+')"  class="badge c-p pill-badge-secondary m-l-5"><i class="f-z fa fa-hashtag"></i></span>';
                // }else{

                // }


                // table +='<span title="ver archivo adjuntado del cliente" onclick="modal_cobrar('+resp.data.data[i].id_cotizacion+')"  class="badge c-p pill-badge-primary m-l-5"><i class="f-z fa fa-tag"></i></span>';
                table +='<a href="/cuentas/detalles/'+resp.data.data[i].id_facturas+'/cobrar"><span title="ver archivo"  class="badge c-p pill-badge-warning m-l-5"><i class="f-z fa fa-tasks"></i></span></a>';

              table +='</td>';

              table +='</tr>';


            }

            $("#view_vacio_list_pago_recibido").hide();
          }

                  var x="";
                for (let d = 0; d < resp.data.links.length; d++) {
                  var r= resp.data.current_page-1;
                  if (resp.data.links[d].url==null) {
                    x+='<li class="page-item previous disabled"><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" >Atras</a></li>';
                    break;
                  }else{
                    x+='<li class="page-item "><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" >Atras</a></li>';
                    break;
                  }
                }
                for (let j = 1; j <= resp.data.last_page; j++) {
                if (resp.data.current_page==j) {
                  x+='<li class="page-item active"><a class="page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                }else{
                  x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                }

                }
                var s= resp.data.current_page+1;

                if (resp.data.current_page>=resp.data.last_page) {
                  x+='<li class="page-item next disabled"><a data-page="" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';

                }else{
                  x+='<li class="page-item next "><a data-page="'+s+'" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';
                }
            $(".page-iten-facturas-pagadas").html(x);
            $("#total_registros_facturas_emi").text(resp.data.total);
            $("#list_pago_recivido").html(table);



       $('.page-endorsement').on('click', function () {
        const page = $(this).data( 'page' )
                    console.log(page);
                    console.log(resp.data.last_page);
                    $('.page-link-endorsements').removeClass('active')
                    $('.page-endorsement-'+page).addClass('active')

                    if((page-1) < 1 ){
                        $('.page-link-endorsement-previous').data('page', 1)
                        $('.page-link-endorsement-next').data('page', 2)
                    }else if ((page+1) <= resp.data.last_page ) {
                        $('.page-link-endorsement-next').data('page', page+1)
                        $('.page-link-endorsement-previous').data('page', page-1)
                    }else if((page+1) > resp.data.last_page ){
                        $('.page-link-endorsement-next').data('page', resp.data.last_page)
                        $('.page-link-endorsement-previous').data('page', resp.data.last_page-1)
                    }
                    list_pago_recividos_facturas(page);

       });
          } catch (err) {
            // Handle Error Here
            console.log(err);
        }
    };
    sendGetRequest();
}





function filter_option_facturas_pago_recibido(value="") {
    // console.log(value);
    $('#buscar_pago_recibido').removeAttr("readonly","readonly");
    let f = (value=="")?"code_factura":value;
    input = document.getElementById('buscar_pago_recibido');
    input.addEventListener('keyup', e =>{
      // console.log(value+":"+input.value);
      if (input.value=="") {
        if (input.value<=2) {
          list_pago_recividos_facturas();
          // return false;
        }
      }else{
      const sendGetRequest = async () => {
        try {
            const resp = await axios.get("cuentas/buscar_facturas_pagos_recibido/"+input.value+"/"+f);
            console.log(resp.data);

            var table = "";
            if (resp.data.data=="") {
                $("#view_vacio_list_pago_recibido").show();
            }else{

            for (let i = 0; i < resp.data.data.length; i++) {

                table +='<tr class="iten">';
                // 2= ANULADO
                table +='<td>';
                table +='<a href="/facturas/'+resp.data.data[i].id_facturas+'/show"><span class="text-secundary">'+resp.data.data[i].code+'</span></a>'
                table +='</td>';


                table +='<td>';
                table +='<span>'+resp.data.data[i].fecha_creacion+'</span>';
                table +='</td>';

                if (resp.data.data[i].fecha_radicacion==null) {
                  table +='<td> <div class="c-p btn-add-fecha-radicacion"  title="Porfavor agrega fecha de radicación"><span  class="badge badge-danger"><i class="fa fa-bell-o mx-2"></i>Pendiente..</span></div></td>';
                 }else{
                  table +='<td> <span class="text-success">'+resp.data.data[i].fecha_radicacion+' | '+resp.data.data[i].hora_radicacion+'</span></td>';

                 }              // columna de aprobacion
                  table +='<td>';
                  table +='<span>'+Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.data[i].moneda }).format(resp.data.data[i].total_general)+'</span>';
                  table +='</td>';

                table +='<td>';
                  // if (!resp.data.data[i].anticipo) {
                  //   table +='<span title="ver archivo adjuntado del cliente" onclick="modal_anticipcion(1,'+resp.data.data[i].id_facturas+')"  class="badge c-p pill-badge-secondary m-l-5"><i class="f-z fa fa-hashtag"></i></span>';
                  // }else{

                  // }


                  // table +='<span title="ver archivo adjuntado del cliente" onclick="modal_cobrar('+resp.data.data[i].id_cotizacion+')"  class="badge c-p pill-badge-primary m-l-5"><i class="f-z fa fa-tag"></i></span>';
                  table +='<a href="/cuentas/detalles/'+resp.data.data[i].id_facturas+'/cobrar"><span title="ver archivo "  class="badge c-p pill-badge-warning m-l-5"><i class="f-z fa fa-tasks"></i></span></a>';

                table +='</td>';

                table +='</tr>';
            }



                  var x="";
                for (let d = 0; d < resp.data.links.length; d++) {
                  var r= resp.data.current_page-1;
                  if (resp.data.links[d].url==null) {
                    x+='<li class="page-item previous disabled"><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" >Atras</a></li>';
                    break;
                  }else{
                    x+='<li class="page-item "><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" >Atras</a></li>';
                    break;
                  }
                }
                for (let j = 1; j <= resp.data.last_page; j++) {
                if (resp.data.current_page==j) {
                  x+='<li class="page-item active"><a class="page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                }else{
                  x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                }

                }
                var s= resp.data.current_page+1;

                if (resp.data.current_page>=resp.data.last_page) {
                  x+='<li class="page-item next disabled"><a data-page="" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';

                }else{
                  x+='<li class="page-item next "><a data-page="'+s+'" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';
                }
                $("#view_vacio_list_pago_recibido").hide();
              }
              $(".page-iten-facturas-pagadas").html(x);
              $("#total_registros_facturas_emi").text(resp.data.total);
              $("#list_pago_recivido").html(table);



       $('.page-endorsement').on('click', function () {
        const page = $(this).data( 'page' )
                    console.log(page);
                    console.log(resp.data.last_page);
                    $('.page-link-endorsements').removeClass('active')
                    $('.page-endorsement-'+page).addClass('active')

                    if((page-1) < 1 ){
                        $('.page-link-endorsement-previous').data('page', 1)
                        $('.page-link-endorsement-next').data('page', 2)
                    }else if ((page+1) <= resp.data.last_page ) {
                        $('.page-link-endorsement-next').data('page', page+1)
                        $('.page-link-endorsement-previous').data('page', page-1)
                    }else if((page+1) > resp.data.last_page ){
                        $('.page-link-endorsement-next').data('page', resp.data.last_page)
                        $('.page-link-endorsement-previous').data('page', resp.data.last_page-1)
                    }
                    list_pago_recividos_facturas(page);

       });
          } catch (err) {
            // Handle Error Here
            console.log(err);
        }
    };
    sendGetRequest();

    }
    })
  }


  function filter_option_facturas_emitidas(value) {
    // console.log(value);

    let f = (value=="")?"code_factura":value;
    input = document.getElementById('buscar_facturada_emitidas');
    $('#buscar_facturada_emitidas').removeAttr("readonly","readonly");
    input.addEventListener('keyup', e =>{
      if (input.value=="") {
        return false;
      }else{
        const sendGetRequest = async () => {
          try {
              const resp = await axios.get("cuentas/buscar_facturas_emitidas/"+input.value+"/"+f);
              console.log(resp.data);

              var table = "";
              if (resp.data.data=="") {
                  $("#view_vacio_list_cuentas_por_cobrar").show();
              }else{

              for (let i = 0; i < resp.data.data.length; i++) {
                  table +='<tr class="iten">';
                  // 2= ANULADO
                  table +='<td>';
                  table +='<a href="/facturas/'+resp.data.data[i].id_facturas+'/show"><span class="text-secundary">'+resp.data.data[i].code+'</span></a>'
                  table +='</td>';


                  table +='<td>';
                  table +='<span>'+resp.data.data[i].fecha_creacion+'</span>';
                  table +='</td>';

                  if (resp.data.data[i].fecha_radicacion==null) {
                    table +='<td> <div class="c-p btn-add-fecha-radicacion"  title="Porfavor agrega fecha de radicación"><span  class="badge badge-danger"><i class="fa fa-bell-o mx-2"></i>Pendiente..</span></div></td>';
                   }else{
                    table +='<td> <span class="text-success">'+resp.data.data[i].fecha_radicacion+' | '+resp.data.data[i].hora_radicacion+'</span></td>';

                   }              // columna de aprobacion
                    table +='<td>';
                    table +='<span>'+Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data.data[i].moneda }).format(resp.data.data[i].total_general)+'</span>';
                    table +='</td>';

                  table +='<td>';

                    table +='<span title="Agregar retenciones "  onclick="modal_retencion_add('+resp.data.data[i].id_facturas+',1)" class="badge c-p pill-badge-info m-l-5"><i class="f-z fa fa-percent"></i></span>';

                    if (!resp.data.data[i].anticipo) {
                      table +='<span title="Agregar anticipo " onclick="modal_anticipcion(1,'+resp.data.data[i].id_facturas+')"  class="badge c-p pill-badge-secondary m-l-5"><i class="f-z fa fa-hashtag"></i></span>';
                    }else{

                    }


                    table +='<span title="Agregar un abono" onclick="modal_cobrar('+resp.data.data[i].id_cotizacion+')"  class="badge c-p pill-badge-primary m-l-5"><i class="f-z fa fa-tag"></i></span>';
                    table +='<a href="/cuentas/detalles/'+resp.data.data[i].id_facturas+'/cobrar"><span title="Ver detalles de movimientos"  class="badge c-p pill-badge-warning m-l-5"><i class="f-z fa fa-tasks"></i></span></a>';

                  table +='</td>';

                  table +='</tr>';
              }



                    var x="";
                  for (let d = 0; d < resp.data.links.length; d++) {
                    var r= resp.data.current_page-1;
                    if (resp.data.links[d].url==null) {
                      x+='<li class="page-item previous disabled"><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" >Atras</a></li>';
                      break;
                    }else{
                      x+='<li class="page-item "><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" >Atras</a></li>';
                      break;
                    }
                  }
                  for (let j = 1; j <= resp.data.last_page; j++) {
                  if (resp.data.current_page==j) {
                    x+='<li class="page-item active"><a class="page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                  }else{
                    x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                  }

                  }
                  var s= resp.data.current_page+1;

                  if (resp.data.current_page>=resp.data.last_page) {
                    x+='<li class="page-item next disabled"><a data-page="" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';

                  }else{
                    x+='<li class="page-item next "><a data-page="'+s+'" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';
                  }
                  $("#view_vacio_list_cuentas_por_cobrar").hide();
                }
                $(".page-iten-facturas").html(x);
                $("#total_registros_list_cobrar").text(resp.data.total);
                $("#list_cuentas_por_cobrar").html(table);



         $('.page-endorsement').on('click', function () {
          const page = $(this).data( 'page' )
                      console.log(page);
                      console.log(resp.data.last_page);
                      $('.page-link-endorsements').removeClass('active')
                      $('.page-endorsement-'+page).addClass('active')

                      if((page-1) < 1 ){
                          $('.page-link-endorsement-previous').data('page', 1)
                          $('.page-link-endorsement-next').data('page', 2)
                      }else if ((page+1) <= resp.data.last_page ) {
                          $('.page-link-endorsement-next').data('page', page+1)
                          $('.page-link-endorsement-previous').data('page', page-1)
                      }else if((page+1) > resp.data.last_page ){
                          $('.page-link-endorsement-next').data('page', resp.data.last_page)
                          $('.page-link-endorsement-previous').data('page', resp.data.last_page-1)
                      }
                      list_cuenta_cobrar(page);

         });
            } catch (err) {
              // Handle Error Here
              console.log(err);
          }
      };
      sendGetRequest();
      if (input.value<=2) {
          list_cuenta_cobrar();
          return false;
        }
      }

    })
  }
//-------------------------------------------------------------------------------End Cuentas por cobrar-------------------------------------------------------------------------------


