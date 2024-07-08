require("dotenv").config(); //Sirve para usar variables de entorno... No es necesario almacenarlo
const express = require('express');  // Importamos el modulo express
const path = require('path'); //Para obtener rutas de archivos
const morgan = require('morgan'); //Info por consola sobre las peticiones entrantes
// const dashboardController = require('./dashboardController/dashboardController'); // creado para obtener los http 
const redirectRoutes = require('./routes/redirect'); //Contiene ubicación de los index y devuelve archivos

const app = express();



//CONFIGURACIÓN Y MIDDLEWARE
app.set("port", 5001)//Se setae o guarda en una "variable", denominada por conveniencia port, el puerto...

//Este modulo con el valor "dev" se encarga de mostrar por consola: Petición(Get, post, etc), ruta solicitada (/nosotros), Codigo de respuesta(200, 404, etc), y tiempo que tomo la peticion...
app.use(morgan('dev')); 

app.use(express.json());

// Middleware para manejar URL-encoded
app.use(express.urlencoded({ extended: false })); 



// Rutas para el dashboard y productos <--- el problema que se ve todo en json
app.use('/dashboard', redirectRoutes.router);



// Ruta para manejar el login (POST)
app.post('/login', redirectRoutes.validaLogueoUsuario);//Ruta para manejar el login
app.get('/', redirectRoutes.mostrarSeccion);// Esta linea no se ejecuta xq express.static la sirve automáticamente(no se puede contabilizar trafico asi como esta ahora desde dentro del sitio)
app.get('/nosotros', redirectRoutes.mostrarSeccion);
app.get('/productos', redirectRoutes.mostrarSeccion);
app.get('/nuestraCarta', redirectRoutes.mostrarSeccion);
app.get('/contacto', redirectRoutes.mostrarSeccion);
app.get('/*', (req, res) => {  //Captura todas las consultas no especificadas
    console.log("Atrapado en general")
    res.sendFile(path.resolve(__dirname, './public/not_found/index.html'))
});

//Si ninguna de las rutas coincide usara esta carpeta y por defecto devolverá el archivo index que encuentre
app.use(express.static(path.join(__dirname, 'public'))); //Configuramos para servir archivos estáticos desde esta carpeta...

//Se le indica mediante .listen() que use el puerto X para escuchar o recibir peticiones, get post etc...
app.listen(app.get("port") , () => { 
    console.log(`Servidor ejecutándose en el puerto ${app.get("port")}`)
});