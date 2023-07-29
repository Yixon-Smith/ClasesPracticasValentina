$(document).ready(function ()
{
    $("#recprov_archivo").change(function()
    {
        $("#namefiles").hide(500);
        $("#nombre_adjuntos tr td").remove();

        $.each( $(this).get(0).files, function( key, value ) 
        {
            // Quitar el formato del archivo
             nombre = value.name.replace(/.jpg|.jpeg|.png|.pdf|.xls|.xlsx/g,'');
             let column = '<td> <input type="text" class="form-control" name="nombres[]" value="'+nombre+'"> </td>';
             $('#nombre_adjuntos').find('tr').append(column);
        });

        $("#namefiles").show(500);
    });

    $("form").submit(function( event ) 
    {
        event.preventDefault();

        var form = new FormData($("#adjuntos_form")[0]);

        $.ajax({
              url: $(this).attr('action'),
              data: form,
              processData: false,
              contentType: false,
              type: $(this).attr('method'),
              dataType:'JSON',
              success: function(resp)
              {
                  swal("Exito",resp.message,"success").then(function() 
                  {
                    location.reload(true)
                    });
              },
              error: function(xhr, ajaxOptions, thrownError) 
              {
                    // Error de formulario validacion
                    if (xhr.status == 422) 
                    {
                        // Elimina el mensaje de error de los campos que estan correctos
                        $("#adjuntos_form").find("strong[id]").text('');
                        // Estilo de bootstrap para marcar que estan correctos los datos
                        $("#adjuntos_form").find('input:text, input:password, input:file, input[name="email"],select, textarea').removeClass('is-invalid').addClass('is-valid');
                        // Definido en el archivo general.js, muestra los campos que contienen errores en el formulario
                        errores_formulario(xhr.responseJSON.errors);
                    }
                    else //Errores web
                    {
                        if (xhr.status == 404) 
                        {
                            mensaje = "Página no encontrada";
                        }
                        else if (xhr.status == 500) 
                        {
                            mensaje = "Error interno, intente de nuevo mas tarde o contacte al administrador del portal.";
                        }
                        else if(xhr.status == 0)
                        {
                            mensaje = "No hay conexión a internet, por favor revise su conexión.";
                        }
                        else
                        {
                            mensaje = xhr.responseText;
                        }

                        swal("Error "+xhr.status,mensaje, "error");
                    }          
              }
             
        });
    });










// var DropzoneExample = function () {
// 	 var DropzoneDemos = function () 
// 	 {
// 	 	Dropzone.options.cargaadjuntos = {
//             paramName: "file",
//             maxFiles: 10,
//             maxFilesize: 10, 
//             acceptedFiles: "image/*,application/pdf,.psd",
//             accept: function(file, done) 
//             {
//                 done();
//             }
//         };
// 	 }
    
//     return {
//         init: function() {
//             DropzoneDemos();
//         }
//     };
// }();
// DropzoneExample.init();

});