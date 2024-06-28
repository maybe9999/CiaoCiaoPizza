const path = require('path');
const crud = require("../user_controller/Crud"); //Para hacer consultas a la bd


// Resuelve la ruta absoluta hacia los archivos index de las diferentes secciones
const routesPublic = {
    "" : path.resolve(__dirname, '../public/index.html'), //home
    nosotros : path.resolve(__dirname, '../public/nosotros/nosotros.html'),
    productos : path.resolve(__dirname, '../public/productos/productos.html'),
    nuestraCarta : path.resolve(__dirname, '../public/carta/carta.html'),
    contacto : path.resolve(__dirname, '../public/contacto/contacto.html'),
    dashboard : path.resolve(__dirname, '../public/dashboard/dashboard.html'),
    notFound : path.resolve(__dirname, '../public/not_found/index.html')

};


//Devuelve el archivo index.html de la sección correspondiente en base a la solicitud.
function mostrarSeccion(req, res) {
    //Obtiene mediante "req.path" el nombre del path o sección solicitada en la consulta(nosotros, productos, etc.), 
    //mediante .replace() se remplazan todos los / de la string usando una "expresión regular" como primer argumento y en el segundo definimos que debe estar vacio "".
    let endPointActual = req.path.replace(/(\/)/gm,""); 

    console.log(`1 impresión en ${endPointActual}`);

    // Envía el archivo index.html como respuesta
    res.sendFile(routesPublic[endPointActual] || routesPublic["notFound"]); //Modificado para el Login
}

module.exports = mostrarSeccion;


