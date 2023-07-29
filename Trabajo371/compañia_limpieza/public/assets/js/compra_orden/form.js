$(document).ready(function() {
  list_items();
  $('.observaciones_requisicion').summernote({
    height: 200,
    popatmouse:true,
    // toolbar:[
    //     // ['style',['bold','italic','underline','clear']],
    //     // ['font',['strikethrough','superscript','subscript']],
    //     // ['fontsize',['fontsize']],
    //     // ['color',['color']],
    //     // ['para',['ul','ol','paragraph']],
    //     // ['height',['height']],
    //     //  ['insert',['link','picture','video']],
    // ]
  });
  if ($('#status_id').val()==6){
    $(":input").prop("disabled", true);
}
});

const loader = document.querySelector("#loading");


var checkbox = document.getElementById('prioritario');

function validaCheckbox()
{
  var checked = checkbox.checked;
  console.log(checked);
  if(checked){
    // alert('checkbox1 esta seleccionado');
  }
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


function list_select_proyect() {
  const sendGetRequest = async () => {
      try {
          const resp = await axios.get("/get_proyect_select");
          // console.log(resp.data);
          var cadena = "";
          cadena += '<option value="null">--Proyectos--</option>';
          for (let i = 0; i < resp.data.length; i++) {
              // console.log(resp.data)
              cadena +=
                  '<option value="' +
                  resp.data[0].rows[i].pro_id +
                  '">' +
                  resp.data[0].rows[i].pro_nombre +
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

function list_select_producto() {
  const sendGetRequest = async () => {
      try {
          const resp = await axios.get("/get_producto_select");
          // console.log(resp.data);
          var cadena = "";
          cadena += '<option value="null">--Producto--</option>';
          for (let i = 0; i < resp.data.length; i++) {
              cadena +=
                  '<option value="' + resp.data[0].rows[i].id + '">'+ resp.data[0].rows[i].code +'-' + resp.data[0].rows[i].name +" </option>";
          }
          $(".list_producto").html(cadena);
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  };
  sendGetRequest();
}

// function list_select_status() {
//   const sendGetRequest = async () => {
//       try {
//           const resp = await axios.get("/get_status_select");
//           console.log(resp.data);
//           var cadena = "";
//           cadena += '<option value="null">--Estatus--</option>';
//           for (let i = 0; i < resp.data.length; i++) {
//               cadena +=
//                   '<option value="' + resp.data[0].rows[i].description + '">' + resp.data[0].rows[i].description +"</option>";
//           }
//           $(".list_status").html(cadena);
//       } catch (err) {
//           // Handle Error Here
//           console.error(err);
//       }
//   };
//   sendGetRequest();
// }
$('#rqs').on('change.select2', function (e) { 
  const data={
    rq_main: $('#rqs').val(),
    compra_orden_id: $('#id').val(),
  }
  displayLoading();
  console.log(data);
  var url = "/api/compra/select_rq_main";
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
          if (response.success){
            messeg(response.success,'success');
            list_items();
          }
          else{
            messeg(response.error,'error');
          }
      });
});

$('.selesct_moneda_compras').on('change', function (e) {
  const data={
    moneda:$('.selesct_moneda_compras').val(),
    id_compras:$('#id_compras').val(),
  }
    console.log(data);
  const sendGetRequest = async () => {
    try {
        const resp = await axios.put("/compras/update_moneda",data);
        console.log(resp.data);
        list_items();
        // messeg(resp.data.success,"success");
        // list_items();
        // get_producto_detalles_apu(data.id_apu,data.id_categ);
    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();

});

$('input.currency').keyup(function(event) {

  // skip for arrow keys
  if(event.which >= 37 && event.which <= 40) return;
  // format number
  $(this).val(function(index, value) {
    return value
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    ;
  });
});
// $(".currency").keyup( function (e) {
//   this.value = this.value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
// });
// $(".currency").keyup(function(){
//   $(".currency").css("background-color", "pink");
// });
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
          const resp = await axios.get("list_items?id="+$('#id').val());
          hideLoading();
         
          let val_moneda = (resp.data[0].moneda==null)?"COP":resp.data[0].moneda;
          console.log(val_moneda);
          var sub_total1 = 0;
          var desc = 0;
          var iva= 0;
          console.log(resp.data);
          for (let i = 0; i < resp.data[0].rows.length; i++) {
            n++;
            table += '<tr  class="iten">';
            table += '<td>'+n+'</td>';
            table += '<td>';
            table += '<div class="media-p">';
            table += '<div class="media-body iten-contenid "><a href="#"><span>['+resp.data[0].rows[i].product.code+']'+resp.data[0].rows[i].product.name+'</span></a></div>';
            table += '</div>';
            table += '<div class="media-p">';
            if(resp.data[0].rows[i].product.description){
              table += '<div class="media-body iten-contenid "><a href="#"><span>'+resp.data[0].rows[i].product.description+'</span></a></div>';
            };
            table += '</div>';
            table += '</td>';
            table += '<td>';
        
            for (let j = 0; j < resp.data[0].rows[i].proyect_list.length; j++){
              table += '<a class="badge badge-secondary" href="#" data-bs-original-title="" title="">'+resp.data[0].rows[i].proyect_list[j].pro_nombre+'</a>';
            }
          
            table += '</td>';
            table += '<td>';
            for (let j = 0; j < resp.data[0].rows[i].rq_mains.length; j++){
              table += '<a class="badge badge-secondary" href="/requisicion/'+resp.data[0].rows[i].rq_mains[j].code+'/preview" data-bs-original-title="" title="">'+resp.data[0].rows[i].rq_mains[j].code+'</a>';
            }
            table += '</td>';
            table += '<td>';
            table += '<p>'+resp.data[0].rows[i].qty+'</p>';
            table += '</td>';
            table += '<td style="padding-right: 0px;padding-left: 0px;">';
            table += '<input class="form-control border price '
            if(resp.data[0].rows[i].vr_unit < 1){
              table += 'is-invalid'
            }
            
            table += '" id="currency" type="text"  pattern="[0-9]*" onfocusout="update_row(\'valor\',this.value.replaceAll(\',\',\'\'),'+  resp.data[0].rows[i].id+');" style="border: 0;text-align:right;width: 100%;" value=';
            table +=  resp.data[0].rows[i].vr_unit.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+ '>';
            table+= '</td>';
          var row_sub = resp.data[0].rows[i].vr_unit * resp.data[0].rows[i].qty;
            table += '<td>'+Intl.NumberFormat('de-DE', { style: 'currency', currency:val_moneda}).format(row_sub)  + '</td>';
            sub_total1 += row_sub;
            var desc_pre = (resp.data[0].rows[i].desc*row_sub/100);
            desc += desc_pre;
            table += '<td><div class="input-group input-group-sm mb-1 justify-content-sm-center" >';
            table += '<input class="border" maxlength="2" type="text" pattern="[0-9]*" onfocusout="update_row(\'desc\',this.value,'+  resp.data[0].rows[i].id+');" style="border: 0;text-align:right;width: 25px;" value=';
            table += resp.data[0].rows[i].desc + '>';
            table += '<span class="input-group-text gb-text-color" >%</span></div><div class="text-center">'+Intl.NumberFormat('de-DE', { style: 'currency', currency:val_moneda}).format(desc_pre)+'</div></td>';
            var iva_pre = resp.data[0].rows[i].iva*row_sub/100;
            iva += iva_pre;
            table += '<td><div class="input-group input-group-sm mb-1 justify-content-sm-center" >';
            table += '<input class="border" maxlength="2" type="text" pattern="[0-9]*" onfocusout="update_row(\'iva\',this.value,'+  resp.data[0].rows[i].id+');" style="border: 0;text-align:right;width: 25px;" value=';
            table += resp.data[0].rows[i].iva + '>';
            table += '<span class="input-group-text gb-text-color" >%</span></div><div class="text-center">'+Intl.NumberFormat('de-DE', { style: 'currency', currency:val_moneda}).format(iva_pre)+'</div></td>';
            if ($('#status_id').val()!=6){
            table += '<td><div title="Quitar iten de la lista" class="setting-danger-p" onclick="delete_row('+resp.data[0].rows[i].id+')" title="Anular informe"><i class="fa fa-trash-o"></i></div> </td>';
            }
            table += '</tr>';
            table += '</tr>';
          }
          
          $(".list_items").html(table);
          if ($('#status_id').val()==6){
            $(":input").prop("disabled", true);
            }
          $("#sub_total1").html(Intl.NumberFormat('de-DE', { style: 'currency', currency:val_moneda}).format(sub_total1));
          const allEqual1 = arr => arr.every(v => v.desc === arr[0].desc);
          $('#desc').html(Intl.NumberFormat('de-DE', { style: 'currency', currency:val_moneda}).format(desc));
          $('#inputDesc').val(allEqual1(resp.data[0].rows) ? resp.data[0].rows[0].desc: '')
          $('#tagDesc').html(allEqual1(resp.data[0].rows) ? '%': '')
          $('#sub_total2').html(Intl.NumberFormat('de-DE', { style: 'currency', currency:val_moneda}).format(sub_total1-desc));
          const allEqual2 = arr => arr.every(v => v.iva === arr[0].iva);
          $('#iva').html(Intl.NumberFormat('de-DE', { style: 'currency', currency:val_moneda}).format(iva));
          $('#inputIva').val(allEqual2(resp.data[0].rows) ? resp.data[0].rows[0].iva: '')
          $('#tagIva').html(allEqual2(resp.data[0].rows) ? '%': '')
          $('#total').html(Intl.NumberFormat('de-DE', { style: 'currency', currency:val_moneda}).format(resp.data[0].total));
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  };
  sendGetRequest();

}

function delete_row(id) { 
  const sendGetRequest = async () => {
      try {
          const resp = await axios.delete("/compra/row_item/"+id);
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
function update_global(change,value){
  const data={
    compra_orden_id: $('#id').val(),
    new: value,
  }
  displayLoading();
  console.log(data);

  var url = (change == "desc") ? "/compra/desc_global":"/compra/iva_global";
  axios.post(url, data)
  .then(function (response) {
    console.log(response);
    messeg(response.data.success,'success');
    list_items();
  })
  .catch(function (error) {
    console.log(error);
  });
}
function update_row(change,value,row){
  const data={
    new: value,
    row: row,
    change: change,
  }
  displayLoading();
  console.log(data);
  var url = "/compra/update_row";
  axios.post(url, data)
  .then(function (response) {
    console.log(response);
    messeg(response.data.success,'success');
    list_items();
  })
  .catch(function (error) {
    console.log(error);
  });
}
