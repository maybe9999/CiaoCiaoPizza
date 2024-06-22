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