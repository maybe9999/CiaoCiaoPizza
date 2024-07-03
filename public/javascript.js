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






// Botones Dashboard, Muestra / Oculta secciones
function toggleCampos(id) {
    const seccionSeleccionada = document.getElementById(id);
    if (seccionSeleccionada.style.display === 'block') {
        seccionSeleccionada.style.display = 'none';
    } else {
        seccionSeleccionada.style.display = 'block';
    }
}

// ---------------------------- Listado (GET), obtener productos.

function mostrarListadoCompleto(productoParaListar) {
    const listadoCompleto = document.getElementById('listado');
    listadoCompleto.style.display = listadoCompleto.style.display === 'block' ? 'none' : 'block';
    listarPizzas(productoParaListar);
}



// ------------------------------- Listar
//listarPizzasBtn.addEventListener('click', listarPizzas);

//OBTENER y MOSTRAR un producto en la pagina (hacia el back)
async function listarPizzas(productoParaListar)
{
    const response = await fetch('/dashboard/crud');
    const producto = await response.json();
    console.log("Listar producto: ",producto);
    listaPizzas.innerHTML='';//limpio la lista de pizzas

    producto.forEach(producto => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span> ID: ${producto.id}, Nombre: ${producto.nombreProducto}, Precio: ${producto.precioProducto}, Stock: ${producto.stockProducto} </span>
            <div class="actions"> 
                <button class="update" data-id="${producto.id}" data-nombre="${producto.nombreProducto}" data-precio="${producto.precioProducto}" data-stock="${producto.stockProducto}" > Actualizar  </button> 

                <button class="delete" data-id="${producto.id}"> Eliminar </button>

            </div>
        `;

        listaPizzas.appendChild(li);
    });
}

// Escribir que es lo que hace.....
document.querySelectorAll('.update').forEach(button => 
    {
        button.addEventListener('click',(e) => 
        {
            const id = e.target.getAttribute('data-id');                    
            const nombreProducto = e.target.getAttribute('data-nombre');                    
            const precioProducto = e.target.getAttribute('data-precio');                    
            const stockProducto = e.target.getAttribute('data-stock');

            document.getElementById('editID').value = id;
            document.getElementById('editNombre').value = nombreProducto;
            document.getElementById('editPrecio').value = precioProducto;
            document.getElementById('editStock').value = stockProducto;

            editarPizzasForm.classList.remove('hidden');
        });
    });

//BORRAR un producto (hacia el back)
document.querySelectorAll('.delete').forEach(button => 
    {
        button.addEventListener('click', async(e)=>
        {
            const id = e.target.getAttribute('data-id');

            const response = await fetch(`/dashboard/crud`,{
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(id)
            });

            const result = await response.json();
            alert(result.message);
            listarPizzas();
        });
    });


// -------------------------------- Inicio ______CARGAR (CREAR)____ Productos() -------

//CREAR un producto (hacia el back)...
var nombreProducto;
async function cargarProductos(Producto){
    nombreProducto = Producto;
    console.log("Producto a cargar: ", nombreProducto);
}
const crearProdForm = document.getElementById('crearProdForm');

crearProdForm.addEventListener('submit', async (e) =>
{  
    e.preventDefault();
    const formData = new FormData(crearProdForm);
    console.log(formData);
    prompt("");
    const data = {
        producto : nombreProducto,
        nombreProducto: formData.get('nombre'),
        precioProducto : formData.get('precio'),
        stockProducto: formData.get('stock')
    }

    const response = await fetch ('/crud/', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    alert("Producto cargado");

    crearProdForm.reset();
    crearProdForm.classList.add('hidden');
    listarProductos();
});



// -------------------------------- Fin Cargar Productos() -------