$(document).ready(function ()
{

	$("#countries_id,#clie_id").select2();

	// Solo numeros
	$('#clie_telefono').on('input', function () 
	{ 
	    this.value = this.value.replace(/[^0-9]/g,'');
	});

	// Alfanumerico
	$('#clie_rif').on('input', function () 
	{ 
	    this.value = this.value.replace(/[^0-9a-zA-Z]/g,'');
	});

	// Alfanumerico con espacios y punto, coma, guion bajo y guion
	$('#clie_nombre,#clie_direccion').on('input', function () 
	{ 
	    this.value = this.value.replace(/[^0-9a-zA-Z\s.,_-]/g,'');
	});

	// Alfanumerico con espacios
	$('#clie_persona_contacto').on('input', function () 
	{ 
	    this.value = this.value.replace(/[^0-9a-zA-Z\s]/g,'');
	});

	$('#clie_id').change(function()
	{
	   if ($(this).val() == -1) 
	   {
	   		$("#clie_nombre,#clie_rif,#clie_correo,#clie_persona_contacto,#clie_telefono,#clie_direccion").val('');
	   		$("#countries_id").val('').trigger('change');
	   		$("#clie_nombre,#clie_rif,#clie_correo,#clie_persona_contacto,#clie_telefono,#countries_id,#clie_direccion").removeAttr('disabled');
	   }
	   else
	   {
	   		$("#clie_nombre,#clie_rif,#clie_correo,#clie_persona_contacto,#clie_telefono,#countries_id,#clie_direccion").attr('disabled',true);
	   		
	   		if ($(this).val()) 
	   		{
	   			$.ajax({
		          url: '/clientes/getclient',
		          headers: {
				        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				    },
		          data: {cliente: $(this).val()},
		          type: 'POST',
		          dataType:'JSON',
		          success: function(resp)
		          {
		              $.each(resp, function (index, value)
		              {
		              		//Forzar select2 cambio de valor
	              	 		if (index == 'countries_id') 
	              	 		{
	              	 			$("#"+index).val(value).trigger('change');
	              	 		}
	              	 		else
	              	 		{
	              	 			//relleno de campos
	              	 			$("#"+index).val(value);
	              	 		}
		              });
		          },
		          error: function(xhr, ajaxOptions, thrownError) 
		          {
		          		// Error de formulario validacion
		          		if (xhr.status == 422) 
		          		{
		          			// Elimina el mensaje de error de los campos que estan correctos
		                  	$("#proveedores_form").find("strong[id]").text('');
		                  	// Estilo de bootstrap para marcar que estan correctos los datos
		                  	$("#proveedores_form").find('input:text, input:password, input:file, input[name="email"],select, textarea').removeClass('is-invalid').addClass('is-valid');
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
	   }

	});

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
	                  	$("#proveedores_form").find("strong[id]").text('');
	                  	// Estilo de bootstrap para marcar que estan correctos los datos
	                  	$("#proveedores_form").find('input:text, input:password, input:file, input[name="email"],select, textarea').removeClass('is-invalid').addClass('is-valid');
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
});