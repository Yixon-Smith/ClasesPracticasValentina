$(document).ready(function() {
  list_items(); 
	$("#select_product,#select_proyecto,#select_status").select2();
  list_select_proyect();
  list_select_producto(); 
  list_items(); 
  code_view_imput();
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
            table += '<div class="media-p">';
            for (let j = 0; j < resp.data[0].rows[i].proyect_list.length; j++){
              table += '<div class="media-body iten-contenid"><a class="badge badge-secondary" href="#" data-bs-original-title="" title="">'+resp.data[0].rows[i].proyect_list[j].pro_nombre+'</a></div>';
            }
            table += '</div>';
            table += '</td>';
            table += '<td>';
            for (let j = 0; j < resp.data[0].rows[i].rq_mains.length; j++){
              table += '<a class="badge badge-secondary" href="/requisicion/'+resp.data[0].rows[i].rq_mains[j].rq_main+'" data-bs-original-title="" title="">'+resp.data[0].rows[i].rq_mains[j].code+'</a>';
            }
            table += '</td>';
            table += '<td>';
            table += '<p>'+resp.data[0].rows[i].qty+'</p>';
            table += '</td>';
            table += '<td>';
            table += '<input type="text" pattern="[0-9]*" onfocusout="update_row(\'valor\',this.value,'+  resp.data[0].rows[i].id+');" style="border: 0;text-align:right;width: 100%;" value=';
          table += resp.data[0].rows[i].vr_unit + '>';
          table+= '</td>';
          var row_sub = resp.data[0].rows[i].vr_unit * resp.data[0].rows[i].qty;
            table += '<td>'+ row_sub + '</td>';
            sub_total1 += row_sub;
            var desc_pre = (resp.data[0].rows[i].desc*row_sub/100);
            desc += desc_pre;
            table += '<td><div>';
            table += '<input type="text" pattern="[0-9]*" onfocusout="update_row(\'desc\',this.value,'+  resp.data[0].rows[i].id+');" style="border: 0;text-align:right;width: 18px;" value=';
            table += resp.data[0].rows[i].desc + '>';
            table += '%</div><div>'+desc_pre+'</div></td>';
            var iva_pre = resp.data[0].rows[i].iva*row_sub/100;
            iva += iva_pre;
            table += '<td style = " padding-right: 0px;padding-left: 0px;"><div>';
            table += '<input type="text" pattern="[0-9]*" onfocusout="update_row(\'iva\',this.value,'+  resp.data[0].rows[i].id+');" style="border: 0;text-align:right;width: 18px;" value=';
            table += resp.data[0].rows[i].iva + '>';
            table += '%</div><div>'+iva_pre+'</div></td>';
            table += '<td><div title="Quitar iten de la lista" class="setting-danger-p" onclick="delete_row('+resp.data[0].rows[i].id+')" title="Anular informe"><i class="fa fa-trash-o"></i></div> </td>';
            table += '</tr>';
            table += '</tr>';

          }
         
          $(".list_items").html(table);
          $("#sub_total1").html(sub_total1);
          const allEqual1 = arr => arr.every(v => v.desc === arr[0].desc);
          var deschtml = '';
          deschtml += '<div><input type="text" pattern="[0-9]*" onfocusout="update_global(\'desc\',this.value);" style="border: 0;width:18px;text-align:right" value=';
          deschtml+= allEqual1(resp.data[0].rows) ? resp.data[0].rows[0].desc +'>%':'>';
          deschtml += '</div>';
          deschtml += '<div>' + desc + '</div>';
          $('#desc').html(deschtml);
          $('#sub_total2').html(sub_total1-desc);
          const allEqual2 = arr => arr.every(v => v.iva === arr[0].iva);
          var ivahtml = '';
          ivahtml += '<div><input type="text" pattern="[0-9]*" onfocusout="update_global(\'iva\',this.value);" style="border: 0;width:18px;text-align:right" value=';
          ivahtml+= allEqual2(resp.data[0].rows) ? resp.data[0].rows[0].iva +'>%':'>';
          ivahtml += '</div>';
          ivahtml += '<div>' + iva + '</div>';
          $('#iva').html(ivahtml);
          $('#total').html(resp.data[0].total);
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
    messeg(response.success,'success');
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
    messeg(response.success,'success');
    list_items();
  })
  .catch(function (error) {
    console.log(error);
  });
}
