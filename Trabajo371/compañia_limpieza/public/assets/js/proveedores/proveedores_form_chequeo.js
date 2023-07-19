$(document).ready(function ()
{

    $("form").submit(function( event ) 
    {
        event.preventDefault();

        swal({
            title: "¿Está seguro de continuar?",
            icon: "warning",
            buttons: ['No','Si'],
        })
        .then((opcion) => 
        {
            if (opcion) 
            {
                $.ajax({
                      url: $(this).attr('action'),
                      data: $(this).serialize(),
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
            }
        });

    });
});