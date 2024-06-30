const express = require('express');  // Importamos el modulo express
const path = require('path'); //
const morgan = require('morgan'); //Info por consola sobre las peticiones entrantes
require("dotenv").config(); //Sirve para usar variables de entorno... No es necesario almacenarlo

const redirect = require('./routes/redirect'); //Contiene ubicación de los index y devuelve archivos

const app = express();


//Configuración y Middleware
app.set("port", 5001)//Se setae o guarda en una "variable", denominada por conveniencia port, el puerto...

//Este modulo con el valor "dev" se encarga de mostrar por consola: Petición(Get, post, etc), ruta solicitada (/nosotros), Codigo de respuesta(200, 404, etc), y tiempo que tomo la peticion...
app.use(morgan('dev')); 

app.use(express.json()); //

//----
app.use(express.urlencoded({ extended: false })); // Middleware para manejar URL-encoded
//----

//Si ninguna de las rutas coincide usara esta carpeta y por defecto devolverá el archivo index que encuentre
app.use(express.static(path.join(__dirname, 'public'))); //Configuramos para servir archivos estáticos desde esta carpeta...


//Routes (GET)
app.get('/', redirect.mostrarSeccion);// Esta linea no se ejecuta xq express.static la sirve automáticamente(no se puede contabilizar trafico asi como esta ahora desde dentro del sitio)
app.get('/nosotros', redirect.mostrarSeccion);
app.get('/productos', redirect.mostrarSeccion);
app.get('/nuestraCarta', redirect.mostrarSeccion);
app.get('/contacto', redirect.mostrarSeccion);
app.get('/dashboard', redirect.mostrarSeccion);
app.get('/*', (req, res) => {  //Captura todas las consultas no especificadas
    console.log("Atrapado en general")
    res.sendFile(path.resolve(__dirname, './public/not_found/index.html'))
});


// Ruta para manejar el login (POST)
app.post('/login', redirect.validaLogueoUsuario); //Ruta para manejar el login


//Update


//(Delete)





//Se le indica mediante .listen() que use el puerto X para escuchar o recibir peticiones, get post etc...
app.listen(app.get("port") , () => { 
    console.log(`Servidor ejecutándose en el puerto ${app.get("port")}`)
});