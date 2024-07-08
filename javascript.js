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



//-----------------------------------------------------------------------


document.addEventListener('DOMContentLoaded',()=>{
    const mostrarCrearProdPizzaFormBtn = document.getElementById('mostrarCrearProdPizzaFormBtn');
    const crearPizzaForm = document.getElementById('crearPizzaForm'); 
    const editarPizzaForm = document.getElementById('editarPizzaForm');
    const listarProdPizzaBtn = document.getElementById('listarProdPizza');
    const listaPizza = document.getElementById('listapizza');

    init(); // Llamar a la función init después de asegurarte de que el DOM esté cargado completamente

    function init() {
        const myForm = document.getElementById("myForm");
        if (myForm) {
            myForm.addEventListener("submit", validateForm);
        }
    }

    mostrarCrearProdPizzaFormBtn.addEventListener('click',()=> {
        crearPizzaForm.classList.toggle('hidden');
    });

    crearPizzaForm.addEventListener('submit', async (e) =>
    {  
        e.preventDefault();
        const formData = new FormData(crearPizzaForm);
        const data = 
        {
            nombrePizza: formData.get('pizza-name'),
            precioPizza : formData.get('pizza-price'),
            stock: formData.get('pizza-stock')
            // estado : formData.get('estado')
        }

        const response = await fetch ('/redirect',
        {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert("Producto creado con Exito");

        crearPizzaForm.reset();
        crearPizzaForm.classList.add('hidden');
        listarProdPizzas();

    });

    //editar Pizza
    editarPizzaForm.addEventListener('submit', async(e) => 
    {
        e.preventDefault();
        const formData = new FormData(editarPizzaForm);
        const id = formData.get('editPizzaID');
        const data = 
        {
            nombrePizza: formData.get('editPizza-name'),
            precioPizza : formData.get('editPizza-price'),
            stock: formData.get('editPizza-stock')
            // estado : formData.get('estado')
        }

        const response = await fetch(`/redirect/${id}`,
        {
            method: 'PUT',
            headers: 
            {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        editarPizzaForm.reset();
        editarPizzaForm.classList.add('hidden');
        listarProdPizzas();

    });


    //listar las pizzas
    listarProdPizzaBtn.addEventListener('click', listarProdPizzas);
    async function listarProdPizzas(){
        const response = await fetch('/redirect');
        const pizza = await response.json();

        listaPizza.innerHTML = '';

        pizza.forEach(pizzas => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span> ID: ${pizzas.id}, Nombre: ${pizzas.nombre}, Precio: ${pizzas.precio}, Stock: ${pizzas.stock} </span>
                <div class="actions">
                    <button class="update" data-idPizza="${pizzas.id}" data-nombrePizza="${pizzas.nombre}" data-precioPizza="${pizzas.precio}" data-stockPizza="${pizzas.precio}"> Actualizar </button>
                    
                    <button class="delete" data-idPizza="${pizzas.id}"> Eliminar </button>
                </div>
            `;
            listaPizza.appendChild(li);
        });

        document.querySelectorAll('.update').forEach(button => 
            {
                button.addEventListener('click',(e) => 
                {
                    const idPizza = e.target.getAttribute('data-idPizza');                    
                    const nombrePizza = e.target.getAttribute('data-nombrePizza');                    
                    const precioPizza = e.target.getAttribute('data-precioPizza');                    
                    const stockPizza = e.target.getAttribute('data-stockPizza');

                    document.getElementById('editPizzaID').value = idPizza;
                    document.getElementById('editPizza-name').value = nombrePizza;
                    document.getElementById('editPizza-price').value = precioPizza;
                    document.getElementById('editPizza-stock').value = stockPizza;

                    editarPizzaForm.classList.remove('hidden');
                });
            });

            document.querySelectorAll('.delete').forEach(button => 
                {
                    button.addEventListener('click', async(e)=>
                    {
                        const id = e.target.getAttribute('data-idPizza');
                        const response = await fetch(`/redirect/${id}`,{
                            method: 'DELETE'
                        });

                        const result = await response.json();
                        alert(result.message);
                        listarProdPizzas();
                    });

                });
    };

});
// -------------------------------- Fin Cargar Productos() -------