$(document).ready(function () {
    get_list_estructura();
    $('#box_file_factura').hide();
    $('#view_vacio_list').show();

    
    $('#txt_descuento_fact').attr("readonly","readonly");
    $('#txt_iva_fact').attr("readonly","readonly");

    moneda_comp("COP")
});

$('#estructura_cost').on('change', function () { 
    const data={
      id_cotizacion: $('#estructura_cost').val(),
    }
    console.log(data);
    // if (data.id_cotizacion=='null') {
    //     $('#box_file_factura').hide();
    //     $('#nombre_cliente_factur').val("");
    //     $('#view_vacio_list').show();
        
    // }
    list_apus(data.id_cotizacion);
    $('#id_estructura').val(data.id_cotizacion);
});




function get_list_estructura() {
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/get_cotizacion_all");
            console.log(resp.data);
            var cadena = "";
            cadena += '<option value="null">Selecciona una estructura de costo</option>';
            for (let i = 0; i < resp.data.length; i++) {
                // console.log(resp.data)
                cadena +=
                    '<option value="' +
                    resp.data[i].id +
                    '">' +
                    resp.data[i].codigo_cot +
                    " | "+resp.data[i].pro_nombre+" </option>";
            }
            $(".select_estructura").html(cadena);
            
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

function list_apus(id) {
    const sendGetRequest = async () => {
        try {
            let f="";
            const resp = await axios.get("/get_cotizacion/"+id);
            console.log(resp.data);
            if (resp.data.vacio) {
                $('#box_file_factura').hide();
                $('#nombre_cliente_factur').val("");
                $('#view_vacio_list').show();

                var table = "";
                let n=0;
                let sum_g=0;
                for (let i = 0; i < resp.data.apus.length; i++) {
                    n++;
                    let precio_tota=resp.data.apus[i].tmpapu_suma_general*resp.data.apus[i].cantidad;
                    sum_g+=precio_tota;
                    table +='<tr>';
                    table +='<td class="w-282">';
                    table +='<span>'+n+'</span>';
                    table +='</td>';
            
                    table +='<td>'; 
                    table +=`<div class="row w-322 option-editar"  id="form-editar-descriccion${i}">
                    <div class="col-9 col-md-9">

                            <input  type="text" id="descripcion_apu${i}" value="${resp.data[i].tmpapu_descripcion}"  class="form-control" />
                    </div>
                    <div class="col-3 col-md-3 px-0 ">
                        <div class="row">
                            <div class="col-12 col-md-6 px-1">
                                <div class="setting-success-p" onclick="update_descrpcion_apu(${resp.data[i].id},${i})" title="Editar"><i class="fa fa-check"></i></div>
            
                            </div>
                            <div class="col-12 col-md-6 px-0">
                                <div class="setting-danger-p" onclick="option_adit(false,${i})" title="Cancelar"><i class="fa fa-times"></i></div>
            
                            </div>
                        </div>
                    </div>
                </div>`;
                    table +='<div class="media iten-contenid"><div class="media-body"><a href="javascript:void(0"><span>'+resp.data.apus[i].tmpapu_descripcion+'</span></a></div></div>';
                    table +='</td>';
                    table +='<td class="w-282">';
                    table +='<a href="javascript:void(0)"><span class="text-secundary">'+resp.data.apus[i].cantidad+'</span></a>';
                    table +='</td>';
            
                    table +='<td>';
                    table +='<div >'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.apus[i].tmpapu_suma_general)+'</div>';
                    table +='</td>';
                    table +='<td>';
                    table +='<div >'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(precio_tota)+'</div>';
                    table +='</td>';
            
            
                    // table +='<td class="w-282">';
                    // table +='<span id="valor_decuento">0</span>';
                    // table +='</td>';
                    // table +='<td class="w-282">';
                    // table +='<div >0</div>';
                    // table +='</td>';
            
                    table +='<td>';
                    table +=' <button class="btn-option-damger " onclick="delete_apus('+resp.data.apus[i].id+');" title="Eliminar partida"><i class="fa fa-trash-o"></i></button>';
                    table +='</td>';
                    table +=' </tr>';
            
                
                }
            
                $('#sub_total1').text("$"+sum_g.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
                $('#sub_total2').text("$"+sum_g.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
                $('#total_general_factur').text("$"+sum_g.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
                $('#sub_total1_inmpu').val(sum_g);
                $(".list_apus").html(table);
            }else{
                $('#box_file_factura').show();
                $('#nombre_cliente_factur').val(resp.data.cotizacion[0].clie_nombre);
               
    
    //------------------------------------------------------tabla de partidas ------------------------------------------------------   
                    let n=0;
                    let sum_g=0;
                    for (let i = 0; i < resp.data.apus.length; i++) {
                        n++;
                        let precio_tota=resp.data.apus[i].tmpapu_suma_general*resp.data.apus[i].cantidad;
                        sum_g+=precio_tota;
                        table +='<tr class="iten">';
                        table +='<td class="w-282">';
                        table +='<span>'+n+'</span>';
                        table +='</td>';
                
                        table += `<td class=" px-2">
                    <div class="row w-322 option-editar" style="display: none;" id="form-editar-descriccion${i}">
                    <div class="col-9 col-md-9">

                            <input  type="text" id="descripcion_apu${i}" value="${resp.data.apus[i].tmpapu_descripcion}"  class="form-control" />
                    </div>
                    <div class="col-3 col-md-3 px-0 ">
                        <div class="row">
                            <div class="col-12 col-md-6 px-1">
                                <div class="setting-success-p" onclick="update_descrpcion_apu(${resp.data.apus[i].id},${i})" title="Editar"><i class="fa fa-check"></i></div>
            
                            </div>
                            <div class="col-12 col-md-6 px-0">
                                <div class="setting-danger-p" onclick="option_adit(false,${i})" title="Cancelar"><i class="fa fa-times"></i></div>
            
                            </div>
                        </div>
                    </div>
                </div>

                    <div class="row option-edit${i}"  onmouseout="btn_editar(false,${i})" onmouseover="btn_editar(true,${i})">
                    <div class="col-8 col-md-10 iten-contenid" id="descripcion_apu">${resp.data.apus[i].tmpapu_descripcion}</div>
                    <div class="col-4 col-md-2 ocult-btn" id="btn-editar-descrccion${i}"><button class="btn-option-warney" onclick="option_adit(true,${i})" title="editar descripción"><i class="fa fa-pencil-square-o"></i></button>
                    </div>
                    </div>
                    </div>
                    </td>`;
                        table +='<td class="w-282">';
                        table +='<a href="javascript:void(0)"><span class="text-secundary">'+resp.data.apus[i].cantidad+'</span></a>';
                        table +='</td>';
                
                        table +='<td>';
                        table +='<div >'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.apus[i].tmpapu_suma_general)+'</div>';
                        table +='</td>';
                        table +='<td>';
                        table +='<div >'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(precio_tota)+'</div>';
                        table +='</td>';
                
                
                        // table +='<td class="w-282">';
                        // table +='<span id="valor_decuento">0</span>';
                        // table +='</td>';
                        // table +='<td class="w-282">';
                        // table +='<div >0</div>';
                        // table +='</td>';
                
                        table +='<td>';
                        table +=' <button class="btn-option-damger "  onclick="delete_apus('+resp.data.apus[i].id+');" title="Anular facturas"><i class="fa fa-trash-o"></i></button>';
                        table +='</td>';
                        table +=' </tr>';
                
                    
                    }
                
                    $('#sub_total1').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sum_g))
                    $('#sub_total2').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sum_g))
                    $('#total_general_factur').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sum_g))
                    $('#total_general_factur_input').val(sum_g);
                    $('#sub_total1_inmpu').val(sum_g);
                    $('#sub_total1_inmpu_mod').val(sum_g);
                    $('#sub_total1_inmpu_enviar').val(sum_g);
                    $('#sub_total2_inmpu').val(sum_g);
                    $('#sub_total2_inmpu_comp').val(sum_g);

                    $(".list_apus").html(table);
    
        //---------------------------------------------------------------end tabla de partidas---------------------------------------------------------------
                // list_apus(resp.data.apus);
                $('#view_vacio_list').hide();
    
                $('#txt_descuento_fact').removeAttr("readonly","readonly");
                $('#txt_iva_fact').removeAttr("readonly","readonly");
                $('#viwe_file_adjunto').hide();
                // aviso_alert(true,'icon_adjun');
                    if (resp.data.file_cotizacion_cliente=="") {
                        $('#viwe_file_adjunto').hide();
                    }else{
                        $('#view_file_adjunto').attr('href', "/"+resp.data.file_cotizacion_cliente[0].url);
                        $('#view_file_adjunto').attr('title', resp.data.file_cotizacion_cliente[0].name_file);
                        $('#adjunto_cliente').val(resp.data.file_cotizacion_cliente[0].url)
                        $('#view_file_adjunto').attr('target','_blank');
                        $('#viwe_file_adjunto').show();
                    }
               
                    if (resp.data.file_cotizacion_personal=="") {
                        
                    }else{
                        $('#view_file_informe').attr('href', "/"+resp.data.file_cotizacion_personal.url);
                        $('#view_file_informe').attr('title', resp.data.file_cotizacion_personal.name_file);
                        $('#informe_estructura').val(resp.data.file_cotizacion_personal.url)
                    }
                // for (let i = 0; i < resp.data.file_cotizacion.length; i++) {
                //     if (!resp.data.file_cotizacion[i].pertenece=='cliente') {
                //         let url = $('#url_informe').val();
                //         $('#view_file_adjunto').attr('href',url);
                //     }
                //     if (resp.data.file_cotizacion[i].pertenece=='cliente') {
                //         $('#view_file_adjunto').attr('href', "/"+resp.data.file_cotizacion[i].url);
                //         $('#view_file_adjunto').attr('title', resp.data.file_cotizacion[i].name_file);
                //         $('#adjunto_cliente').val(resp.data.file_cotizacion[i].url)
                //         $('#view_file_adjunto').attr('target','_blank');
                //         $('#viwe_file_adjunto').show();
                        
                        
                //     }else{
                        
                //         $('#view_file_informe').attr('href', "/"+resp.data.file_cotizacion[i].url);
                //         $('#view_file_informe').attr('title', resp.data.file_cotizacion[i].name_file);
                //         $('#informe_estructura').val(resp.data.file_cotizacion[i].url)
                        
                //     }

                   
                   
                // }
               
            }

            
          
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
    
}


function aviso_alert(bool,c) {
    if (bool) {
    $('#'+c).addClass('text-danger');
    }else{
    $('#'+c).removeClass('text-danger').addClass('txt-primary');
    }
}


function option_adit(e,i) {
    if (e) {
      
        $(".option-edit"+i).hide();
        // $("#view-structu-cost-butom").hide();
        $("#form-editar-descriccion"+i).show(); 
        
    }else{
        $("#form-editar-descriccion"+i).hide();
        $(".option-edit"+i).show();
    }
}
function btn_editar(e,i) {
    // console.log(e);
    if (e) {
          
        $("#btn-editar-descrccion"+i).removeClass('ocult-btn');
        
    }else{
        $("#btn-editar-descrccion"+i).addClass('ocult-btn');
    }
}

function update_descrpcion_apu(id_apu,i) {
    const data = {
        descriccion_apu:$("#descripcion_apu"+i).val(),
        id:id_apu
    }
    console.log(data);

    const sendGetRequest = async () => {
        try {
            const resp = await axios.put("/update_descripcion_apu",data); 
            console.log(resp.data); 

            list_apus($('#id_estructura').val());                 
     
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

// $('.moneda').on('change', function (e) { 

// });

function cal_descuento(e) {
    let valor=0;
    if (e.value=="") {
        valor=0
    }else{
        valor=e.value
    }
    if (valor < 0 || valor > 100)
    {
        $('#txt_descuento_fact').addClass('is-invalid')
        $('#msg_descuento').text("El porcentaje es de 0 a 100");
    }else{
        $('#txt_descuento_fact').removeClass('is-invalid')
    }
    let total=$('#sub_total1_inmpu').val();
    var desc_pre = (parseFloat(valor)*parseFloat(total))/100;
    $('#valor_descuento').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: $('#type_moneda').val() }).format(desc_pre))
    $('#valor_descuento_factura').val(desc_pre);

    let total2=parseFloat(total)-parseFloat(desc_pre);
    $('#sub_total2').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: $('#type_moneda').val() }).format(total2))
    $('#sub_total2_inmpu').val(total2);
    // $('#total_general_factur').text("$"+total2.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
    // $('#total_general_factur_input').val(total2);
    let iv= ($('#txt_iva_fact').val()=="")?0:$('#txt_iva_fact').val();
    let iva = (parseFloat(iv)/100)*parseFloat(total2);
    let total_general = parseFloat(total2)+iva;
    $('#valor_iva').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: $('#type_moneda').val() }).format(iva))
    $('#valor_iva_factura').val(iva);

    $('#total_general_factur').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: $('#type_moneda').val() }).format(total_general))
    $('#total_general_factur_input').val(total_general);
    console.log(total_general);
    console.log(desc_pre);
}

function cal_iva(e) {
    let total2=$('#sub_total2_inmpu').val();
    let valor=0;
    if (e.value=="") {
        valor=0
    }else{
        valor=e.value
    }
    if (valor < 0 || valor > 100)
    {
        $('#txt_iva_fact').addClass('is-invalid')
        $('#msg_iva').text("El porcentaje es de 0 a 100");
    }else{
        $('#txt_iva_fact').removeClass('is-invalid')
    }
    let iva = (parseFloat(valor)/100)*parseFloat(total2);
    let total_general = parseFloat(total2)+iva;
    $('#valor_iva').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: $('#type_moneda').val() }).format(iva))
    $('#valor_iva_factura').val(iva);

    $('#total_general_factur').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: $('#type_moneda').val() }).format(total_general))
    $('#total_general_factur_input').val(total_general);
    console.log(total_general);

}

function moneda_usd(mond) {
    // let f = (value=="")?"proyecto":value;
    $('#trm_valor').removeAttr("readonly","readonly");

    input = document.querySelector('#trm_valor');
    input.addEventListener('keyup', e =>{
        let total_g= $('#sub_total1_inmpu_mod').val();
        let trm = 0;
        if (input.value=="") {
            trm=1;
            $('#sub_total1_inmpu').val(total_g);
        }else{
            trm=input.value;
        }

        let valor_usd= parseFloat(total_g)/parseFloat(trm);
        console.log("usd:"+valor_usd);
        $('#sub_total1').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: mond }).format(valor_usd))
        $('#sub_total1_inmpu').val(valor_usd);
        $('#sub_total2').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: mond }).format(valor_usd))
        $('#sub_total2_inmpu').val(valor_usd);
        $('#total_general_factur').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(valor_usd))
        $('#total_general_factur_input').val(valor_usd);

        let h = ($('#txt_descuento_fact').val()=="")?0:$('#txt_descuento_fact').val();

        var desc_pre = (parseFloat(h)*parseFloat(valor_usd)/100);
        $('#valor_descuento').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: mond }).format(desc_pre))
        $('#valor_descuento_factura').val(desc_pre);
        
        let y = ($('#txt_iva_fact').val()=="")?0:$('#txt_iva_fact').val();

        let iva = (parseFloat(y)/100)*parseFloat(valor_usd);
        let total_general = parseFloat(valor_usd)+iva;
        $('#valor_iva').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: mond }).format(iva))
        $('#valor_iva_factura').val(iva);
        $('#total_general_factur').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: mond }).format(total_general))
        $('#total_general_factur_input').val(total_general);
    });
    $('#type_moneda').val(mond);
}

function moneda_eur(mond) {
    $('#trm_valor').removeAttr("readonly","readonly");
    // let f = (value=="")?"proyecto":value;
    input = document.querySelector('#trm_valor');
    input.addEventListener('keyup', e =>{
        let total_g= $('#sub_total1_inmpu_mod').val();
        let trm = 0;
        if (input.value=="") {
            trm=1;
            $('#sub_total1_inmpu').val(total_g);
        }else{
            trm=input.value;
        }

        let valor_usd= parseFloat(total_g)/parseFloat(trm);
        console.log("usd:"+valor_usd);
        $('#sub_total1').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(valor_usd))
        $('#sub_total1_inmpu').val(valor_usd);
        $('#sub_total2').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(valor_usd))
        $('#sub_total2_inmpu').val(valor_usd);
        $('#total_general_factur').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(valor_usd))
        $('#total_general_factur_input').val(valor_usd);

        let h = ($('#txt_descuento_fact').val()=="")?0:$('#txt_descuento_fact').val();

        var desc_pre = (parseFloat(h)*parseFloat(valor_usd)/100);
        $('#valor_descuento').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(desc_pre))
        $('#valor_descuento_factura').val(desc_pre);

        let y = ($('#txt_iva_fact').val()=="")?0:$('#txt_iva_fact').val();

        let iva = (parseFloat(y)/100)*parseFloat(valor_usd);
        let total_general = parseFloat(valor_usd)+iva;
        $('#valor_iva').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(iva))
        $('#valor_iva_factura').val(iva);
        $('#total_general_factur').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(total_general))
    
        $('#total_general_factur_input').val(total_general);
    });
    $('#type_moneda').val(mond);
}

function moneda_comp(mond) {
    $('#type_moneda').val(mond);
    // let f = (value=="")?"proyecto":value;
    input = document.querySelector('#trm_valor');
    // input.addEventListener('keyup', e =>{
        let total_g= $('#sub_total1_inmpu').val();
        $('#trm_valor').attr("readonly","readonly");
        let trm = 0;
        if (input.length<0) {
            trm=0;
            $('#sub_total1_inmpu').val(total_g);
        }else{
            trm=input.value="";
        }
       
        // let valor_usd= parseFloat(total_g)/parseFloat(trm);
        // console.log("usd:"+valor_usd);
        // $('#sub_total1').text("$"+valor_usd.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
        // $('#sub_total1_inmpu').val(valor_usd);
        
        
        let total=($('#sub_total2_inmpu_comp').val()=="")?0:$('#sub_total2_inmpu_comp').val();

        $('#sub_total1').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(parseFloat(total)))
        $('#sub_total1_inmpu').val(total);

        let d=($('#txt_descuento_fact').val()=="")?0:$('#txt_descuento_fact').val();
        var desc_pre = (parseFloat(d)*parseFloat(total))/100;
        $('#valor_descuento').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(desc_pre))
        $('#valor_descuento_factura').val(desc_pre);
    
        let total2=parseFloat(total)-parseFloat(desc_pre);
        $('#sub_total2').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(total2))
        $('#sub_total2_inmpu').val(total2);
        $('#total_general_factur').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(total2))
        $('#total_general_factur_input').val(total2);
        let i=($('#txt_iva_fact').val()=="")?0:$('#txt_iva_fact').val();
        let iva = (parseFloat(i)/100)*parseFloat(total2);
        let total_general = parseFloat(total2)+iva;
        $('#valor_iva').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(iva))
        $('#valor_iva_factura').val(iva);
        $('#total_general_factur').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(total_general))
        $('#total_general_factur_input').val(total_general);
        
    // });
    console.log(mond);
    $('#type_moneda').val(mond);
}

$("#add_factura").on("click", function (e) {

    const data={
      id_estructura: $('#id_estructura').val(),
      metodo_pago: $('#metodo_pago').val(),
      type_moneda : document.getElementById('type_moneda').value,
      trm_valor :document.getElementById('trm_valor').value,
      direccion: $('#direccion').val(),
      observacion: $('#observacion').val(),
      adjunto_cliente: $('#adjunto_cliente').val(),
      informe_estructura: $('#informe_estructura').val(),
      descuento_fact: $('#txt_descuento_fact').val(),
      iva_fact: $('#txt_iva_fact').val(),
      total_general:$('#total_general_factur_input').val(),
      fecha_venci:$('#fecha_vencimiento').val(),
      valor_iva:$('#valor_iva_factura').val(),
      valor_desc:$('#valor_descuento_factura').val(),
      id_user_au:$('#id_user_aut').val(),
    }

if (data.metodo_pago=="") {
    $('#metodo_pago').addClass('is-invalid');
}else{
    $('#metodo_pago').removeClass('is-invalid').addClass('is-valid');
}

if (data.direccion=="") {
    $('#direccion').addClass('is-invalid');
} else {
    $('#direccion').removeClass('is-invalid').addClass('is-valid');
}

if (data.iva_fact=="") {
    $('#txt_iva_fact').addClass('is-invalid');
    $('#msg_iva').text("El campo es requerido.");
} else {
    $('#txt_iva_fact').removeClass('is-invalid').addClass('is-valid');
}

if (data.fecha_venci=="") {
    $('#fecha_vencimiento').addClass('is-invalid');
} else {
    $('#fecha_vencimiento').removeClass('is-invalid').addClass('is-valid');
}

 if (data.metodo_pago==""||data.direccion==""||data.iva_fact==""||data.fecha_venci=="") {
    //  $('#metodo_pago').addClass('is-invalid');
    //  $('#direccion').addClass('is-invalid');
    messeg("!Hups¡ Tienes algun campo vacio.",'danger');
     return false;
 }
 $('#add_factura').attr('disabled','true');
  console.log(data);
  $('#btn_loader').addClass('fa fa-spin fa-spinner');
  $('#add_factura').text('Espere..');
  var url = "/api/facturas/store";
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
        //   console.log(response);
          if (response.status==200) {
            messeg(response.success,'success');
            setInterval(function () {
                $('#btn_loader').removeClass('fa fa-spin fa-spinner');
              url = "/facturas";
              $(location).attr('href',url);
             }, 2000);
          }else{
            messeg(response.error,'danger');
            $('#btn_loader').removeClass('fa fa-spin fa-spinner');
            if (response.errors.direccion[0].length>0) {
                $('#direccion').addClass('is-invalid');
            }
            if (response.errors.metodo_pago[0].length>0) {
                $('#metodo_pago').addClass('is-invalid');
            }
            $('#add_factura').removeAttr('disabled','true');
          }

        //    console.log(response.errors);
        //   if (response.status==404) {
        //     if (response.campo) {
        //       $("#code").addClass('is-invalid');
        //     }
        //     if (response.list=='vacio') {
        //       $(".iten_v").hide();
        //       $(".error_list_iten").show();
        //       let i=0;
        //       const h = setInterval(function () {
        //         i++
        //         $(".iten_v").show();
        //         $(".error_list_iten").hide();
        //         if (i=1) {
        //           clearInterval(h);
        //           }
        //        }, 6000);
        //     }
        //     messeg(response.success,'danger');
        //   }
      });

});


function delete_apus(id) {
    swal({  
        title: "¡CUIDADO!",
        text:"\n¿Está seguro que desea eliminar esta partida?.\r\nNo podrás revertir los cambios.",
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
                    
                        const resp = await axios.delete("/delete_apus/"+id);
                        console.log(resp.data);
                        if (resp.data.status==200) {
                            messeg(resp.data.success,"success");
                            list_apus($('#id_estructura').val()); 
                        }
                    } catch (err) {
                        // Handle Error Here
                    }
                };
                sendGetRequest();
            } 
        }) 
}