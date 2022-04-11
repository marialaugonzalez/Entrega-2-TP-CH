

let eCarrito = [];


const items = document.querySelector('#items');
const carrito = document.querySelector('#carrito');
const total = document.querySelector('#total');
const buttonVaciar = document.querySelector('#boton-vaciar');
const moneda = '$';

// Funciones

//Coloca los productos en el HTML
function renderProductos(bd) {
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
        nodoBoton.addEventListener('click', (e => {
            addCursoCarrito(e)        
            Toastify({
                text: "Agregaste un producto al carrito",
               duration: 2000,
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
               offset: {
                    x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: 10  // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },
         }).showToast();         
        
        }));
       // nodoBoton.addEventListener('click', () => {
       

        // Insertamos
        nodoCardBody.appendChild(nodoImagen);
        nodoCardBody.appendChild(nodoTitle);
        nodoCardBody.appendChild(nodoPrecio);
        nodoCardBody.appendChild(nodoBoton);
        nodo.appendChild(nodoCardBody);
        items.appendChild(nodo);
    } 
) };

/**
 * Evento para añadir un producto al carrito de la compra
 */
 function addCursoCarrito(e) {
    
     setCarrito(e.target.parentElement);
       
}

const setCarrito = objeto => {

    let cantidad;
    let idExiste;
    const curso = {
        id:      objeto.querySelector("button").id,
        title:   objeto.querySelector("h5").textContent,
        precio : objeto.querySelector("p").textContent  ,        
        cantidad : 1 
    }

    if (eCarrito.length != 0){
        eCarrito.forEach((item) => {
            if (item.id == curso.id ){
            cantidad = item.cantidad + 1;   
            idExiste = 'X';       
            }
  
        } ) 

        if (idExiste == 'X'){
        curso.cantidad = cantidad;  
    }
    else{
        curso.cantidad = 1;
    }
}


    eCarrito[curso.id] = {...curso}
    renderCarrito () ;
}

const renderCarrito = () => {
    carrito.textContent = '';  
    total.textContent = '';
   
    const carritoSinDuplicados = [...new Set(eCarrito)];
    Object.values(eCarrito).forEach(curso => {
        const nodo = document.createElement('li');
        nodo.classList.add('list-group-item', 'text-right', 'mx-2');
        //nodo.textContent = `1 x ${itemCurso[0].title} - ${moneda}${itemCurso[0].precio}`;
        nodo.textContent = `${curso.cantidad} x ${curso.title} - ${curso.precio}`;
       
       //localStorage.setItem('elements', JSON.stringify(miNodo.textContent))        
        // Boton para borrado
        const buttonDelete= document.createElement('button');
        buttonDelete.classList.add('btn', 'btn-danger', 'mx-7');
        buttonDelete.textContent = 'Delete';
        buttonDelete.style.marginLeft = '1rem';
        buttonDelete.dataset.item = curso.id;
        //buttonDelete.addEventListener('click', delCursoCarrito);
        //buttonDelete.addEventListener('click', () => {
            buttonDelete.addEventListener('click', (e => {
                delCursoCarrito(e)        
            Toastify({
                text: "Quitaste un producto del carrito",
                duration: 2000,
                backgroundColor: "linear-gradient(red, yellow)",
                offset: {
                    x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },
            }).showToast();
        }));
       // } );
        // Mezclamos nodos
        nodo.appendChild(buttonDelete);
        carrito.appendChild(nodo);
          // Renderizamos el precio total en el HTML
          total.textContent = calcularTotal();
          //LocalStorage
    localStorage.setItem('carrito', JSON.stringify(eCarrito))
     
    });
  
}

/**
 * Evento para borrar un elemento del carrito
 */
function delCursoCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item ;
    // Borramos todos los productos
    //delete eCarrito[evento.target.dataset.item];
    eCarrito = eCarrito.filter(carritoId => carritoId.id !== id);     
    renderCarrito () ;

}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {

    let sum = 0;
   for (const key in Object.values(eCarrito)) {
    let precio = Object.values(eCarrito)[key].precio.substr(1);
     sum += parseInt(precio) * Object.values(eCarrito)[key].cantidad;      
    }
    return sum;
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    eCarrito = [];
    total.textContent = '';
   // Renderizamos los cambios
    renderCarrito();
}

// Eventos
buttonVaciar.addEventListener('click', vaciarCarrito);

buttonVaciar.addEventListener('click', () => {
    Toastify({
        text: "Vaciaste el carrito",
        duration: 2000,
        backgroundColor: "linear-gradient(#e66465, #9198e5)",
        offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
    }).showToast();
} ) ;


 fetchDatos = async () => {
	//Funcion para traer datos disponibles desde  JSON
   fetch("./data.json")
  .then(response => {
      return response.json();
    })       
   .then(data => 
      {
          
          renderProductos(data);
          renderCarrito();                   
     }
                
       ) };


 fetchDatos();
 if (localStorage.getItem("carrito")) {
 eCarrito =  JSON.parse( localStorage.getItem('carrito') ) 
 renderCarrito();   
}



