const path = require('path');
const crud = require("../user_controller/Crud"); //Para hacer consultas a la bd


// Resuelve la ruta absoluta hacia los archivos index de las diferentes secciones
const routesPublic = {
    "" : path.resolve(__dirname, '../public/index.html'), //home
    nosotros : path.resolve(__dirname, '../public/nosotros/nosotros.html'),
    productos : path.resolve(__dirname, '../public/productos/productos.html'),
    nuestraCarta : path.resolve(__dirname, '../public/carta/carta.html'),
    contacto : path.resolve(__dirname, '../public/contacto/contacto.html'),
    login : path.resolve(__dirname, '../public/login/index.html'),
    dashboard : path.resolve(__dirname, '../public/dashboard/index.html')
};

/*
//Optimized function to return the corresponding index.html file based on the requested section
function mostrarSeccion(req, res) {
    const endPointActual = req.path.substring(1);
    const publicPath = path.join(__dirname, '..', 'public');
    const indexPath = path.join(publicPath, 'index.html');

    let filePath = routesPublic[endPointActual] || indexPath;
    if (endPointActual === 'dashboard') {
        filePath = crud(req, res) || indexPath;
    }

    res.sendFile(filePath);
}
*/
function mostrarSeccion(req, res) {
    //Obtiene mediante "req.path" el nombre del path o sección solicitada en la consulta(nosotros, productos, etc.), 
    //mediante .replace() se remplazan todos los / de la string usando una "expresión regular" como primer argumento y en el segundo definimos que debe estar vacio "".
    let endPointActual = req.path.replace(/(\/)/gm,""); 


    console.log(`1 impresión en ${endPointActual}`);
    

    //Lógica de si no estas logeado como admin te mandamos al login.
    if (endPointActual == "dashboard"){ 
        //El que se de maña que lo que haga :) !!!!!!!
        crud(req, res);
    };

    // Envía el archivo index.html como respuesta
    res.sendFile(routesPublic[endPointActual]);
};


module.exports = mostrarSeccion;