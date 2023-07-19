$(document).ready(function ()
{
	$("#user_id_supervisor,#dep_id,#role").select2();

	// Solo numeros
	$('#cedula').on('input', function () 
	{ 
	    //this.value = this.value.replace(/[^0-9]/g,'');
	});

	$('#telefono').on('input', function () 
	{ 
	    this.value = this.value.replace(/[^0-9+]/g,'');
	});

	$('#salario').on('input', function () 
	{ 
	    this.value = Number(this.value.replace(/[^0-9]/g,'')).toLocaleString('es-CO');
	});

	// String con espacios
	$('#name,#cargo').on('input', function () 
	{ 
	    this.value = this.value.replace(/[^a-zA-Z\s]/g,'');
	});

	$("form").submit(function( event ) 
	{
		event.preventDefault();

		var form = new FormData($(this)[0]);
	  	
	  	$.ajax({
	          url: $(this).attr('action'),
	          data: form,
	          processData: false,
              contentType: false,
	          type: $(this).attr('method'),
	          dataType:'JSON',
	          success: function(resp)
	          {
	              swal("Exito",resp.message,"success").then(function() {
            		location.reload(true)
    				});
	          },
	          error: function(xhr, ajaxOptions, thrownError) 
	          {
	          		// Error de formulario validacion
	          		if (xhr.status == 422) 
	          		{
	          			// Elimina el mensaje de error de los campos que estan correctos
	                  	$("#usuarios_form").find("strong[id]").text('');
	                  	// Estilo de bootstrap para marcar que estan correctos los datos
	                  	$("#usuarios_form").find(':input').removeClass('is-invalid').addClass('is-valid');
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

	$("#dep_id").change(function()
    {
       	if ($(this).val() && $("option:selected", this).text() == 'Comercial') 
       	{
       		$("#showporc").show(1000);
       	}
       	else
       	{
       		$("#showporc").hide(1000);	
       	}
    });

    $("#dep_id").trigger('change');

});