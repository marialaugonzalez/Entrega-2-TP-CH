fetchDatos = async () => {
	//Funcion para traer datos disponibles desde  JSON
   fetch("./data.json")
  .then(response => {
      return response.json();
    })       
   .then(data => 
      {
          for (let curso of data)
          {
            let nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = curso.id;
            nuevaOpcion.text = curso.title;
            var select = document.getElementById('nombreCurso');
            select.add(nuevaOpcion);
          }
                        
     }
                
       ) };


fetchDatos();
obtenerFecha();

function obtenerFecha(){

date = new Date();
year = date.getFullYear();
month = date.getMonth() + 1;
day = date.getDate();
$("#mes").text(month);
$("#anio").text(year);
}



$(document).ready(function(){ 
    
    $("#nombre").keyup(function(){
        const nombre = document.getElementById('nombre');   
        if (nombre.value != ''){
          $("#texto").text($(this).val());
    }
    else{
        $("#texto").text('XXXX');
    }
 
    });
  

  $("#nombreCurso").change(function(){  
    
   const combo = document.getElementById('nombreCurso');   
   if (combo.value != '-'){
   var selected = combo.options[combo.selectedIndex].text;   
    $("#curso-text").text(selected);
}
else{
    $("#curso-text").text('XXXX');
}

});

$("#mes").keyup(function(){
    document.getElementById("current_date").innerHTML = Date();

});

$("input[name='color']").change(function(){    
    $("#curso-text").removeClass("negro gris verde rojo azul");
    $("#curso-text").addClass($(this).val());
    $("#texto").removeClass("negro gris verde rojo azul");
    $("#texto").addClass($(this).val());
    $("#mes").removeClass("negro gris verde rojo azul");
    $("#mes").addClass($(this).val());
    $("#anio").removeClass("negro gris verde rojo azul");
    $("#anio").addClass($(this).val());
    
});

$("input[name='fondo']").change(function(){    
    $(".giftcard").removeClass("color1 color2 color3 color4 color5");
    $(".giftcard").addClass($(this).val());
});


});