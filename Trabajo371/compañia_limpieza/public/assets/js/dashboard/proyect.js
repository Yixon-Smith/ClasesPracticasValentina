$(document).ready(function () {
    list_proyectos();
    // list_proyectos_inicio();
    // list_proyectos_ejecucion();
    // list_proyectos_prueba();
    // list_proyectos_entregado();

    $("#dato").keypress(function(e) {
        if(e.which == 13) {
          obtenerDatos();
        }
      });
});



$('.btn_proyecto_all').on('click',()=>{
    console.log("All");
    list_proyectos();
});

$('.btn_proyecto_inicio').on('click',()=>{
    console.log("iniciar");
    list_proyectos_inicio();
});

$('.btn_proyecto_ejecucion').on('click',()=>{
    console.log("ejecucuion");
    list_proyectos_ejecucion();
});

$('.btn_proyecto_prueba').on('click',()=>{
    console.log("prueba");
    list_proyectos_prueba();
});

$('.btn_proyecto_entregado').on('click',()=>{
    console.log("entregado");
    list_proyectos_entregado();
});

function btn_editar(e,i,pos) {
    // console.log(e);
    if (e) {
          
        $("#"+pos+"btn-editar-descrccion"+i).removeClass('ocult-btn');
        
    }else{
        $("#"+pos+"btn-editar-descrccion"+i).addClass('ocult-btn');
    }
}
function option_adit_precio(e) {
    if (e) {
      
        $(".option-edit-precio").hide();
        // $("#view-structu-cost-butom").hide();
        $("#"+id_apu+"form-editar-precio-product").show(); 
        
    }else{
        $("#"+id_apu+"form-editar-precio-product").hide();
        $(".option-edit-precio").show();
    }
}
function option_adit(e,i,pos) {
    if (e) {
      
        $("."+pos+"option-edit"+i).hide();
        // $("#view-structu-cost-butom").hide();
        $("#"+pos+"form-editar-descriccion"+i).show(); 
        
    }else{
        $("#"+pos+"form-editar-descriccion"+i).hide();
        $("."+pos+"option-edit"+i).show();
    }
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
        '<i class="fa fa-bell-o"></i><strong>!Hoops¡</strong> ' +m+
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

function update_descrpcion_apu(id,i,pos) {
    const data = {
        porc:$("#"+pos+"porcentaj"+i).val(),
        id:id
    }
    console.log(data);
    // var  id_cotizacion =parseInt($("#id_cotizacion").val());
    const sendGetRequest = async () => {
        try {
            const resp = await axios.put("operaciones/update_porc_avance",data);  
            console.log(resp.data); 
            if (resp.data.status==200) {
                
                list_proyectos_inicio();
                switch (pos) {
                    case 0:
                        list_proyectos();                  
                        break;                        
                    case 2:
                        list_proyectos_ejecucion();             
                        break;
                    case 3:
                        list_proyectos_prueba();             
                        break;
                    case 4:
                        list_proyectos_entregado();             
                        break; 
                    case 5:
                        list_proyectos_finalizado();             
                        break; 

                    default:
                        break;
                }

            }else if (resp.data.status==404) {
                messeg("dsd","danger");
            }     
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}


function soloNumeros(e){
    tecla = (document.all) ? e.keyCode : e.which;
//Tecla de retroceso para borrar, siempre la permite
    if (tecla==8){
    return true;
    }  
// Patron de entrada, en este caso solo acepta numeros
    patron =/[0-9]/;
    tecla_final = String.fromCharCode(tecla);


    return patron.test(tecla_final);
}

function list_proyectos(num="") {
    var valor = (num=="")?1:num;
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/operaciones/get_proyectos_list/0?page="+valor);
            console.log(resp.data.data);
            let cadena="";
            let d=0;
            let n=0;
            if (resp.data.data=="") {
                cadena +='<div class="col-12 p-4 text-center bg-p">';
                cadena +='<h1 class="f-w-300 text-muted">Sin Información</h1>';
                cadena +='</div>';
            }else{
                for (let i = 0; i < resp.data.data.length; i++) {
                    let p = "";
                    if (!resp.data.data[i].num_reviciones==0) {
                        p ="/ Revición "+resp.data.data[i].num_reviciones;
                      }

                    n++;
                     if (resp.data.data[i].id_status_operaciones==2) {
                         d=50;
                     }else if (resp.data.data[i].id_status_operaciones==3) {
                         d=75;
                     }else if(resp.data.data[i].id_status_operaciones==4){
                         d=100;
                     }else{                   
                         d=25;
                     }
                     cadena +='<div class="col-xxl-4 col-lg-6">';
                    
                     cadena +='<div class=" c-p project-box ">';
                     if (resp.data.data[i].id_status_operaciones==2) {
                         cadena +='<span class="badge badge-secondary">Ejecución</span>';
                     }else if(resp.data.data[i].id_status_operaciones==3){
                         cadena +='<span class="badge badge-info">Prueba y Calidad</span>';
                     }else if(resp.data.data[i].id_status_operaciones==4){
                         cadena +='<span class="badge badge-warning text-light">Entregado</span>';
                     }else if(resp.data.data[i].id_status_operaciones==5){
                        cadena +='<span title="Cierre Técnico" class="badge badge-success text-light">Cierre Técnico</span>';
                     }else if(resp.data.data[i].id_status_operaciones==6){
                        cadena +='<span title="Cierre comercial" class="badge badge-success text-light">Terminado Y Cerrado</span>';
                     }else{
                         cadena +='<span class="badge badge-primary">Inicio</span>';
     
                     }
                     cadena +='<a href="/operaciones/'+resp.data.data[i].id_operacion+'/time-line-proyect">';
                     cadena +='<h6 class="mb-0">'+resp.data.data[i].nombre_proyectos+' </h6>';
                     cadena +='<small>'+resp.data.data[i].pro_code+'</small>';
                    //  cadena +='<p>'+resp.data.data[i].clie_nombre+'</p>';
                     cadena +='<div class="media mt-2"><img class="img-30 me-2 rounded-circle" src="/assets/images/dashboard/1.png" alt="" data-original-title="" title="">';
                     cadena +='<div class="media-body">';
                     cadena +='<p>'+resp.data.data[i].clie_nombre+'</p>';
                     cadena +='</div>';
                     cadena +='</div>';
                     cadena +='<p>'+resp.data.data[i].alcance_proyecto+'</p>';
                     if (resp.data.data[i].id_status_operaciones==6) {
                        cadena += '<div class="bg-img-check"><img class="f-z-img-check" src="/assets/images/Check-Background1.png" alt="" srcset=""></div>';  
                     }
                     cadena +='</a>';
                     if (!resp.data.data[i].num_reviciones==0) {
                        cadena +='<div class="row mt-2 details">';
                        cadena +='<div class="col-4"><h5 class="f-w-400 text-warning">Revisiones: </h5></div>';
                        cadena +='<div class="col-8 font-secondary "><span class="h5 text-warning">'+resp.data.data[i].num_reviciones+'</span></div>';
                        cadena +='</div>';
                     }
                     
                     cadena +='<div class="project-status mt-4">';
                     cadena +='<div class="media mb-0">';
                     cadena +=`<div class="row w-322 option-editar" style="display: none;" id="0form-editar-descriccion${i}">
                     <div class="col-9 col-md-9">
 
                             <input  type="text" id="0porcentaj${i}" onkeyup="valid(this.value)"  onkeypress="return soloNumeros(event)" value="${resp.data.data[i].porc_avance}"   class="form-control input_porc" />
                     </div>
                     <div class="col-3 col-md-3 px-0 ">
                         <div class="row">
                             <div class="col-12 col-md-6 px-1">
                                 <div class="btn-edit-porcent-success"  onclick="update_descrpcion_apu(${resp.data.data[i].id_operacion},${i},0)" title="Editar"><i class="fa fa-check"></i></div>
             
                             </div>
                             <div class="col-12 col-md-6 px-0">
                                 <div class="btn-edit-porcent-danger" onclick="option_adit(false,${i},0)"  title="Cancelar"><i class="fa fa-times"></i></div>
             
                             </div>
                         </div>
                     </div>
                 </div>`;
                     cadena +='<p  onmouseout="btn_editar(false,'+i+',0)" onmouseover="btn_editar(true,'+i+',0)" class="0option-edit'+i+'">'+resp.data.data[i].porc_avance+'% <i id="0btn-editar-descrccion'+i+'" onclick="option_adit(true,'+i+',0)"  class="ocult-btn fa fa-pencil"></i></p>';
                     cadena +='<div class="media-body text-end"><span>Hecho</span></div>';
                     cadena +='</div>';
                     cadena +='<div class="progress" style="height: 5px">';
                     cadena +='<div class="progress-bar-animated bg-primary progress-bar-striped" role="progressbar" style="width: '+resp.data.data[i].porc_avance+'%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>';
                     cadena +='</div>';
                     cadena +='</div>';
                     cadena +='</div>';
                    //  cadena +='</a>';
                     cadena +='</div>';
                    
                     console.log(d);
                     
                 }
            }


            if (resp.data.total>9) {
                $('#option_pagination_proyecto_all').show();
            }else{
                $('#option_pagination_proyecto_all').hide();
            }
                    

                    var x="";
                    for (let d = 0; d < resp.data.links.length; d++) {
                    var r= resp.data.current_page-1;
                    if (resp.data.links[d].url==null) {
                        x+='<li class="page-item previous disabled"><a class="page-link mx-2 page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" ><i class="icon-angle-left"></i></a></li>'; 
                        break;
                    }else{
                        x+='<li class="page-item "><a class="page-link mx-2 page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" ><i class="icon-angle-left"></i></a></li>'; 
                        break;
                    }                        
                    }
                    for (let j = 1; j <= resp.data.last_page; j++) {
                    if (resp.data.current_page==j) {
                    x+='<li class="page-item active"><a class="b-r-p page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                    }else{
                    x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link b-r-p page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                    }
                    
                    }  
                    var s= resp.data.current_page+1;              
                    
                    if (resp.data.current_page>=resp.data.last_page) {
                    x+='<li class="page-item next disabled"><a data-page="" class=" mx-2 page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)"><i class="icon-angle-right"></i></a></li>';
                    
                    }else{
                    x+='<li class="page-item next "><a data-page="'+s+'" class="page-link mx-2 page-endorsement page-link-endorsement-next" href="javascript:void(0)"><i class="icon-angle-right"></i></a></li>';
                    }
                    $("#view_vacio_list_compras_pagadas").hide();    
                    $(".page-proyect").html(x);  
                    $("#total_registros_compras_pagadas").text(resp.data.total);          
                    $('#list_proyectos_dasw').html(cadena);


                      
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
                                    list_proyectos(page)
                        
                    });
            
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}


function update_porcu(id,i) {
    const data = {
        porc:$("#1porcentaj"+i).val(),
        id:id
    }
    console.log(data);
    // var  id_cotizacion =parseInt($("#id_cotizacion").val());
    const sendGetRequest = async () => {
        try {
            const resp = await axios.put("operaciones/update_porc_avance",data);  
            console.log(resp.data); 
            if (resp.data.status==200) {

                list_proyectos_inicio();
                   
            }else if (resp.data.status==404) {
                messeg("dsd","danger");
            }     
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

function valid(valor) {
    if (parseFloat(valor) < 0 || parseFloat(valor) > 100) {
        // console.log("superaste los 100");
        $('.input_porc').addClass('is-invalid');
    }else{
        // console.log("va bien");
        $('.input_porc').removeClass('is-invalid');
    }
}

function btn_editarp(e,i) {
    // console.log(e);
    if (e) {
          
        $("#btn-editar-descrccion1"+i).removeClass('ocult-btn');
        
    }else{
        $("#btn-editar-descrccion1"+i).addClass('ocult-btn');
    }
}
function option_adit_precio(e) {
    if (e) {
      
        $(".option-edit-precio").hide();
        // $("#view-structu-cost-butom").hide();
        $("#"+id_apu+"form-editar-precio-product").show(); 
        
    }else{
        $("#"+id_apu+"form-editar-precio-product").hide();
        $(".option-edit-precio").show();
    }
}
function option_aditp(e,i) {
    if (e) {
      
        $(".1option-edit"+i).hide();
        // $("#view-structu-cost-butom").hide();
        $("#1form-editar-descriccion"+i).show(); 
        
    }else{
        $("#1form-editar-descriccion"+i).hide();
        $(".1option-edit"+i).show();
    }
}

function list_proyectos_inicio(num="") {
    var valor = (num=="")?1:num;
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/operaciones/get_proyectos_list/1?page="+valor);
            console.log(resp.data.data);
            let cadena="";
            let d=0;
            let n=0;
            if (resp.data.data=="") {
                cadena +='<div class="col-12 p-4 text-center bg-p">';
                cadena +='<h1 class="f-w-300 text-muted">Sin Información</h1>';
                cadena +='</div>';
            }else{
                for (let i = 0; i < resp.data.data.length; i++) {
                    let p = "";
                    if (!resp.data.data[i].num_reviciones==0) {
                        p ="/ Revición "+resp.data.data[i].num_reviciones;
                      }

                    n++;
                     if (resp.data.data[i].id_status_operaciones==2) {
                         d=50;
                     }else if (resp.data.data[i].id_status_operaciones==3) {
                         d=75;
                     }else if(resp.data.data[i].id_status_operaciones==4){
                         d=100;
                     }else{                   
                         d=25;
                     }
                     cadena +='<div class="col-xxl-4 col-lg-6">';
                    //  cadena +='<a href="/operaciones/'+resp.data.data[i].id_operacion+'/time-line-proyect">';
                     cadena +='<div class=" c-p project-box ">';
                     if (resp.data.data[i].id_status_operaciones==2) {
                         cadena +='<span class="badge badge-secondary">Ejecución</span>';
                     }else if(resp.data.data[i].id_status_operaciones==3){
                         cadena +='<span class="badge badge-info">Prueba y Calidad</span>';
                     }else if(resp.data.data[i].id_status_operaciones==4){
                         cadena +='<span class="badge badge-warning text-light">Entregado</span>';
                     }else{
                         cadena +='<span class="badge badge-primary">Inicio</span>';
     
                     }
                      cadena +='<a href="/operaciones/'+resp.data.data[i].id_operacion+'/time-line-proyect">';
                     cadena +='<h6 class="mb-0">'+resp.data.data[i].nombre_proyectos+' </h6>';
                     cadena +='<small>'+resp.data.data[i].pro_code+'</small>';
                    //  cadena +='<p>'+resp.data.data[i].clie_nombre+'</p>';
                     cadena +='<div class="media mt-2"><img class="img-30 me-2 rounded-circle" src="/assets/images/dashboard/1.png" alt="" data-original-title="" title="">';
                     cadena +='<div class="media-body">';
                     cadena +='<p>'+resp.data.data[i].clie_nombre+'</p>';
                     cadena +='</div>';
                     cadena +='</div>';
                     cadena +='<p>'+resp.data.data[i].alcance_proyecto+'</p>';
                        cadena +='</a>';
                        if (!resp.data.data[i].num_reviciones==0) {
                            cadena +='<div class="row mt-2 details">';
                            cadena +='<div class="col-4"><h5 class="f-w-400 text-warning">Revisiones: </h5></div>';
                            cadena +='<div class="col-8 font-secondary "><span class="h5 text-warning">'+resp.data.data[i].num_reviciones+'</span></div>';
                            cadena +='</div>';
                         }
                     
                     cadena +='<div class="project-status mt-4">';
                     cadena +='<div class="media mb-0">';
                     cadena +=`<div class="row w-322 option-editar" style="display: none;" id="1form-editar-descriccion${i}">
                     <div class="col-9 col-md-9">
 
                             <input  type="text" id="1porcentaj${i}" onkeyup="valid(this.value)"  onkeypress="return soloNumeros(event)" value="${resp.data.data[i].porc_avance}"   class="form-control input_porc" />
                     </div>
                     <div class="col-3 col-md-3 px-0 ">
                         <div class="row">
                             <div class="col-12 col-md-6 px-1">
                                 <div class="btn-edit-porcent-success"  onclick="update_porcu(${resp.data.data[i].id_operacion},${i})" title="Editar"><i class="fa fa-check"></i></div>
             
                             </div>
                             <div class="col-12 col-md-6 px-0">
                                 <div class="btn-edit-porcent-danger" onclick="option_aditp(false,${i})"  title="Cancelar"><i class="fa fa-times"></i></div>
             
                             </div>
                         </div>
                     </div>
                 </div>`;
                     cadena +='<p  onmouseout="btn_editarp(false,'+i+')" onmouseover="btn_editarp(true,'+i+')" class="1option-edit'+i+'">'+resp.data.data[i].porc_avance+'% <i id="btn-editar-descrccion1'+i+'" onclick="option_aditp(true,'+i+')"  class="ocult-btn fa fa-pencil"></i></p>';
                     cadena +='<div class="media-body text-end"><span>Hecho</span></div>';
                     cadena +='</div>';
                     cadena +='<div class="progress" style="height: 5px">';
                     cadena +='<div class="progress-bar-animated bg-primary progress-bar-striped" role="progressbar" style="width: '+resp.data.data[i].porc_avance+'%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>';
                     cadena +='</div>';
                     cadena +='</div>';
                     cadena +='</div>';
                    //  cadena +='</a>';
                     cadena +='</div>';
                    
                     console.log(resp.data.data[i].porc_avance);
                     
                 }
            }

            if (resp.data.total>9) {
                $('#option_pagination_proyect_inicio').show();
            }else{
                $('#option_pagination_proyect_inicio').hide();
            }    

                    var x="";
                    for (let d = 0; d < resp.data.links.length; d++) {
                    var r= resp.data.current_page-1;
                    if (resp.data.links[d].url==null) {
                        x+='<li class="page-item previous disabled"><a class="page-link mx-2 page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" ><i class="icon-angle-left"></i></a></li>'; 
                        break;
                    }else{
                        x+='<li class="page-item "><a class="page-link mx-2 page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" ><i class="icon-angle-left"></i></a></li>'; 
                        break;
                    }                        
                    }
                    for (let j = 1; j <= resp.data.last_page; j++) {
                    if (resp.data.current_page==j) {
                    x+='<li class="page-item active"><a class="b-r-p page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                    }else{
                    x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link b-r-p page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                    }
                    
                    }  
                    var s= resp.data.current_page+1;              
                    
                    if (resp.data.current_page>=resp.data.last_page) {
                    x+='<li class="page-item next disabled"><a data-page="" class=" mx-2 page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)"><i class="icon-angle-right"></i></a></li>';
                    
                    }else{
                    x+='<li class="page-item next "><a data-page="'+s+'" class="page-link mx-2 page-endorsement page-link-endorsement-next" href="javascript:void(0)"><i class="icon-angle-right"></i></a></li>';
                    }
                    $("#view_vacio_list_compras_pagadas").hide();    
                    $(".page-proyect_inicio_p").html(x);  
                    $("#total_registros_compras_pagadas").text(resp.data.total);          
                    $('#list_proyectos_inicio_t').html(cadena);


                      
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
                                    list_proyectos_inicio(page)
                        
                    });
            
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}


function btn_editarq(e,i) {
    // console.log(e);
    if (e) {
          
        $("#2btn-editar-descrccion"+i).removeClass('ocult-btn');
        
    }else{
        $("#2btn-editar-descrccion"+i).addClass('ocult-btn');
    }
}
function option_adit_precio(e) {
    if (e) {
      
        $(".option-edit-precio").hide();
        // $("#view-structu-cost-butom").hide();
        $("#"+id_apu+"form-editar-precio-product").show(); 
        
    }else{
        $("#"+id_apu+"form-editar-precio-product").hide();
        $(".option-edit-precio").show();
    }
}
function option_aditq(e,i) {
    if (e) {
      
        $(".2option-edit"+i).hide();
        // $("#view-structu-cost-butom").hide();
        $("#2form-editar-descriccion"+i).show(); 
        
    }else{
        $("#2form-editar-descriccion"+i).hide();
        $(".2option-edit"+i).show();
    }
}

function list_proyectos_ejecucion(num="") {
    var valor = (num=="")?1:num;
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/operaciones/get_proyectos_list/2?page="+valor);
            console.log(resp.data.data);
            let cadena="";
            let d=0;
            let n=0;
            if (resp.data.data=="") {
                cadena +='<div class="col-12 p-4 text-center bg-p">';
                cadena +='<h1 class="f-w-300 text-muted">Sin Información</h1>';
                cadena +='</div>';
            }else{
                for (let i = 0; i < resp.data.data.length; i++) {
                    let p = "";
                    if (!resp.data.data[i].num_reviciones==0) {
                        p ="/ Revición "+resp.data.data[i].num_reviciones;
                      }

                    n++;
                     if (resp.data.data[i].id_status_operaciones==2) {
                         d=50;
                     }else if (resp.data.data[i].id_status_operaciones==3) {
                         d=75;
                     }else if(resp.data.data[i].id_status_operaciones==4){
                         d=100;
                     }else{                   
                         d=25;
                     }
                     cadena +='<div class="col-xxl-4 col-lg-6">';
                    //  cadena +='<a href="/operaciones/'+resp.data.data[i].id_operacion+'/time-line-proyect">';
                     cadena +='<div class=" c-p project-box ">';
                     if (resp.data.data[i].id_status_operaciones==2) {
                         cadena +='<span class="badge badge-secondary">Ejecución</span>';
                     }else if(resp.data.data[i].id_status_operaciones==3){
                         cadena +='<span class="badge badge-info">Prueba y Calidad</span>';
                     }else if(resp.data.data[i].id_status_operaciones==4){
                         cadena +='<span class="badge badge-warning text-light">Entregado</span>';
                     }else{
                         cadena +='<span class="badge badge-primary">Inicio</span>';
     
                     }
                      cadena +='<a href="/operaciones/'+resp.data.data[i].id_operacion+'/time-line-proyect">';
                     cadena +='<h6 class="mb-0">'+resp.data.data[i].nombre_proyectos+' </h6>';
                     cadena +='<small>'+resp.data.data[i].pro_code+'</small>';
                    //  cadena +='<p>'+resp.data.data[i].clie_nombre+'</p>';
                     cadena +='<div class="media mt-2"><img class="img-30 me-2 rounded-circle" src="/assets/images/dashboard/1.png" alt="" data-original-title="" title="">';
                     cadena +='<div class="media-body">';
                     cadena +='<p>'+resp.data.data[i].clie_nombre+'</p>';
                     cadena +='</div>';
                     cadena +='</div>';
                     cadena +='<p>'+resp.data.data[i].alcance_proyecto+'</p>';
                        cadena +='</a>';
                        if (!resp.data.data[i].num_reviciones==0) {
                            cadena +='<div class="row mt-2 details">';
                            cadena +='<div class="col-4"><h5 class="f-w-400 text-warning">Revisiones: </h5></div>';
                            cadena +='<div class="col-8 font-secondary "><span class="h5 text-warning">'+resp.data.data[i].num_reviciones+'</span></div>';
                            cadena +='</div>';
                         }
                     
                     cadena +='<div class="project-status mt-4">';
                     cadena +='<div class="media mb-0">';
                     cadena +=`<div class="row w-322 option-editar" style="display: none;" id="2form-editar-descriccion${i}">
                     <div class="col-9 col-md-9">
 
                             <input  type="text" id="2porcentaj${i}" onkeyup="valid(this.value)"  onkeypress="return soloNumeros(event)" value="${resp.data.data[i].porc_avance}"   class="form-control input_porc" />
                     </div>
                     <div class="col-3 col-md-3 px-0 ">
                         <div class="row">
                             <div class="col-12 col-md-6 px-1">
                                 <div class="btn-edit-porcent-success"  onclick="update_descrpcion_apu(${resp.data.data[i].id_operacion},${i},2)" title="Editar"><i class="fa fa-check"></i></div>
             
                             </div>
                             <div class="col-12 col-md-6 px-0">
                                 <div class="btn-edit-porcent-danger" onclick="option_aditq(false,${i})"  title="Cancelar"><i class="fa fa-times"></i></div>
             
                             </div>
                         </div>
                     </div>
                 </div>`;
                     cadena +='<p  onmouseout="btn_editarq(false,'+i+')" onmouseover="btn_editarq(true,'+i+')" class="2option-edit'+i+'">'+resp.data.data[i].porc_avance+'% <i id="2btn-editar-descrccion'+i+'" onclick="option_aditq(true,'+i+')"  class="ocult-btn fa fa-pencil"></i></p>';
                     cadena +='<div class="media-body text-end"><span>Hecho</span></div>';
                     cadena +='</div>';
                     cadena +='<div class="progress" style="height: 5px">';
                     cadena +='<div class="progress-bar-animated bg-primary progress-bar-striped" role="progressbar" style="width: '+resp.data.data[i].porc_avance+'%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>';
                     cadena +='</div>';
                     cadena +='</div>';
                     cadena +='</div>';
                    //  cadena +='</a>';
                     cadena +='</div>';
                    
                     console.log(d);
                     
                 }
            }
            if (resp.data.total>9) {
                $('#option_pagination_proyecto_ejecutar').show();
            }else{
                $('#option_pagination_proyecto_ejecutar').hide();
            } 
                    

                    var x="";
                    for (let d = 0; d < resp.data.links.length; d++) {
                    var r= resp.data.current_page-1;
                    if (resp.data.links[d].url==null) {
                        x+='<li class="page-item previous disabled"><a class="page-link mx-2 page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" ><i class="icon-angle-left"></i></a></li>'; 
                        break;
                    }else{
                        x+='<li class="page-item "><a class="page-link mx-2 page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" ><i class="icon-angle-left"></i></a></li>'; 
                        break;
                    }                        
                    }
                    for (let j = 1; j <= resp.data.last_page; j++) {
                    if (resp.data.current_page==j) {
                    x+='<li class="page-item active"><a class="b-r-p page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                    }else{
                    x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link b-r-p page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                    }
                    
                    }  
                    var s= resp.data.current_page+1;              
                    
                    if (resp.data.current_page>=resp.data.last_page) {
                    x+='<li class="page-item next disabled"><a data-page="" class=" mx-2 page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)"><i class="icon-angle-right"></i></a></li>';
                    
                    }else{
                    x+='<li class="page-item next "><a data-page="'+s+'" class="page-link mx-2 page-endorsement page-link-endorsement-next" href="javascript:void(0)"><i class="icon-angle-right"></i></a></li>';
                    }
                    $("#view_vacio_list_compras_pagadas").hide();    
                    $(".page-proyect_ejecucion_p").html(x);  
                    $("#total_registros_compras_pagadas").text(resp.data.total);          
                    $('#list_proyectos_ejecucion_t').html(cadena);


                      
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
                                    list_proyectos_ejecucion(page)
                        
                    });
            
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}


function list_proyectos_prueba(num="") {
    var valor = (num=="")?1:num;
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/operaciones/get_proyectos_list/3?page="+valor);
            console.log(resp.data.data);
            let cadena="";
            let d=0;
            let n=0;
            if (resp.data.data=="") {
                cadena +='<div class="col-12 p-4 text-center bg-p">';
                cadena +='<h1 class="f-w-300 text-muted">Sin Información</h1>';
                cadena +='</div>';
            }else{
                for (let i = 0; i < resp.data.data.length; i++) {
                    let p = "";
                    if (!resp.data.data[i].num_reviciones==0) {
                        p ="/ Revición "+resp.data.data[i].num_reviciones;
                      }

                    n++;
                     if (resp.data.data[i].id_status_operaciones==2) {
                         d=50;
                     }else if (resp.data.data[i].id_status_operaciones==3) {
                         d=75;
                     }else if(resp.data.data[i].id_status_operaciones==4){
                         d=100;
                     }else{                   
                         d=25;
                     }
                     cadena +='<div class="col-xxl-4 col-lg-6">';
                    //  cadena +='<a href="/operaciones/'+resp.data.data[i].id_operacion+'/time-line-proyect">';
                     cadena +='<div class=" c-p project-box ">';
                     if (resp.data.data[i].id_status_operaciones==2) {
                         cadena +='<span class="badge badge-secondary">Ejecución</span>';
                     }else if(resp.data.data[i].id_status_operaciones==3){
                         cadena +='<span class="badge badge-info">Prueba y Calidad</span>';
                     }else if(resp.data.data[i].id_status_operaciones==4){
                         cadena +='<span class="badge badge-warning text-light">Entregado</span>';
                     }else{
                         cadena +='<span class="badge badge-primary">Inicio</span>';
     
                     }
                      cadena +='<a href="/operaciones/'+resp.data.data[i].id_operacion+'/time-line-proyect">';
                     cadena +='<h6 class="mb-0">'+resp.data.data[i].nombre_proyectos+' </h6>';
                     cadena +='<small>'+resp.data.data[i].pro_code+'</small>';
                    //  cadena +='<p>'+resp.data.data[i].clie_nombre+'</p>';
                     cadena +='<div class="media mt-2"><img class="img-30 me-2 rounded-circle" src="/assets/images/dashboard/1.png" alt="" data-original-title="" title="">';
                     cadena +='<div class="media-body">';
                     cadena +='<p>'+resp.data.data[i].clie_nombre+'</p>';
                     cadena +='</div>';
                     cadena +='</div>';
                     cadena +='<p>'+resp.data.data[i].alcance_proyecto+'</p>';
                     cadena +='</a>';
                     if (!resp.data.data[i].num_reviciones==0) {
                        cadena +='<div class="row mt-2 details">';
                        cadena +='<div class="col-4"><h5 class="f-w-400 text-warning">Revisiones: </h5></div>';
                        cadena +='<div class="col-8 font-secondary "><span class="h5 text-warning">'+resp.data.data[i].num_reviciones+'</span></div>';
                        cadena +='</div>';
                     }
                     
                     cadena +='<div class="project-status mt-4">';
                     cadena +='<div class="media mb-0">';
                     cadena +=`<div class="row w-322 option-editar" style="display: none;" id="3form-editar-descriccion${i}">
                     <div class="col-9 col-md-9">
 
                             <input  type="text" id="3porcentaj${i}" onkeyup="valid(this.value)"  onkeypress="return soloNumeros(event)" value="${resp.data.data[i].porc_avance}"   class="form-control input_porc" />
                     </div>
                     <div class="col-3 col-md-3 px-0 ">
                         <div class="row">
                             <div class="col-12 col-md-6 px-1">
                                 <div class="btn-edit-porcent-success"  onclick="update_descrpcion_apu(${resp.data.data[i].id_operacion},${i},3)" title="Editar"><i class="fa fa-check"></i></div>
             
                             </div>
                             <div class="col-12 col-md-6 px-0">
                                 <div class="btn-edit-porcent-danger" onclick="option_adit(false,${i},3)"  title="Cancelar"><i class="fa fa-times"></i></div>
             
                             </div>
                         </div>
                     </div>
                 </div>`;
                     cadena +='<p  onmouseout="btn_editar(false,'+i+',3)" onmouseover="btn_editar(true,'+i+',3)" class="3option-edit'+i+'">'+resp.data.data[i].porc_avance+'% <i id="3btn-editar-descrccion'+i+'" onclick="option_adit(true,'+i+',3)"  class="ocult-btn fa fa-pencil"></i></p>';
                     cadena +='<div class="media-body text-end"><span>Hecho</span></div>';
                     cadena +='</div>';
                     cadena +='<div class="progress" style="height: 5px">';
                     cadena +='<div class="progress-bar-animated bg-primary progress-bar-striped" role="progressbar" style="width: '+resp.data.data[i].porc_avance+'%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>';
                     cadena +='</div>';
                     cadena +='</div>';
                     cadena +='</div>';
                    //  cadena +='</a>';
                     cadena +='</div>';
                    
                     console.log(d);
                     
                 }
            }
            if (resp.data.total>9) {
                $('#option_pagination_proyecto_prueba').show();
            }else{
                $('#option_pagination_proyecto_prueba').hide();
            }  

                    var x="";
                    for (let d = 0; d < resp.data.links.length; d++) {
                    var r= resp.data.current_page-1;
                    if (resp.data.links[d].url==null) {
                        x+='<li class="page-item previous disabled"><a class="page-link mx-2 page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" ><i class="icon-angle-left"></i></a></li>'; 
                        break;
                    }else{
                        x+='<li class="page-item "><a class="page-link mx-2 page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" ><i class="icon-angle-left"></i></a></li>'; 
                        break;
                    }                        
                    }
                    for (let j = 1; j <= resp.data.last_page; j++) {
                    if (resp.data.current_page==j) {
                    x+='<li class="page-item active"><a class="b-r-p page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                    }else{
                    x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link b-r-p page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                    }
                    
                    }  
                    var s= resp.data.current_page+1;              
                    
                    if (resp.data.current_page>=resp.data.last_page) {
                    x+='<li class="page-item next disabled"><a data-page="" class=" mx-2 page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)"><i class="icon-angle-right"></i></a></li>';
                    
                    }else{
                    x+='<li class="page-item next "><a data-page="'+s+'" class="page-link mx-2 page-endorsement page-link-endorsement-next" href="javascript:void(0)"><i class="icon-angle-right"></i></a></li>';
                    }
                    $("#view_vacio_list_compras_pagadas").hide();    
                    $(".page-proyect_prueba_calidad").html(x);  
                    $("#total_registros_compras_pagadas").text(resp.data.total);          
                    $('#list_proyectos_prueba_calidad').html(cadena);


                      
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
                                    list_proyectos_prueba(page);
                        
                    });
            
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}


function list_proyectos_entregado(num="") {
    var valor = (num=="")?1:num;
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/operaciones/get_proyectos_list/4?page="+valor);
            console.log(resp.data.data);
            let cadena="";
            let d=0;
            let n=0;
            if (resp.data.data=="") {
                cadena +='<div class="col-12 p-4 text-center bg-p">';
                cadena +='<h1 class="f-w-300 text-muted">Sin Información</h1>';
                cadena +='</div>';
            }else{
                for (let i = 0; i < resp.data.data.length; i++) {

                    let p = "";
                    if (!resp.data.data[i].num_reviciones==0) {
                        p ="/ Revición "+resp.data.data[i].num_reviciones;
                      }

                    n++;
                     if (resp.data.data[i].id_status_operaciones==2) {
                         d=50;
                     }else if (resp.data.data[i].id_status_operaciones==3) {
                         d=75;
                     }else if(resp.data.data[i].id_status_operaciones==4){
                         d=100;
                     }else{                   
                         d=25;
                     }
                     cadena +='<div class="col-xxl-4 col-lg-6">';
                    //  cadena +='<a href="/operaciones/'+resp.data.data[i].id_operacion+'/time-line-proyect">';
                     cadena +='<div class=" c-p project-box ">';
                     if (resp.data.data[i].id_status_operaciones==2) {
                         cadena +='<span class="badge badge-secondary">Ejecución</span>';
                     }else if(resp.data.data[i].id_status_operaciones==3){
                         cadena +='<span class="badge badge-info">Prueba y Calidad</span>';
                     }else if(resp.data.data[i].id_status_operaciones==4){
                         cadena +='<span class="badge badge-warning text-light">Entregado</span>';
                     }else{
                         cadena +='<span class="badge badge-primary">Inicio</span>';
     
                     }
                      cadena +='<a href="/operaciones/'+resp.data.data[i].id_operacion+'/time-line-proyect">';
                     cadena +='<h6 class="mb-0">'+resp.data.data[i].nombre_proyectos+' </h6>';
                     cadena +='<small>'+resp.data.data[i].pro_code+'</small>';
                    //  cadena +='<p>'+resp.data.data[i].clie_nombre+'</p>';
                     cadena +='<div class="media mt-2"><img class="img-30 me-2 rounded-circle" src="/assets/images/dashboard/1.png" alt="" data-original-title="" title="">';
                     cadena +='<div class="media-body">';
                     cadena +='<p>'+resp.data.data[i].clie_nombre+'</p>';
                     cadena +='</div>';
                     cadena +='</div>';
                     cadena +='<p>'+resp.data.data[i].alcance_proyecto+'</p>';
                     cadena +='</a>';
                     if (!resp.data.data[i].num_reviciones==0) {
                        cadena +='<div class="row mt-2 details">';
                        cadena +='<div class="col-4"><h5 class="f-w-400 text-warning">Revisiones: </h5></div>';
                        cadena +='<div class="col-8 font-secondary "><span class="h5 text-warning">'+resp.data.data[i].num_reviciones+'</span></div>';
                        cadena +='</div>';
                     }
                     
                     cadena +='<div class="project-status mt-4">';
                     cadena +='<div class="media mb-0">';
                     cadena +=`<div class="row w-322 option-editar" style="display: none;" id="4form-editar-descriccion${i}">
                     <div class="col-9 col-md-9">
 
                             <input  type="text" id="4porcentaj${i}" onkeyup="valid(this.value)"  onkeypress="return soloNumeros(event)" value="${resp.data.data[i].porc_avance}"   class="form-control input_porc" />
                     </div>
                     <div class="col-3 col-md-3 px-0 ">
                         <div class="row">
                             <div class="col-12 col-md-6 px-1">
                                 <div class="btn-edit-porcent-success"  onclick="update_descrpcion_apu(${resp.data.data[i].id_operacion},${i},4)" title="Editar"><i class="fa fa-check"></i></div>
             
                             </div>
                             <div class="col-12 col-md-6 px-0">
                                 <div class="btn-edit-porcent-danger" onclick="option_adit(false,${i},4)"  title="Cancelar"><i class="fa fa-times"></i></div>
             
                             </div>
                         </div>
                     </div>
                 </div>`;
                     cadena +='<p  onmouseout="btn_editar(false,'+i+',4)" onmouseover="btn_editar(true,'+i+',4)" class="4option-edit'+i+'">'+resp.data.data[i].porc_avance+'% <i id="4btn-editar-descrccion'+i+'" onclick="option_adit(true,'+i+',4)"  class="ocult-btn fa fa-pencil"></i></p>';
                     cadena +='<div class="media-body text-end"><span>Hecho</span></div>';
                     cadena +='</div>';
                     cadena +='<div class="progress" style="height: 5px">';
                     cadena +='<div class="progress-bar-animated bg-primary progress-bar-striped" role="progressbar" style="width: '+resp.data.data[i].porc_avance+'%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>';
                     cadena +='</div>';
                     cadena +='</div>';
                     cadena +='</div>';
                    //  cadena +='</a>';
                     cadena +='</div>';
                    
                     console.log(d);
                     
                 }
            }
            if (resp.data.total>9) {
                $('#option_pagination_proyect_entregado').show();
            }else{
                $('#option_pagination_proyect_entregado').hide();
            } 
                    

                    var x="";
                    for (let d = 0; d < resp.data.links.length; d++) {
                    var r= resp.data.current_page-1;
                    if (resp.data.links[d].url==null) {
                        x+='<li class="page-item previous disabled"><a class="page-link mx-2 page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" ><i class="icon-angle-left"></i></a></li>'; 
                        break;
                    }else{
                        x+='<li class="page-item "><a class="page-link mx-2 page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" ><i class="icon-angle-left"></i></a></li>'; 
                        break;
                    }                        
                    }
                    for (let j = 1; j <= resp.data.last_page; j++) {
                    if (resp.data.current_page==j) {
                    x+='<li class="page-item active"><a class="b-r-p page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                    }else{
                    x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link b-r-p page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                    }
                    
                    }  
                    var s= resp.data.current_page+1;              
                    
                    if (resp.data.current_page>=resp.data.last_page) {
                    x+='<li class="page-item next disabled"><a data-page="" class=" mx-2 page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)"><i class="icon-angle-right"></i></a></li>';
                    
                    }else{
                    x+='<li class="page-item next "><a data-page="'+s+'" class="page-link mx-2 page-endorsement page-link-endorsement-next" href="javascript:void(0)"><i class="icon-angle-right"></i></a></li>';
                    }
                    $("#view_vacio_list_compras_pagadas").hide();    
                    $(".page-proyect_entregado").html(x);  
                    $("#total_registros_compras_pagadas").text(resp.data.total);          
                    $('#list_proyectos_entregados').html(cadena);


                      
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
                                    list_proyectos_entregado(page)
                        
                    });
            
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}


$('.btn_proyecto_finalizado').on('click',()=>{
    console.log("finalizado");
    list_proyectos_finalizado();
});



function list_proyectos_finalizado(num="") {
    var valor = (num=="")?1:num;
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/operaciones/get_proyectos_list/56?page="+valor);
            console.log(resp.data.data);
            let cadena="";
            let d=0;
            let n=0;
            if (resp.data.data=="") {
                cadena +='<div class="col-12 p-4 text-center bg-p">';
                cadena +='<h1 class="f-w-300 text-muted">Sin Información</h1>';
                cadena +='</div>';
            }else{
                for (let i = 0; i < resp.data.data.length; i++) {

                    let p = "";
                    if (!resp.data.data[i].num_reviciones==0) {
                        p ="/ Revición "+resp.data.data[i].num_reviciones;
                      }

                    n++;
                     if (resp.data.data[i].id_status_operaciones==2) {
                         d=50;
                     }else if (resp.data.data[i].id_status_operaciones==3) {
                         d=75;
                     }else if(resp.data.data[i].id_status_operaciones==4){
                         d=100;
                     }else{                   
                         d=25;
                     }
                     cadena +='<div class="col-xxl-4 col-lg-6">';
                    //  cadena +='<a href="/operaciones/'+resp.data.data[i].id_operacion+'/time-line-proyect">';
                     cadena +='<div class=" c-p project-box ">';
                     if (resp.data.data[i].id_status_operaciones==2) {
                         cadena +='<span class="badge badge-secondary">Ejecución</span>';
                     }else if(resp.data.data[i].id_status_operaciones==3){
                         cadena +='<span class="badge badge-info">Prueba y Calidad</span>';
                     }else if(resp.data.data[i].id_status_operaciones==4){
                         cadena +='<span class="badge badge-warning text-light">Entregado</span>';
                     }else if(resp.data.data[i].id_status_operaciones==5){
                        cadena +='<span class="badge badge-success text-light">Cierre Técnico</span>';
                     }else if(resp.data.data[i].id_status_operaciones==6){
                        cadena +='<span class="badge badge-success text-light">Terminado Y Cerrado</span>';
                     }else{
                         cadena +='<span class="badge badge-primary">Inicio</span>';
     
                     }
                     if (resp.data.data[i].id_status_operaciones==6) {
                        cadena+='<ul class="nav nav-tabs top-bar" id="myTab" role="tablist">';
                        cadena+='<li class="nav-item dropdown">';
                        cadena+='<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></a>';
                        cadena+='<div class="dropdown-menu" style="margin: 0px;">';
                        cadena+='<a class="dropdown-item" onclick="quitar_priyect('+resp.data.data[i].id_cotizacion+')" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Quitar de la lista</a>';
                        cadena+='</div>';
                        cadena+='</li>';
                        cadena+='</ul>'; 
                     }
                 

                      cadena +='<a href="/operaciones/'+resp.data.data[i].id_operacion+'/time-line-proyect">';
                      if (resp.data.data[i].id_status_operaciones==6) {
                        cadena +='<h6 class="mb-0">'+resp.data.data[i].nombre_proyectos+' </h6>'; 
                      }else{
                        cadena +='<h6 class="mb-0">'+resp.data.data[i].nombre_proyectos+'</h6>';
                      }
                     
                     cadena +='<small>'+resp.data.data[i].pro_code+'</small>';
                    //  cadena +='<p>'+resp.data.data[i].clie_nombre+'</p>';
                     cadena +='<div class="media mt-2"><img class="img-30 me-2 rounded-circle" src="/assets/images/dashboard/1.png" alt="" data-original-title="" title="">';
                     cadena +='<div class="media-body">';
                     cadena +='<p>'+resp.data.data[i].clie_nombre+'</p>';
                     cadena +='</div>';
                     cadena +='</div>';
                     cadena +='<p>'+resp.data.data[i].alcance_proyecto+'</p>';
                     if (resp.data.data[i].id_status_operaciones==6) {
                        cadena += '<div class="bg-img-check"><img class="f-z-img-check" src="/assets/images/Check-Background1.png" alt="" srcset=""></div>';  
                     }
                     
                     
                    cadena +='</a>';
                    if (!resp.data.data[i].num_reviciones==0) {
                        cadena +='<div class="row mt-2 details">';
                        cadena +='<div class="col-4"><h5 class="f-w-400 text-warning">Revisiones: </h5></div>';
                        cadena +='<div class="col-8 font-secondary "><span class="h5 text-warning">'+resp.data.data[i].num_reviciones+'</span></div>';
                        cadena +='</div>';
                     }
                     
                     cadena +='<div class="project-status mt-4">';
                     cadena +='<div class="media mb-0">';
                     cadena +=`<div class="row w-322 option-editar" style="display: none;" id="5form-editar-descriccion${i}">
                     <div class="col-9 col-md-9">
 
                             <input  type="text" id="5porcentaj${i}" onkeyup="valid(this.value)"  onkeypress="return soloNumeros(event)" value="${resp.data.data[i].porc_avance}"   class="form-control input_porc" />
                     </div>
                     <div class="col-3 col-md-3 px-0 ">
                         <div class="row">
                             <div class="col-12 col-md-6 px-1">
                                 <div class="btn-edit-porcent-success"  onclick="update_descrpcion_apu(${resp.data.data[i].id_operacion},${i},5)" title="Editar"><i class="fa fa-check"></i></div>
             
                             </div>
                             <div class="col-12 col-md-6 px-0">
                                 <div class="btn-edit-porcent-danger" onclick="option_adit(false,${i},5)"  title="Cancelar"><i class="fa fa-times"></i></div>
             
                             </div>
                         </div>
                     </div>
                 </div>`;
                     cadena +='<p  onmouseout="btn_editar(false,'+i+',5)" onmouseover="btn_editar(true,'+i+',5)" class="5option-edit'+i+'">'+resp.data.data[i].porc_avance+'% <i id="5btn-editar-descrccion'+i+'" onclick="option_adit(true,'+i+',5)"  class="ocult-btn fa fa-pencil"></i></p>';
                     cadena +='<div class="media-body text-end"><span>Hecho</span></div>';
                     cadena +='</div>';
                     cadena +='<div class="progress" style="height: 5px">';
                     cadena +='<div class="progress-bar-animated bg-primary progress-bar-striped" role="progressbar" style="width: '+resp.data.data[i].porc_avance+'%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>';
                     cadena +='</div>';
                     cadena +='</div>';
                     cadena +='</div>';
                    //  cadena +='</a>';
                     cadena +='</div>';
                    
                     console.log(d);
                     
                 }
            }
            if (resp.data.total>9) {
                $('#option_pagination_proyect_finalizado').show();
            }else{
                $('#option_pagination_proyect_finalizado').hide();
            } 
                    

                    var x="";
                    for (let d = 0; d < resp.data.links.length; d++) {
                    var r= resp.data.current_page-1;
                    if (resp.data.links[d].url==null) {
                        x+='<li class="page-item previous disabled"><a class="page-link mx-2 page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" ><i class="icon-angle-left"></i></a></li>'; 
                        break;
                    }else{
                        x+='<li class="page-item "><a class="page-link mx-2 page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" ><i class="icon-angle-left"></i></a></li>'; 
                        break;
                    }                        
                    }
                    for (let j = 1; j <= resp.data.last_page; j++) {
                    if (resp.data.current_page==j) {
                    x+='<li class="page-item active"><a class="b-r-p page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                    }else{
                    x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link b-r-p page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                    }
                    
                    }  
                    var s= resp.data.current_page+1;              
                    
                    if (resp.data.current_page>=resp.data.last_page) {
                    x+='<li class="page-item next disabled"><a data-page="" class=" mx-2 page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)"><i class="icon-angle-right"></i></a></li>';
                    
                    }else{
                    x+='<li class="page-item next "><a data-page="'+s+'" class="page-link mx-2 page-endorsement page-link-endorsement-next" href="javascript:void(0)"><i class="icon-angle-right"></i></a></li>';
                    }
                    $("#view_vacio_list_compras_pagadas").hide();    
                    $(".page-option_pagination_proyect_finalizado").html(x);  
                    $("#total_registros_compras_pagadas").text(resp.data.total);          
                    $('#list_proyectos_finalizado').html(cadena);


                      
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
                                    list_proyectos_finalizado(page)
                        
                    });
            
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

function quitar_priyect(id) {
    console.log(id);
    swal({  
        title: "¡CUIDADO!",
        text:"\n¿Estás seguro que deseas quitar el proyecto de la lista?.\r\nNo podrás revertir los cambios.",
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
                        const resp = await axios.get("operaciones/quitar_proyecto/"+id);  
                        console.log(resp.data); 
                        if (resp.data.status==200) {
                            // messeg(resp.data.success,"success");
                            list_proyectos_finalizado();    
                        }else if (resp.data.status==404) {
                            messeg("dsd","danger");
                        }     
                    } catch (err) {
                        // Handle Error Here
                        console.error(err);
                    }
                };
                sendGetRequest();
            } 
        }) 


}
