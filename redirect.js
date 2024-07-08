const express = require('express');
const router = express.Router(); // Crea un nuevo router de Express

const path = require('path');

const dashboardController = require("../dashboardController/dashboardController"); //Para hacer consultas a la bd

// Dir para utilizar funciones de pizza
router.get('/', dashboardController.ObtenerTablaPizza);
router.get('/:id', dashboardController.ObtenerPizzaID);
router.post('/', dashboardController.crearProductoPizza);
router.put('/:id', dashboardController.actualizarPizza);
router.delete('/:id', dashboardController.BorrarPizza);

// Resuelve la ruta absoluta hacia los archivos index de las diferentes secciones
const routesPublic = {
    "" : path.resolve(__dirname, '../public/index.html'), //home
    dashboard : path.resolve(__dirname, '../dashboard/dashboard.html'),
    nosotros : path.resolve(__dirname, '../public/nosotros/nosotros.html'),
    productos : path.resolve(__dirname, '../public/productos/productos.html'),
    nuestraCarta : path.resolve(__dirname, '../public/carta/carta.html'),
    contacto : path.resolve(__dirname, '../public/contacto/contacto.html'),
    notFound : path.resolve(__dirname, '../public/not_found/index.html')

};

var adminLogeado = false; //Esto se deberia manejar con JWT


//Devuelve el archivo index.html de la sección correspondiente en base a la solicitud.
function mostrarSeccion(req, res) {
    //Obtiene mediante "req.path" el nombre del path o sección solicitada en la consulta(nosotros, productos, etc.), 
    //mediante .replace() se remplazan todos los / de la string usando una "expresión regular" como primer argumento y en el segundo definimos que debe estar vacio "".
    let endPointActual = req.path.replace(/(\/)/gm,""); 

    console.log(`1 impresión en ${endPointActual}`);
    console.log(endPointActual === "dashboard")

    if (endPointActual === 'dashboard'){
        console.log("por 1",adminLogeado);
        if(adminLogeado){
            res.sendFile(path.resolve(__dirname, '../dashboard/dashboard.html'));
        }else{
            console.error("Debe estar logeado para acceder!!")
            res.redirect('/');
        }
    } else{
        adminLogeado = false;
        console.log("por 2",adminLogeado);
        // Envía el archivo index.html como respuesta
        res.sendFile(routesPublic[endPointActual] || routesPublic[""]); //Modificado para el Login
    }
    
}

function dashboardRoutes(req,res){

    //const endPointActual = req.path.replace(/(\/)/gm,""); //se obtiene solo la ruta sin /

    console.log(`111 impresión en ${req.path.replace(/(\/)/gm,"")}`);
    
    if(adminLogeado){
        res.sendFile(path.resolve(__dirname, '../dashboard/dashboard.html'));
    }else{
        console.error("Debe estar logeado para acceder!!");
        res.redirect("/notFound");
    }
}

//Login
function validaLogueoUsuario(req, res){
    let { username, password } = req.body;

    console.log("datos de user",username, password);

    if (adminLogeado) console.log("El usuario ya estaba logeado.")
    let validacion = adminLogeado ? new Promise(resolve => resolve({ tipo: 'exito' })) : dashboardController.validaLogueoUsuario(username, password);

    validacion.then(resultado => { //Si se ejecuta el resolve entonces .then captara la respuesta...
        console.log(".then atrapaddo")
        if (resultado.tipo === 'exito'){
            adminLogeado = true; // Sesion abierta
            res.json({ success: true });
        }
    }).catch(manejoError => { //Si se ejecuta el reject entonces .catch captara la respuesta y no .then...
        console.log(".catch atrapado....",manejoError,"\n", manejoError.tipo);
        if (manejoError.tipo === 'error'){
            console.error('Error ejecutando la consulta:', manejoError.error);
            res.status(500).json({ success: false, message: 'Error en el servidor' });
        } else if (manejoError.tipo === 'credencialesIncorrectas'){
            console.error('Error logueandose:', manejoError.error);
            resultado = false; //sesion cerrada
            res.status(200).json({ success: false, message: 'Credenciales incorrectas' });
        } else {
            console.error('Error X:');
            res.json({ success: false, message: 'Error en el servidor!' });
        }  
    });
}



module.exports = {
    router,
    mostrarSeccion,
    validaLogueoUsuario,
    dashboardRoutes
};


