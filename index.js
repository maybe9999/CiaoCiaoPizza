const express = require('express');  // Importamos el modulo express
const morgan = require('morgan'); //Info por consola sobre las peticiones entrantes
const path = require('path'); //Para obtener rutas de archivos
const redirectRoutes = require('./routes/redirect'); //Contiene ubicación de los index y devuelve archivos


const app = express();



//CONFIGURACIÓN Y MIDDLEWARE
app.set("port", 5001)//Se configura el puerto como port=5001
app.use(morgan('dev')); //Muestra las peticiones por consola
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Middleware para manejar URL-encoded
app.use(express.static(path.join(__dirname, 'public'))); //Sirve archivos estáticos



// Rutas para el dashboard y productos <--- el problema que se ve todo en json
app.use('/api/dashboard', redirectRoutes.router);



// Ruta para manejar el login (POST)
app.post('/login', redirectRoutes.validaLogueoUsuario);//Ruta para manejar el login

// Ruta para manejar el GET
app.get('/', redirectRoutes.mostrarSeccion);// Esta linea no se ejecuta xq express.static la sirve automáticamente(no se puede contabilizar trafico asi como esta ahora desde dentro del sitio)
app.get('/nosotros', redirectRoutes.mostrarSeccion);
app.get('/productos', redirectRoutes.mostrarSeccion);
app.get('/nuestraCarta', redirectRoutes.mostrarSeccion);
app.get('/contacto', redirectRoutes.mostrarSeccion);
app.get('/dashboard', redirectRoutes.mostrarSeccion)
app.get('/*', (req, res) => {  //Captura todas las consultas no especificadas
    console.log("Atrapado en general")
    res.sendFile(path.resolve(__dirname, './public/not_found/index.html'))
});



//Se le indica mediante .listen() que use el puerto X para escuchar o recibir peticiones, get post etc...
app.listen(app.get("port") , () => { 
    console.log(`Servidor ejecutándose en el puerto ${app.get("port")}`)
});