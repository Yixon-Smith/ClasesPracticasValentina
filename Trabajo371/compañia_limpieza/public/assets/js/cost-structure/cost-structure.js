let id_apu;

$(document).ready(function () {
    // get_product_detalle_apu( 1, "producto");
    list_proyect(); //llamo la funcion para listar los proyecto en el selec al cargar la pagina
    get_medidas_select()// traer las medidas
    // apu();
    let option=$('#show_apus').val();
    if(option =="show"){
        let id_cotizacion = $('#id_cotizacion').val();
        apu_acordeon_list(id_cotizacion);
    }

    funcion_opcion(false); //funcion para ocultar las apu
    // apu_detalles_table();
});

const loader = document.querySelector("#loading");

function displayLoading() {
    // loader.classList.add("spinner-border");
    $("#loading").addClass('spinner-border');
    // $("#codigo-producto").removeClass('is-valid');
    // to stop loading after some time
    setTimeout(() => {
        // loader.classList.remove("spinner-border");
     $("#loading").removeClass('spinner-border');

    }, 5000);
  }

  // hiding loading
  function hideLoading() {
    // loader.classList.remove("spinner-border");
    $("#loading").removeClass('spinner-border');
  }

// funcion para las notificaciones de alertas
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

// funcion para crear las partidas o apus
// $("#create-partida-button").on("click", function (e) {
//     e.preventDefault();
//     const data = {
//         name: $("#nombre-partida").val(),
//         descripcion: $("#descripcion-partida").val(),
//     };
//     const sendGetRequest = async () => {
//         try {
//             const resp = await axios.get("/get_proyect_show/" + e.value);
//             console.log(resp.data);
//         } catch (err) {
//             // Handle Error Here
//             console.log(err);
//         }
//     };
//     sendGetRequest();
// });

// funcion para listar los proyecto en el select
function list_proyect() {
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/get_proyect");
            // console.log(resp.data);
            var cadena = "";
            cadena += '<option value="null">Seleccione un proyecto</option>';
         for (const key in resp.data) {
            // console.log(resp.data[key]);
             if (Object.hasOwnProperty.call(resp.data, key)) {
                 const element = resp.data[key];
                     cadena +=
                         '<option value="' +
                         element.pro_id +
                         '">' +
                         element.pro_nombre +
                         " </option>";
             }
         }
        $(".list_proyect").html(cadena);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

// funcion para ocutar o mostrar dependiendo si es true o false
function funcion_opcion(e) {
    var x = $("#view-structu-cost");
    if (e) {
        // x.style.display = 'block';
        $("#view-structu-cost").show();
        $("#view-structu-cost-butom").show();
        $("#list-apu").show();
        $("#list_apu_resumen").show();
        $("#btn-apobar-cotizacion").show();
        $("#list_apu_resumen_vacio").hide();
        $('#box_comversion_all').show();
    } else {
        // x.style.display = 'none';
        $("#btn-apobar-cotizacion").hide();
        $("#view-structu-cost").hide();
        $("#view-structu-cost-butom").hide();
        $("#list-apu").hide();
        $("#list_apu_resumen").hide();
        $("#list_apu_resumen_vacio").show();
        $('#box_comversion_all').hide();
    }
}

// funcion para llenar los campos y mostrar los datos del proyecto con el cliente
function Select_proyect(e) {
    // console.log(e.value);
    var f = new Date();
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/get_proyect_show/" + e.value);
            // console.log(resp.data);
            if (resp.data == "") {
                funcion_opcion(false);
                return false;
            } else {

                // console.log(resp.data);
                funcion_opcion(true);
                insert_cotizacion(resp.data[0].pro_id);
                $("#cliente-nombre").val(resp.data[0].clie_nombre);
                $("#cliente-contacto").val(resp.data[0].clie_persona_contacto);
                $("#cliente-telefono").val(resp.data[0].clie_telefono);
                $("#fecha-structr").html(
                    f.getDate() +
                        "/" +
                        (f.getMonth() + 1) +
                        "/" +
                        f.getFullYear()
                );
            }
        } catch (err) {
            // Handle Error Here
        }
    };
    sendGetRequest();
}

// funcion para agregar cotizacion a travez del selec
function insert_cotizacion(d) {
    const data ={
        id_proyec: d
    }
    const sendGetRequest = async () => {
        try {
            const resp = await axios.post('/insert-temp-cotizacion',data);
            console.log(resp.data);
            $("#id_cotizacion").val(resp.data.id_cotizacion);
            $("#codigo_cotizacion").text(resp.data.codigo_cot);
            $("#correspondiente").val(resp.data.correspondiente);

            if (resp.data.convertido) {
                $("#option-final-cliente").removeAttr("onchecked","");
                $("#option-final-cliente").attr("checked","");

                 $('#box-convercion').show(100);
               $('#trm_struct').val(resp.data.valor_trm);
               $('#moneda_struct').val(resp.data.moneda);
               $('#view_trm_structura').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.valor_trm))
            }else{

                $("#option-final-cliente").attr("onchecked","");
                $("#option-final-cliente").removeAttr("checked","");
                $('#box-convercion').hide(100);
            }

            if (resp.data.facturado) {
                $('#text-ribbon').show();
                $('#text-ribbon').text("Estructura Facturada");
                $('#new-estructura').hide();
                $('#generado-estructura').show();
                $('#text-ribbon').removeClass("ribbon-info").removeClass('ribbon-secondary').removeClass("ribbon-success").removeClass("ribbon-danger").addClass('ribbon-dark');
            }else{
                if (resp.data.aprobado_por=='2') {
                    $('#text-ribbon').show();
                    $('#text-ribbon').text("Aceptada Por Cliente");
                    $('#new-estructura').hide();
                    $('#generado-estructura').show();
                    $('#text-ribbon').addClass("ribbon-success").removeClass("ribbon-info").removeClass('ribbon-secondary').removeClass("ribbon-danger").removeClass('ribbon-dark');

                }else if(resp.data.estatus_cot=='0'){
                    $('#text-ribbon').show();
                    $('#new-estructura').show();
                    $('#generado-estructura').hide();
                    $('#text-ribbon').text("Nueva estructura");
                    $('#text-ribbon').removeClass("ribbon-success").removeClass("ribbon-danger").removeClass('ribbon-secondary').removeClass('ribbon-dark').addClass("ribbon-info");
                }else if(resp.data.estatus_cot=='1'){
                    $('#text-ribbon').show();
                    $('#new-estructura').hide();
                    $('#generado-estructura').show();
                    $('#text-ribbon').text("Estructura generada");
                    $('#text-ribbon').removeClass("ribbon-success").removeClass("ribbon-danger").removeClass("ribbon-info").removeClass('ribbon-dark').addClass('ribbon-secondary');
                }else if(resp.data.estatus_cot=='2') {
                    $('#text-ribbon').show();
                    $('#text-ribbon').text("Esta estructura está anulado");
                    $('#new-estructura').hide();
                    $('#generado-estructura').show();
                    $('#text-ribbon').removeClass("ribbon-info").removeClass('ribbon-secondary').removeClass("ribbon-success").removeClass('ribbon-dark').addClass("ribbon-danger");
                }
            }


            // $('#text-ribbon').hide();
            apu_acordeon_list(resp.data.id_cotizacion);

        } catch (err) {
            // Handle Error Here
            console.error(err);
            console.log(resp.data);
        }
    };
    sendGetRequest();
}

// evento para actualizar el estatus de una cotizacion
$("#gener_info_cotizacion").on("click", function (e) {

    swal({
        title: "¡CUIDADO!",
        text:"¿Estas seguro que deseas finalizar esta Cotización?.\r\nNo podrás revertir los cambios.",
        icon: "info",
        buttons:{
            cancel: "Cancelar",
            catch: {
                text: "Generar propuesta",
            },
        },
        dangerMode: false,
        }).then((willDelete) => {
            $('#btn_loader').addClass('fa fa-spin fa-spinner');
            if (willDelete) {
                const data={
                    id:$("#id_cotizacion").val()
                }
                const sendGetRequest = async () => {
                    try {

                        const resp = await axios.put("/update_status_cotizacion",data);
                        console.log(resp.data);
                        if (resp.data.status==200) {
                        messeg(resp.data.success,"success");
                        setInterval(function () {
                            $('#btn_loader').removeClass('fa fa-spin fa-spinner');
                            url = "/informe";
                            $(location).attr('href',url);
                        }, 2000);

                        }else if(resp.data.status==404){
                            swal({
                                title: "¡HAY UN PROBLEMA!",
                                text:resp.data.error,
                                icon: "warning",
                                buttons:{
                                    cancel: "Cerrar",

                                },
                                dangerMode: false,
                                })
                          messeg("Se produjo un problema","danger");
                          $('#btn_loader').removeClass('fa fa-spin fa-spinner');
                        }

                    } catch (err) {
                        // Handle Error Here
                    }
                };
                sendGetRequest();
            }else{
                $('#btn_loader').removeClass('fa fa-spin fa-spinner');
            }
        })

});



// funcion para verificar el codigo del producto si existe
function verificar_producto(e) {
    // console.log(e.value);
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/verificar_codigo/" + e.value);
            // console.log(resp.data.success);
            if (resp.data.success) {
                $("#codigo-producto").addClass('is-invalid');
                $("#codigo-producto").removeClass('is-valid');
                var c=`<div class="invalid-feedback"> camoiokj </div>`
                $("#code-ms").html('¡Ups! Este codigo ya existe');
            }else{
                $("#code-ms").html('¡Excelente!');
                $("#codigo-producto").removeClass('is-invalid');
                $("#codigo-producto").addClass('is-valid');
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

function limpiar_imput_form_producto() {
    $("#codigo-producto").val("");
    $("#nombre-producto").val("");
    $("#precio-producto").val("");
    $("#descripcion-producto").val("");
    $("#codigo-producto").removeClass('is-invalid');
    $("#nombre-producto").removeClass('is-invalid');
    $("#precio-producto").removeClass('is-invalid');

    // $("#nombre-producto").addClass('is-valid');
}

$("#cancelar-producto-button").on("click", function (e) {
    limpiar_imput_form_producto();
    $(".crear-producto").click();
});

//create producto desde los detalles de apus
$("#create-producto-button").on("click", function (e) {
    e.preventDefault();
    $("#code-ms").html('');
    const data = {
        code: $("#codigo-producto").val(),
        name: $("#nombre-producto").val(),
        product_unit_id: $("#select_unidad").val(),
        price: $("#precio-producto").val(),
        description: $("#descripcion-producto").val(),
        product_type_id: $("#id_categoria").val(),
    };
    console.log(data);
    if (data.code=="" ||data.name==""||data.price=="" ||data.select_unidad=="") {
        // $("#code-ms").html('Campo requerido');
        $("#codigo-producto").addClass('is-invalid');
        $("#nombre-producto").addClass('is-invalid');
        $("#precio-producto").addClass('is-invalid');
        // $("#select_unidad").addClass('is-invalid');
        return false;
    }


    var url = "/api/cost-structure/store_procuct";
    fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
        .then((res) => res.json())
        .catch((errors) => console.error("Error:", errors))
        .then( (response) =>{
            console.log(response);
            if (response.status == 200) {
                messeg(response.success,"success");
                $(".crear-producto").click();
                limpiar_imput_form_producto();
                // $("#form-producto-create")[0].reset();
                switch (response.id_categoria) {
                    case 1:
                        select_opction_producto(1,"productos");
                        // return false;
                        break;
                    case 2:
                        select_opction_producto(2,"Equipo y herramientas");
                        //  return false;
                        break;
                    case 3:
                        select_opction_producto(3,"Servicios");
                        //  return false;
                        break;
                    case 4:
                        select_opction_producto(4,"Mano de obras");
                        //  return false;
                        break;

                    default:
                        break;
                }
                // if (response.id_categoria==1) {
                //     // $(".clik-materiales").click();
                //     select_opction_producto(response.id_categoria,"productos");
                //     return false;

                // }
                // if (response.id_categoria==2) {
                //     // $(".clik-materiales").click();
                //     select_opction_producto(2,"Equipo y herramientas");
                //     return false;

                // }
                // if (response.id_categoria==3) {
                //     // $(".clik-materiales").click();
                //     select_opction_producto(3,"Servicios");
                //     return false;

                // }
                // if (response.id_categoria==4) {
                //     // $(".clik-materiales").click();
                //     select_opction_producto(4,"Manos de obras");
                //     return false;

                // }

                // get_product_detalle_apu(1, "producto",'materiales','list_productos');
                // get_product_detalle_apu(2,'herramienta','equipo-herramienta','list-herramientas');
                // get_product_detalle_apu(3,'servicio','servicios','list-servicio');
                // get_product_detalle_apu(4,'servicio','mano-obra','list-mano-obra');

            } else {

                if (response.errors.code) {

                }
                $("#codigo-producto").addClass('is-invalid');
                // $("#msg").html('<div class="invalid-feedback"> camoiokj </div>');
                console.log(response.errors.code[0]);
                messeg(response.errors.code[0],"danger");
            }
        });
});

$("#btn-cancelar-partida").on("click", function (e) {
    $("#descripcion").val("");
    $("#descripcion").removeClass('is-invalid');
});

//create nueva partida
$("#create-partida-button").on("click", function (e) {
    e.preventDefault();
    const data = {
        id_cot:$("#id_cotizacion").val(),
        description_apu: $("#descripcion").val(),
        cantidad:1,
        administracion_apu: 0,
        utilidad_emprevistos_apu: 0,
        descuento_apu:0,
        tmpapu_suma_general:0
    };

    if (data.description_apu=="") {
        $("#code-ms").html('Campo requerido');
        $("#descripcion").addClass('is-invalid');
        return false;
    }

var url = "/api/cost-structure/store_partida";
    fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
        .then((res) => res.json())
        .catch((errors) => console.error("Error:", errors))
        .then( (response) =>{
            $("#btn-cancelar-partida").click();
            // $('.neva-partida').modal('hide');
            $("#form-partidas")[0].reset();
          console.log(response.success,data.id_cot);
          if (response.status==200) {

                apu_acordeon_list(data.id_cot);
                messeg(response.success,'success');

          }else{
            $("#descripcion").addClass('is-invalid');
          }

        });

});

// funcion para listar las apus
function apu_acordeon_list(id_cot) {
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/get_apu_cotizacion/" + id_cot);
            // console.log(resp.data);
            list_resumen_apus(id_cot);
            list_resumen_apus_convercion(id_cot);
            // resumen_structure_costo();
            var cadena = "";
            let c=0;
           for (let i = 0; i < resp.data.length; i++) {
                // console.log("gg:"+resp.data[i].id);
                // apu_detalles_table();
                // uma_all_detalle_producto(id_apu)
                c++;
                cadena += ' <div class="card mb-0">';
                cadena +='<a href="#collapseTwo'+resp.data[i].tmpapu_nro+'"  onclick="obtener_id_apu('+resp.data[i].id+')" class="text-dark collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="collapseTwo">';
                cadena += '<div class="card-header p-3" id="headingTwo">';
                cadena +=' <div class="row">';
                cadena +='<div class="col-6 col-md-11">';
                // cadena += '<h6 class="m-0 font-14">APU Nº '+resp.data[i].tmpapu_nro+'</h6>';
                cadena += '<h6 class="m-0 font-14">APU Nº '+resp.data[i].tmpapu_nro+' - <span class="h6 text-muted">'+resp.data[i].tmpapu_descripcion+'</span></h6>';
                cadena += "</div>";
                cadena +='<div class="col-6 col-md-1 alien-right">';
                cadena +='<button class="btn-option-damger " onclick="delete_apus('+resp.data[i].id+','+id_cot+');" title="Eliminar"><i class="fa fa-trash-o"></i></button>';
                cadena += "</div>";
                cadena += "</div>";
                cadena += "</div>";
                cadena += "</a>";
                cadena += '<div id="collapseTwo'+resp.data[i].tmpapu_nro+'" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">';
                cadena += '<div class="card-body">';
                cadena += `<nav>
                            <div class="nav nav-tabs" id="nav-tab${resp.data[i].tmpapu_nro}" role="tablist">
                                <a class="nav-item nav-link  clik-materiales"
                                    onclick="get_product_detalle_apu(1,'Material','materiales','list_productos',${resp.data[i].id})" id="nav-home-tab"
                                    data-toggle="tab" href="#materiales" role="tab" aria-controls="nav-home"
                                    aria-selected="true">MATERIALES</a>
                                <a class="nav-item nav-link clik-equipo-herramienta" id="nav-profile-tab"
                                    onclick="get_product_detalle_apu(2,'Equipos y herramientas','equipo-herramienta','list-herramientas',${resp.data[i].id})"
                                    data-toggle="tab" href="#equipo-herramienta" role="tab"
                                    aria-controls="nav-profile" aria-selected="false">EQUIPOS Y HERRAMIENTAS</a>
                                <a class="nav-item nav-link clik-servicio" id="nav-contact-tab"
                                    onclick="get_product_detalle_apu(3,'Servicios','servicios','list-servicio',${resp.data[i].id})" data-toggle="tab"
                                    href="#servicios" role="tab" aria-controls="nav-contact"
                                    aria-selected="false">SERVICIOS</a>
                                <a class="nav-item nav-link clik-mano-obra" id="nav-contact-tab"  onclick="get_product_detalle_apu(4,'Manos de obras','mano-obra','list-mano-obra',${resp.data[i].id})" data-toggle="tab"
                                    href="#mano-obra" role="tab" aria-controls="nav-contact"
                                    aria-selected="false">MANO DE OBRA</a>
                            </div>
                        </nav>`
                cadena += '<div class="tab-content option_table_apu'+resp.data[i].id+'" id="nav-tabContent">'
                cadena += "</div>";
                cadena += ` <div class="card">
                <div class="row">
                    <div class="col-4 col-sm-5" id="box-sum-categorias-apu${resp.data[i].id}">

                    </div>`

                    cadena+=`
                    <div id="box-sum-apu${resp.data[i].id}" class="col-4 col-sm-7 ">
                    </div>
                </div>
            </div>`;
                cadena += "</div>";
                cadena += "</div>";
                cadena += '</div>';
            }
            $(".apu").html(cadena);




        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();

}

function delete_apus(id,id_cot) {
    swal({
        title: "¡CUIDADO!",
        text:"\n¿Está seguro que desea eliminar esta apu?.\r\nNo podrás revertir los cambios.",
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
                            apu_acordeon_list(id_cot);
                            resumen_structure_costo();
                            resumen_structure_convercion();
                        }
                    } catch (err) {
                        // Handle Error Here
                    }
                };
                sendGetRequest();
            }
        })
}

//funcion para mostrar las medidas
function get_medidas_select() {
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/get_medidas");
            //  console.log(resp.data);
            var cadena = "";
            cadena += '<option value="null">Seleccione una medida</option>';
            for (let i = 0; i < resp.data.length; i++) {
                // console.log(resp.data)
                cadena +=
                    '<option value="' +
                    resp.data[i].id +
                    '">' +
                    resp.data[i].name +
                    " </option>";
            }
            $(".list_medidas").html(cadena);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

// funcion para llemar actualizar todos los detalles de la tabla de cada apu y traer los producto por categoria
function get_product_detalle_apu(n, m, op,option_select_list,id_apu="") {
    apu_detalles_table(op,option_select_list,id_apu);
    get_producto_detalles_apu(option_select_list,id_apu,n);
    // select_opction_producto(n,m);


    const sendGetRequest = async () => {
        try {
            var cadena = "";
            // const resp = await axios.get("/get_product/" + n);

            // //  console.log(resp.data);
            // // list_select_apu(resp, n, m);
            //    var cadena = "";
            //     cadena += '<option value="null">Seleccione un ' + m + "</option>";
            //     for (let i = 0; i < resp.data.length; i++) {
            //         //  console.log(resp.data)
            //         cadena +=
            //             '<option value="' +
            //             resp.data[i].id +
            //             '">' +
            //             resp.data[i].name +
            //             " </option>";
            //     }
            //     if (n == 1) {
            //         $(".list_productos").html(cadena);
            //         return false;
            //     }
            //     if (n == 2) {
            //         $(".list-herramientas").html(cadena);
            //         return false;
            //     }
            //     if (n == 3) {
            //         $(".list-servicio").html(cadena);
            //         return false;
            //     }
            //     if (n == 4) {
            //         $(".list-mano-obra").html(cadena);
            //         return false;
            //     }

            // get_producto_detalles_apu(option_select_list,id_apu,n);
            cadena +=
                '<input type="hidden" id="id_categoria" name="id_categoria" value="' +n +
                '">';
            $(".id_cat").html(cadena);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();

    cadena="";
    cadena +='<input type="hidden" id="id_apus" name="id_apus" value="'+id_apu+'">';
    $(".id_ap").html(cadena);
}

//funcion que se encarga de mostrar los producto en el select dependiendo de su categoria
function select_opction_producto(n,m) {
    const sendGetRequest = async () => {
        try {
            var cadena = "";
            const resp = await axios.get("/get_product/" + n);
            //  console.log(resp.data);
            if (resp.data.length==0) {
                cadena += '<option value="null">No hay informacion</option>';
               return false;
            }
            cadena += '<option value="null">Seleccione un ' + m + "</option>";
            for (let i = 0; i < resp.data.length; i++) {
                //  console.log(resp.data)
                cadena +=
                    '<option title="'+resp.data[i].description+'" value="' +
                    resp.data[i].id +
                    '">' +
                    resp.data[i].name +
                    " </option>";
            }
            switch (n) {
                case 1:
                    $(".list_productos").html(cadena);
                    break;
                case 2:
                    $(".list-herramientas").html(cadena);
                    break;
                case 3:
                    $(".list-servicio").html(cadena);
                    break;
                case 4:
                    $(".list-mano-obra").html(cadena);
                    break;

                default:
                    break;
            }
            // if (n == 1) {
            //     $(".list_productos").html(cadena);
            //     // return false;
            // }
            // if (n == 2) {
            //     $(".list-herramientas").html(cadena);
            //     // return false;
            // }
            // if (n == 3) {
            //     $(".list-servicio").html(cadena);
            //     // return false;
            // }
            // if (n == 4) {
            //     $(".list-mano-obra").html(cadena);
            //     // return false;
            // }

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

//funcion para actualizar los select dependiendo de su categoria
// function list_select_apu(resp, n, m) {

//     var cadena = "";
//     cadena += '<option value="null">Seleccione un ' + m + "</option>";
//     for (let i = 0; i < resp.data.length; i++) {
//         //  console.log(resp.data)
//         cadena +=
//             '<option value="' +
//             resp.data[i].id +
//             '">' +
//             resp.data[i].name +
//             " </option>";
//     }
//     if (n == 1) {
//         $(".list_productos").html(cadena);
//         return false;
//     }
//     if (n == 2) {
//         $(".list-herramientas").html(cadena);
//         return false;
//     }
//     if (n == 3) {
//         $(".list-servicio").html(cadena);
//         return false;
//     }
//     if (n == 4) {
//         $(".list-mano-obra").html(cadena);
//         return false;
//     }
// }

//funcion para mostrar las tablas de cada apu
function apu_detalles_table(op='materiales',option_select_list='list_productos',id_apu) {

    var table = "";
    table += '<div class="tab-pane fade show active" id="'+op+'" role="tabpanel" aria-labelledby="nav-home-tab">';
    table += '<div class="card">';
    table += '<div class="order-history table-responsive wishlist">';
    table += '<table class="table table-bordered">';
    table += '<thead>';
    table += '<tr>';
    table += '<th>PRODUCTO</th>';
    table += '<th>UNIDAD</th>';
    table += '<th>CANTIDAD</th>';
    table += '<th>UNITARIO</th>';
    table += '<th>ACCION</th>';
    table += '<th>VALOR</th>';
    table += '</tr>';
    table += '</thead>';
    // table += '<tbody >';

    table += '<tbody class="intem_producto'+id_apu+' " >';
    // table += '<tr>';
    // table += '<td>';
    // table += '<div class="product-name">';
    // table += '<a href="#"><h6>Long Top</h6></a>';
    // table += '</div>';
    // table += '</td>';
    // table += '<td>';
    // table += '<div class="product-name">';
    // table += '<a href="#"><h6>SACO</h6></a>';
    // table += '</div>';
    // table += '</td>';
    // table += '<td>';
    // table += '<div class="input-group">';
    // table += '<input min="1" onchange="update_cantidad(this)" type="number" class="form-control" id="cantidad">';
    // table += '</div>';
    // table += '</td>';
    // table += '<td> 102$ </td>';
    // table += '<td><i data-feather="x-circle"></i></td>';
    // table += '<td>$12456</td>';
    // table += '</tr>';
    // table += '</tbody>';


    // table += '<tr>';
    // table += '<td colspan="4">';
    // table += ' <div class="row">';
    // table += '<div class=" col-12 col-md-9">';
    // table += '<div class="w-100">';
    // table += '<div class="row">';
    // table += '<div class="col-12 col-md-9">';
    // table += '<select onchange="selec_producto_detalle(this)" class="form-select list_productos iten_productos digits '+option_select_list+'" id="select_product"  name="select_product">   </select>';
    // table += '</div>';
    // table += '<div class=" px-0 col-12 col-md-3 item-div">';
    // table += '<span class="id_all"></span>';
    // table += '<span class="id_ap"></span>';
    // table += '<button type="button" onclick="add_productos(this)" class="btn btn-primary btn-sm text-start add_producto_detalle"  >Aplicar</button>';
    // table += '</div>';
    // table += '<span class="id_cat"></span>';
    // table += '</div>';
    // table += '</div>';
    // table += '</div>';
    // table += '<div class="col-12 col-md-3 item-div">';
    // table += '<button  type="button" class="btn btn-primary waves-effect waves-light btn-sm" data-toggle="modal"  data-target=".crear-producto">Crear</button>';
    // table += '</div>';
    // table += '</div>';
    // table += '</td>';
    // table += '<td class="total-amount">';
    // table += '<h5 class="m-0 text-end"><span class="f-w-600">Total Price :</span></h5>';
    // table += '</td>';
    // table += '<td><h5 class="f-w-600 h5" id="suma_generl">$0.00 </h5></td>';

    table += '</tbody>';
    table += '</table>';
    table += '</div>';
    table += '</div>';
    table += '</div>';
    $(".option_table_apu"+id_apu).html(table);



}


//funcion para obtener el id apu
function obtener_id_apu(n) {
    // get_producto_detalles_apu(n,1);



    $('.clik-materiales').addClass('active');
    $('.clik-equipo-herramienta').removeClass('active');
    $('.clik-servicio').removeClass('active');
    $('.clik-mano-obra').removeClass('active');
     get_product_detalle_apu(1,"producto","materiales","list_productos",n);
    cadena="";
    cadena +='<input type="hidden" id="id_apus" name="id_apus" value="'+n+'">';
    $(".id_ap").html(cadena);
    // console.log(n);

}


function selec_producto_detalle(e,data_add) {

    data_add = {
        product_id: e.value,
        tmpapu_id:$('#id_apu').val()
    }
    var cadena="";
    cadena +='<input type="hidden" id="id_producto" name="id_producto" value="' +data_add.product_id + '">';
    $(".id_all").html(cadena);
    // console.log(cadena);
}

//funcion lara agregar producto a detalles de apus
function add_productos(e) {
    // var g = e.parentElement.parentElement;
    // console.log(e.parentElement.parentElement);
        const data = {
            product_id: $("#id_producto").val(),
            tmpapu_id: $("#id_apus").val(),
            tmpprodapu_cantidad	: 1
        };

        if (data.product_id==undefined) {
            messeg('Debes seleccionar un producto','warning');
            return false;
        }
    console.log(data);

    var url = "/api/cost-structure/store_producto_detalles_apu";
    fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
        .then((res) => res.json())
        .catch((errors) => console.error("Error:", errors))
        .then((response) => {
            console.log(response);
            if (response.status==200) {

                messeg(response.success,'success');

                // get_producto_detalles_apu(data.tmpapu_id,response.id_categoria);
                if (response.id_categoria == 1) {
                    get_producto_detalles_apu(option_select_list = "list_productos",data.tmpapu_id, response.id_categoria );
                    // select_opction_producto(response.id_categoria,"poductos");
                    // return false;
                }
                if (response.id_categoria == 2) {
                    get_producto_detalles_apu(option_select_list = "list-herramientas", data.tmpapu_id, response.id_categoria );
                    // select_opction_producto(response.id_categoria,"herramienta");
                    // return false;
                }
                if (response.id_categoria == 3) {
                    get_producto_detalles_apu(option_select_list = "list-servicio",data.tmpapu_id,response.id_categoria);
                    // select_opction_producto(response.id_categoria,"servicio");
                    // return false;
                }
                if (response.id_categoria == 4) {
                    get_producto_detalles_apu(option_select_list = "list-mano-obra",data.tmpapu_id,response.id_categoria );
                    // select_opction_producto(response.id_categoria,"mano de obra");
                    // return false;
                }

                var cadena="";
                cadena +=
                '<input type="hidden" id="id_categoria" name="id_categoria" value="' +response.id_categoria+'">';
                 $(".id_cat").html(cadena);
            }

        });
}


//listar detalles de productos apus

function get_producto_detalles_apu(option_select_list='',id_apu,id_categoria) {
    var total=[];
    const data={
        id_apu:id_apu,
        id_categoria:id_categoria
    }

//    console.log(option_select_list);
//    console.log(id_categoria);

    let a="";
    if (id_categoria==1) {
       a="Material";
    }
    if (id_categoria==2) {
         a="Equipos y herramientas";
    }
    if (id_categoria==3) {
         a="Servicios";
    }
    if (id_categoria==4) {
        a="Manos de obras";
    }
    var total_itn="";
    var suma_gener=0;

    // box_total_categorias_apu(id_apu)
    // suma_all_detalle_producto(id_apu);

    // resumen_structure_costo()
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/get_producto_detalle_apu/" +data.id_apu+"/"+data.id_categoria);
            console.log(resp.data);
            suma_all_detalle_producto(id_apu);
            box_total_categorias_apu(id_apu)

            list_resumen_apus();
            list_resumen_apus_convercion();
            select_opction_producto(id_categoria,a);
            var table = "";
            if (resp.data.success=='vacio') {
                table += '<tr>';
                table += '<td class="text-center" colspan="6">';
                table += '<h5 class="w-100">Sin información</h5>'
                table += '</td>';
                table += '</tr>';
                $(".intem_producto"+data.id_apu).html(table);
                // return false;
            }
            for (let i = 0; i < resp.data.length; i++) {
                option_adit_precio(false,i);
                total_itn = parseInt(parseInt(resp.data[i].cantidad_producto)*parseInt(resp.data[i].precio_producto));
                table += '<tr>';
                table += '<td>';
                table += '<div title="'+resp.data[i].description+'" class="product-name">';
                table += '<a href="#"><h6>'+resp.data[i].nombre_producto+'</h6></a>';
                table += '</div>';
                table += '</td>';
                table += '<td>';
                table += '<div class="product-name">';
                table += '<a href="#"><h6>'+resp.data[i].unidad_producto+'</h6></a>';
                table += '</div>';
                table += '</td>';
                table += '<td>';
                table += `
                <div class="row">
                <div class="col-12 col-md-3 px-0 item-span-end ">`;
                table += ' <button onclick="btnProductDownLess('+resp.data[i].id+','+i+','+id_apu+',' +data.id_categoria +')"  class="btn btn-primary btn-sm p-1"><span class="h4">-</span></button>';
                table += '</div>';
                table += '<div class="col-12 col-md-6 text-center item-div">';
                table += '<input min="1" id="'+id_apu+'cantidad' + i + '" onkeyup="imputProductcant('+resp.data[i].id+','+i+','+id_apu+',' +data.id_categoria +');" onchange="imputProductcant('+resp.data[i].id+','+i+','+id_apu+',' +data.id_categoria +');" onkeypress="return soloNumeros(event)"  value="' + resp.data[i].cantidad_producto + '" type="number"  class="form-control ">';
                table += '</div>';
                table += '<div class="col-12 col-md-3 px-0">';
                table += '<button  onclick="btnProductUpSum('+resp.data[i].id+','+i+','+id_apu+',' +data.id_categoria +')"  class="btn btn-primary btn-sm p-1" ><span class="h4">+</span></button>';
                table += '</div>';
                table += '</div>';
                // table += '<input min="1" id="'+id_apu+'cantidad' + i + '" onchange="cantidadUpd(this,\'' + i + '\',\'' + id_apu + '\',\'' + resp.data[i].cantidad_producto + '\');" value="" type="number"  class="form-control ">';
                table += '</td>';

                // table += '<td><h5 id="'+id_apu+'precioh' + i + '" ><div class="input-group pill-input-group max-w"><span class="input-group-text">$  </span>  <input id="'+id_apu+'precio_product_up' + i + '" value="'+resp.data[i].precio_producto+'"  onkeyup="imputPrecio_producto('+resp.data[i].id+','+i+','+id_apu+',' +data.id_categoria +','+resp.data[i].id_producto +');" onchange="imputPrecio_producto('+resp.data[i].id+','+i+','+id_apu+',' +data.id_categoria +','+resp.data[i].id_producto +');"   onkeypress="return soloNumeros(event)"  class="form-control" type="number" aria-label="Amount (to the nearest dollar)"><span class="input-group-text">.00  </span> </div></h5> <input type="hidden" id="'+id_apu+'precio' + i + '"   readonly class="form-control CPrecio" value="'+resp.data[i].precio_producto.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'" /> </td>';

                table += '<td>';
                table +=`
                <div class="row pepe option-editar" style="display: none;" id="${id_apu}form-editar-precio-product${i}">
                     <div class="col-9 col-md-9">
                     <div class="input-group pill-input-group max-w"><span class="input-group-text">$  </span>  <input  id="${id_apu}precio_product_up${i}" value="${resp.data[i].precio_producto}"   onkeypress="return soloNumeros(event)"  class="form-control" type="number" ><span class="input-group-text">.00  </span> <input type="hidden" id="${id_apu}precio${i}"   readonly class="form-control CPrecio" value="${resp.data[i].precio_producto.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}" />  </div>

                    </div>
                    <div class="col-3 col-md-3 px-0 pt-1">
                        <div class="row">
                            <div class="col-6 col-md-6 w-30 px-0">
                                <button class="btn-option-success mx-2"  onclick="imputPrecio_producto(${resp.data[i].id},${i},${id_apu},${data.id_categoria},${resp.data[i].id});"  title="Editar"><i class="fa fa-check"></i></button>
                            </div>
                            <div class="col-6 col-md-6 px-0">
                                <button class="btn-option-damger mx-2" onclick="option_adit_precio(false,${i},${id_apu})" title="Cancelar"><i class="fa fa-times"></i></button>
                            </div>

                        </div>
                    </div>
                </div>
                `;
                table +=`
                <div class="row option-edit-precio${i}"  onmouseout="btn_editar_precio(false,${i},${id_apu})" onmouseover="btn_editar_precio(true,${i},${id_apu})">
                    <div class="col-8 col-md-10 iten-contenid" ><h6 id="precio_producto_detalle">${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data[i].precio_producto)}</h6></div>
                    <div class="col-4 col-md-2 ocult-btn" id="${id_apu}btn-editar-precio${i}"><button class="btn-option-warney" onclick="option_adit_precio(true,${i},${id_apu})" title="editar precio del producto"><i class="fa fa-pencil-square-o"></i></button>
                    </div>
                </div>
                `
                table += '</td>';


                table += '<td> <button href="#" onclick="delete_producto('+resp.data[i].id_apu+','+resp.data[i].id+',' +data.id_categoria +')" class="btn btn-danger btn-ms p-2 rounded-circle m-1 "><span class="px-1">X</span></button></td>';
                table += '<td><h6 id="'+id_apu+'suma_generl_cat' + i + '" > '+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP'  }).format(total_itn)+'</h6></td>';
                table += '</tr>';

                total[i] = parseInt(parseInt(resp.data[i].cantidad_producto)*parseInt(resp.data[i].precio_producto));

                 suma_gener+=total[i];
                // console.log(total_itn);



            }
            table += '<tr>';
            table += '<td colspan="4">';
            table += ' <div class="row">';
            table += '<div class=" col-12 col-md-9">';
            table += '<div class="w-100">';
            table += '<div class="row">';
            table += '<div class="col-12 col-md-9">';
            table += '<select onchange="selec_producto_detalle(this)" class="form-select '+option_select_list+' iten_productos digits " id="select_product"  name="select_product">   </select>';
            table += '</div>';
            table += '<div class=" px-0 col-12 col-md-3 item-div">';
            table += '<span class="id_all"></span>';
            table += '<span class="id_ap"></span>';
            table +='<input type="hidden" id="id_apus" name="id_apus" value="'+data.id_apu+'">';
            table += '<button type="button" onclick="add_productos(this)" class="btn btn-primary btn-sm text-start add_producto_detalle"  >Aplicar</button>';
            table += '</div>';
            table += '<span class="id_cat"></span>';
            table +='<input type="hidden" id="id_categoria" name="id_categoria" value="' +data.id_categoria +'">';
            table += '</div>';
            table += '</div>';
            table += '</div>';
            table += '<div class="col-12 col-md-3 item-div">';
            table += '<button  type="button" class="btn btn-primary waves-effect waves-light btn-sm" data-toggle="modal" onclick="limpiarForm();"  data-target=".crear-producto">Crear</button>';
            table += '</div>';
            table += '</div>';
            table += '</td>';
            table += '<td class="total-amount">';
            table += '<h5 class="m-0 text-end"><span class="f-w-600">TOTAL  :</span></h5>';
            table += '</td>';
            table += '<td><h5 class="f-w-600 h5" >'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP'  }).format(suma_gener)+' </h5></td>';
            table += '</tr>';

            // console.log(suma_gener);
            cadena="";

            $(".intem_producto"+id_apu).html(table);
            $("#select_producte,#select_product").select2();
            totalizar(suma_gener);
            // resumen_structure_costo();

        } catch (err) {
            // Handle Error Here
        }
    };
    sendGetRequest();
}

function btn_editar_precio(e,i,id_apu) {
    // console.log(e);
    if (e) {

        $("#"+id_apu+"btn-editar-precio"+i).removeClass('ocult-btn');

    }else{
        $("#"+id_apu+"btn-editar-precio"+i).addClass('ocult-btn');
    }
}
function option_adit_precio(e,i,id_apu) {
    if (e) {

        $(".option-edit-precio"+i).hide();
        // $("#view-structu-cost-butom").hide();
        $("#"+id_apu+"form-editar-precio-product"+i).show();

    }else{
        $("#"+id_apu+"form-editar-precio-product"+i).hide();
        $(".option-edit-precio"+i).show();
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
    patron =/[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

// function enter_up(e) {
//     tecla = (document.all) ? e.keyCode : e.which;
//   if (tecla==13){
//     alert ('Has pulsado enter');
//   }
// }

//funcion para sumar la cantidad para cada producto
function btnProductUpSum(cod,iditem,id_apu, id_cat){
    console.log(cod)
    let num = parseInt($("#"+id_apu+"cantidad" + iditem).val());
    num = ( num >= 0 && num % 1 == 0 ) ? num + 1 : 1;
    // console.log(num);
    processModifyCant(cod, num, id_cat,id_apu);
     $("#"+id_apu+"cantidad" + iditem).val(num);
    var precio =$("#"+id_apu+"precio" + iditem).val();
    var total= parseInt(num)*parseInt(precio);
    // console.log(total);
    $("#"+id_apu+"suma_generl_cat"+iditem).text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP'  }).format(total));

}
//funcion para restar la cantidad para cada producto
function btnProductDownLess(cod, iditem,id_apu, id_cat){
    console.log(cod)
    let num = parseInt($("#"+id_apu+"cantidad" + iditem).val());
    num = ( num > 1 && num % 1 == 0 ) ? num - 1 : 1;

    processModifyCant(cod, num, id_cat,id_apu);
    var newcant =$("#"+id_apu+"cantidad" + iditem).val(num);
    var precio =$("#"+id_apu+"precio" + iditem).val();
    var total= parseInt(num)*parseInt(precio);
    // console.log(total);
    $("#"+id_apu+"suma_generl_cat"+iditem).text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP'  }).format(total));

}

//funcion para captar la cantidad desde el input
function imputProductcant(cod, iditem,id_apu, id_cat){

    let num = parseInt($("#"+id_apu+"cantidad" + iditem).val());
    var t = num==""?1:num
    // num = ( num >= 0 && num % 1 == 0 ) ? num + 1 : 1;
    console.log(t);
    processModifyCant(cod, t, id_cat,id_apu);
    $("#"+id_apu+"cantidad" + iditem).val(t);
    // var total= parseInt(num)*parseInt(precio);
  // console.log(total);
    // processModifyCant(data.id_apu,data.cantidad,data.id_cat);
    //  $("#"+id_apu+"cantidad" + iditem).val(data.cantidad);

}

function imputPrecio_producto(cod, iditem,id_apu, id_cat,id_product){
    let num = parseInt($("#"+id_apu+"precio_product_up" + iditem).val());
    // console.log(num);
    // console.log(id_product);
    update_precio_producto(id_product,num,id_cat,id_apu);
    // update_precio_producto();
    $("#"+id_apu+"precio_product_up" + iditem).val(num);


}
//funcion para guardar el valer de porcentaje acministracion
function guardar_valor_porc_administracion(id,cantidad,opt) {
const data={
    id,
    cantidad,
    opt
}
// console.log(data);
    const sendGetRequest = async () => {
        try {
            const resp = await axios.put("/guardar_valor_porc_administracion_apu",data);
            // console.log(resp.data);


        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();


}

function update_precio_producto(id,cantidad,id_cat, id_apu) {
    const data={
        id_product:id,
        valor:cantidad
    }
    const sendGetRequest = async () => {
        try {
            const resp = await axios.put("/update_precio_producto",data);
            console.log(resp.data);
            if (resp.data.status==200) {
                // messeg(response.success,'success');
                switch (id_cat) {
                    case 1:
                        get_producto_detalles_apu(option_select_list = "list_productos",id_apu, id_cat);
                        // select_opction_producto(1,"poductos");
                        break;
                    case 2:
                        get_producto_detalles_apu(option_select_list = "list-herramientas",id_apu,id_cat);
                        // select_opction_producto(2,"herramienta");
                        break;
                    case 3:
                        get_producto_detalles_apu(option_select_list = "list-servicio",id_apu,id_cat);
                        // select_opction_producto(3,"servicio");
                        break;
                    case 4:
                        get_producto_detalles_apu(option_select_list = "list-mano-obra",id_apu,id_cat);
                        // select_opction_producto(4,"mano de obra");
                        break;

                    default:
                        break;
                }
                // if (id_cat == 1) {
                //     get_producto_detalles_apu(option_select_list = "list-herramientas",id_apu, id_cat );
                //     select_opction_producto(1,"poductos");
                //     return false;
                // }
                // if (id_cat == 2) {
                //     get_producto_detalles_apu(option_select_list = "list-herramientas",id_apu,id_cat );
                //     select_opction_producto(2,"herramienta");
                //     return false;
                // }
                // if (id_cat == 3) {
                //     get_producto_detalles_apu(option_select_list = "list-servicio",id_apu,id_cat );
                //     select_opction_producto(3,"servicio");
                //     return false;
                // }
                // if (id_cat == 4) {
                //     get_producto_detalles_apu(option_select_list = "list-mano-obra",id_apu,id_cat  );
                //     select_opction_producto(4,"mano de obra");
                //     return false;
                // }
            }
            // list_resumen_apus();

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

// funcion para actualizar la cantidad a la tabla de la base de datos
function processModifyCant(id,cantidad,id_cat,id_apu) {

    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/update_cantidad/"+id+"/"+cantidad+"/"+id_cat);
            console.log(resp.data.id_categoria);
            if (resp.data.status==200) {
                // messeg(response.success,'success');

                switch (resp.data.id_categoria) {
                    case 1:
                        get_producto_detalles_apu(option_select_list = "list_productos",id_apu, 1);
                        // select_opction_producto(1,"poductos");
                        break;
                    case 2:
                        get_producto_detalles_apu(option_select_list = "list-herramientas",id_apu, 2 );
                        // select_opction_producto(2,"herramienta");
                        break;
                    case 3:
                        get_producto_detalles_apu(option_select_list = "list-servicio",id_apu,3);
                        // select_opction_producto(3,"servicio");
                        break;
                    case 4:
                        get_producto_detalles_apu(option_select_list = "list-mano-obra",id_apu,4 );
                        // select_opction_producto(4,"mano de obra");
                        break;

                    default:
                        break;
                }
                // if (id_cat == 1) {

                //     get_producto_detalles_apu(option_select_list = "list-herramientas",id_apu, resp.data.id_categoria );
                //     select_opction_producto(1,"poductos");
                //     return false;
                // }
                // if (id_cat == 2) {
                //     get_producto_detalles_apu(option_select_list = "list-herramientas",id_apu, resp.data.id_categoria );
                //     select_opction_producto(2,"herramienta");
                //     return false;
                // }
                // if (id_cat == 3) {
                //     get_producto_detalles_apu(option_select_list = "list-servicio",id_apu,resp.data.id_categoria);
                //     select_opction_producto(3,"servicio");
                //     return false;
                // }
                // if (id_cat == 4) {
                //     get_producto_detalles_apu(option_select_list = "list-mano-obra",id_apu,resp.data.id_categoria );
                //     select_opction_producto(4,"mano de obra");
                //     return false;
                // }
            }

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();


}

//mostrar suma general
function totalizar(d) {
    $("#suma_generl").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(d));
// console.log(i);

}

// funcion para mostrar el total de cada categoria para cada apu
function box_total_categorias_apu(id_apu) {
    var cadena="";

    cadena += `
    <div class=" my-3 order-history table-responsive wishlist">
                            <table class="table table-bordered">

                                <tbody>
                                    <tr>
                                        <td>
                                            Materiales
                                        </td>
                                        <td><span id="materiales_por_total${id_apu}"></span> %</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Equipos y Herramientas
                                        </td>
                                        <td><span id="equipo_herramienta_por_total${id_apu}"></span> %</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Servicios
                                        </td>
                                        <td><span id="servicio_por_total${id_apu}"></span> %</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Mano de Obra
                                        </td>
                                        <td><span id="mano_obra_por_total${id_apu}"></span> %</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Administración
                                        </td>
                                        <td><input type="hidden"  class="porc_suma_administracion${id_apu}"><span id="porc_suma_administracion${id_apu}"></span> %</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Utilidad e imprevistos
                                        </td>
                                        <td><input type="hidden"  class="porc_suma_utilidad_empre${id_apu}"><span id="porc_suma_utilidad_empre${id_apu}"></span> %</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h6 class="m-0 text-end"><span class="f-w-600">TOTAL
                                                    GENERAL:</span></h6>
                                        </td>

                                        <td><span id="suma_total_porcentaje${id_apu}"></span> %</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>`;
         $("#box-sum-categorias-apu"+id_apu).html(cadena);
}

//funcion para traer los porcentaje administrativo y emprevisto para asi sumarlos y mostrarlos
function traer_porcentaje_admin_emprevistos(s){
    var id_cotizacion = parseInt($("#id_cotizacion").val());
    // console.log(s);
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/obtener_suma_porc_administracion_emprevist/"+id_cotizacion);
            // console.log(resp.data);

            $("#resumen_administracion").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.suma_porc_administracion));
            $("#resumen_utilidad_emprevisto").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.suma_porc_utilidad_emprevisto));
            var resume_suma_general =resp.data.suma_porc_utilidad_emprevisto+resp.data.suma_porc_administracion+s;
            $("#suma_general_resumen").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resume_suma_general));
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

// funcion para suma general de todas las categoria de todas las apus de un proyecto
function resumen_structure_costo() {
    var id_cotizacion = parseInt($("#id_cotizacion").val());
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/informe_total_cegorias/" + id_cotizacion);
            // console.log(resp.data);
            // traer_porcentaje_admin_emprevistos()
            let sc=0, d=0;
            if (resp.data.Suma_Materiales.length=="") {
                console.log("vacio");

                $("#resumen_material_total").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(d));
            }else{
                for (let i = 0; i < resp.data.Suma_Materiales.length; i++) {

                    for (let j = 0; j < resp.data.Suma_Materiales[i].length; j++) {

                        if (resp.data.Suma_Materiales[i][j]=="") {
                             console.log("vacio");
                        }else{
                            sc = resp.data.Suma_Materiales[i][j].precio_producto*resp.data.Suma_Materiales[i][j].cantidad
                            d+=sc;
                            // console.log(resp.data.Suma_Materiales[i][j]);
                        }
                    }


                }
                // console.log(d);
                $("#resumen_material_total").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(d));
            }


            let seh=0, deh=0;
            if (resp.data.Suma_Materiales.length=="") {
                console.log("vacio");
                $("#resumen_equipo_herramienta").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(deh));
            }else{
                for (let i = 0; i < resp.data.Suma_Equipo_Herramientas.length; i++) {

                    for (let j = 0; j < resp.data.Suma_Equipo_Herramientas[i].length; j++) {

                        if (resp.data.Suma_Equipo_Herramientas[i][j]=="") {
                             console.log("vacio");
                        }else{
                            seh = resp.data.Suma_Equipo_Herramientas[i][j].precio_producto*resp.data.Suma_Equipo_Herramientas[i][j].cantidad
                            deh+=seh;
                            // console.log(resp.data.Suma_Equipo_Herramientas[i][j]);
                        }
                    }


                }
                // console.log(deh);
                $("#resumen_equipo_herramienta").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(deh));
            }

            let s_ser=0, d_serv=0;
            if (resp.data.Suma_Servicio.length=="") {
                console.log("vacio");
                $("#resumen_servicio").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(d_serv));
            }else{
                for (let i = 0; i < resp.data.Suma_Servicio.length; i++) {

                    for (let j = 0; j < resp.data.Suma_Servicio[i].length; j++) {

                        if (resp.data.Suma_Servicio[i][j]=="") {
                             console.log("vacio");
                        }else{
                            s_ser = resp.data.Suma_Servicio[i][j].precio_producto*resp.data.Suma_Servicio[i][j].cantidad
                            d_serv+=s_ser;
                            // console.log(resp.data.Suma_Servicio[i][j]);
                        }
                    }


                }
                // console.log(d_serv);
                $("#resumen_servicio").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(d_serv));
            }

            let s_man_ob=0, d_mano_ob=0;
            if (resp.data.Suma_Mano_Obras.length=="") {
                console.log("vacio");
                $("#resumen_mano_obra").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(d_mano_ob));
            }else{
                for (let i = 0; i < resp.data.Suma_Mano_Obras.length; i++) {

                    for (let j = 0; j < resp.data.Suma_Mano_Obras[i].length; j++) {

                        if (resp.data.Suma_Mano_Obras[i][j]=="") {
                             console.log("vacio");
                        }else{
                            s_man_ob = resp.data.Suma_Mano_Obras[i][j].precio_producto*resp.data.Suma_Mano_Obras[i][j].cantidad
                            d_mano_ob+=s_man_ob;
                            // console.log(resp.data.Suma_Mano_Obras[i][j]);
                        }
                    }


                }
                // console.log(d_mano_ob);
                $("#resumen_mano_obra").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(d_mano_ob));
            }
            var suma =d+deh+d_serv+d_mano_ob;
            // console.log(suma);

            $("#resumen_administracion").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.Suma_Administracion));
            $("#resumen_utilidad_emprevisto").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data.Suma_Emprevistos));
             traer_porcentaje_admin_emprevistos(suma);


        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

//funcion para sacar los porcentajes de todas las categorias para cada apu
function get_sum_categorias_apu(id_apu,total) {

    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/get_suma_categoria_apu/"+id_apu);
            // console.log(resp.data);
            // if(resp.data.suma_materiales_categoria==0&&total==0){
            //     console.log("vacio eee");
            // }
            var suma_materiales=(resp.data.suma_materiales_categoria*100)/total;
            var suma_materialesveri = (resp.data.suma_materiales_categoria==0&&total==0)?0:suma_materiales;
            // console.log(suma_materialesveri);
            $("#materiales_por_total"+id_apu).text(suma_materialesveri.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

            var suma_equipo_he=(resp.data.suma_equipo_herramientas_categoria*100)/total;
            var suma_equipo_heverif = (resp.data.suma_equipo_herramientas_categoria==0&&total==0)?0.00:suma_equipo_he;
            $("#equipo_herramienta_por_total"+id_apu).text(suma_equipo_heverif.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

            var suma_servicio=(resp.data.suma_servicio_categoria*100)/total;
            var suma_servicioverif = (resp.data.suma_servicio_categoria==0&&total==0)?0.00:suma_servicio;
            $("#servicio_por_total"+id_apu).text(suma_servicioverif.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

            var suma_mano_obra=parseFloat((resp.data.suma_mano_obra_categoria*100)/total);
            var suma_mano_obraverif = (resp.data.suma_mano_obra_categoria==0&&total==0)?0.00:suma_mano_obra;
            $("#mano_obra_por_total"+id_apu).text(suma_mano_obraverif.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));


             var administracion_porc=parseFloat((resp.data.total_porc_Administracion*100)/total);
            var administracion_porcif = (resp.data.total_porc_Administracion==0&&total==0)?0.00:administracion_porc;
            $("#porc_suma_administracion"+id_apu).text(administracion_porcif.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));


            var utilidad_emprevisto_porc=parseFloat((resp.data.total_porc_Emprevistos*100)/total);
            var utilidad_emprevisto_porcif = (resp.data.total_porc_Emprevistos==0&&total==0)?0.00:utilidad_emprevisto_porc;
            $("#porc_suma_utilidad_empre"+id_apu).text(utilidad_emprevisto_porcif.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            // var administracion_porc=$(".porc_suma_administracion"+id_apu).val();
            // console.log(administracion_porc);
            // console.log(utilidad_emprevisto_porc);
            // console.log(total);
            // var utilidad_emprevisto_porc=$(".porc_suma_utilidad_empre"+id_apu).val();
            // suma todos los porcentajes de las categorias
            var sum = parseFloat(suma_materiales)+parseFloat(suma_equipo_he)+parseFloat(suma_servicio)+parseFloat(suma_mano_obra)+administracion_porcif+utilidad_emprevisto_porcif;

            var sumif = (resp.data.suma_materiales_categoria==0&&resp.data.suma_equipo_herramientas_categoria==0&&resp.data.suma_servicio_categoria==0&&resp.data.suma_mano_obra_categoria==0&&resp.data.total_porc_Administracion==0&&resp.data.total_porc_Emprevistos==0)?0:sum;
            // console.log(sumif);
            // if (resp.data.suma_materiales_categoria==0&&resp.data.suma_equipo_herramientas_categoria==0&&resp.data.suma_servicio_categoria==0&&resp.data.suma_mano_obra_categoria==0) {
            //     var u=0;
            //     $("#porc_suma_administracion"+id_apu).text(u.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            //     $("#porc_suma_utilidad_empre"+id_apu).text(u.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            // }

            // console.log(sum);

            $("#suma_total_porcentaje"+id_apu).text(sumif.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

// funcion para calcular el corcentaje administrativo
function calculaPorcentajes_adminis(id_apu,porc,numero){
    var new_porc = porc==""?0:porc
    let option=1;
	var value=Math.floor(numero*new_porc)/100;
    update_porc(id_apu,new_porc,option);
    var num_porc_utld_empre=parseInt($("#num_porcen_utilidad"+id_apu).val());

    console.log(value);
    var sub_totaldos=numero+value;

    $("#porc_administracion"+id_apu).text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(value));
    guardar_valor_porc_administracion(id_apu,value,1);

    $("#sub_total_dos"+id_apu).text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sub_totaldos));
    calculaPorcentajes_utilidad_emprev(id_apu,num_porc_utld_empre,sub_totaldos);

    var suma_general = parseFloat($("#total_general_apu"+id_apu).val());
    // console.log(suma_general);
    // get_sum_categorias_apu(id_apu,sub_totaldos);
    var porc_suma_administracion=(value*100)/suma_general;
    $("#porc_suma_administracion"+id_apu).text(porc_suma_administracion.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
//    $(".porc_suma_administracion"+id_apu).val(porc_suma_administracion);


}



//funcion para calcular el porcentaje de utilidad emprevistos
function calculaPorcentajes_utilidad_emprev(id_apu,porc,numero){
    var new_porc = (porc=="")?0:porc;
    let option=2;
	var value=Math.floor(numero*new_porc)/100;
    update_porc(id_apu,new_porc,option);
    var descuent=parseInt($("#descuent"+id_apu).val());
    console.log(value);
    var sub_totaldos=numero+value;

    $("#porc_utilidad_emprevis"+id_apu).text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(value));
    guardar_valor_porc_administracion(id_apu,value,2);
     $("#sub_total_tres"+id_apu).text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sub_totaldos));
     $("#sub_total_tres_g"+id_apu).text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sub_totaldos));
        // get_sum_categorias_apu(id_apu,sub_totaldos);
     calcular_descuento(id_apu,descuent,sub_totaldos);

     var suma_general = parseFloat($("#total_general_apu"+id_apu).val());
     // console.log(suma_general);

    //  var porc_suma_utilidad_empre=(value*100)/suma_general;
    //  $("#porc_suma_utilidad_empre"+id_apu).text(porc_suma_utilidad_empre.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

}

//funcion para calcular el descuento
function calcular_descuento(id_apu,porc,numero) {
    let option=3;
    var value=Math.floor(numero*porc)/100;
    update_porc(id_apu,porc,option);
    console.log(value);
    var totals=numero-value;

    // get_sum_categorias_apu(id_apu,numero);
    $("#total_descuent"+id_apu).text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(value));
    $("#total_general_desc"+id_apu).text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(totals));

    suma_all_detalle_producto(id_apu)
    // list_resumen_apus();

}

//funcion para actualizar el porcentaje
function update_porc(id_apu,valor,option) {
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/cal_porcentaje/"+id_apu+"/"+valor+"/"+option);
            // console.log(resp.data);


        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}



//funcion para obtener sub_total de cada apu
function suma_all_detalle_producto(id_apu) {
    const sendGetRequest = async () => {
        try {
            var cadena="";
            let total, suma_total=0;
            const resp = await axios.get("/get_product_all/"+id_apu);
             console.log(resp.data.apu[0]);

           for (let i = 0; i < resp.data.productos.length; i++) {
            //    const element = array[i];
                total = resp.data.productos[i].precio_producto*resp.data.productos[i].cantidad;
                suma_total+=total;
                // console.log(total);
           }

        //    console.log(suma_total);
        //    calculaPorcentajes_adminis(id_apu,resp.data.apu[0].tmpapu_porc_administrativo,suma_total);
           var porc_admin=Math.floor(suma_total*resp.data.apu[0].tmpapu_porc_administrativo)/100;
        //    console.log(porc_admin);
        console.log(porc_admin);
           guardar_valor_porc_administracion(id_apu,porc_admin,1);
           var sob_total_dos=suma_total+porc_admin;
           var porc_utld_emp=Math.floor(sob_total_dos*resp.data.apu[0].tmpapu_utl_imprevisto)/100;
           guardar_valor_porc_administracion(id_apu,porc_utld_emp,2);
           var sob_total_tres=sob_total_dos+porc_utld_emp
           var descuen=Math.floor(sob_total_tres*resp.data.apu[0].tmpapu_descuento)/100;
           var total_con_descuen=sob_total_tres-descuen;
           get_sum_categorias_apu(id_apu,sob_total_tres);
           $("#total_all"+id_apu).text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sob_total_tres));

           //suma porcentaje total administracion
           var porc_suma_administracion=(porc_admin*100)/sob_total_tres;
            // guardar_valor_porc_administracion(id_apu,porc_suma_administracion,2);
            $("#porc_suma_administracion"+id_apu).text(porc_suma_administracion.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            $(".porc_suma_administracion"+id_apu).val(porc_suma_administracion);

            // suma porcentaje total utilidad emprevisto
            var porc_suma_utilidad_empre=(porc_utld_emp*100)/sob_total_tres;
            $("#porc_suma_utilidad_empre"+id_apu).text(porc_suma_utilidad_empre.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            $(".porc_suma_utilidad_empre"+id_apu).val(porc_suma_utilidad_empre);
            var suma_administracion_utilidad_emprevist=porc_suma_administracion+porc_suma_utilidad_empre
            // console.log("administra:");
            // calculaPorcentajes_adminis(id_apu,resp.data.apu[0].tmpapu_porc_administrativo,suma_total);
            update_suma_general(sob_total_tres,id_apu);
            list_resumen_apus();
            list_resumen_apus_convercion();


           cadena+=`
               <div class="card-body border">
                   <div class="row py-1">
                       <div class="col-12 col-md-8  item-div">
                           <p class="item-span-end">Sub total:</p>
                       </div>
                       <div class="col-12 col-md-4 item-div">
                           <samp class="" id="sup_total">${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(suma_total)}</samp>
                       </div>
                   </div>`;
            cadena+=`
                   <div class="row py-1 text-dark bg-light">
                       <div class="col-12 col-md-3 item-div">
                           <div class="input-group input-group-sm ">`;

            cadena+='<span class="input-group-text">%</span> <input type="number" min="0" id="valor_porc_administracion_input'+id_apu+'" value="'+resp.data.apu[0].tmpapu_porc_administrativo+'" onfocusout=""  max="100" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">';

            cadena+=`     <span class="input-group-text gb-text-color btn-porc"
                                   id="inputGroup-sizing-sm" onclick="add_porcentajes(${id_apu},${sob_total_dos},1)"><i class="fa fa-check"></i></span>
                           </div>
                       </div>
                       <div class="col-12 col-md-5 item-div">
                           <p class="item-span-end">Administración:</p>
                       </div>
                       <div class="col-12 col-md-4 item-div">
                           <samp id="porc_administracion${id_apu}"> ${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(porc_admin)}</samp>
                           <input type="hidden" id="get_porcentaje_administracion${id_apu}" value="${porc_admin}" name="">
                       </div>
                   </div>
                   <div class="row py-1">
                       <div class="col-12 col-md-8 item-div">
                           <p class="item-span-end">Sub total2</p>
                       </div>
                       <div class="col-12 col-md-4">
                           <samp id="sub_total_dos${id_apu}">${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sob_total_dos)}<samp>
                       </div>
                   </div>
                   <div class="row py-1 text-dark bg-light">
                       <div class="col-12 col-md-3 item-div">

                           <div class="input-group input-group-sm ">
                           `;
                cadena+='<span class="input-group-text">%</span> <input type="number" id="num_porcen_utilidad'+id_apu+'" min="0" value="'+resp.data.apu[0].tmpapu_utl_imprevisto+'"  onfocusout=""  max="100" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">';
                cadena+=`   <span class="input-group-text gb-text-color btn-porc"
                                   id="inputGroup-sizing-sm" onclick="add_porcentajes(${id_apu},${sob_total_dos},2)" ><i class="fa fa-check"></i></span>
                           </div>
                       </div>
                       <div class="col-12 col-md-5 item-div">
                           <p class="item-span-end">Utilidad e Imprevistos</p>
                       </div>
                       <div class="col-12 col-md-4 item-div">
                           <samp id="porc_utilidad_emprevis${id_apu}">${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(porc_utld_emp)}</samp>
                       </div>
                   </div>
                   <div class="row py-1">
                       <div class="col-12 col-md-8 item-div">
                           <p class="item-span-end">Sub total3</p>
                       </div>
                       <div class="col-12 col-md-4 item-div">
                           <samp id="sub_total_tres${id_apu}">${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sob_total_tres)}</samp>
                       </div>
                   </div>
                   <div class="row  py-2 text-dark bg-light ">
                       <div class="col-12 col-md-5 item-div">
                           <span class=" h4 w-100 text-center">TOTAL</span>
                       </div>
                       <div class="col-12 col-md-7 item-div">
                       <input type="hidden" id="total_general_apu${id_apu}" value="${sob_total_tres}"> <samp class="h5" id="sub_total_tres_g${id_apu}">${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sob_total_tres)}</samp>
                       </div>
                   </div>
                   <div class="row py-1">
                       <div class="col-12 col-md-5 item-div">
                           <p class="item-span-end">DESCUENTO OTORGADO</p>
                       </div>
                       <div class="col-12 col-md-3 item-div">
                           <div class="input-group input-group-sm ">
                        `;
                    cadena+='<span class="input-group-text">%</span><input type="number" min="0" id="descuent'+id_apu+'" value="'+resp.data.apu[0].tmpapu_descuento+'"  onfocusout=""   max="100" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">';
                     cadena+=`<span class="input-group-text gb-text-color btn-porc"
                                   id="inputGroup-sizing-sm" onclick="add_porcentajes(${id_apu},${sob_total_dos},3)" ><i class="fa fa-check"></i></span>
                           </div>
                       </div>
                       <div class="col-12 col-md-4 item-div">
                           <samp id="total_descuent${id_apu}">${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(descuen)}</samp>
                       </div>
                   </div>
                   <div class="row my-2">
                       <div class="col-12 col-md-8 item-div">
                           <h6 class="item-span-end">TOTAL GENERAL CON DESCUENTO</h6>
                       </div>
                       <div class="col-12 col-md-4 item-div">
                           <samp class="h6" id="total_general_desc${id_apu}">${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(total_con_descuen)}</samp>
                       </div>
                   </div>
               </div>`;
           $("#box-sum-apu"+id_apu).html(cadena);
           $("#sup_total").text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(suma_total));
        //    console.log(suma_total);

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}


function add_porcentajes(id_apu, total_dos,opt) {
    if (opt==2) {
        let valor = $('#num_porcen_utilidad'+id_apu).val();
        if (valor<0) {
            $('#num_porcen_utilidad'+id_apu).addClass('is-invalid');
            return false;
        }
        // console.log(valor);
        calculaPorcentajes_utilidad_emprev(id_apu,valor,total_dos);
    }else if (opt==1) {
        let valor = $('#valor_porc_administracion_input'+id_apu).val();
        if (valor<0) {
            $('#valor_porc_administracion_input'+id_apu).addClass('is-invalid');
            return false;
        }
        // console.log(valor);
        calculaPorcentajes_adminis(+id_apu,valor,total_dos);
    }else if (opt ==3){
        let valor = $('#descuent'+id_apu).val();
        if (valor<0) {
            $('#descuent'+id_apu).addClass('is-invalid');
            return false;
        }
        // console.log(valor);
        calcular_descuento(id_apu,valor,total_dos);
    }

}

//eliminar detalles productos apus
function delete_producto(id_apu,id,id_categ) {
    const data={
        id_tmp: id,
        id_apu: id_apu,
        id_categ: $("#id_categoria").val(),
        id_categn:id_categ
    }
    console.log(data);
    const sendGetRequest = async () => {
        try {

            const resp = await axios.delete("/delete_producto_detalle_apu/"+id);
            console.log(data);
            // get_producto_detalles_apu(data.id_apu,data.id_categ);

            if (resp.data.status==200) {
                messeg(resp.data.success,"success");
                switch (data.id_categn) {
                    case 1:
                        get_producto_detalles_apu(option_select_list = "list_productos",data.id_apu, 1);
                        // select_opction_producto(1,"poductos");
                        break;
                    case 2:
                        get_producto_detalles_apu(option_select_list = "list-herramientas",data.id_apu, 2);
                        // get_product_detalle_apu(2,'producto','materiales','list_productos',data.id_apu);
                        // select_opction_producto(2,"herramienta");
                        break;
                    case 3:
                        get_producto_detalles_apu(option_select_list = "list-servicio",data.id_apu, 3);
                        // get_product_detalle_apu(3,'producto','materiales','list_productos',data.id_apu);
                        // select_opction_producto(3,"servicio");
                        break;
                    case 4:
                        get_producto_detalles_apu(option_select_list = "list-mano-obra",data.id_apu, 4);
                        // gget_product_detalle_apu(4,'producto','materiales','list_productos',data.id_apu);
                        // select_opction_producto(4,"mano de obra");
                        break;

                    default:
                        break;
                }
                // messeg(response.success,'success');
                // get_producto_detalles_apu(data.tmpapu_id,response.id_categoria);
                // if (data.id_categn== 1) {
                //     // get_product_detalle_apu(1,'producto','materiales','list_productos',data.id_apu);
                //     // apu_detalles_table('materiales','list_productos',data.tmpapu_id);
                //     get_producto_detalles_apu(option_select_list = "list_productos",data.id_apu, 1);
                //     select_opction_producto(1,"poductos");
                //     return false;
                // }
                // if (data.id_categn == 2) {
                //     get_producto_detalles_apu(option_select_list = "list-herramientas",data.id_apu, 1);
                //     // get_product_detalle_apu(2,'producto','materiales','list_productos',data.id_apu);
                //     select_opction_producto(2,"herramienta");
                //     return false;
                // }
                // if (data.id_categn == 3) {
                //     get_producto_detalles_apu(option_select_list = "list-servicio",data.id_apu, 3);
                //     // get_product_detalle_apu(3,'producto','materiales','list_productos',data.id_apu);
                //     select_opction_producto(3,"servicio");
                //     return false;
                // }
                // if (data.id_categn == 4) {
                //     get_producto_detalles_apu(option_select_list = "list-mano-obra",data.id_apu, 4);
                //     // gget_product_detalle_apu(4,'producto','materiales','list_productos',data.id_apu);
                //     select_opction_producto(4,"mano de obra");
                //     return false;
                // }
            }

        } catch (err) {
            // Handle Error Here
        }
    };
    sendGetRequest();

}

//funcion para actualizar la suma general de cada apus
function update_suma_general(valor,id_apu) {
    const data ={
        valor:valor,
        id_apu:id_apu
    }
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/update_total_general/"+data.id_apu+"/"+data.valor);
        //    console.log(resp);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}
// Funcion para listar los resumen de apus con su total general y descripcion
function list_resumen_apus(id_cotizacion="") {
    // var valor = (num=="")?1:num;
    let id=0;
    if (id_cotizacion=="") {
        var  id_cotizacion =parseInt($("#id_cotizacion").val());
        id=id_cotizacion;
    }else{
        id=id_cotizacion;
    }
//    console.log(id);
resumen_structure_costo();
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/get_apu_cotizacion/" + id);
            // console.log(resp.data[0].tmpapu_descripcion);

                var cadena="";

                cadena += '<table class="table table-bordered">';
                cadena +='<thead>';
                cadena += `<tr>
                <th>PARTIDAS</th>
                <th>CANTIDAD</th>
                <th>DESCRIPCION</th>
                <th>VALOR</th>
                <th>TOTAL</th>
                </tr>`;

                cadena += '</thead>';
                cadena += "<tbody>";
                let sumg =0;
                let iten
                let total_iten=0;
                let c=1;

               for (let i = 0; i < resp.data.length; i++) {
                option_adit(false,i);
                c++

                total_iten= resp.data[i].cantidad*resp.data[i].tmpapu_suma_general;

                    // console.log("gg:"+resp.data[i].id);
                    //  apu_detalles_table();
                    sumg+=total_iten;
                    // sumg+= resp.data[i].tmpapu_suma_general
                    cadena += "<tr>";
                    // cadena += '<td>APU Nº'+resp.data[i].tmpapu_nro+'</td>';
                    cadena += '<td>APU Nº'+resp.data[i].tmpapu_nro+'</td>';
                    cadena += '<td>';

                    cadena += `
                    <div class="row">
                    <div class="col-12 col-md-3 px-0 item-span-end ">`;
                    cadena += ' <button onclick="btn_cantidad_apu_DownLess('+resp.data[i].id+','+i+')" class="btn btn-primary btn-sm p-1"><span class="h4">-</span></button>';
                    cadena += '</div>';
                    cadena += '<div class="col-12 col-md-6 text-center item-div">';
                    cadena += '<input min="1" id="cantidad_apu'+i+'" onkeypress="return soloNumeros(event)" onchange="imput_apu_cant('+resp.data[i].id+','+i+');"  value="' + resp.data[i].cantidad + '" type="number"  class="form-control ">';
                    cadena += '</div>';
                    cadena += '<div class="col-12 col-md-3 px-0">';
                    cadena += '<button   onclick="btn_cantidad_apu_UpSum('+resp.data[i].id+','+i+')" class="btn btn-primary btn-sm p-1" ><span class="h4">+</span></button>';
                    cadena += '</div>';
                    cadena += '</div>';

                    cadena += '</td>';
                    cadena += `<td class=" px-2" title="${resp.data[i].tmpapu_descripcion}">
                    <div class="row w-322 option-editar" style="display: none;" id="form-editar-descriccion${i}">
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
                </div>

                    <div class="row option-edit${i}"  onmouseout="btn_editar(false,${i})" onmouseover="btn_editar(true,${i})">
                    <div class="col-8 col-md-10 iten-contenid" id="descripcion_apu">${resp.data[i].tmpapu_descripcion}</div>
                    <div class="col-4 col-md-2 ocult-btn" id="btn-editar-descrccion${i}"><button class="btn-option-warney" onclick="option_adit(true,${i})" title="editar descripción"><i class="fa fa-pencil-square-o"></i></button>
                    </div>
                    </div>
                    </div>
                    </td>`;
                    cadena += '<td> <span id="total_all'+resp.data[i].id+'">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data[i].tmpapu_suma_general)+'</span></td>';
                    cadena += '<td>';
                    cadena += '<span id="total_apuinten'+resp.data[i].id+'">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(total_iten)+'</span>';
                    cadena += '</td>';
                    cadena += '</tr>'



                }
                // if (resp.data.total>5) {
                //     $('#option_pagination_resum').show();

                // }else{
                //     $('#option_pagination_resum').hide();
                // }
                // console.log(sumg);
                cadena += "<tr>";
                cadena += '<td colspan="4">';
                cadena+='<h6 class="m-0 text-end"><span class="f-w-600">TOTAL GENERAL:</span></h6>';
                cadena += "</td>";
                cadena += '<td><input type="hidden" id="suma_general_all_apu_impu" value="'+sumg+'"><span id="suma_general_all_apu">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sumg)+'</span></td>';
                cadena += '</tr>';
                cadena +='</tbody>';
                cadena +='</table>';

                // var x="";
                // for (let d = 0; d < resp.data.links.length; d++) {
                //   var r= resp.data.current_page-1;
                //   if (resp.data.links[d].url==null) {
                //     x+='<li class="page-item previous disabled"><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="1" >Atras</a></li>';
                //     break;
                //   }else{
                //     x+='<li class="page-item "><a class="page-link page-endorsement page-link-endorsement-previous" href="javascript:void(0)" data-page="'+r+'" >Atras</a></li>';
                //     break;
                //   }
                // }
                // for (let j = 1; j <= resp.data.last_page; j++) {
                // if (resp.data.current_page==j) {
                //   x+='<li class="page-item active"><a class="page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                // }else{
                //   x+='<li class="page-item  page-link-endorsements page-endorsement-'+j+'"><a data-page="'+j+'" class="page-link page-endorsement" href="javascript:void(0)">'+j+'</a></li>';

                // }

                // }
                // var s= resp.data.current_page+1;

                // if (resp.data.current_page>=resp.data.last_page) {
                //   x+='<li class="page-item next disabled"><a data-page="" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';

                // }else{
                //   x+='<li class="page-item next "><a data-page="'+s+'" class="page-link page-endorsement page-link-endorsement-next" href="javascript:void(0)">Siguiente</a></li>';
                // }
            // $(".page-iten-facturas").html(x);
            // $("#total_registros_list_cobrar").text(resp.data.total);

            $(".list_resum_apu").html(cadena);


                // $('.page-endorsement').on('click', function () {
                //     const page = $(this).data( 'page' )
                //                 console.log(page);
                //                 console.log(resp.data.last_page);
                //                 $('.page-link-endorsements').removeClass('active')
                //                 $('.page-endorsement-'+page).addClass('active')

                //                 if((page-1) < 1 ){
                //                     $('.page-link-endorsement-previous').data('page', 1)
                //                     $('.page-link-endorsement-next').data('page', 2)
                //                 }else if ((page+1) <= resp.data.last_page ) {
                //                     $('.page-link-endorsement-next').data('page', page+1)
                //                     $('.page-link-endorsement-previous').data('page', page-1)
                //                 }else if((page+1) > resp.data.last_page ){
                //                     $('.page-link-endorsement-next').data('page', resp.data.last_page)
                //                     $('.page-link-endorsement-previous').data('page', resp.data.last_page-1)
                //                 }
                //                 list_resumen_apus($("#id_cotizacion").val(),page);

                //    });

            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };
        sendGetRequest();

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
        // console.log(data);
        var  id_cotizacion =parseInt($("#id_cotizacion").val());
        const sendGetRequest = async () => {
            try {
                const resp = await axios.put("/update_descripcion_apu",data);
                // console.log(resp.data);
                if (resp.data.status==200) {
                    apu_acordeon_list(id_cotizacion);
                    list_resumen_apus();
                }
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };
        sendGetRequest();
    }

    function buscar_apu(value) {
        // console.log(data);
        const data ={
            value,
            id_cot:$('#id_cotizacion').val()
        }

        if (data.value.length<3) {
            list_resumen_apus();
            return false;
        }else{
            var cadena="";
            const sendGetRequest = async () => {
                try {
                    const resp = await axios.get("/buscar_apu/"+data.value+"/"+data.id_cot);
                     console.log(resp.data);
                        if (resp.data=="") {
                            console.log("sin datos");
                            $("#list_apu_resumen_vacio").show();
                            $("#list_apu_resumen").hide();
                        }else{
                            // console.log("con datos");
                            var cadena="";

                            cadena += '<table class="table table-bordered">';
                            cadena +='<thead>';
                            cadena += `<tr>
                            <th>PARTIDAS</th>
                            <th>CANTIDAD</th>
                            <th>DESCRIPCION</th>
                            <th>VALOR</th>
                            <th>TOTAL</th>
                            </tr>`;

                            cadena += '</thead>';
                            cadena += "<tbody>";
                            let sumg =0;
                            let iten
                            let total_iten=0;
                            let c=0;
                           for (let i = 0; i < resp.data.length; i++) {
                            option_adit(false,i);
                            c++
                            total_iten= resp.data[i].cantidad*resp.data[i].tmpapu_suma_general;

                                // console.log("gg:"+resp.data[i].id);
                                //  apu_detalles_table();
                                sumg+=total_iten;
                                // sumg+= resp.data[i].tmpapu_suma_general
                                cadena += "<tr>";
                                // cadena += '<td>APU Nº'+resp.data[i].tmpapu_nro+'</td>';
                                cadena += '<td>APU Nº'+c+'</td>';
                                cadena += '<td>';

                                cadena += `
                                <div class="row">
                                <div class="col-12 col-md-3 px-0 item-span-end ">`;
                                cadena += ' <button onclick="btn_cantidad_apu_DownLess('+resp.data[i].id+','+i+')" class="btn btn-primary btn-sm p-1"><span class="h4">-</span></button>';
                                cadena += '</div>';
                                cadena += '<div class="col-12 col-md-6 text-center item-div">';
                                cadena += '<input min="1" id="cantidad_apu'+i+'" onchange="imput_apu_cant('+resp.data[i].id+','+i+');"  value="' + resp.data[i].cantidad + '" type="number"  class="form-control ">';
                                cadena += '</div>';
                                cadena += '<div class="col-12 col-md-3 px-0">';
                                cadena += '<button   onclick="btn_cantidad_apu_UpSum('+resp.data[i].id+','+i+')" class="btn btn-primary btn-sm p-1" ><span class="h4">+</span></button>';
                                cadena += '</div>';
                                cadena += '</div>';

                                cadena += '</td>';
                                cadena += `<td class=" px-2" title="${resp.data[i].tmpapu_descripcion}">
                                <div class="row w-322 option-editar" style="display: none;" id="form-editar-descriccion${i}">
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
                            </div>

                                <div class="row option-edit${i}"  onmouseout="btn_editar(false,${i})" onmouseover="btn_editar(true,${i})">
                                <div class="col-8 col-md-10 iten-contenid" id="descripcion_apu">${resp.data[i].tmpapu_descripcion}</div>
                                <div class="col-4 col-md-2 ocult-btn" id="btn-editar-descrccion${i}"><button class="btn-option-warney" onclick="option_adit(true,${i})" title="editar descripción"><i class="fa fa-pencil-square-o"></i></button>
                                </div>
                                </div>
                                </div>
                                </td>`;
                                cadena += '<td> <span id="total_all'+resp.data[i].id+'">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(resp.data[i].tmpapu_suma_general)+'</span></td>';
                                cadena += '<td>';
                                cadena += '<span id="total_apuinten'+resp.data[i].id+'">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(total_iten)+'</span>';
                                cadena += '</td>';
                                cadena += '</tr>'



                            }
                            // console.log(sumg);
                            cadena += "<tr>";
                            cadena += '<td colspan="4">';
                            cadena+='<h6 class="m-0 text-end"><span class="f-w-600">TOTAL GENERAL:</span></h6>';
                            cadena += "</td>";
                            cadena += '<td><input type="hidden" id="suma_general_all_apu_impu" value="'+sumg+'"><span id="suma_general_all_apu">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(sumg)+'</span></td>';
                            cadena += '</tr>';
                            cadena +='</tbody>';
                            cadena +='</table>';
                            $(".list_resum_apu").html(cadena);

                            $("#list_apu_resumen").show();
                            $("#list_apu_resumen_vacio").hide();
                        }



                    } catch (err) {
                        // Handle Error Here
                        console.error(err);
                    }
                };
                sendGetRequest();
        }

    }

$("#select_producte,#select_product").select2();
$("#select_unidad").select2({
    dropdownParent: $("#modal_producto")
  });
function limpiarForm(){
    $("#form-producto-create")[0].reset();
    $("#select_unidad").empty();
    $("#select_unidad").select2("val", "");
    get_medidas_select();

    //var listBox = document.getElementById("select_unidad");
    //listBox.selectedIndex = -1;

}
function imput_apu_cant(id, iditem){

    let num = parseInt($("#cantidad_apu" + iditem).val());
    // num = ( num >= 0 && num % 1 == 0 ) ? num + 1 : 1;

    console.log(num);
    update_camtid_apus(id,num);
    $("#cantidad_apu" + iditem).val(num);

//     processModifyCant(cod, num, id_cat,id_apu);
    // $("#cantidad_apu" + iditem).val(num);
//     // var total= parseInt(num)*parseInt(precio);
//   // console.log(total);
//     // processModifyCant(data.id_apu,data.cantidad,data.id_cat);
//     //  $("#"+id_apu+"cantidad" + iditem).val(data.cantidad);

}

function btn_cantidad_apu_DownLess(id, iditem){
    let num = parseInt($("#cantidad_apu" + iditem).val());
    num = ( num > 1 && num % 1 == 0 ) ? num - 1 : 1;
    console.log(num);

    update_camtid_apus(id, num);

}

function btn_cantidad_apu_UpSum(id, iditem){
    let num = parseInt($("#cantidad_apu" + iditem).val());
    num = ( num >= 0 && num % 1 == 0 ) ? num + 1 : 1;
    console.log(num);
    update_camtid_apus(id, num);

}

function update_camtid_apus(id,cantidad) {
    const data={
        id_apu:id,
        catidad:cantidad
    }
    const sendGetRequest = async () => {
        try {
            const resp = await axios.put("/update_cantidad_apus",data);
            console.log("ididi"+resp.data);

            if (resp.data.status==200) {
                 list_resumen_apus();
                 list_resumen_apus_convercion();
                // buscar_apu();
            }

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

function list_resumen_apus_convercion(id_cotizacion="") {
    // var valor = (num=="")?1:num;
    let id=0;
    if (id_cotizacion=="") {
        var  id_cotizacion =parseInt($("#id_cotizacion").val());
        id=id_cotizacion;
    }else{
        id=id_cotizacion;
    }
//    console.log(id);
resumen_structure_costo();
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get("/get_apu_cotizacion_convercion/" + id);
            console.log(resp.data);
            let mods = resp.data[0].moneda_convertir==null?"COP":resp.data[0].moneda_convertir;
            console.log(mods);
                var cadena="";

                cadena += '<table class="table table-bordered">';
                cadena +='<thead>';
                cadena += `<tr>
                <th>PARTIDAS</th>
                <th>CANTIDAD</th>
                <th>DESCRIPCION</th>
                <th>VALOR</th>
                <th>TOTAL</th>
                </tr>`;

                cadena += '</thead>';
                cadena += "<tbody>";
                let sumg =0;
                let iten
                let total_iten=0;
                let c=0;
                if (resp.data=="") {
                    console.log("sin datos");
                    $("#list_apu_resumen_vacio_convercion").show();
                    $("#list_apu_resumen_convercion").hide();
                }else{

                    if (resp.data[0].trm_convertir==null) {
                        cadena += "<tr>";
                        cadena += '<td colspan="5">Pendiente..</td>';
                        cadena += '</tr>'
                    }else{
                        for (let i = 0; i < resp.data.length; i++) {
                            option_adit(false,i);
                            c++
                            let gener_conver= resp.data[i].tmpapu_suma_general/resp.data[0].trm_convertir
                            total_iten= resp.data[i].cantidad*gener_conver;

                                // console.log("gg:"+resp.data[i].id);
                                //  apu_detalles_table();
                                sumg+=total_iten;
                                // sumg+= resp.data[i].tmpapu_suma_general
                                cadena += "<tr>";
                                // cadena += '<td>APU Nº'+resp.data[i].tmpapu_nro+'</td>';
                                cadena += '<td>APU Nº'+resp.data[i].tmpapu_nro+'</td>';
                                cadena += '<td>';

                                cadena += '<div>' + resp.data[i].cantidad + '</div>';

                                cadena += '</td>';
                                cadena += `<td class=" px-2" title="${resp.data[i].tmpapu_descripcion}">
                                <div class="row w-322 option-editar" style="display: none;" id="form-editar-descriccion${i}">
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
                            </div>

                                <div class="row option-edit${i}"  onmouseout="btn_editar(false,${i})" onmouseover="btn_editar(true,${i})">
                                <div class="col-8 col-md-10 iten-contenid" id="descripcion_apu">${resp.data[i].tmpapu_descripcion}</div>
                                <div class="col-4 col-md-2 ocult-btn" id="btn-editar-descrccion${i}"><button class="btn-option-warney" onclick="option_adit(true,${i})" title="editar descripción"><i class="fa fa-pencil-square-o"></i></button>
                                </div>
                                </div>
                                </div>
                                </td>`;
                                cadena += '<td> <span id="total_all'+resp.data[i].id+'">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data[0].moneda_convertir }).format(gener_conver)+'</span></td>';
                                cadena += '<td>';
                                cadena += '<span id="total_apuinten'+resp.data[i].id+'">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: resp.data[0].moneda_convertir }).format(total_iten)+'</span>';
                                cadena += '</td>';
                                cadena += '</tr>'



                            }
                    }

                        $("#list_apu_resumen_convercion").show();
                        $("#list_apu_resumen_vacio_convercion").hide();
                }
                if (resp.data.total>5) {
                    $('#option-pagination').show();

                }else{
                    $('#option-pagination').hide();
                }

                // console.log(sumg);
                cadena += "<tr>";
                cadena += '<td colspan="4">';
                cadena+='<h6 class="m-0 text-end"><span class="f-w-600">TOTAL GENERAL:</span></h6>';
                cadena += "</td>";
                cadena += '<td><input type="hidden" id="suma_general_all_apu_impu" value="'+sumg+'"><span id="suma_general_all_apu">'+Intl.NumberFormat('de-DE', { style: 'currency', currency: mods }).format(sumg)+'</span></td>';
                cadena += '</tr>';
                cadena +='</tbody>';
                cadena +='</table>';

                // var x="";
                // for (let d = 0; d < resp.data.links.length; d++) {
                //   var r= resp.data.current_page-1;
                //   if (resp.data.links[d].url==null) {
                //     x+='<li class="page-item previous disabled"><a class="page-link page-endorsementd page-link-endorsement-previousd" href="javascript:void(0)" data-page="1" >Atras</a></li>';
                //     break;
                //   }else{
                //     x+='<li class="page-item "><a class="page-link page-endorsementd page-link-endorsement-previousd" href="javascript:void(0)" data-page="'+r+'" >Atras</a></li>';
                //     break;
                //   }
                // }
                // for (let j = 1; j <= resp.data.last_page; j++) {
                // if (resp.data.current_page==j) {
                //   x+='<li class="page-item active"><a class="page-link" href="javascript:void(0)">'+j+'<span class="sr-only">(current)</span></a></li>';
                // }else{
                //   x+='<li class="page-item  page-link-endorsementsd page-endorsementd-'+j+'"><a data-page="'+j+'" class="page-link page-endorsementd" href="javascript:void(0)">'+j+'</a></li>';

                // }

                // }
                // var s= resp.data.current_page+1;

                // if (resp.data.current_page>=resp.data.last_page) {
                //   x+='<li class="page-item next disabled"><a data-page="" class="page-link page-endorsementd page-link-endorsement-nextd" href="javascript:void(0)">Siguiente</a></li>';

                // }else{
                //   x+='<li class="page-item next "><a data-page="'+s+'" class="page-link page-endorsementd page-link-endorsement-nextd" href="javascript:void(0)">Siguiente</a></li>';
                // }
            // $(".page-iten-conversion").html(x);
            // $("#total_registros_conversion").text(resp.data.total);
            $(".list_resum_apu_convercion").html(cadena);


                // $('.page-endorsementd').on('click', function () {
                //     const page = $(this).data( 'page' )
                //                 console.log(page);
                //                 console.log(resp.data.last_page);
                //                 $('.page-link-endorsementsd').removeClass('active')
                //                 $('.page-endorsementd-'+page).addClass('active')

                //                 if((page-1) < 1 ){
                //                     $('.page-link-endorsement-previousd').data('page', 1)
                //                     $('.page-link-endorsement-nextd').data('page', 2)
                //                 }else if ((page+1) <= resp.data.last_page ) {
                //                     $('.page-link-endorsement-nextd').data('page', page+1)
                //                     $('.page-link-endorsement-previousd').data('page', page-1)
                //                 }else if((page+1) > resp.data.last_page ){
                //                     $('.page-link-endorsement-nextd').data('page', resp.data.last_page)
                //                     $('.page-link-endorsement-previousd').data('page', resp.data.last_page-1)
                //                 }
                //                 list_resumen_apus_convercion($("#id_cotizacion").val(),page);

                //    });

            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };
        sendGetRequest();

    }

$('#btn_convertir_estructuc').on('click',()=>{
    const data ={
            id_cotizacion :parseInt($("#id_cotizacion").val()),
            moneda_struct:$('#moneda_struct').val(),
            trm_struct: $('#trm_struct').val(),
    }
        console.log(data);
    if (data.trm_struct=="") {
        $('#trm_struct').addClass('is-invalid');
    }else{
        $('#trm_struct').removeClass('is-invalid').addClass('is-valid');
    }

    if (data.moneda_struct=="") {
        $('#moneda_struct').addClass('is-invalid');
    }else{
        $('#moneda_struct').removeClass('is-invalid').addClass('is-valid');
    }

    if (data.moneda_struct==""||data.trm_struct=="") {
        return false;
    }
        swal({
            title: "¡CUIDADO!",
            text:"¿Está seguro que deseas aplicar una conversión?.\r\nNo podrás revertir los cambios.",
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
                    var url = "/api/cost-structure/store_conversion";
                    fetch(url, {
                        method: "PUT", // or 'PUT'
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }).then((res) => res.json())
                        .catch((errors) => console.error("Error:", errors))
                        .then( (response) =>{

                            if (response.status==200) {
                                console.log(response);
                                list_resumen_apus_convercion();
                                $('#trm_struct').removeClass('is-invalid').removeClass('is-valid');
                                $('#moneda_struct').removeClass('is-invalid').removeClass('is-valid');
                            }

                        });
                }
            })

});

var checkbox_final_cot_cliente = document.getElementById('option-final-cliente');
checkbox_final_cot_cliente.addEventListener("change", validaCheckboxcliente, false);
function validaCheckboxcliente()
{
  var checked = checkbox_final_cot_cliente.checked;
  console.log(checked);
  if(checked){
      $('#box-convercion').show(100);
    update_convercion_check(checked);
  }else{
      $('#view_trm_structura').text("0,00");
      $('#trm_struct').val("");
      $('moneda_struct').val("");
    update_convercion_check(checked);
    $('#box-convercion').hide(100);
  }
}

function update_convercion_check(val) {
    const data={
        id_cotizacion :parseInt($("#id_cotizacion").val()),
        valor:val
    }
    const sendGetRequest = async () => {
        try {
            const resp = await axios.put("/structura-costo/update_checket_convercion",data);
             console.log(resp.data);
             list_resumen_apus_convercion();
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendGetRequest();
}

function view_trm_structu(valor) {
    $('#view_trm_structura').text(Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(valor));
}
