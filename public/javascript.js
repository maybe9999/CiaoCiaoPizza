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
        document.querySelector(".menu-desplegable").classList.toggle("open");
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
            result.json()
            if (result.success || result.tipo === 'exito' || result.success === true) {
                console.log("redirigiendo a dashboard");
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

/*
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
*/

//----------------------------------INICIO DASHBOARD-------------------------------------//

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
    async function enviarFormulario(formulario, endpoint, exitoMensaje) {
        const formData = new FormData(formulario);
        const data = {
            nombre: formData.get('name'),
            precio: formData.get('price'),
            stock: formData.get('stock')
        };

        const response = await fetch(`/api/dashboard/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(exitoMensaje);
        formulario.reset();
        formulario.classList.add('hidden');
        listarProd(endpoint);
    }

    // Enviar formulario de Pizza
    crearPizzaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        enviarFormulario(crearPizzaForm, 'Pizza', "Pizza creada con éxito");
        listarProd("Pizza");
    });

    // Enviar formulario de Menú
    crearMenuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        enviarFormulario(crearMenuForm, 'OtroMenu', "Menú creado con éxito");
        listarProd("OtroMenu");
    });

    // Enviar formulario de Bebida
    crearBebidaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        enviarFormulario(crearBebidaForm, 'Bebida', "Bebida creada con éxito");
        listarProd("Bebida");
    });

    // Función para editar producto
    async function editarProducto(formulario, id, endpoint, exitoMensaje) {
        const formData = new FormData(formulario);
        const data = {
            // tabla: endpoint,
            nombre: formData.get('editName'),
            precio: formData.get('editPrice'),
            stock: formData.get('editStock'),
            estado: '1' // Es necesario agregar en front para poder seleccionar estado
        };
        console.log("Datos enviados:", data);  // línea para depurar

        try {
            const response = await fetch(`/api/dashboard/${endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Error en respuesta:", errorResponse);  // línea para depurar
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

    // Esto habilita la edición al presionar "Editar" -----------------------------
    function setupEditarFormulario(formulario, {id, nombre, precio, stock}) {
        formulario.querySelector('#editID').value = id;
        formulario.querySelector('#editName').value = nombre;
        formulario.querySelector('#editPrice').value = precio;
        formulario.querySelector('#editStock').value = stock;
        formulario.classList.remove('hidden');
    }
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
}
// Esto habilita la edición al presionar "Editar" ----------------------------- fin
   
    // Event listener para eliminar producto
    async function eliminarProducto(id, endpoint) {
        try {
            const response = await fetch(`/api/dashboard/${endpoint}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            const result = await response.json();
            alert(result.message);
            listarProd(endpoint);
        } catch (error) {
            console.error('Error:', error.message);
            alert('Hubo un problema al eliminar el producto');
        }
    }
// Event listeners para botones de eliminar ---------------------
      function setupEventosEliminar(endpoint) {
        listaPizza.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const nombre = button.getAttribute('data-name');
                if (confirm(`¿Estás seguro que deseas eliminar ${nombre}?`)) {
                    eliminarProducto(id, 'Pizza');
                }
            });
        });

        listaMenu.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const nombre = button.getAttribute('data-name');
                if (confirm(`¿Estás seguro que deseas eliminar ${nombre}?`)) {
                    eliminarProducto(id, 'OtroMenu');
                }
            });
        });

        listaBebida.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const nombre = button.getAttribute('data-name');
                if (confirm(`¿Estás seguro que deseas eliminar ${nombre}?`)) {
                    eliminarProducto(id, 'Bebida');
                }
            });
        });
    }
// Event listeners para botones de eliminar --------------------- fin

// Event listeners para botones de listar ----------------------------
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
// Event listeners para botones de listar ---------------------------- fin

// Listar productos al cargar la página ----------------------
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
                    <button class="delete" data-id="${producto.id}" data-name="${producto.nombre}">Eliminar</button>
                </div>
            `;
            lista.appendChild(li);
        });

        // Volver a configurar eventos de editar después de listar productos
        setupEventosEditar();
        setupEventosEliminar(endpoint);
    }
// Listar productos al cargar la página ---------------------- fin


});


//----------------------------------FIN DASHBOARD------------------------------------//
