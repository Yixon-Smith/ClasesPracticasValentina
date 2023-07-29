$(document).ready(function() {
	$("#select_product,#select_proyecto,#select_status").select2();
  list_select_proyect();
  list_select_producto(); 
  // list_select_status();
  list_items(); 
  $('#add_inten_requisicion-icon').addClass('fa fa-plus')
  code_view_imput();
});

const loader = document.querySelector("#loading");


var checkbox = document.getElementById('prioritario');
checkbox.addEventListener("change", validaCheckbox, false);
function validaCheckbox()
{
  var checked = checkbox.checked;
  console.log(checked);
  if(checked){
    // alert('checkbox1 esta seleccionado');
  }
}

function code_view_imput(){
  var f = new Date();
  f.getDate() +(f.getMonth() + 1)+f.getFullYear();
  let g = "RQ-"+f.getFullYear()+"-"
  $('#code-rq-view').text(g);
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




function list_select_status(d="") {
 ;
          var cadena = "";
          if (d=="1") {
            cadena += '<option value="1">SI</option>';
            cadena += '<option value="0">NO</option>';
          }else{
            cadena += '<option value="0">NO</option>';
            cadena += '<option value="1">SI</option>';
          }
 
          $(".list_status").html(cadena);
     
  
}

$("#add_inten_requisicion").on("click", function (e) {
  const data={
    id_itens:$('#id_requisicion_item').val(),
    id_user_utenc: $('#id_user_autentic').val(),
    id_product: $('#select_product').val(),
    id_proyect: $('#select_proyecto').val(),
    cantidad: $('#cantidad').val(),
    status: 1,
    // status: $('#select_status').val(),
    observaciones: $('#observaciones').val()
  }
  console.log(data);
  if (data.id_product=="null"||data.id_proyect=="null"||data.cantidad==""||data.status==null) {
    messeg("Tienes campos vacios",'danger');
    $('#form-add-item').addClass('border-red-p');
    let i=0;
    const h=setInterval(function () {
      i++
     $('#form-add-item').removeClass('border-red-p');

     if (i=1) {
      clearInterval(h);
     }
     }, 7000);
 
    //  
    return false;
  }

  displayLoading();
  console.log(data);
  if (data.id_itens=="") {
    var url = "/api/requisicion/store_inten";
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
            messeg(response.success,'success');
            // $('#select_product').val("");
            $('#cantidad').val("");
            $('#observaciones').val("");
            $('#id_requisicion_item').val("");
            list_items();
            list_select_proyect();
            list_select_producto();
         
      });
  }else{
    // console.log("editar");
    var url = "/api/requisicion/update_inten";
    fetch(url, {
        method: "PUT", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    }).then((res) => res.json())
      .catch((errors) => console.error("Error:", errors))
      .then((response) =>{
            console.log(response);
            messeg(response.success,'success');
            // $('#select_product').val("");
            $('#cantidad').val("");
            $('#observaciones').val("");
            $('#id_requisicion_item').val("");
           
            $("#select_product").val('').trigger('change');
          //   $("#select_product").select2({
          //     placeholder: "--Productos--"
          // });
            $("#select_proyecto").val('').trigger('change');
          //   $("#select_proyecto").select2({
          //     placeholder: "--proyectos--"
          // });

          $("#add_inten_requisicion").removeClass( "btn-warning" ).addClass( "btn-primary" );
          $("#add_inten_requisicion-icon").removeClass( "fa fa-edit" ).addClass( "fa fa-plus" );
            list_select_proyect();
            list_select_producto(); 
            list_items();
         
      });
  }


});


function viwe_presentacion(e) {
  console.log(e);
  if (e=="") {
      return false
  }
  const sendGetRequest = async () => {
    try {
        const resp = await axios.get("/get_presentacion_product/"+e);
        console.log(resp.data);
        $('#presentacion').text(resp.data[0].presentacion);
    
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
sendGetRequest();
}

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


function list_items() {
  displayLoading();
  const sendGetRequest = async () => {
      try {
        var table = "";
        var n=0;
          const resp = await axios.get("/list_items/listar");
           hideLoading();
          console.log(resp.data);
          if ( resp.data=="") {
            console.log("vacio");
            table += '<tr  class="iten_v">';
            table += '<td class="p-0" colspan="7"><div id="view_vacio"  class="text-center py-3 alert-vacio w-100">Sin información</div></td>';
            table += '</tr>';
            table += '<tr  class="error error_list_iten" style="display: none;">';
            table += '<td class="p-0" colspan="7"><div id="view_vacio"  class="text-center py-3 alert-vacio w-100 text-danger">Debes llenar la lista para continuar</div></td>';
            table += '</tr>';
          }
          for (let i = 0; i < resp.data.length; i++) {
            n++;
            var obser = (resp.data[i].observaciones==null)?"sin observación":resp.data[i].observaciones;
            table += '<tr  class="iten">';
            table += '<td>'+n+'</td>';
            table += '<td>';
            table += '<div class="media-p">';
            table += '<div class="media-body iten-contenid "><a href="#"><span>'+resp.data[i].nombre_producto+'</span></a></div>';
            table += '</div>';
            table += '<div class="media-p">';
            table += '<div class="media-body iten-contenid "><a href="#"><span>'+resp.data[i].descripcion_producto+'</span></a></div>';
            table += '</div>';
            table += '</td>';
            table += '<td>';
            table += '<div class="media-p">';
            table += '<div class="media-body iten-contenid"><a href="#"><span>'+resp.data[i].nombre_proyecto+'</span></a></div>';
            table += '</div>';
            table += '</td>';
            table += '<td>';
            table += '<p>'+resp.data[i].presentacion_producto+'</p>';
            table += '</td>';
            table += '<td>';
            table += '<p>'+resp.data[i].cantidad+'</p>';
            table += '</td>';
            // if (resp.data[i].status=="1") {              
            //   table += '<td><span class="badge pill-badge-primary m-l-10">SI</span></td>';
            // }else{
            //   table += '<td><span class="badge pill-badge-info m-l-10">NO</span></td>';
            // }
            table += '<td>';
            table += '<div class="iten-contenid"><p>'+obser+'</p>	</div>';
            table += '</td>';
            table += '<td>';
            table += '<div class="row">';
            table += '<div class="col-6 col-md-6 px-0">';
            table += '<div title="Editar" class="setting-warney-p c-p" onclick="obtener_detalle_producto('+resp.data[i].id+',1)" title="Anular informe"><i class="fa fa-edit"></i></div>';
            table += '</div>';
            table += '<div class="col-6 col-md-6 px-0">'
            table += '<div title="Quitar iten de la lista" class="setting-danger-p c-p" onclick="delete_producto('+resp.data[i].id+')" title="Anular informe"><i class="fa fa-trash-o"></i></div>';
            table += '</div>';
            table += '</div>';
            table += '</td>';
            table += '</tr>';
            table += '</tr>';

          }
         $('#num').text(n+1);
          $(".list_items").html(table);
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  };
  sendGetRequest();
}
// $.fn.select2.defaults.set("theme", "classic");
function delete_producto(id) { 
  const sendGetRequest = async () => {
      try {
      
          const resp = await axios.delete("/delete_items/"+id);
          console.log(resp.data);
          messeg(resp.data.success,"success");
          list_items();
          // get_producto_detalles_apu(data.id_apu,data.id_categ);
      } catch (err) {
          // Handle Error Here
      }
  };
  sendGetRequest();

}
function obtener_detalle_producto(id,option) {
  var op= (option==1)?"view_create":"view_edit";
  const sendGetRequest = async () => {
    try {
    
        const resp = await axios.get("/datalle_product/"+id+"/"+op);
        console.log(resp.data[0]);
        llenar_inputs_edit(resp.data[0]);
        list_select_proyect(resp.data[0]);
        list_select_producto(resp.data[0])
        list_select_status(resp.data[0].status);
        $("#add_inten_requisicion").removeClass( "btn-primary" ).addClass( "btn-warning" );
        $("#add_inten_requisicion-icon").removeClass( "fa fa-plus" ).addClass( "fa fa-edit" );
        
      
    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();
}
function llenar_inputs_edit(data) {
  $('#observaciones').val(data.observaciones);
  $('#cantidad').val(data.cantidad);
  $('#id_requisicion_item').val(data.id);
  $('#presentacion').text(data.presentacion_producto);
  // id_user_utenc: $('#id_user_autentic').val(),
  // id_product: $('#select_product').val(),
  // id_proyect: $('#select_proyecto').val(),
  // cantidad: $('#cantidad').val(),
  // status: $('#select_status').val(),
  // observaciones: $('#observaciones').val()
}

function list_select_proyect(data="") {
  const sendGetRequest = async () => {
      try {
          const resp = await axios.get("/get_proyect_select");
          // console.log(resp.data);
          var cadena = "";
          if (data=="") {
              cadena += '<option value="null">--Proyectos--</option>';
            
          }else{
            cadena += '<option value="'+data.id_proyecto+'">'+data.nombre_proyecto+'</option>';
          }
          for (let i = 0; i < resp.data.length; i++) {
              // console.log(resp.data)
              cadena +=
                  '<option value="' +
                  resp.data[i].pro_id +
                  '">' +
                  resp.data[i].pro_nombre +
                  " </option>";
          }
          $(".list_proyect").html(cadena);
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  };
  sendGetRequest();
}

function list_select_producto(data="") {
  const sendGetRequest = async () => {
      try {
          const resp = await axios.get("/get_producto_select");
          // console.log(resp.data);
          var cadena = "";
          if (data=="") {
            cadena += '<option value="null">--Producto--</option>';
              
            }else{
              cadena += '<option value="'+data.producto_id+'">'+data.nombre_producto+'</option>';
            }
          
          for (let i = 0; i < resp.data.length; i++) {
              cadena +=
                  '<option value="' + resp.data[i].id + '">'+ resp.data[i].code +'-' + resp.data[i].name +" </option>";
          }
          $(".list_producto").html(cadena);
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  };
  sendGetRequest();
}

$("#add_requisicion").on("click", function (e) {
  const data={
    description: $('#observaciones_requisicion').val(),
    priority : document.getElementById('prioritario').checked,
    certifityReq :document.getElementById('certif-requerid').checked,
    id_user_utenc: $('#id_user_autentic').val()
  }

// console.log(data);
$('#btn_loader').addClass('fa fa-spin fa-spinner');
  // validar_input(data.codigo,"code");

  var url = "/api/requisicion/store";
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
            $('#code').val("");
            $('#observaciones_requisicion').val("");
            messeg(response.success,'success');
            list_items();
            setInterval(function () {
              $('#btn_loader').removeClass('fa fa-spin fa-spinner');
              url = "/requisicion";
              $(location).attr('href',url);
             }, 2000);
          }
          if (response.status==404) {
            if (response.campo) {
              $("#code").addClass('is-invalid');
              $('#btn_loader').removeClass('fa fa-spin fa-spinner');
            }
            if (response.list=='vacio') {
              $(".iten_v").hide();
              $(".error_list_iten").show();
              $('#btn_loader').removeClass('fa fa-spin fa-spinner');
              let i=0;
              const h = setInterval(function () {
                i++
                $(".iten_v").show();
                $(".error_list_iten").hide();
                if (i=1) {
                  clearInterval(h);
                  }
               }, 6000);
            }
            messeg(response.success,'danger');
          }
      });


});

function validar_input(valor,id) {
  if (valor=='') {
    $("#"+id).addClass('is-invalid');
    // $("#codigo-producto").removeClass('is-valid');
    // return false;
  }else{
    $("#"+id).removeClass('is-invalid');
    $("#"+id).addClass('is-valid');
  }
}