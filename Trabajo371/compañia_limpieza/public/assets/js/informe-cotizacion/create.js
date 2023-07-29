$(document).ready(function() {
    get_select_cotizacion();
    option_contenido(false);

    $('#content').summernote({
        height: 300,
        popatmouse:true,
        // toolbar:[
        //     ['style',['bold','italic','underline','clear']],
        //     ['font',['strikethrough','superscript','subscript']],
        //     ['fontsize',['fontsize']],
        //     ['color',['color']],
        //     ['para',['ul','ol','paragraph']],
        //     ['height',['height']],
        //     ['insert',['link','picture','video']],
        // ]
    });

//   var markupStr = $('#summernote').summernote('code');
//   console.log(markupStr);

//     var markupStr = 'hello world';
// $('#summernote').summernote('code', markupStr); funcin para mostrar el contenido
});

$("#limpiar-content").on("click", function (e) {
    $('#form-informe-cotizacion')[0].reset();
    $('#content').summernote('code', '');
    $("#id_conten").val("");
  });

function verificar_num_ubicacion(e) {
console.log(e.value);
let id_cotizacion = $('#id_cotizacion').val();
if(e.value==""){
    return false;
}
const sendGetRequest = async () => {
    try {
        const resp = await axios.get("/verificar_num_ubicacion/"+id_cotizacion+"/"+ e.value);
        console.log(resp.data);
        if (resp.data.success) {
            $("#num_ubicacion").addClass('is-invalid');
            $("#num_ubicacion").removeClass('is-valid');
            $("#code-ms").addClass('invalid-feedback');
            $("#text-msg").text('¡Ups! Este numero ya existe');
        }else{
            $("#code-ms").removeClass('invalid-feedback');
            $("#code-ms").addClass('valid-feedback');
            $("#text-msg").text('Excelente!');
            $("#num_ubicacion").removeClass('is-invalid');
            $("#num_ubicacion").addClass('is-valid');
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
sendGetRequest();
}

$("#create-content").on("click", function (e) {
e.preventDefault();
const data = {
    id:$("#id_conten").val(),
    id_cotizacion:$("#id_cotizacion").val(),
    pocision: $("#num_ubicacion").val(),
    titulo: $("#titulo").val(),
    contenido: $(".contenido").val(),
};
if (data.id_totizacion=="") {
    messeg("Debes seleccionar una cotización para continuar",'warning');
    return false;
}
console.log(data);

if (data.id=="") {
var url = "/api/informe-cotizacion/store";
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
        if(response.status==200){
         $('#form-informe-cotizacion')[0].reset();
        $('#content').summernote('code', '');
        list_contenido();
        messeg(response.success,'success')
        }else{
            // messeg(response.errors.pocision[0],'danger')
        }
        
       
    });
}else{

var url = "/api/informe-cotizacion/update";
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
        $('#form-informe-cotizacion')[0].reset();
        $('#content').summernote('code', '');
        list_contenido();
        $("#id_conten").val("");
        messeg(response.success,'success')
       
    });
}

});



function option_contenido(boo){
if (boo) {
    // x.style.display = 'block';
    $("#option_lista_contenidos").show();
    $("#header-contenido-informe").show();        
    
} else {
    // x.style.display = 'none';
    $("#option_lista_contenidos").hide();
    $("#header-contenido-informe").hide();
  
}
}

function list_contenido() {
var id_cotizacion=$("#id_cotizacion").val();
const sendGetRequest = async () => {
    try {
    
        const resp = await axios.get("/informe-cotizacion/all_informe/"+id_cotizacion);
         console.log(resp.data);
         var table = "";
         if (resp.data =="") {
            //  console.log("vacio");
             table +='<div class="text-center alert-vacio">Sin información</div>';
             
         }else{
            for (let i = 0; i < resp.data.length; i++) {
                table +='<tr>';
                table +='<td class="p-1">';
                table +='<div class="media">';
                table +='<span class="ubic"> '+resp.data[i].pocision+' </span>';
                table +='<div class="media-body ">';
                table +='<div class="row">';
                table +='<div class="col-12 col-md-12 iten-contenid"> <span>'+resp.data[i].titulo+'</span> </div>';
                table +='</div>';
                table +='<div class="row">';
                // table +='<div class="col-12 col-md-12"><p class="iten-contenid">'+response[i].contenido+'</p></div>';
                table +='</div>';
                table +='</div>';
                table +='</div>';
                table +='</td>';
                table +='<td class="p-1 "><a href="javascript:void(0)" onclick="editar_conten('+resp.data[i].id+')" class="text-warning" >Editar</a></td>';
                table +='<td class="p-1 "><a class="text-danger" onclick="eliminar_contenido(this,'+resp.data[i].id+')" href="javascript:void(0)">Eliminar</a></td>';
                table +='</tr>';  
        
                }
         }
       

       

        $("#lis_conten").html(table);
     
    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();

}

function editar_conten(id) {
const sendGetRequest = async () => {
    try {
    
        const resp = await axios.get("/show_contenido/"+id);
        console.log(resp.data);
        $("#id_conten").val(resp.data.id);
        $("#num_ubicacion").val(resp.data.pocision);
        $("#titulo").val(resp.data.titulo);
        $('#content').summernote('code', resp.data.contenido);

     
    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();
}

function eliminar_contenido(e,id) {
console.log(e);
var r = confirm("¡CUIDADO!\r\n¿Estas seguro que deseas eliminar este contenido?.\r\nNo podrás revertir los cambios.");
if (r) {
const sendGetRequest = async () => {
    try {
    
        const resp = await axios.delete("/delete_contenido/"+id);
        // console.log(resp.data);

        if (resp.data.status==200) {
        messeg(resp.data.success,"success");
        list_contenido();
        }else{
          messeg("Se produjo un problema al eliminar","danger");
        }
     
    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();
}
}
//funcion para listar la cotizaciones aprobadas en el select
function get_select_cotizacion() {
sendGetRequest = async () => {
    try {
    
        const resp = await axios.get("/select_Cotizacion_aprobado");
        console.log(resp.data);
        var cadena = "";
        cadena += '<option value="null">Seleccione una cotización</option>';
        for (let i = 0; i < resp.data.length; i++) {
            cadena +=
                '<option value="' +
                resp.data[i].id +
                '">' +
                resp.data[i].codigo_cot +
                "-"+resp.data[i].nombre_proyecto+" </option>";
        }
        $(".list_cotizacion").html(cadena);

       
     
    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();
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

// function select_contenid_cotizacion(id_cotizacion){

// }

function Select_cotizacion_informe(e) {
console.log(e.value);
sendGetRequest = async () => {
    try {
    
        const resp = await axios.get("/cotizacion_seleccionado/"+e.value);
        console.log(resp.data);
    
        $("#cotizacion-structr").text(resp.data[0].codigo_cot);
        $("#cotizacion-proyecto").text(resp.data[0].nombre_proyecto);
        $("#id_cotizacion").val(resp.data[0].id);
        list_contenido();            
        option_contenido(true);

       
     
    } catch (err) {
        // Handle Error Here
    }
};
sendGetRequest();

}
$("#select_product").select2();  
