$(document).ready(function () {
    List_cotizacion();
    filter_option_informe('proyecto')
});

const loader = document.querySelector("#loading");

function displayLoading() {
  loader.classList.add("loader-box");
  loader.classList.add("height-79");
  // $("#codigo-producto").addClass('list_items');
  // $("#codigo-producto").removeClass('is-valid');
  // to stop loading after some time
  setTimeout(() => {
      loader.classList.remove("loader-box");
      loader.classList.remove("height-79");
  }, 5000);
}

// hiding loading
function hideLoading() {
  loader.classList.remove("loader-box");
  loader.classList.remove("height-79");
}

function filter_option_informe(value) {
  console.log(value);
  let f = (value=="")?"proyecto":value;
  input = document.querySelector('#buscar_informs');
  input.addEventListener('keyup', e =>{
    // console.log(value+":"+input.value);
    if (input.value=="") {
      if (input.value<=2) {
        List_cotizacion();
          // return false;
        }
    }else{
    displayLoading();
    const sendGetRequest = async () => {
      try {
          const resp = await axios.get("informe/buscar_informe_cotizacion/"+input.value+"/"+f);
          console.log(resp.data);
          hideLoading();

          var table = "";
          if (resp.data.data=="") {
              $("#view_vacio").show();
          }else{

          for (let i = 0; i < resp.data.data.length; i++) {
            table +='<tr class="iten">';
            // 2= ANULADO
            table +='<td>';
           if (resp.data.data[i].facturado) {
            table +='<div onclick="rediret_previews('+resp.data.data[i].id+');"  class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-success">'+resp.data.data[i].codigo_cot+'</span><span title="Ésta estructura fue facturada" class="badge rounded-pill badge-info mx-2"><i class="fa fa-check"></i></span></a></div></div>';
           }else{
              if (resp.data.data[i].editado) {
                table +='<div onclick="rediret_previews('+resp.data.data[i].id+');" class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-secundary">'+resp.data.data[i].codigo_cot+'</span></a></div></div>';

              }else{

                if (resp.data.data[i].status=='2') {
                  table +='<div onclick="rediret_previews('+resp.data.data[i].id+');"  class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-danger">'+resp.data.data[i].codigo_cot+'</span></a></div></div>';
                }else if(resp.data.data[i].status=='1'){
                  if (resp.data.data[i].cierre_comercial) {
                    table +='<div onclick="rediret_previews('+resp.data.data[i].id+');" class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-success">'+resp.data.data[i].codigo_cot+' <i class="fa fa-check"></i></span></a></div></div>';
                  }else{
                    table +='<div onclick="rediret_previews('+resp.data.data[i].id+');" class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-success">'+resp.data.data[i].codigo_cot+'</span></a></div></div>';
                  }

                }else if (resp.data.data[i].status=='0') {
                  table +='<div onclick="redirec_cot('+resp.data.data[i].id+');" class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-warning">'+resp.data.data[i].codigo_cot+'</></a></div></div>';
                }else if (resp.data.data[i].status=='3') {
                  table +='<div onclick="rediret_previews('+resp.data.data[i].id+');" class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-secundary">'+resp.data.data[i].codigo_cot+'</span></a></div></div>';
                }
              }
           }

            table +='</td>';


            table +='<td>';
            table +='<div class="media iten-contenid"><div class="media-body"><a href="#"><span>'+resp.data.data[i].nombre_proyecto+'-'+resp.data.data[i].proyecto_alcance+'</span></a></div></div>';
            table +='</td>';
            table +='<td><p>'+resp.data.data[i].nombre_cliente+'</p>  </td>';
            //generado
            if (resp.data.data[i].status=='1') {
              if(resp.data.data[i].aprobado_por=='1'){
                table +='<td> <span class="badge pill-badge-secondary m-l-10">Enviado al cliente</span></td>';
              }else if (resp.data.data[i].aprobado_por=='2') {
              table +='<td> <span class="badge pill-badge-primary m-l-10">aceptada por cliente</span></td>';
              }else{
                table +='<td> <span class="badge pill-badge-primary m-l-10">Generado</span></td>';
              }
            }
            //anulado
            if (resp.data.data[i].status=='2') {
              table +='<td> <span class="badge pill-badge-danger m-l-10">Anulado</span></td>';
            }
            //pendiente
            if (resp.data.data[i].status=='0') {
              table +='<td> <span class="badge pill-badge-warning m-l-10">Pendiente..</span></td>';
            }
            //No aprobada por el cliente
            if (resp.data.data[i].status=='3') {
              table +='<td> <span class="badge pill-badge-info m-l-10">No aceptada</span></td>';
            }

            // columna de aprobacion
            table +='<td>';
            // no mostrar coado este pendiente
            if (!resp.data.data[i].generado) {
              if (resp.data.data[i].status=='0') {
                table +='<span class="badge pill-badge-warning m-l-10">Pendiente..</span>';
              }else{

                table +='<button onclick="obtener_id('+resp.data.data[i].id+');"  data-toggle="modal" data-target=".add_file_cotizacion" class="btn btn-pill btn-outline-warning btn-air-warning btn-xs py-0 px-1" type="button" title="Debes agregar un informe.">Agregar informe</button>';

              }
              // table +='<span class="badge pill-badge-warning m-l-10">Pendiente por generar</span>';

              //anulado
             }else if(resp.data.data[i].status=='2'){
              table +='<span class="badge pill-badge-danger m-l-10">Anulado</span>';
             } else{
                  // aprobar personal

                  if (resp.data.data[i].aprobado_por=='0') {

                    if (resp.data.data[i].editado) {
                      table +='<button onclick="obtener_detalle('+resp.data.data[i].id+');"  data-toggle="modal" data-target=".edit_file_cotizacion" class="btn btn-pill btn-outline-warning btn-air-warning btn-xs py-0 px-1" type="button" title="Debes agregar un informe.">Editar informe</button>';
                      }else{
                        table +='<button class="btn btn-pill btn-outline-warning  btn-air-warning  btn-sm px-1 py-0" onclick="aprobar_por('+resp.data.data[i].id+',1);"  type="button" title="Aprobar por personal">Personal</button>';

                      }

                    // aprobar cliente
                  }else if(resp.data.data[i].aprobado_por=='1'){

                    // table +='<button class="btn btn-pill btn-outline-secondary btn-air-secondary btn-sm px-2 py-1" type="button" onclick="aprobar_por('+resp.data.data[i].id+',2);"   title="Aprobacion del cliente">Aprobar por cliente</button>';
                    if (resp.data.data[i].status=='3') {
                      table +='<span class="badge pill-badge-info m-l-10">Propuesta no aceptada por el cliente</span>';
                    }else{
                      table +='<button class="btn btn-pill btn-outline-secondary btn-air-secondary btn-sm px-2 py-1" type="button"  data-toggle="modal" data-target=".aprobar_cliente"  onclick="verificar_file_cliente('+resp.data.data[i].id+');" title="Aprobacion del cliente">Aprobar por cliente</button>';

                    }

                    //finalizado
                  }else if(resp.data.data[i].aprobado_por=='2'){
                    table +='<span class="badge pill-badge-primary m-l-10">Finalizado</span>';
                    // verificar si el cliente hay archivo del cliente o no
                    if (resp.data.data[i].file_cliente) {
                    table +='<span title="ver archivo adjuntado del cliente" data-toggle="modal" data-target=".modal_update_file_adjunto"  onclick="showFile('+resp.data.data[i].id+',1)" class="badge c-p pill-badge-primary m-l-10"><i class="fa fa-file-o"></i></span>';

                    }else{
                    table +='<span title="Porfavor subir archivo" type="button"  onclick="obtener_id_cotizacion('+resp.data.data[i].id+');"  data-toggle="modal" data-target=".file_pendiente_cliente"   class="badge c-p pill-badge-danger m-l-10"><i class="fa fa-file-o"></i></span>';

                    }
                    if (!resp.data.data[i].garantia) {
                      table +='<span onclick="modal_garantia('+resp.data.data[i].id+')"  class="badge badge-light text-dark c-p">Garantia</span>';
                    }else{

                    }

                  }
             }
            table +='</td>';
            //  end columna de aprobacion

            if (resp.data.data[i].status=='0') {
            table +='<td style="width: 100px;">';
            table +='<div class="col-12 col-md-12">';
            table +=' <button class="btn-option-blue" onclick="redirec_cot('+resp.data.data[i].id+');"  title="Ver"><i class="fa fa-eye"></i></button>';
            if (resp.data.data[i].num_aprobacion==null) {
              table +='<button class="btn-option-damger btn_delete_cotizacion" onclick="btn_delete_cotizacion('+resp.data.data[i].id+');" title="Eliminar"><i class="fa fa-trash-o"></i></button>';
          }
            table +='</div>';
            table +='</div>';
            table +='</tr>';

            }
            if (resp.data.data[i].status=='2') {
              table +='<td style="width: 100px;">';
              table +='<div class="col-12 col-md-12">';
              // table +=' <a href="javascript:void(0)" class="btn-option-blue text-danger" onclick="ver_nulado('+resp.data.data[i].id+');"  title="Ver"><i class="fa fa-eye"></i></a>';
              table +='<button class="btn-option-secundary mx-2" onclick="sow_edit_cot_infor('+resp.data.data[i].id+');"  title="Seguimientos"><i class="fa fa-comment-o"></i></button>';
              table +='</div>';
              table +='</div>';
              table +='</tr>';
            }


            if (resp.data.data[i].status=='3') {
              table +='<td style="width: 100px;">';
            table +='<div class="iten-contenid">';
            // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
            // table +='<button class="btn-option-success " title="Generar informe" onclick="showFile('+resp.data.data[i].id+')"><i class="fa fa-file-pdf-o"></i></button>';
            table +='<button class="btn-option-success " title="Generar informe" onclick="showFiles('+resp.data.data[i].id+')"><i class="fa fa-file-pdf-o"></i></button>';


            table +='<button class="btn-option-warney mx-1" onclick="redirec_cot('+resp.data.data[i].id+');" title="Ver"><i class="fa fa-eye"></i></button>';

            // table +='<button class="btn-option-info mx-2" onclick="clonar_inform_cotizaci('+resp.data.data[i].id+');" title="Clonar informe"><i class="fa fa-files-o"></i></button>';

            // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
            table +='<button class="btn-option-damger" onclick="anular_informe_cot('+resp.data.data[i].id+');" title="Anular informe"><i class="fa fa-ban"></i></button>';

            table +='<button class="btn-option-secundary mx-2" onclick="sow_edit_cot_infor('+resp.data.data[i].id+');"  title="Seguimientos"><i class="fa fa-comment-o"></i></button>';
            table +='</div>';
            // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
            table +='</td>';

            }
            if (resp.data.data[i].status=='1') {
            table +='<td style="width: 100px;">';
            table +='<div class="iten-contenid w-224">';
            if (resp.data.data[i].aprobado_por=="1") {
               table +='<button type="button" title="Agregar nuevo seguimientos" onclick="obtener_id('+resp.data.data[i].id+');" class="btn-option-blue mx-2" data-toggle="modal" data-target=".nevo-seguimiento"><i class="fa fa-comments-o"></i></button>';
            }
            if (resp.data.data[i].aprobado_por=="2") {
              if (resp.data.data[i].generado) {
                // table +='<button class="btn-option-success mx-1" title="Generar informe" onclick="showFile('+resp.data.data[i].id+')"><i class="fa fa-file-pdf-o"></i></button>';
                table +='<button class="btn-option-success mx-1" title="Generar informe" onclick="showFiles('+resp.data.data[i].id+')"><i class="fa fa-file-pdf-o"></i></button>';
              }

              // table +='<button type="button" title="Agregar nuevo seguimientos" onclick="obtener_id('+resp.data.data[i].id+');" class="btn-option-blue mx-2" data-toggle="modal" data-target=".nevo-seguimiento"><i class="fa fa-comments-o"></i></button>';

              if (!resp.data.data[i].cierre_comercial) {
                table +='<button class="btn-option-warney mx-2 " onclick="edit_estructura('+resp.data.data[i].id+');" title="Editar informe"><i class="fa fa-pencil-square-o"></i></button>';
              }

              // table +='<button class="btn-option-info mx-2" onclick="clonar_inform_cotizaci('+resp.data.data[i].id+');" title="Clonar informe"><i class="fa fa-files-o"></i></button>';
              // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
              // table +='<button class="btn-option-damger mx-2" onclick="anular_informe_cot('+resp.data.data[i].id+');" title="Anular informe"><i class="fa fa-ban"></i></button>';
              if (!resp.data.data[i].cierre_comercial) {
                table +='<button class="btn-option-damger otner_id" onclick="id_form_anuld('+resp.data.data[i].id+');"  data-id_cotizacion="'+resp.data.data[i].id+'" data-toggle="modal" data-target=".form-anulacion"  title="Anular informe"><i class="fa fa-ban"></i></button>';
              }
              // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
              table +='<button class="btn-option-secundary mx-2" onclick="sow_edit_cot_infor('+resp.data.data[i].id+');"  title="Seguimientos"><i class="fa fa-comment-o"></i></button>';
              table +='<button class="btn-option-info " onclick="ver_apertura_orden_servicio('+resp.data.data[i].id+');"  title="Ver detalle Apertura orden de servicio"><i class="fa fa-file-text-o"></i></button>';
              if (resp.data.data[i].firmado_ods) {
                table +=`<button class="btn-option-success " title="PDF Apertura de ODS" onclick="window.open('/operaciones/apertura-orden-servicio/pdf?id=${resp.data.data[i].ods_id}').focus();"><i class="fa fa-file-pdf-o"></i></button>`;
                }
              if (!resp.data.data[i].cierre_comercial) {
                table +='<button class="btn-option-info " onclick="cierre_comercial('+resp.data.data[i].id+');"  title="Cierre comercial"><i class="fa fa-check"></i></button>';
              }
            }else{
              if (resp.data.data[i].num_aprobacion==null) {
                  table +='<button class="btn-option-damger btn_delete_cotizacion" onclick="btn_delete_cotizacion('+resp.data.data[i].id+');" title="Eliminar"><i class="fa fa-trash-o"></i></button>';
              }
              if (resp.data.data[i].generado) {
                // table +='<button class="btn-option-success " title="Generar informe" onclick="showFile('+resp.data.data[i].id+')"><i class="fa fa-file-pdf-o"></i></button>';
                table +='<button class="btn-option-success " title="Generar informe" onclick="showFiles('+resp.data.data[i].id+')"><i class="fa fa-file-pdf-o"></i></button>';
              }

              // table +='<button type="button" title="Agregar nuevo seguimientos" onclick="obtener_id('+resp.data.data[i].id+');" class="btn-option-blue mx-2" data-toggle="modal" data-target=".nevo-seguimiento"><i class="fa fa-comments-o"></i></button>';
              if (!resp.data.data[i].cierre_comercial) {
                table +='<button class="btn-option-warney mx-2 " onclick="edit_estructura('+resp.data.data[i].id+');" title="Editar informe"><i class="fa fa-pencil-square-o"></i></button>';
              }



              // table +='<button class="btn-option-info mx-2" onclick="clonar_inform_cotizaci('+resp.data.data[i].id+');" title="Clonar informe"><i class="fa fa-files-o"></i></button>';
              // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';

              // table +='<button class="btn-option-damger"  onclick="anular_informe_cot('+resp.data.data[i].id+');" title="Anular informe"><i class="fa fa-ban"></i></button>';
              if (!resp.data.data[i].cierre_comercial) {
                table +='<button class="btn-option-damger otner_id" onclick="id_form_anuld('+resp.data.data[i].id+');"  data-id_cotizacion="'+resp.data.data[i].id+'" data-toggle="modal" data-target=".form-anulacion"  title="Anular informe"><i class="fa fa-ban"></i></button>';
              }


              // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
              table +='<button class="btn-option-secundary mx-2" onclick="sow_edit_cot_infor('+resp.data.data[i].id+');"  title="Seguimientos"><i class="fa fa-comment-o"></i></button>';
              table +='<button class="btn-option-info " onclick="ver_apertura_orden_servicio('+resp.data.data[i].id+');"  title="Ver detalle Apertura orden de servicio"><i class="fa fa-file-text-o"></i></button>';
              if (resp.data.data[i].firmado_ods) {
                table +=`<button class="btn-option-success " title="PDF Apertura de ODS" onclick="window.open('/operaciones/apertura-orden-servicio/pdf?id=${resp.data.data[i].ods_id}').focus();"><i class="fa fa-file-pdf-o"></i></button>`;
                }
              if (!resp.data.data[i].cierre_comercial) {
                table +='<button class="btn-option-info " onclick="cierre_comercial('+resp.data.data[i].id+');"  title="Cierre comercial"><i class="fa fa-check"></i></button>';
              }


            }





            table +='</div>';
            table +='</td>';

            }




            // table +='<td style="width: 100px;">';
            // table +='<div class="col-12 col-md-12">';
            // table +=' <button class="btn-option-blue" onclick="redirec_cot();"  title="Ver"><i class="fa fa-eye"></i></button>';
            // table +='</div>';
            // table +='</div>';
            // table +='</tr>';

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
              $("#view_vacio").hide();
            }
          $(".page-iten-informe").html(x);
          $("#total_registros_table").text(resp.data.total);

          $("#list_cotizacion_aprobado").html(table);



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
                  // List_cotizacion(page);

     });
        } catch (err) {
          // Handle Error Here
          console.log(err);
      }
  };
  sendGetRequest();
  // if (input.value<=2) {
  //   List_cotizacion();
  //     return false;
  //   }
  }
  })
}
function List_cotizacion(num="") {
  var valor = (num=="")?1:num;
  displayLoading();
  const sendGetRequest = async () => {
        try {
            const resp = await axios.get("get_Cotizacion_aprobado?page="+valor);
            console.log(resp.data)
            var table = "";
            hideLoading();
            if (resp.data.data=="") {
              $("#view_vacio").show();
          }else{
            for (let i = 0; i < resp.data.data.length; i++) {
              table +='<tr class="iten">';
              // 2= ANULADO
              table +='<td>';
             if (resp.data.data[i].facturado) {
              table +='<div onclick="rediret_previews('+resp.data.data[i].id+');"  class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-success">'+resp.data.data[i].codigo_cot+'</span><span title="Ésta estructura fue facturada" class="badge rounded-pill badge-info mx-2"><i class="fa fa-check"></i></span></a></div></div>';
             }else{
                if (resp.data.data[i].editado) {
                  table +='<div onclick="rediret_previews('+resp.data.data[i].id+');" class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-secundary">'+resp.data.data[i].codigo_cot+'</span></a></div></div>';

                }else{

                  if (resp.data.data[i].status=='2') {
                    table +='<div onclick="rediret_previews('+resp.data.data[i].id+');"  class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-danger">'+resp.data.data[i].codigo_cot+'</span></a></div></div>';
                  }else if(resp.data.data[i].status=='1'){
                    if (resp.data.data[i].cierre_comercial) {
                      table +='<div onclick="rediret_previews('+resp.data.data[i].id+');" class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-success">'+resp.data.data[i].codigo_cot+' <i class="fa fa-check"></i></span></a></div></div>';
                    }else{
                      table +='<div onclick="rediret_previews('+resp.data.data[i].id+');" class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-success">'+resp.data.data[i].codigo_cot+'</span></a></div></div>';
                    }

                  }else if (resp.data.data[i].status=='0') {
                    table +='<div onclick="redirec_cot('+resp.data.data[i].id+');" class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-warning">'+resp.data.data[i].codigo_cot+'</></a></div></div>';
                  }else if (resp.data.data[i].status=='3') {
                    table +='<div onclick="rediret_previews('+resp.data.data[i].id+');" class="media iten-contenid"><div class="media-body"><a href="javascript:void(0)"><span class="text-secundary">'+resp.data.data[i].codigo_cot+'</span></a></div></div>';
                  }
                }
             }

              table +='</td>';


              table +='<td>';
              table +='<div class="media iten-contenid"><div class="media-body"><a href="#"><span>'+resp.data.data[i].nombre_proyecto+'-'+resp.data.data[i].proyecto_alcance+'</span></a></div></div>';
              table +='</td>';
              table +='<td><p>'+resp.data.data[i].nombre_cliente+'</p>  </td>';
              //generado
              if (resp.data.data[i].status=='1') {
                if(resp.data.data[i].aprobado_por=='1'){
                  table +='<td> <span class="badge pill-badge-secondary m-l-10">Enviado al cliente</span></td>';
                }else if (resp.data.data[i].aprobado_por=='2') {
                table +='<td> <span class="badge pill-badge-primary m-l-10">aceptada por cliente</span></td>';
                }else{
                  table +='<td> <span class="badge pill-badge-primary m-l-10">Generado</span></td>';
                }
              }
              //anulado
              if (resp.data.data[i].status=='2') {
                table +='<td> <span class="badge pill-badge-danger m-l-10">Anulado</span></td>';
              }
              //pendiente
              if (resp.data.data[i].status=='0') {
                table +='<td> <span class="badge pill-badge-warning m-l-10">Pendiente..</span></td>';
              }
              //No aprobada por el cliente
              if (resp.data.data[i].status=='3') {
                table +='<td> <span class="badge pill-badge-info m-l-10">No aceptada</span></td>';
              }

              // columna de aprobacion
              table +='<td>';
              // no mostrar coado este pendiente
              if (!resp.data.data[i].generado) {
                if (resp.data.data[i].status=='0') {
                  table +='<span class="badge pill-badge-warning m-l-10">Pendiente..</span>';
                }else{

                  table +='<button onclick="obtener_id('+resp.data.data[i].id+');"  data-toggle="modal" data-target=".add_file_cotizacion" class="btn btn-pill btn-outline-warning btn-air-warning btn-xs py-0 px-1" type="button" title="Debes agregar un informe.">Agregar informe</button>';

                }
                // table +='<span class="badge pill-badge-warning m-l-10">Pendiente por generar</span>';

                //anulado
               }else if(resp.data.data[i].status=='2'){
                table +='<span class="badge pill-badge-danger m-l-10">Anulado</span>';
               } else{
                    // aprobar personal

                    if (resp.data.data[i].aprobado_por=='0') {

                      if (resp.data.data[i].editado) {
                        table +='<button onclick="obtener_detalle('+resp.data.data[i].id+');"  data-toggle="modal" data-target=".edit_file_cotizacion" class="btn btn-pill btn-outline-warning btn-air-warning btn-xs py-0 px-1" type="button" title="Debes agregar un informe.">Editar informe</button>';
                        }else{
                          table +='<button class="btn btn-pill btn-outline-warning  btn-air-warning  btn-sm px-1 py-0" onclick="aprobar_por('+resp.data.data[i].id+',1);"  type="button" title="Aprobar por personal">Personal</button>';

                        }

                      // aprobar cliente
                    }else if(resp.data.data[i].aprobado_por=='1'){

                      // table +='<button class="btn btn-pill btn-outline-secondary btn-air-secondary btn-sm px-2 py-1" type="button" onclick="aprobar_por('+resp.data.data[i].id+',2);"   title="Aprobacion del cliente">Aprobar por cliente</button>';
                      if (resp.data.data[i].status=='3') {
                        table +='<span class="badge pill-badge-info m-l-10">Propuesta no aceptada por el cliente</span>';
                      }else{
                        table +='<button class="btn btn-pill btn-outline-secondary btn-air-secondary btn-sm px-2 py-1" type="button"  data-toggle="modal" data-target=".aprobar_cliente"  onclick="verificar_file_cliente('+resp.data.data[i].id+');" title="Aprobacion del cliente">Aprobar por cliente</button>';

                      }

                      //finalizado
                    }else if(resp.data.data[i].aprobado_por=='2'){
                      table +='<span class="badge pill-badge-primary m-l-10">Finalizado</span>';
                      // verificar si el cliente hay archivo del cliente o no
                      if (resp.data.data[i].file_cliente) {
                      table +='<span title="ver archivo adjuntado del cliente" data-toggle="modal" data-target=".modal_update_file_adjunto"  onclick="showFile('+resp.data.data[i].id+',1)" class="badge c-p pill-badge-primary m-l-10"><i class="fa fa-file-o"></i></span>';

                      }else{
                      table +='<span title="Porfavor subir archivo" type="button"  onclick="obtener_id_cotizacion('+resp.data.data[i].id+');"  data-toggle="modal" data-target=".file_pendiente_cliente"   class="badge c-p pill-badge-danger m-l-10"><i class="fa fa-file-o"></i></span>';

                      }
                      if (!resp.data.data[i].garantia) {
                        table +='<span onclick="modal_garantia('+resp.data.data[i].id+')"  class="badge badge-light text-dark c-p">Garantia</span>';
                      }else{

                      }

                    }
               }
              table +='</td>';
              //  end columna de aprobacion

              if (resp.data.data[i].status=='0') {
              table +='<td style="width: 100px;">';
              table +='<div class="col-12 col-md-12">';
              table +=' <button class="btn-option-blue" onclick="redirec_cot('+resp.data.data[i].id+');"  title="Ver"><i class="fa fa-eye"></i></button>';
              if (resp.data.data[i].num_aprobacion==null) {
                table +='<button class="btn-option-damger btn_delete_cotizacion" onclick="btn_delete_cotizacion('+resp.data.data[i].id+');" title="Eliminar"><i class="fa fa-trash-o"></i></button>';
            }
              table +='</div>';
              table +='</div>';
              table +='</tr>';

              }
              if (resp.data.data[i].status=='2') {
                table +='<td style="width: 100px;">';
                table +='<div class="col-12 col-md-12">';
                // table +=' <a href="javascript:void(0)" class="btn-option-blue text-danger" onclick="ver_nulado('+resp.data.data[i].id+');"  title="Ver"><i class="fa fa-eye"></i></a>';
                table +='<button class="btn-option-secundary mx-2" onclick="sow_edit_cot_infor('+resp.data.data[i].id+');"  title="Seguimientos"><i class="fa fa-comment-o"></i></button>';
                table +='</div>';
                table +='</div>';
                table +='</tr>';
              }


              if (resp.data.data[i].status=='3') {
                table +='<td style="width: 100px;">';
              table +='<div class="iten-contenid">';
              // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
              // table +='<button class="btn-option-success " title="Generar informe" onclick="showFile('+resp.data.data[i].id+')"><i class="fa fa-file-pdf-o"></i></button>';
              table +='<button class="btn-option-success " title="Generar informe" onclick="showFiles('+resp.data.data[i].id+')"><i class="fa fa-file-pdf-o"></i></button>';


              table +='<button class="btn-option-warney mx-1" onclick="redirec_cot('+resp.data.data[i].id+');" title="Ver"><i class="fa fa-eye"></i></button>';

              // table +='<button class="btn-option-info mx-2" onclick="clonar_inform_cotizaci('+resp.data.data[i].id+');" title="Clonar informe"><i class="fa fa-files-o"></i></button>';

              // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
              table +='<button class="btn-option-damger" onclick="anular_informe_cot('+resp.data.data[i].id+');" title="Anular informe"><i class="fa fa-ban"></i></button>';

              table +='<button class="btn-option-secundary mx-2" onclick="sow_edit_cot_infor('+resp.data.data[i].id+');"  title="Seguimientos"><i class="fa fa-comment-o"></i></button>';
              table +='</div>';
              // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
              table +='</td>';

              }
              if (resp.data.data[i].status=='1') {
              table +='<td style="width: 100px;">';
              table +='<div class="iten-contenid w-224">';
              if (resp.data.data[i].aprobado_por=="1") {
                 table +='<button type="button" title="Agregar nuevo seguimientos" onclick="obtener_id('+resp.data.data[i].id+');" class="btn-option-blue mx-2" data-toggle="modal" data-target=".nevo-seguimiento"><i class="fa fa-comments-o"></i></button>';
              }
              if (resp.data.data[i].aprobado_por=="2") {
                if (resp.data.data[i].generado) {
                  // table +='<button class="btn-option-success mx-1" title="Generar informe" onclick="showFile('+resp.data.data[i].id+')"><i class="fa fa-file-pdf-o"></i></button>';
                  table +='<button class="btn-option-success mx-1" title="Generar informe" onclick="showFiles('+resp.data.data[i].id+')"><i class="fa fa-file-pdf-o"></i></button>';
                }

                // table +='<button type="button" title="Agregar nuevo seguimientos" onclick="obtener_id('+resp.data.data[i].id+');" class="btn-option-blue mx-2" data-toggle="modal" data-target=".nevo-seguimiento"><i class="fa fa-comments-o"></i></button>';

                if (!resp.data.data[i].cierre_comercial) {
                  table +='<button class="btn-option-warney mx-2 " onclick="edit_estructura('+resp.data.data[i].id+');" title="Editar informe"><i class="fa fa-pencil-square-o"></i></button>';
                }

                // table +='<button class="btn-option-info mx-2" onclick="clonar_inform_cotizaci('+resp.data.data[i].id+');" title="Clonar informe"><i class="fa fa-files-o"></i></button>';
                // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
                // table +='<button class="btn-option-damger mx-2" onclick="anular_informe_cot('+resp.data.data[i].id+');" title="Anular informe"><i class="fa fa-ban"></i></button>';
                if (!resp.data.data[i].cierre_comercial) {
                  table +='<button class="btn-option-damger otner_id" onclick="id_form_anuld('+resp.data.data[i].id+');"  data-id_cotizacion="'+resp.data.data[i].id+'" data-toggle="modal" data-target=".form-anulacion"  title="Anular informe"><i class="fa fa-ban"></i></button>';
                }
                // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
                table +='<button class="btn-option-secundary mx-2" onclick="sow_edit_cot_infor('+resp.data.data[i].id+');"  title="Seguimientos"><i class="fa fa-comment-o"></i></button>';
                table +='<button class="btn-option-info " onclick="ver_apertura_orden_servicio('+resp.data.data[i].id+');"  title="Ver detalle Apertura orden de servicio"><i class="fa fa-file-text-o"></i></button>';
                if (resp.data.data[i].firmado_ods) {
                  table +=`<button class="btn-option-success " title="PDF Apertura de ODS" onclick="window.open('/operaciones/apertura-orden-servicio/pdf?id=${resp.data.data[i].ods_id}').focus();"><i class="fa fa-file-pdf-o"></i></button>`;
                  }
                if (!resp.data.data[i].cierre_comercial) {
                  table +='<button class="btn-option-info " onclick="cierre_comercial('+resp.data.data[i].id+');"  title="Cierre comercial"><i class="fa fa-check"></i></button>';
                }
              }else{
                if (resp.data.data[i].num_aprobacion==null) {
                    table +='<button class="btn-option-damger btn_delete_cotizacion" onclick="btn_delete_cotizacion('+resp.data.data[i].id+');" title="Eliminar"><i class="fa fa-trash-o"></i></button>';
                }
                if (resp.data.data[i].generado) {
                  // table +='<button class="btn-option-success " title="Generar informe" onclick="showFile('+resp.data.data[i].id+')"><i class="fa fa-file-pdf-o"></i></button>';
                  table +='<button class="btn-option-success " title="Generar informe" onclick="showFiles('+resp.data.data[i].id+')"><i class="fa fa-file-pdf-o"></i></button>';
                }

                // table +='<button type="button" title="Agregar nuevo seguimientos" onclick="obtener_id('+resp.data.data[i].id+');" class="btn-option-blue mx-2" data-toggle="modal" data-target=".nevo-seguimiento"><i class="fa fa-comments-o"></i></button>';
                if (!resp.data.data[i].cierre_comercial) {
                  table +='<button class="btn-option-warney mx-2 " onclick="edit_estructura('+resp.data.data[i].id+');" title="Editar informe"><i class="fa fa-pencil-square-o"></i></button>';
                }



                // table +='<button class="btn-option-info mx-2" onclick="clonar_inform_cotizaci('+resp.data.data[i].id+');" title="Clonar informe"><i class="fa fa-files-o"></i></button>';
                // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';

                // table +='<button class="btn-option-damger"  onclick="anular_informe_cot('+resp.data.data[i].id+');" title="Anular informe"><i class="fa fa-ban"></i></button>';
                if (!resp.data.data[i].cierre_comercial) {
                  table +='<button class="btn-option-damger otner_id" onclick="id_form_anuld('+resp.data.data[i].id+');"  data-id_cotizacion="'+resp.data.data[i].id+'" data-toggle="modal" data-target=".form-anulacion"  title="Anular informe"><i class="fa fa-ban"></i></button>';
                }


                // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
                table +='<button class="btn-option-secundary mx-2" onclick="sow_edit_cot_infor('+resp.data.data[i].id+');"  title="Seguimientos"><i class="fa fa-comment-o"></i></button>';
                table +='<button class="btn-option-info " onclick="ver_apertura_orden_servicio('+resp.data.data[i].id+');"  title="Ver detalle Apertura orden de servicio"><i class="fa fa-file-text-o"></i></button>';
                if (resp.data.data[i].firmado_ods) {
                  table +=`<button class="btn-option-success " title="PDF Apertura de ODS" onclick="window.open('/operaciones/apertura-orden-servicio/pdf?id=${resp.data.data[i].ods_id}').focus();"><i class="fa fa-file-pdf-o"></i></button>`;
                  }
                if (!resp.data.data[i].cierre_comercial) {
                  table +='<button class="btn-option-info " onclick="cierre_comercial('+resp.data.data[i].id+');"  title="Cierre comercial"><i class="fa fa-check"></i></button>';
                }


              }





              table +='</div>';
              table +='</td>';

              }




              // table +='<td style="width: 100px;">';
              // table +='<div class="col-12 col-md-12">';
              // table +=' <button class="btn-option-blue" onclick="redirec_cot();"  title="Ver"><i class="fa fa-eye"></i></button>';
              // table +='</div>';
              // table +='</div>';
              // table +='</tr>';

              table +='</tr>';

            }

            $("#view_vacio").hide();
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
            $("#total_registros_table").text(resp.data.total);
            $("#list_cotizacion_aprobado").html(table);



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
                    List_cotizacion(page);

       });
          } catch (err) {
            // Handle Error Here
            console.log(err);
        }
    };
    sendGetRequest();
}

function btn_delete_cotizacion(id) {
   console.log(id);

   swal({
    title: "¿Está seguro que deses eliminar esta cotización?",
    icon: "info",
    buttons:{
        cancel: "Cancelar",
        catch: {
            text: "Eliminar",
        },
    },
    dangerMode: false,
    }).then((willDelete) => {
        if (willDelete) {

            const sendGetRequest = async () => {
                try {
                    const resp = await axios.delete("/informe_cotizacion/delete/"+id);
                    console.log(resp.data);
                    if (resp.data.status==200) {
                        List_cotizacion();
                    }
                  } catch (err) {
                      // Handle Error Here
                  }
              };
              sendGetRequest();

        }
    })
}

function modal_garantia(id) {
  // console.log(id);
  $('#id_informe_garantia').val(id);


  const sendGetRequest = async () => {
    try {
        const resp = await axios.get("/operaciones/verificar_nstatus/"+id);
        console.log(resp.data);
        if (resp.data.hay_operacion) {
          $('.observacion_garantia_modal').modal('show');
        }else{
          swal({
            title: "¡HAY UN PROBLEMA!",
            text:"El proyecto debe estar en cierre técnico para poder realizar la garantia.",
            icon: "warning",
            buttons:{
                cancel: "Cerrar",

            },
            dangerMode: false,
            })
        }

      } catch (err) {
          // Handle Error Here
      }
  };
  sendGetRequest();

}


$('#btn-cancelar-observacion-garantia').on('click',()=>{
  $('.observacion_garantia_modal').modal('hide');
});

$('#btn-guardar-observacion-garantia').on('click',(e)=>{
  e.preventDefault();
  const data = {
    id_cotizacion: $('#id_informe_garantia').val(),
    observacion: $('#observacion').val()
  }

  console.log(data);

  swal({
    title: "¿Está seguro que deses realizar una garantia?",
    icon: "info",
    buttons:{
        cancel: "Cancelar",
        catch: {
            text: "Cambiar Estatus",
        },
    },
    dangerMode: false,
    }).then((willDelete) => {
        if (willDelete) {

             var url = "/api/operaciones/Store_observacion_garantia";
        fetch(url, {
            method: "POST", // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then((res) => res.json())
            .catch((errors) => console.error("Error:", errors))
            .then( (response) =>{
                console.log(response);
                if (response.status==200) {
                  $('.observacion_garantia_modal').modal('hide');
                  List_cotizacion();
                  let i=0;
                  const h = setInterval(function () {
                    i++
                    revisar(data.id_cotizacion);
                    if (i=1) {
                      clearInterval(h);
                      }
                   }, 3000);


                }

            });

        }
    })
});

function revisar(id) {
  console.log(id);

  const sendGetRequest = async () => {
    try {
        const resp = await axios.get("/operaciones/Revisar_proyect/"+id);
        console.log(resp.data);
        if (resp.data.status==200) {
          get_proyectos_aprobados_cliente()
        }


    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();

}

function obtener_id(id) {
  console.log(id);

  $('#id_cotizacion_form').val(id);
  $('#id_cotizacion_form-file').val(id);
  $('#id_cotizacion_cliente_file').val(id);
  Consulta_interes(id);
}

function Consulta_interes(id) {
 console.log(id);

   const sendGetRequest = async () => {
      try {
          const resp = await axios.get("/consulta_interes/" + id);
          console.log(resp.data);
          if (resp.data.status) {
            $('#add_box_interes').hide();
            $('#box_interes').hide();
          }else{
            $('#add_box_interes').show();
            // $('#box_interes').show();
          }
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  };
  sendGetRequest();
}

function id_form_anuld(id) {
  $('#id_cotizacion_form_anuld').val(id);
}
$("#btn-cancelar-motivo-anulado").on("click", function () {
    // $('#form-seguimiento-anulado').reset();
    $('#id_cotizacion_form_anuld').val("");
    $('#titulo_motivo_anul').val("");
    $('#descripcion_motivo_anuld').val("");

});


$("#create-motivo-anulado-button").on("click", function (e) {
  e.preventDefault();
  const data ={
    user_id:$('#user_id').val(),
    id_cotizacion:$("#id_cotizacion_form_anuld").val(),
    titulo  : $('#titulo_motivo_anul').val(),
    descripcion:$('#descripcion_motivo_anuld').val(),
  }
  console.log(data);
  // input_validate(data.titulo,'titulo_motivo');
  if (data.titulo=="") {
    $("#titulo_motivo_anul").removeClass('is-valid').addClass('is-invalid');
    return false;
  }
//   console.log(data);
swal({
  title: "¡CUIDADO!",
  text:"¿Está seguro que desea anular este informe de cotización?.\r\nNo podrás revertir los cambios.",
  icon: "info",
  buttons:{
      cancel: "Cancelar",
      catch: {
          text: "Anular",
      },
  },
  dangerMode: false,
  }).then((willDelete) => {
      if (willDelete) {
        var url = "/api/motivo_anulado/store";
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
                if (response.status == 200) {
                    $('#btn-cancelar-motivo-anulado').click();
                    messeg(response.success,"success");
                    List_cotizacion();

                }


          });
      }
  })



});

function obtener_id_cotizacion(id) {
  $('.id_cotizacion_cliente_file').val(id);
}
function verificar_file_cliente(id) {
  console.log(id);
  obtener_id(id);
  const sendGetRequest = async () => {
    try {
        const resp = await axios.get("/verificar_file_cliente_cotizacion/" + id);
        if (resp.data.status==404) {
          $('.col_num').addClass('col-md-5').removeClass('col-md-8');
          $('#lebel-file-cliente').text("Deseas adjuntar un archivo");
          $('#id_cotizacion_form').val(id);
          var link="/informe/apertura-orden-servicio/"+id+"/create"
          $('.link-orden-servicio').attr('href', link);
          $('.link-orden-servicio').attr('target', '_blank');
        }else{
          $('.col_num').addClass('col-md-8').removeClass('col-md-5');
          console.log(resp.data);
          $('#lebel-file-cliente').text("¿Deseas actualizar la cotización (PDF) existente antes de aprobar el proyecto?");
          $('#id_cotizacion_form').val(resp.data[0].temporal_cotizacion_id);
           $('#informe_cotizacion_files_id_cliente').val(resp.data[0].id);
        }


    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
sendGetRequest();
}


function obtener_detalle(id) {
  // obtener_id(id);
  console.log(id);
  const sendGetRequest = async () => {
    try {
        const resp = await axios.get("/get_data_file_cotizacion/" + id);
        console.log(resp.data);
        // $('#id_cotizacion_form').val(resp.data[0].temporal_cotizacion_id);
         $('.id_cotizacion_form-file').val(resp.data[0].temporal_cotizacion_id);
        // $('.informe_cotizacion_files_id').val(resp.data[0].id);
        $('#name_file').text(resp.data[0].name_file);
        let cadena="";
              // Creamos array con los meses del año
          const meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
          // Creamos array con los días de la semana
          const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

        for (let i = 0; i < resp.data.length; i++) {
          const fecha = new Date(resp.data[i].created_at);
          // Construimos el formato de salida
          let g=  fecha.getUTCFullYear()+ '-' + meses[fecha.getMonth()] + '-' + fecha.getDate() ;
          cadena+=' <tr class="iten">';
          cadena+='<td class="w-282">';
          cadena+='<span class="text-secundary">'+g+'</span>';
          cadena+='</td>';
          cadena+='<td>';
          cadena+='<div class="media "><div class="media-body"><span>'+resp.data[i].name_file+'</span></div></div>';
          cadena+='</td>';
          cadena+='<td class="w-282">';
          cadena+='<span class="text-secundary">'+resp.data[i].nombre_user+'</span>';
          cadena+='</td>';
          cadena+='<td class="w-282">';
          cadena+='<a target="_blank" href="/'+resp.data[i].url+'"><span class="text-secundary"><i class="fa fa-folder-open"></i></span></a>';
          cadena+='</td>';
          cadena+='</tr>';

        }
        $("#lista_file_informe_cotizacion").html(cadena);
        // if (resp.data.success) {
        //     $("#codigo-producto").addClass('is-invalid');
        //     $("#codigo-producto").removeClass('is-valid');
        //     var c=`<div class="invalid-feedback"> camoiokj </div>`
        //     $("#code-ms").html('¡Ups! Este codigo ya existe');
        // }else{
        //     $("#code-ms").html('¡Excelente!');
        //     $("#codigo-producto").removeClass('is-invalid');
        //     $("#codigo-producto").addClass('is-valid');
        // }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
sendGetRequest();
}

/**
 * Funcion para enviar informes al backend
 */

 $("#create-informe_cotizacion_file-button").on("click", function (e) {
  var url = document.getElementById('url_store_file_cotizacion');
  e.preventDefault();
  var formData = new FormData(document.getElementById("form-file-cotizacion"));
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
        messeg(msg.success,"success");
        var $el = $('#file');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
        $('#btn-inform-file-cancel').click();
        $('#file').removeClass('is-invalid');
        List_cotizacion();
        $('#btn_loader').removeClass('fa fa-spin fa-spinner');
      }else{
        messeg(msg.error,"danger");
        $('#file').addClass('is-invalid');
        $('#msg_file').text(msg.error);
        $('#btn_loader').removeClass('fa fa-spin fa-spinner');
      }

  }).fail(function(res){
      console.log(res)
  });


});

$("#btn-inform-mismo-file").on("click", function (e) {
  e.preventDefault();
  const data ={
    id_cotizacion:$('.id_cotizacion_form-file').val()
  }
  // console.log(data);
  swal({
    title: "¡CUIDADO!",
    text:"¿Está seguro que deseas dejar el mismo informe de cotización?.\r\nNo podrás revertir los cambios.",
    icon: "info",
    buttons:{
        cancel: "Cancelar",
        catch: {
            text: "Aceptar",
        },
    },
    dangerMode: false,
    }).then((willDelete) => {
        if (willDelete) {
          const sendGetRequest = async () => {
            try {
                const resp = await axios.put("update_status_edicion", data);
                console.log(resp.data);
                $('#btn-inform-file-cancel-edit').click();
                // messeg(resp.data.success,"success");
                List_cotizacion();
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };
        sendGetRequest();
        }
    })
});


$("#update-informe_cotizacion_file-button").on("click", function (e) {
  var url = document.getElementById('url_store_file_cotizacion');
  e.preventDefault();
  var formData = new FormData(document.getElementById("form-file-cotizacion-update"));
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
        messeg(msg.success,"success");
        var $el = $('.upd');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
        $('#btn-inform-file-cancel-edit').click();
        $('.upd').removeClass('is-invalid');
        List_cotizacion();
      }else{
        messeg(msg.error,"danger");
        $('.upd').addClass('is-invalid');
        $('.msg_file').text(msg.error);
      }

  }).fail(function(res){
      console.log(res)
  });


});

// funcion para subir adjuntas para el cliente al a probar una propuesta economica
// $('.file-cliente').on('change',function(){

// let c = document.getElementById('file');

// console.log(c);
// });
$("#informe_cotizacion_file-cliente").on("click", function (e) {
  e.preventDefault();
  const data={
    url : document.getElementById('url_store_file_cotizacion_cliente').value,
    checket:document.getElementById('option-final-cliente').checked,
    id_cotizacion:document.getElementById('id_cotizacion_cliente_file').value
  }
  const itere_data={
    user_id:$('#user_id').val(),
    id_cotizacion:data.id_cotizacion,
    titulo  : "Interes",
    interes:$('#txt_interes').val(),
    checket_interes: document.getElementById('checke_interes').checked
  }

const sendGetRequest = async () => {
  try {
      const resp = await axios.get("/informe/verificar_apertura_orden_servicio/"+data.id_cotizacion);
      console.log(resp.data);


      if (resp.data.hay_aper_orden_serv) {
        var formData = new FormData(document.getElementById("form-file-cotizacion-update-cliente"));
        // console.log(data);
        swal({
          title: "¡CUIDADO!",
          text:"¿Está seguro que deseas aprobar este informe de cotización?\r\nUna vez apruebe es porque el cliente acepto la propuesta economica segun la estructura de costo.",
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
                    if (data.checket) {

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
                      // console.log(msg);

                      if (msg.error == 403)
                      {
                         swal("Error 403",resp.data.error, "error");
                      }
                      else
                      {
                          aprobar_por(data.id_cotizacion,2);
                          $('#btn-inform-file-cancel-edit-cliente').click();
                          if (itere_data.checket_interes) {
                            add_interes(itere_data);
                          }
                      }



                  }).fail(function(res){
                      console.log(res)
                  });
                  }else{

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

                      if (msg.error == 403)
                      {
                         swal("Error 403",resp.data.error, "error");
                      }
                      else
                      {
                        if (itere_data.checket_interes) {
                          add_interes(itere_data);
                        }
                        aprobar_por(data.id_cotizacion,2);
                        $('#btn-inform-file-cancel-edit-cliente').click();
                      }



                  }).fail(function(res){
                      console.log(res)
                  });
                    // console.log("false");
                    // aprobar_por(data.id_cotizacion,2);
                    // $('#btn-inform-file-cancel-edit-cliente').click();
                    //   $('.upd').removeClass('is-invalid');
                  }

              }
          })
      }else{
        swal("Lo siento, Primero debes crear una Apertura De Orden De Servicio","", "error");
      }


  } catch (err) {
      // Handle Error Here
  }
};
sendGetRequest();



});


$("#informe_cotizacion_file-pendiente-cliente").on("click", function (e) {
  e.preventDefault();
  $('#btn_loader').addClass('fa fa-spin fa-spinner');
  const data={
    url : document.getElementById('url_store_file_cotizacion_cliente').value,
    // checket:document.getElementById('option-final-cliente').checked,
    id_cotizacion:document.querySelector('.id_cotizacion_cliente_file').value
  }
console.log(data);
var formData = new FormData(document.getElementById("form-file-cotizacion-pendiente-cliente"));
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
  List_cotizacion();
  $('#btn-inform-file-cancel-pendiente-cliente').click();
$('#btn_loader').removeClass('fa fa-spin fa-spinner')

}).fail(function(res){
  console.log(res)
});
});


//cancelar el modal para subir archivo
$("#btn-inform-file-cancel").on("click", function (e) {
  $('#file').removeClass('is-invalid');
  var $el = $('#file');
  $el.wrap('<form>').closest('form').get(0).reset();
  $el.unwrap();
});
// funcion para mostrar el informe suvido al servidor
function showFiles(id){


  const sendGetRequest = async () => {
    try {
        const resp = await axios.get("/get_data_file_cotizacion/" + id);
        console.log(resp.data);

        let cadena="";
              // Creamos array con los meses del año
          const meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
          // Creamos array con los días de la semana
          const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      if (resp.data=="") {
        $('#view_vacio_files_informe').show();
      }else{
        for (let i = 0; i < resp.data.length; i++) {
          const fecha = new Date(resp.data[i].created_at);
          // Construimos el formato de salida
          let g=  fecha.getUTCFullYear()+ '-' + meses[fecha.getMonth()] + '-' + fecha.getDate() ;
          cadena+=' <tr class="iten">';
          cadena+='<td class="w-282">';
          cadena+='<span class="text-secundary">'+g+'</span>';
          cadena+='</td>';
          cadena+='<td>';
          cadena+='<div class="media "><div class="media-body"><span>'+resp.data[i].name_file+'</span></div></div>';
          cadena+='</td>';
          cadena+='<td class="w-282">';
          cadena+='<span class="text-secundary">'+resp.data[i].nombre_user+'</span>';
          cadena+='</td>';
          cadena+='<td class="w-282">';
          cadena+='<a target="_blank" href="/'+resp.data[i].url+'"><span class="text-secundary"><i class="fa fa-folder-open"></i></span></a>';
          cadena+='</td>';
          cadena+='</tr>';

        }
        $('#view_vacio_files_informe').hide();
      }

        $("#lista_file_informe_cotizacion_view").html(cadena);
        // if (resp.data.success) {
        //     $("#codigo-producto").addClass('is-invalid');
        //     $("#codigo-producto").removeClass('is-valid');
        //     var c=`<div class="invalid-feedback"> camoiokj </div>`
        //     $("#code-ms").html('¡Ups! Este codigo ya existe');
        // }else{
        //     $("#code-ms").html('¡Excelente!');
        //     $("#codigo-producto").removeClass('is-invalid');
        //     $("#codigo-producto").addClass('is-valid');
        // }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
sendGetRequest();
$('.view_files_informe_cotizacion').modal('show');

console.log(id);

}

$('#btn-inform-file-view-cancelar').on('click', function (e) {
  $('.view_files_informe_cotizacion').modal('hide');
});

function showFile(id="",option=""){

  // $('.view_files_informe_cotizacion').modal('show');
  console.log("jsjsjsjsjs");
  var f = (option=="")?false:"cliente";
  var res = (id=="")?$('#id_cotizacion_form-file').val():id;

    $.ajax({
      url: "thesis/file/"+res+"/"+f,
      type: "get",
      dataType: "html",
      contentType: false,
      processData: false
  }).done(function(res){
        let data =JSON.parse(res)
      console.log(data.response);
      url = JSON.parse(res).response.url
      let name = JSON.parse(res).response.name
    $('#url_files_adjuntos').text(name);
    $('#url_files_adjuntos').attr('href', url);
    $('#id_file_adjunto').val(data.response.id);
      // console.log(url);
    //   window.open(url,'_blank');
  }).fail(function(res){
      console.log(res)
  });


}


$("#btn_delete_adjunto_file").on("click", function (e) {
    e.preventDefault();
    const data={
        id:document.getElementById('id_file_adjunto').value
      }
    console.log(data);
    swal({
        title: "¿Está seguro que deses eliminar el archivo?",
        icon: "info",
        buttons:{
            cancel: "Cancelar",
            catch: {
                text: "Eliminar",
            },
        },
        dangerMode: false,
        }).then((willDelete) => {
            if (willDelete) {

                const sendGetRequest = async () => {
                    try {
                        const resp = await axios.delete("/informe/delete_file_adjunto/"+data.id);
                        console.log(resp.data);
                        // messeg(resp.data.success,"success");
                        $('#file').val(null);
                        let che = document.getElementById('option-adjunto-update')
                        che.checked = false;
                        $('#btn-inform-file-cancel-update').click();

                        List_cotizacion();
                    } catch (err) {
                        // Handle Error Here
                        console.error(err);
                    }
                };
                sendGetRequest();

            }
        })


});


$("#btn_update_adjunto").on("click", function (e) {
    e.preventDefault();
    const data={
        url : document.getElementById('url_update_file_cotizacion_cliente').value,
        checket:document.getElementById('option-adjunto-update').checked,
        id:document.getElementById('id_file_adjunto').value
      }
      console.log(data);
    var formData = new FormData(document.getElementById("form_file_adjunto_clien_update"));
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
        $('#file').val(null);
        let che = document.getElementById('option-adjunto-update')
        che.checked = false;
        $('#btn-inform-file-cancel-update').click();
        $('#view-file-cliente-adjunto').hide();
        $('.btn_update_file').hide();
        if (msg.success==200) {

        }else{

        }
    }).fail(function(res){
        console.log(res)
    });
});

$('#view-file-cliente-adjunto').hide();
$('.btn_update_file').hide();

var checkbox_file_update = document.getElementById('option-adjunto-update');
checkbox_file_update.addEventListener("change", validaCheckboxclienteFileUpdate, false);
function validaCheckboxclienteFileUpdate()
{
  var checked = checkbox_file_update.checked;
  console.log(checked);
  if(checked){
    $("#view-file-cliente-adjunto").show();
    $('.btn_update_file').show(100);
  }else{
    $("#view-file-cliente-adjunto").hide();
    $('.btn_update_file').hide(100);
  }
}

$("#view-file-cliente").hide();
var checkbox_final_cot_cliente = document.getElementById('option-final-cliente');
checkbox_final_cot_cliente.addEventListener("change", validaCheckboxcliente, false);
function validaCheckboxcliente()
{
  var checked = checkbox_final_cot_cliente.checked;
  console.log(checked);
  if(checked){
    $("#view-file-cliente").show();
  }else{
    $("#view-file-cliente").hide();
  }
}


$("#checked-alert").hide();
var checkbox_final_cot = document.getElementById('finalizar_cotizacion');
checkbox_final_cot.addEventListener("change", validaCheckboxFin, false);
function validaCheckboxFin()
{
  var checked = checkbox_final_cot.checked;
  console.log(checked);
  if(checked){
    $("#checked-alert").show();
  }else{
    $("#checked-alert").hide();
  }
}

$("#box_interes").hide();
var checkbox_ = document.getElementById('checke_interes');
checkbox_.addEventListener("change", validaCheckbox, false);
function validaCheckbox()
{
  var checked = checkbox_.checked;
  console.log(checked);
  if(checked){
    $("#box_interes").show();
  }else{
    $("#box_interes").hide();
  }
}


$("#btn-cancelar-seguimientos").on("click", function (e) {
  $('#titulo').val("");
  $('#descripcion').val("");
});

// metodo para agregar seguimientos
$("#create-seguimientos-button").on("click", function (e) {
  e.preventDefault();
  const data ={
    user_id:$('#user_id').val(),
    id_cotizacion:$('#id_cotizacion_form').val(),
    titulo  : $('#titulo').val(),
    descripcion:$('#descripcion').val(),
    finalizar_cotizacion: document.getElementById('finalizar_cotizacion').checked
  }


  console.log(data);


  if (data.finalizar_cotizacion) {
    console.log("finalizado");
    clonar_inform_cotizaci(data.id_cotizacion);


    // var url = "/api/seguimiento/store";
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
    //         if (response.status==200) {
    //         // console.log(response);
    //         messeg(response.success,"success");
    //           $('#btn-cancelar-seguimientos').click();

    //           const datas = {
    //             id_cotizacion:$('#id_cotizacion_form').val(),
    //             option:2
    //           }
    //             const sendGetRequest = async () => {
    //                 try {

    //                     const resp = await axios.put("/aprobacion_informe/",datas);
    //                     console.log(resp.data);
    //                     List_cotizacion();
    //                     // messeg(resp.data.success,"success");
    //                 } catch (err) {
    //                     // Handle Error Here
    //                 }
    //             };
    //             sendGetRequest();




    //         }else{
    //           if (!response.errors.titulo=="") {
    //             messeg(response.errors.titulo[0],"danger");
    //             $("#titulo").addClass('is-invalid');

    //            }

    //            if (!response.errors.descripcion=="") {
    //             messeg(response.errors.descripcion[0],"danger");
    //             $("#descripcion").addClass('is-invalid');

    //            }

    //         }

    //   });

  }else{
    console.log("aun no");
    var url = "/api/seguimiento/store";
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

            if (response.status==200) {
            // console.log(response);
            messeg(response.success,"success");
              $('#btn-cancelar-seguimientos').click();
            }else{
              if (!response.errors.titulo=="") {
                messeg(response.errors.titulo[0],"danger");
                $("#titulo").addClass('is-invalid');

               }

               if (!response.errors.descripcion=="") {
                messeg(response.errors.descripcion[0],"danger");
                $("#descripcion").addClass('is-invalid');

               }

            }

      });
  }
  // const sendGetRequest = async () => {
  //     try {
  //         const resp = await axios.get("/get_proyect_show/" + e.value);
  //     } catch (err) {
  //         // Handle Error Here
  //         console.log(err);
  //     }
  // };
  // sendGetRequest();
});

function add_interes(data) {

  var url = "/api/agregar_interes";
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
          $('#add_box_interes').hide();
          $('#box_interes').hide();
          $('#txt_interes').val(""),
          document.getElementById('checke_interes').onchecked

    });
  //   const sendPostRequest = async () => {
  //     try {

  //         const resp = await axios.post("/agregar_interes/",data);
  //         console.log(resp.data);
  //         $('#add_box_interes').hide();
  //         $('#box_interes').hide();
  //         // List_cotizacion();
  //         // messeg(resp.data.success,"success");
  //     } catch (err) {
  //         // Handle Error Here
  //     }
  // };
  // sendPostRequest();
}

function input_validate(e) {
  // console.log(e.value.length);
  if (e.value.length>0) {
    $("#titulo").addClass('is-valid').removeClass('is-invalid');

  }else{
    $("#titulo").addClass('is-invalid').removeClass('is-valid');

  }
}

function ver_nulado(id) {

  url = "/view_contenido_nulado/"+id;
    var win = window.open(url, '_blank');
        // Cambiar el foco al nuevo tab (punto opcional)
     win.focus();
}

function aprobar_por(id,option) {
  const data = {
    id_cotizacion:id,
    option
  }
  // var r = confirm("¡CUIDADO!\r\n¿Está seguro que deseas aprobar este informe de cotización?.\r\nNo podrás revertir los cambios.");
  // if (r) {
    const sendGetRequest = async () => {
        try {

            const resp = await axios.put("/aprobacion_informe/",data);
            console.log(resp.data);

            if (resp.data.status == 403)
            {
               swal("Error 403",resp.data.error, "error");
            }
            else
            {
              List_cotizacion();
              messeg(resp.data.success,"success");
            }


        } catch (err)
        {

        }
    };
    sendGetRequest();
  // }
}

function redirec_cot(id) {
  setInterval(function () {
            url = "/cost-structure/"+id+"/view";
            $(location).attr('href',url);
  }, 1000);
}

function rediret_previews(id) {
  setInterval(function () {
    url = "/cost-structure/"+id+"/previews";
    $(location).attr('href',url);
}, 1000);
}

function edit_estructura(id) {
  const data = {
    id_cotizacion:id
  }
  const sendGetRequest = async () => {
    try {

        const resp = await axios.put("edicion_informe_cotizacion",data);
        console.log(resp.data);
        if (resp.data.status==200) {
          url = "/cost-structure/"+id+"/view";
          $(location).attr('href',url);
        }else{
          swal({
            title: "¡HAY UN PROBLEMA!",
            text:resp.data.success,
            icon: "warning",
            buttons:{
                cancel: "Cerrar",

            },
            dangerMode: false,
            })
        }
        // List_cotizacion();

        // messeg(resp.data.success,"success");
    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();
}

function redirec_url(id) {
  setInterval(function () {
    url = "/informe/show/"+id+"/add_content";
    $(location).attr('href',url);
}, 1000);
}
function redirec_url_clon(id) {
  setInterval(function () {
    url = "/informe/show/"+id+"/clon";
    $(location).attr('href',url);
}, 1000);
}
function sow_edit_cot_infor(id) {
console.log(id);
    url = "/informe/show/"+id+"/seguimientos";
   $(location).attr('href',url);
}

function ver_apertura_orden_servicio(id) {
  console.log(id);

  const sendGetRequest = async () => {
    try {
        const resp = await axios.get("/informe/verificar_apertura_orden_servicio/"+id);
        console.log(resp.data);
      if (resp.data.hay_aper_orden_serv) {


        url = "/informe/apertura-orden-servicio/"+id+"/edit";
        $(location).attr('href',url);
      }else{
        swal("Error, Aún No Has Creado La Apertura De Orden De Servicio.","", "error");
      }


    } catch (err) {
      // Handle Error Here
    }
    };
    sendGetRequest();
}


function cierre_comercial(id) {
  console.log(id);

  swal({
    title: "¡CUIDADO!",
    text:"¿Está seguro que deseas hacer el cierre comercial?.\r\nNo podrás revertir los cambios.",
    icon: "info",
    buttons:{
        cancel: "Cancelar",
        catch: {
            text: "Aceptar",
        },
    },
    dangerMode: false,
    }).then((willDelete) => {
        if (willDelete) {
            const sendGetRequest = async () => {
              try {
                  const resp = await axios.get("/informe/cierre_comercial/"+id);
                  console.log(resp.data);
                if (resp.data.status==200) {

                  List_cotizacion();
                  // url = "/informe/apertura-orden-servicio/"+id+"/edit";
                  // $(location).attr('href',url);
                }else{
                  swal(resp.data.error,"", "error");
                }


              } catch (err) {
                // Handle Error Here
              }
              };
              sendGetRequest();
        }
    })


}

function clonar_inform_cotizaci(id_cotizacion) {
  // console.log(id_cotizacion);
  swal({
    title: "¡CUIDADO!",
    text:"¿Está seguro que el cliente no acepto la propuesta económica?.\r\nNo podrás revertir los cambios.",
    icon: "info",
    buttons:{
        cancel: "Cancelar",
        catch: {
            text: "Aceptar",
        },
    },
    dangerMode: false,
    }).then((willDelete) => {
        if (willDelete) {
          const sendGetRequest = async () => {
            try {

                const resp = await axios.get("/no_aceptada_informe_cotizacion/"+id_cotizacion);
                console.log(resp.data);
                List_cotizacion();
                $('#btn-cancelar-seguimientos').click();

                messeg(resp.data.success,"success");
            } catch (err) {
                // Handle Error Here
            }
        };
        sendGetRequest();
        }
    })
}

function anular_informe_cot(id) {
  swal({
    title: "¡CUIDADO!",
    text:"¿Está seguro que deseas anular este informe de cotización?.\r\nNo podrás revertir los cambios.",
    icon: "info",
    buttons:{
        cancel: "Cancelar",
        catch: {
            text: "Anular",
        },
    },
    dangerMode: false,
    }).then((willDelete) => {
        if (willDelete) {
          const sendGetRequest = async () => {
            try {

                const resp = await axios.get("/anular_informe_cotizacion/"+id);
                console.log(resp.data);
                List_cotizacion();
                messeg(resp.data.success,"success");
            } catch (err) {
                // Handle Error Here
            }
        };
        sendGetRequest();
        }
    })

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

function generar_pdf(cotizacion)
{
    let url = '/generar_pdf_cotizacion/'+cotizacion;

    window.open(url, '_blank').focus();
}
