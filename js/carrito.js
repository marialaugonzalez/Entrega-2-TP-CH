const bd = [
    {
      "precio": 5000,
      "id": 1,
      "title": "Curso JavaScript",
      "thumbnailUrl": "img/js.png"
    },
    {
      "precio": 3000,
      "id": 2,
      "title": "Curso Html",
      "thumbnailUrl": "img/HTML5.png"
    },
    {
      "precio": 1000,
      "id": 3,
      "title": "Curso Phyton",
      "thumbnailUrl": "img/Python.png"
    }
  ];
  

let eCarrito = [];


const items = document.querySelector('#items');
const carrito = document.querySelector('#carrito');
const total = document.querySelector('#total');
const buttonVaciar = document.querySelector('#boton-vaciar');
const moneda = '$';

// Funciones

//Acá se intentó buscar como hacer en boostrap esto de agregar los productos del JSON.
//Intenté, hacer el JSON como local, pero al intentar tomarlo con un Fetch me dabael siguiente error:
//data.json ERR_FAILED . has been blocked by CORS policy...esto no se a que se debe. Vi en tuto
// que te debería dejar ahcer eso pero a mi me da error lo siguiente:
//const res = await fetch('../data/data.json');
function renderProductos() {
    bd.forEach((data) => {
        // Estructura
        const nodo = document.createElement('div');
        nodo.classList.add('card', 'col-sm-4');
        // Body
        const nodoCardBody = document.createElement('div');
        nodoCardBody.classList.add('card-body');
        // Titulo
        const nodoTitle = document.createElement('h5');
        nodoTitle.classList.add('card-title');
        nodoTitle.textContent = data.title;
        // Imagen
        const nodoImagen = document.createElement('img');
        nodoImagen.classList.add('img-fluid');
        nodoImagen.setAttribute('src', data.thumbnailUrl);
        // Precio
        const nodoPrecio = document.createElement('p');
        nodoPrecio.classList.add('card-text');
        nodoPrecio.textContent = `${moneda}${data.precio}`;
        // Boton 
        const nodoBoton = document.createElement('button');
        nodoBoton.classList.add('btn', 'btn-primary');
        nodoBoton.textContent = 'Agregar';
        nodoBoton.setAttribute('id', data.id);
        nodoBoton.addEventListener('click', addCursoCarrito);
        // Insertamos
        nodoCardBody.appendChild(nodoImagen);
        nodoCardBody.appendChild(nodoTitle);
        nodoCardBody.appendChild(nodoPrecio);
        nodoCardBody.appendChild(nodoBoton);
        nodo.appendChild(nodoCardBody);
        items.appendChild(nodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function addCursoCarrito(evento) {
    
    eCarrito.push(evento.target.getAttribute('id'))
    //LocalStorage
    localStorage.setItem('elementsId', JSON.stringify(eCarrito))
    renderCarrito();

}


function renderCarrito() {
    carrito.textContent = '';
        eCarrito.forEach((item) => {
 //     busco el items que necesito de la BD
        const itemCurso = bd.filter((itembd) => {
           return itembd.id === parseInt(item);
        });
//Agrego el LI
        const nodo = document.createElement('li');
        nodo.classList.add('list-group-item', 'text-right', 'mx-2');
        nodo.textContent = `1 x ${itemCurso[0].title} - ${moneda}${itemCurso[0].precio}`;
       // localStorage.setItem('elements', JSON.stringify(miNodo.textContent))        
        // Boton para borrado
        const buttonDelete= document.createElement('button');
        buttonDelete.classList.add('btn', 'btn-danger', 'mx-7');
        buttonDelete.textContent = 'Delete';
        buttonDelete.style.marginLeft = '1rem';
        buttonDelete.dataset.item = item;
        buttonDelete.addEventListener('click', delCursoCarrito);
        // Mezclamos nodos
        nodo.appendChild(buttonDelete);
        carrito.appendChild(nodo);
    });
    // Renderizamos el precio total en el HTML
    total.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function delCursoCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    eCarrito = eCarrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return eCarrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const itemCurso = bd.filter((itemBd) => {
            return itemBd.id === parseInt(item);
        });
        // Los sumamos al total
        return total + itemCurso[0].precio;
    }, 0).toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    eCarrito = [];
    // Renderizamos los cambios
    renderCarrito();
}

// Eventos
buttonVaciar.addEventListener('click', vaciarCarrito);

// Inicio

renderProductos();
renderCarrito();

//localStorage.clear;
//const elementStorage = localStorage.getItem("elementsId");
//if(elementStorage){
//    eCarrito = JSON.parse(elementStorage);
  
//}
//Operador lógico OR
eCarrito =  JSON.parse( localStorage.getItem('elementsId') ) || [];

renderCarrito();


