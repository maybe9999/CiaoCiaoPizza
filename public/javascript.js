// Evento para mostrar imágen al presionar un elemento del listado //
document.addEventListener('DOMContentLoaded', function() {
    const cartas = document.querySelectorAll('.cartas');
    const cartaImagen = document.querySelector('.carta-imagen');
    const cartaTexto = document.querySelector('.carta-texto');
    
    cartas.forEach(function(carta) {
        carta.addEventListener('click', function() {
            const imagen = carta.dataset.imagen;
            const texto = carta.dataset.texto;
            
            mostrarCarta(imagen, texto);
        });
    });
    
    function mostrarCarta(imagen, texto) {
        cartaImagen.innerHTML = `<img src="${imagen}" alt="">`;
        cartaTexto.textContent = texto;
    }
});
// FIN Evento para mostrar imágen al presionar un elemento del listado //





// Evento para ocultar o mostrar los elementos del listado si se ha seleccionado el Header //
function mostrarCartas(index) {
    // Ocultar todos los elementos de la sección left
    var elementosLeft = document.querySelectorAll('.item.left');
    elementosLeft.forEach(function(elemento) {
        elemento.style.display = 'none';
    });
    
    // Mostrar solo el elemento correspondiente al índice del elemento header-cartas clicado
    var elementoMostrar = document.getElementById('left-' + index);
    if (elementoMostrar) {
        elementoMostrar.style.display = 'block';
    }
}
// FIN Evento para ocultar o mostrar los elementos del listado si se ha seleccionado el Header //





// JavaScript para CONTACTO ----------------//
function validateForm(event)
{
    event.preventDefault();
    //inputs
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let mensaje = document.getElementById("mensaje").value;
    if(nombre.trim() === "") 
    {
       alert("Por favor, ingrese su nombre");
       return false; //evita que se envie el formulario 
    }
    
    if(telefono.trim() === ""){
        alert("Por favor ingrese Su teléfono");
        return false;
    }
    
    if(email.trim() === "")
    {
        alert("Por favor ingrese correctamente su email");
        return false;
    }
    if(mensaje.trim() === ""){
        alert("El contenido esta vacio, ingrese su mensaje");
        return false;
    }

    if(!isValidEmail(email)){
        alert("Por favor ingrese un mail valido");
        return false;
    }

    alert("Formulario enviado correctamente");
    return true;
}
function isValidEmail(email){
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function init() {
    document.getElementById("myForm").addEventListener("submit", validateForm);
}
document.addEventListener("DOMContentLoaded", init);
// Fin JavaScriptContacto -----------------//







//Responsive HEADEER---------------------------------------------//
document.addEventListener("DOMContentLoaded", function()
{
    let menuIcon = document.querySelector(".menu-icon");
    let menuDesplegable = document.querySelector(".menu-desplegable");

    menuIcon.addEventListener("click", function(){
        menuDesplegable.classList.toggle("open");
    });

});
//FIN Responsive HEADEER--------------------------------------------- //






// Inicio código Modal Login //

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("loginModal");
    const btn = document.getElementById("loginBtn");
    const btnMobile = document.getElementById("loginBtnMobile");
    const span = document.getElementsByClassName("close")[0];
    const form = document.getElementById("loginForm");

    let showModal = false; // Variable para controlar la visibilidad del modal

    // Función para mostrar u ocultar el modal
    function toggleModal() {
        if (showModal) {
            modal.style.display = "flex";
        } else {
            modal.style.display = "none";
        }
    }

    btn.onclick = function () {
        showModal = true; // Al hacer clic en el botón, se muestra el modal
        toggleModal();
    };

    btnMobile.onclick = function () {
        showModal = true; // Al hacer clic en el botón móvil, se muestra el modal
        toggleModal();
    };

    span.onclick = function () {
        showModal = false; // Al hacer clic en el botón de cerrar, se oculta el modal
        toggleModal();
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            showModal = false; // Al hacer clic fuera del modal, se oculta
            toggleModal();
        }
    };

    form.onsubmit = function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                window.location.href = '/dashboard';
            } else {
                alert(result.message || 'Credenciales incorrectas');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    // Ocultar el modal al cargar la página
    toggleModal();
});
// Fin código Modal Login //



//----------------------------------INICIO DASHBOARD-------------------------------------//


// document.addEventListener('DOMContentLoaded',()=>{
//     console.log("esta seccion acaba de cargar");

//     //BOTON mostrar seccion crear
//     const mostrarCrearProdPizzaFormBtn = document.getElementById('mostrarCrearProdPizzaFormBtn');
//     const mostrarCrearProdMenuFormBtn = document.getElementById('mostrarCrearProdMenuFormBtn');
//     const mostrarCrearProdBebidaBtn = document.getElementById('mostrarCrearProdBebidaBtn');

//     //BOTONES crear
//     const crearPizzaForm = document.getElementById('crearPizzaForm'); 
//     const crearMenuForm = document.getElementById('crearMenuForm');
//     const crearBebidaForm = document.getElementById('crearBebidaForm');

//     //BOTONES editar
//     const editarPizzaForm = document.getElementById('editarPizzaForm');
//     const editarMenuForm = document.getElementById('editarMenuForm');
//     const editarBebidaForm = document.getElementById('editarBebidaForm');

//     //BOTONES listar
//     const listarProdPizzaBtn = document.getElementById('listarProdPizza');
//     const listarProdMenuBtn = document.getElementById('listarProdMenu');
//     const listarProdBebidaBtn = document.getElementById('listarProdBebida');

//     //Almacen de valores :)
//     let listaPizza = document.getElementById('listaPizza');
//     let listaMenu = document.getElementById('listaMenu');
//     let listaBebida = document.getElementById('listaBebida');

//     //Escucha y muestra secciones
//     mostrarCrearProdPizzaFormBtn.addEventListener('click',()=> {
//         crearPizzaForm.classList.toggle('hidden');
//     });
//     mostrarCrearProdMenuFormBtn.addEventListener('click',()=> {
//         crearMenuForm.classList.toggle('hidden');
//     });
//     mostrarCrearProdBebidaBtn.addEventListener('click',()=> {
//         crearBebidaForm.classList.toggle('hidden');
//     });

//     // Funciones para CREAR
//     // Función para enviar el formulario de Pizza
//     crearPizzaForm.addEventListener('submit', async (e) =>
//     {  
//         e.preventDefault();
//         const formData = new FormData(crearPizzaForm);
//         const data = 
//         {
//             nombrePizza: formData.get('pizza-name'),
//             precioPizza : formData.get('pizza-price'),
//             stock: formData.get('pizza-stock')
//             // estado : formData.get('estado')
//         }

//         const response = await fetch ('/api/dashboard',
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type':'application/json'
//             },
//             body: JSON.stringify(data)
//         });

//         const result = await response.json();
//         alert("Producto creado con Exito");

//         crearPizzaForm.reset();
//         crearPizzaForm.classList.add('hidden');
//         listarProd();

//     });
    

//     //editar Pizza
//     editarPizzaForm.addEventListener('submit', async(e) => 
//     {
//         e.preventDefault();
//         const formData = new FormData(editarPizzaForm);
//         const id = formData.get('editPizzaID');
//         const data = 
//         {
//             nombrePizza: formData.get('editPizza-name'),
//             precioPizza : formData.get('editPizza-price'),
//             stock: formData.get('editPizza-stock')
//             // estado : formData.get('estado')
//         }

//         const response = await fetch(`/api/dashboard/${id}`,
//         {
//             method: 'PUT',
//             headers: 
//             {
//                 'Content-Type':'application/json'
//             },
//             body: JSON.stringify(data)
//         });

//         const result = await response.json();
//         alert(result.message);
//         editarPizzaForm.reset();
//         editarPizzaForm.classList.add('hidden');
//         listarProd();

//     });


//     // ---HACER VISIBLE PRODUCTOS---
//     listarProdPizzaBtn.addEventListener('click', () =>{
//         listarProd("Pizza");
//         listaPizza.classList.toggle('hidden');

//         //Si listaMenu no contiene hidden agregalo
//         if (!listaMenu.classList.value.includes("hidden")){
//             listaMenu.classList.toggle('hidden');
//         }
//         if (!listaBebida.classList.value.includes("hidden")){
//             listaBebida.classList.toggle('hidden');
//         }
//     }); 
//     listarProdMenuBtn.addEventListener('click', () =>{
//         console.log("mostrando menu");
//         listarProd("OtroMenu")
//         listaMenu.classList.toggle('hidden');
//         if (!listaPizza.classList.value.includes("hidden")){
//             listaPizza.classList.toggle('hidden');
//         }
//         if (!listaBebida.classList.value.includes("hidden")){
//             listaBebida.classList.toggle('hidden');
//         }
//     });
//     listarProdBebidaBtn.addEventListener('click', () => {
//         console.log("mostrando bebida");
//         listarProd("Bebida");
//         listaBebida.classList.toggle('hidden');
//         if (!listaPizza.classList.value.includes("hidden")){
//             listaPizza.classList.toggle('hidden');
//         }
//         if (!listaMenu.classList.value.includes("hidden")){
//             listaMenu.classList.toggle('hidden');
//         }
//     });

//     // --- OBTENER PRODUCTOS - LISTAR PRODUCTOS - EDITAR PRODUCTO - ELIMINAR PRODUCTO
//     async function listarProd(productoRecibido){
//         //Obteniendo producto
//         console.log("listando productos",`/api/dashboard/${productoRecibido}` );
//         const response = await fetch(`/api/dashboard/${productoRecibido}`);
    
//         const producto = await response.json();
        
//         console.log(producto)

//         let objetoContenedorProductos;

//         if(productoRecibido == "Pizza"){
//             objetoContenedorProductos = listaPizza;
//         }else if(productoRecibido == "OtroMenu"){
//             objetoContenedorProductos = listaMenu;
//         }else if(productoRecibido == "Bebida"){
//             objetoContenedorProductos = listaBebida;
//         }

//         //Listando producto
//         objetoContenedorProductos.innerHTML = '';

//         producto.forEach(producto => {
//             const li = document.createElement('li');
//             li.innerHTML = `
//                 <span> ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}, Stock: ${producto.stock} </span>
//                 <div class="actions">
//                     <button class="update" data-idPizza="${producto.id}" data-nombrePizza="${producto.nombre}" data-precioPizza="${producto.precio}" data-stockPizza="${producto.precio}"> Editar </button>
                    
//                     <button class="delete" data-idPizza="${producto.id}"> Eliminar </button>
//                 </div>
//             `;
//             objetoContenedorProductos.appendChild(li);
//         });

//         //Editando producto
//         document.querySelectorAll('.update').forEach(button => {
//             button.addEventListener('click',(e) => {
//                 const idPizza = e.target.getAttribute('data-idPizza');                    
//                 const nombrePizza = e.target.getAttribute('data-nombrePizza');                    
//                 const precioPizza = e.target.getAttribute('data-precioPizza');                    
//                 const stockPizza = e.target.getAttribute('data-stockPizza');

//                 document.getElementById('editPizzaID').value = idPizza;
//                 document.getElementById('editPizza-name').value = nombrePizza;
//                 document.getElementById('editPizza-price').value = precioPizza;
//                 document.getElementById('editPizza-stock').value = stockPizza;

//                 editarPizzaForm.classList.remove('hidden');
//             });
//         });

//         //Eliminando producto
//         document.querySelectorAll('.delete').forEach(button => {
//             button.addEventListener('click', async(e)=>{
//                 const id = e.target.getAttribute('data-idPizza');
//                 const response = await fetch(`/api/dashboard/${id}`,{
//                     method: 'DELETE'
//                 });

//                 const result = await response.json();
//                 alert(result.message);
//                 listarProd();
//             });
//         });
//     };
// });
// -------------------------------- Fin Cargar Productos() -------

//----------------------------------FIN DASHBOARD------------------------------------//



document.addEventListener('DOMContentLoaded', () => {
    console.log("Esta sección acaba de cargar");

    // Botones para mostrar formularios
    const mostrarCrearProdPizzaFormBtn = document.getElementById('mostrarCrearProdPizzaFormBtn');
    const mostrarCrearProdMenuFormBtn = document.getElementById('mostrarCrearProdMenuFormBtn');
    const mostrarCrearProdBebidaBtn = document.getElementById('mostrarCrearProdBebidaBtn');

    // Formularios de creación
    const crearPizzaForm = document.getElementById('crearPizzaForm');
    const crearMenuForm = document.getElementById('crearMenuForm');
    const crearBebidaForm = document.getElementById('crearBebidaForm');

    // Formularios de edición
    const editarPizzaForm = document.getElementById('editarPizzaForm');
    const editarMenuForm = document.getElementById('editarMenuForm');
    const editarBebidaForm = document.getElementById('editarBebidaForm');

    // Botones de listar
    const listarProdPizzaBtn = document.getElementById('listarProdPizza');
    const listarProdMenuBtn = document.getElementById('listarProdMenu');
    const listarProdBebidaBtn = document.getElementById('listarProdBebida');

    // Contenedores de listas
    const listaPizza = document.getElementById('listaPizza');
    const listaMenu = document.getElementById('listaMenu');
    const listaBebida = document.getElementById('listaBebida');

    // Mostrar secciones de creación
    mostrarCrearProdPizzaFormBtn.addEventListener('click', () => {
        crearPizzaForm.classList.toggle('hidden');
    });

    mostrarCrearProdMenuFormBtn.addEventListener('click', () => {
        crearMenuForm.classList.toggle('hidden');
    });

    mostrarCrearProdBebidaBtn.addEventListener('click', () => {
        crearBebidaForm.classList.toggle('hidden');
    });

    // Función para enviar el formulario (Genérica)
    async function enviarFormulario(formulario, endpoint) {
        const formData = new FormData(formulario);
        const data = {
            tabla: endpoint,
            nombre: formData.get('name'),
            precio: formData.get('price'),
            stock: formData.get('stock')
        };

        const response = await fetch(`/api/dashboard/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        formulario.reset();
        formulario.classList.add('hidden');
        console.log("Listando producto");
    };

    // Enviar formulario de Pizza
    crearPizzaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        enviarFormulario(crearPizzaForm, 'Pizza');
    });

    // Enviar formulario de Menú
    crearMenuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        enviarFormulario(crearMenuForm, 'OtroMenu');
    });

    // Enviar formulario de Bebida
    crearBebidaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        enviarFormulario(crearBebidaForm, 'Bebida');
    });

    // Función para editar producto
    async function editarProducto(formulario, id, endpoint, exitoMensaje) {
        const formData = new FormData(formulario);
        const data = {
            nombre: formData.get('editName'),
            precio: formData.get('editPrice'),
            stock: formData.get('editStock')
        };
    
        try {
            const response = await fetch(`/api/dashboard/${endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Error al editar el producto');
            }
    
            const result = await response.json();
            alert(exitoMensaje);
            formulario.reset();
            formulario.classList.add('hidden');
            listarProd(endpoint);
        } catch (error) {
            console.error('Error:', error.message);
            // Manejar el error según sea necesario
            alert('Hubo un problema al editar el producto');
        }
    }

    // Función para configurar los datos de edición
    function setupEditarFormulario(formulario, { id, nombre, precio, stock }) {
        formulario.querySelector('#editID').value = id;
        formulario.querySelector('#editName').value = nombre;
        formulario.querySelector('#editPrice').value = precio;
        formulario.querySelector('#editStock').value = stock;
        formulario.classList.remove('hidden');
    }

    // Event listeners para botones de editar en las listas
    function setupEventosEditar() {
        listaPizza.querySelectorAll('.update').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const nombre = button.getAttribute('data-name');
                const precio = button.getAttribute('data-price');
                const stock = button.getAttribute('data-stock');
                setupEditarFormulario(editarPizzaForm, { id, nombre, precio, stock });
            });
        });
    };

    listaMenu.querySelectorAll('.update').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const nombre = button.getAttribute('data-name');
            const precio = button.getAttribute('data-price');
            const stock = button.getAttribute('data-stock');
            setupEditarFormulario(editarMenuForm, { id, nombre, precio, stock });
        });
    });

    listaBebida.querySelectorAll('.update').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const nombre = button.getAttribute('data-name');
            const precio = button.getAttribute('data-price');
            const stock = button.getAttribute('data-stock');
            setupEditarFormulario(editarBebidaForm, { id, nombre, precio, stock });
        });
    });

    
    // Event listener para formularios de edición
    editarPizzaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = editarPizzaForm.querySelector('#editID').value;
        editarProducto(editarPizzaForm, id, 'Pizza', 'Pizza editada con éxito');
    });

    editarMenuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = editarMenuForm.querySelector('#editID').value;
        editarProducto(editarMenuForm, id, 'OtroMenu', 'Menú editado con éxito');
    });

    editarBebidaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = editarBebidaForm.querySelector('#editID').value;
        editarProducto(editarBebidaForm, id, 'Bebida', 'Bebida editada con éxito');
    });

    // Event listener para eliminar producto
    async function eliminarProducto(id, endpoint) {
        const response = await fetch(`/api/dashboard/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({tabla: endpoint, idProducto: id})
        });

        const result = await response.json();
        alert(result.message);
        listarProd(endpoint);
    }

    // Event listeners para botones de listar y eliminar
    listarProdPizzaBtn.addEventListener('click', () => {
        listaPizza.classList.toggle('hidden');
        if (!listaMenu.classList.contains('hidden')) {
            listaMenu.classList.add('hidden');
        }
        if (!listaBebida.classList.contains('hidden')) {
            listaBebida.classList.add('hidden');
        }
        listarProd('Pizza');
    });

    listarProdMenuBtn.addEventListener('click', () => {
        listaMenu.classList.toggle('hidden');
        if (!listaPizza.classList.contains('hidden')) {
            listaPizza.classList.add('hidden');
        }
        if (!listaBebida.classList.contains('hidden')) {
            listaBebida.classList.add('hidden');
        }
        listarProd('OtroMenu');
    });

    listarProdBebidaBtn.addEventListener('click', () => {
        listaBebida.classList.toggle('hidden');
        if (!listaPizza.classList.contains('hidden')) {
            listaPizza.classList.add('hidden');
        }
        if (!listaMenu.classList.contains('hidden')) {
            listaMenu.classList.add('hidden');
        }
        listarProd('Bebida');
    });

    // Listar productos al cargar la página
    async function listarProd(endpoint) {
        const response = await fetch(`/api/dashboard/${endpoint}`);
        const productos = await response.json();

        let lista;
        if (endpoint === 'Pizza') {
            lista = listaPizza;
        } else if (endpoint === 'OtroMenu') {
            lista = listaMenu;
        } else if (endpoint === 'Bebida') {
            lista = listaBebida;
        }

        lista.innerHTML = '';
        productos.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}, Stock: ${producto.stock}</span>
                <div class="actions">
                    <button class="update" data-id="${producto.id}" data-name="${producto.nombre}" data-price="${producto.precio}" data-stock="${producto.stock}">Editar</button>
                    <button class="delete" data-id="${producto.id}">Eliminar</button>
                </div>
            `;
            lista.appendChild(li);
        });

        // Volver a configurar eventos de editar después de listar productos
        setupEventosEditar();

        // Event listener para eliminar producto
        lista.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                eliminarProducto(id, endpoint);
            });
        });
    }

    // Listar productos de Pizza al cargar la página por primera vez
    listarProd('Pizza');
});


