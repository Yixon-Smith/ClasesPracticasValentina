$(document).ready(function ()
{
	$("form").submit(function( event ) 
	{
		event.preventDefault();
	  	
	  	$.ajax({
	          url: $(this).attr('action'),
	          data: $(this).serialize(),
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
});