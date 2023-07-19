$(document).ready(function ()
{
    $("#modo_evaluacion").change(function()
    {
        // Display boton enviar
        if ($(this).val()) 
        {
            $("#submiteval").prop('disabled',false);
        }
        else
        {
            $("#submiteval").prop('disabled',true);
        }

        // Display evaluacion materiales
        if ($(this).val() == 1 || $(this).val() == 3) 
        {
            $("#eval_materiales").show(1000);
        }
        else
        {
            $("#eval_materiales").hide(1000);
        }

        // Display evaluacion servicios
        if ($(this).val() == 2 || $(this).val() == 3) 
        {
            $("#eval_servicios").show(1000);
        }
        else
        {
            $("#eval_servicios").hide(1000);
        }
    });

    $("input:radio").click(function()
    {
        // Obtenemos el nombre y pegamos su valor al input con el mismo ID que dicho nombre de input
        $('#'+$(this).attr('name')).val($(this).attr('respuesta')+','+parseFloat($(this).val()).toFixed(2));

        let totalcalidadmat = 0;
        let totaloportunidadmat = 0;
        let totalserviciomat = 0;
        let totalcomportamientomat = 0;
        let totalsstmat = 0;
        let puntajeobtenidomaterial = 0;

        let totalcalidadserv = 0;
        let totaloportunidadserv = 0;
        let totalservicioserv = 0;
        let totalcomportamientoserv = 0;
        let totalsstserv = 0;
        let puntajeobtenidoservicio = 0;

        $("[criterio]:checked").each(function() 
        {
            if ($(this).attr('criterio') == 'calidad_material') 
            {
                totalcalidadmat = parseFloat($(this).val())+parseFloat(totalcalidadmat);
            }
            else if($(this).attr('criterio') == 'oportunidad_material')
            {
                totaloportunidadmat = parseFloat($(this).val())+parseFloat(totaloportunidadmat);
            }
            else if($(this).attr('criterio') == 'servicio_material')
            {
                totalserviciomat = parseFloat($(this).val())+parseFloat(totalserviciomat);
            }
            else if($(this).attr('criterio') == 'comportamiento_material')
            {
                totalcomportamientomat = parseFloat($(this).val())+parseFloat(totalcomportamientomat);
            }
            else if($(this).attr('criterio') == 'sst_material')
            {
                totalsstmat = parseFloat($(this).val())+parseFloat(totalsstmat);
            }
            else if ($(this).attr('criterio') == 'calidad_servicio') 
            {
                totalcalidadserv = parseFloat($(this).val())+parseFloat(totalcalidadserv);
            }
            else if($(this).attr('criterio') == 'oportunidad_servicio')
            {
                totaloportunidadserv = parseFloat($(this).val())+parseFloat(totaloportunidadserv);
            }
            else if($(this).attr('criterio') == 'servicio_servicio')
            {
                totalservicioserv = parseFloat($(this).val())+parseFloat(totalservicioserv);
            }
            else if($(this).attr('criterio') == 'comportamiento_servicio')
            {
                totalcomportamientoserv = parseFloat($(this).val())+parseFloat(totalcomportamientoserv);
            }
            else if($(this).attr('criterio') == 'sst_servicio')
            {
                totalsstserv = parseFloat($(this).val())+parseFloat(totalsstserv);
            }

            puntajeobtenidomaterial = totalcalidadmat+totaloportunidadmat+totalserviciomat+totalcomportamientomat+totalsstmat;
            puntajeobtenidoservicio = totalcalidadserv+totaloportunidadserv+totalservicioserv+totalcomportamientoserv+totalsstserv;
        });

        $("#puntajecalidadmat").text(totalcalidadmat.toFixed(2));
        $('#puntajeoportmat').text(totaloportunidadmat.toFixed(2));
        $('#puntajeservmat').text(totalserviciomat.toFixed(2));
        $('#puntajecomportmat').text(totalcomportamientomat.toFixed(2));
        $('#puntajesstmat').text(totalsstmat.toFixed(2));
        $('#totalpuntajeobtenidomaterial').text(puntajeobtenidomaterial.toFixed(2));
        $("#inputtotalpuntajeobtenidomaterial").val(puntajeobtenidomaterial.toFixed(2));

        $("#puntajecalidadserv").text(totalcalidadserv.toFixed(2));
        $('#puntajeoportserv').text(totaloportunidadserv.toFixed(2));
        $('#puntajeservserv').text(totalservicioserv.toFixed(2));
        $('#puntajecomportserv').text(totalcomportamientoserv.toFixed(2));
        $('#puntajesstserv').text(totalsstserv.toFixed(2));
        $('#totalpuntajeobtenidoservicio').text(puntajeobtenidoservicio.toFixed(2));
        $("#inputtotalpuntajeobtenidoservicio").val(puntajeobtenidoservicio.toFixed(2));
    });

    $("#evaluacion_form").submit(function( event ) 
    {
        let error = false;

        $("[criterio]").each(function() 
        {
            if ($('[criterio="'+$(this).attr('criterio')+'"]' + ':checked').length == 0 && $(this).is(':visible')) 
            {
                error = true;
                $(this).closest('tr').find('strong').show();
            }
        });

        if (error) 
        {
            $("html, body").animate({scrollTop: 0}, 100);

            $.notify({
                  title:'Campos incompletos',
                  message:'Por favor, complete todos los campos obligatorios'
            },
           {
              type:'danger',
              allow_dismiss:false,
              newest_on_top:false ,
              mouse_over:false,
              showProgressbar:false,
              spacing:10,
              timer:2000,
              placement:{
                from:'top',
                align:'right'
              },
              offset:{
                x:30,
                y:30
              },
              delay:1000 ,
              z_index:10000,
              animate:{
                enter:'animated bounce',
                exit:'animated bounce'
            }
          });

          return false;
        }
    });
});