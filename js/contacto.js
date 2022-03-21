function validar(){
  var regexemail = /^[0-9a-zA-Z._.-]+\@[0-9a-zA-Z._.-]+\.[0-9a-zA-Z]+$/; //expresion regular para emails validos
  var regextel = /^([0-9]{4})+-+([0-9]{4})+$/;
  var mensaje =""; //variable que va a almacenar todos los mensajes de error
  var error =0; /*variable auxiliar que se va a utilizar para retornar o no falso. 
                          En caso de que su valor sea 0, retornara verdadero y el formulario se enviara. En el caso de que sea mayor a 0 retornara falso.*/
  reset();
  if ($("#nombreyapellido").val()==""){ 
      mensaje+= "<p>El campo Nombre y Apellido son obligatorio </p>";
      error++;
      $("#nombreyapellido").addClass('error');
  }

  if(!$("#miemail").val().match(regexemail)){
      mensaje+= "<p>Debe ser un email valido</p>";
      error++;
      $("#miemail").addClass('error');
  }

  if(!$("#telefono").val().match(regextel)){
      mensaje+= "<p>Debe ser un teléfono valido</p>";
      error++;
      $("#telefono").addClass('error');
  }



  /*Si error es mayor a 0 retorna falso y muestra todo los mensajes de errores acumulado en la variable mensaje*/
  if (error>0){
      
      $("#mensaje").append(mensaje); //agregamos al div de id mensaje, los mensajes de error acumulados en la variable mensaje
      return false;
  }
  /*Sino retorna verdadero y el formulario se envía*/
  else{
      return true;
  }

}
function reset(){ /*Esta funciona elimina todas las clases de error*/
  $("#nombreyapellido").removeClass('error');
  $("#telefono").removeClass('error');
  $("#miemail").removeClass('error');
  $("#mensaje").empty(); //vaciamos el contenido del div de id mensaje
}

var limit = 1000;
function contarCaracteres() {
  $("#consultas").on("input", function () {
      //al cambiar el texto del detalle
      var init = $(this).val().length;
      total_caracteres = (limit - init);

      $('#caracteres').html(init + "/" + total_caracteres + " caracteres restantes");
  });
}

$(document).ready(function() {
  
  $("#form").submit(function() {
      return validar();
  });
  $("#nombreyapellido").change(function() {
      validar();
  });
  $("#telefono").keyup(function() {
      validar("#telefono");
  });
  $("#miemail").keyup(function() {
      validar("#miemail");
  });
  
});

