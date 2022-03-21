// Agrego nuevo Curso
let productoNuevo = document.getElementsByClassName("producto");
let newOption = document.createElement("option");
newOption.text = "Curso 4";
newOption.value = "Curso 4";
productoNuevo.producto.add(newOption);

//Agregar nuevo curso al datalist
let busquedaNueva = document.getElementById("cursos");
let newVal = document.createElement("option");
newVal.value = "JavaScript";
busquedaNueva.appendChild(newVal);

function calcular() {
  let productoSel = document.getElementById("producto").value;
  let tarjetaSel = document.getElementById("tarjeta").value;
  let cuotas = document.getElementById("cuotas").value;

  const productos = [
    { id: 1, producto: "Curso 1", precio: 180000 },
    { id: 2, producto: "Curso 2", precio: 130000 },
    { id: 3, producto: "Curso 3", precio: 275000 },
  ];

  const tarjetas = [
    { id: 1, nombre: "Visa", interes3: 0.1, interes6: 0.3, interes12: 0.5 },
    { id: 2, nombre: "Master", interes3: 0.15, interes6: 0.4, interes12: 0.6 },
    { id: 3, nombre: "Amex", interes3: 0.2, interes6: 0.5, interes12: 0.75 },
  ];

  //Calculo de intereses según tarjeta y producto
  //Intereses:             10% recargo con Visa en 3 cuotas, 30% en 6 cuotas, 50% en 12 cuotas
  //                       15% recargo con master en 3 cuotas, 40% en 6 cuotas, 60% en 12 cuotas
  //                       20% recargo con Amex en 3 cuotas, 50% en 6 cuotas, 75% en 12 cuotas

  if ((productoSel != 0) & (tarjetaSel != 0) & (cuotas != 0)) {
    const interes = calcularInteres(tarjetaSel, cuotas);

    //Informamos al user las tarjetas que tienen un interes mayor al 5%
    console.log("Interes mayor o igual a 5%:");
    const filterInteres6 = tarjetas.filter(
      (interes) => interes.interes6 >= 0.5
    );
    console.log(filterInteres6);
    const filterInteres12 = tarjetas.filter(
      (interes) => interes.interes12 >= 0.5
    );
    console.log(filterInteres12);

    if (cuotas == 6) {
      const Interes6Mayor = tarjetas.find(function (element) {
        return element.interes6 > 0.4;
      });
      if (Interes6Mayor.nombre == tarjetaSel) {
        alert(
          `Eligió un interes mayor a 4% para la tarjeta" ${Interes6Mayor.nombre}`
        );
      }
    }

    for (const producto of productos) {
      if (producto.producto == productoSel) {
        calcularValor(producto.precio, interes, cuotas, tarjetaSel);
        alert("Verificar consola para visualizar resultados");
        break;
      }
    }
  } else {
    alert(
      "Algunos de los valores ingresados es nulo, debe seleccionar un valor"
    );
  }
}

function calcularInteres(tarjetaSel, cuotas) {
  const tarjetas = [
    { id: 1, nombre: "Visa", interes3: 0.1, interes6: 0.3, interes12: 0.5 },
    { id: 2, nombre: "Master", interes3: 0.15, interes6: 0.4, interes12: 0.6 },
    { id: 3, nombre: "Amex", interes3: 0.2, interes6: 0.5, interes12: 0.75 },
  ];

  for (const tarjeta of tarjetas) {
    if (tarjeta.nombre == tarjetaSel) {
      switch (cuotas) {
        case "3":
          return tarjeta.interes3;
        case "6":
          return tarjeta.interes6;
        case "12":
          return tarjeta.interes12;
      }
    }
  }
}

function calcularValor(valorProducto, interes, cuotas, tarjetaSel) {
  let valorTotal = valorProducto * interes + valorProducto;
  let valorCuota = valorTotal / cuotas;
  console.log(
    `Imprimimos valor de  ${cuotas} cuotas para tarjeta ${tarjeta}: `
  );
  for (i = 1; i <= cuotas; i++) {
    console.log(`El valor de la cuota   ${i} es de ${valorCuota}`);
  }
}
