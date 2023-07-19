$(document).ready(function ()
{
	
});

function errores_formulario(campos) 
{
	 $.each(campos, function(campo,mensaje)
	 {
	 		$('#'+campo).removeClass('is-valid');
 			$('#'+campo).addClass('is-invalid');
 			$("#"+campo+"-error").text(mensaje);
	 });
}