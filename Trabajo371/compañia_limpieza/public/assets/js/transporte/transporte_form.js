$(document).ready(function ()
{
	$("#pro_id,#prov_id,#ret_id").select2();

	// Alfanumerico con espacios y punto, coma, guion bajo y guion
	$('#trans_nro_guia,#trans_lugar,#trans_descripcion').on('input', function () 
	{ 
	    this.value = this.value.replace(/[^0-9a-zA-Z\s.,_-]/g,'');
	});

	$("#anticipo").on('change', function () 
	{
		// Se valida si es una edición, de ser asi se toma el monto pagado para hacer el calculo y luego se eliminan los puntos de mil y se cambia el decimal por punto para los calculos
    	let anticipo = $("#pagado").val() ? $("#pagado").val().replaceAll('.','').replaceAll(',','.') : this.value.replaceAll('.','').replaceAll(',','.');
    	let subtotal = $("#trans_sub_total").val().replaceAll('.','').replaceAll(',','.');

    	// Si el anticipo es mayor al subtotal, se setea el monto del anticipo al monto del subtotal
    	if (parseFloat(anticipo) >= parseFloat(subtotal)) 
    	{
    		$("#anticipo").val(format(subtotal.replaceAll('.',',')));
    		$("#trans_monto_pendiente").val(0);
    	}
    	else
    	{
    		// Sino se hace el duescuento y se coloca como monto pendiente
    		let pendiente = subtotal - anticipo;
    		pendiente = format(pendiente.toFixed(2).replaceAll('.',','));
    		$("#trans_monto_pendiente").val(pendiente);
    	}

    	this.value = format(this.value);
	});

	$("#tipo_pago").change(function()
    {
       if ($(this).val() == 1) 
       {
       		$("#divanticipo").show(1000);
       }
       else
       {
   			$("#divanticipo").hide(1000);
   			$("#anticipo").val(0);

   			// Si el tipo de pago es completo, el monto pendiente pasa a ser 0
   			if ($(this).val() == 2) 
   			{
   				$("#trans_monto_pendiente").val(0);
   			}
       }
    });

    $("#ret_id").change(function()
    {
    	// Se eliminan los puntos de mil y se cambia el decimal por punto para los calculos
    	let costo = $("#trans_costo").val().replaceAll('.','').replaceAll(',','.');

    	if ($("#tipo_pago").val() != 2) 
    	{
	    	//Se resta el costo con el porcentaje seleccionado 
	    	let subtotal = costo-(this.value * costo);
	    	subtotal = format(subtotal.toFixed(2).replaceAll('.',','));
       	$("#trans_sub_total,#trans_monto_pendiente").val(subtotal);
       	//Se activa el anticipo para que automaticamente reste el pendiente si tiene algun valor
       	$("#anticipo").trigger("change"); 
    	}

    	// Se guarda el concepto para buscarlo posteriormente en BD
    	if (this.value) 
    	{
    		$("#conceptoretencion").val($(this).find('option:selected').text());
    	}

    	$("#porcret").text(format(parseFloat(this.value * 100).toFixed(1)));

    });

 	$('#trans_costo').on('change', function () 
	{ 
			this.value= format(this.value);
	    $("#trans_monto_pendiente,#trans_sub_total").val(this.value);
	    //Para aplicar el porcentaje de retencion si el valor cambia y ya hay una retencion cargada
	    $("#ret_id").trigger("change");
	});


    $(document).on('click','.confirm',function(e)
    {
    	swal({
            title: "¿Está seguro de continuar?",
            icon: "warning",
            buttons: ['No','Si'],
        })
        .then((opcion) => 
        {
            if (opcion) 
            {
               $("#transporte_form").submit();
            }
        });
    });

    // Si hay error en formulario y costo y el tipo de pago estaban llenos se activa el evento para calcular
    $("#trans_costo,#tipo_pago").trigger("change");

    // Se valida si se está editando una relación de servicio la cual ya tiene un pago cargado
    if ($("#pagado")) 
    {
    		$("#pagado").val(format($("#pagado").val()));
    }	

});

// Formato moneda
function format(value) 
{
	return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}