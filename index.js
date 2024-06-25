const express = require('express');  // Importamos el modulo express
const path = require('path'); //
const morgan = require('morgan'); //Info por consola sobre las peticiones entrantes
const muestraSeccion = require('./routes/redirect'); //Contiene ubicación de los index y devuelve archivos

const app = express();


//Configuración y Middleware
app.set("port", 5001)//Se setae o guarda en una "variable", denominada por conveniencia port, el puerto...

//Este modulo con el valor "dev" se encarga de mostrar por consola: Petición(Get, post, etc), ruta solicitada (/nosotros), Codigo de respuesta(200, 404, etc), y tiempo que tomo la peticion...
app.use(morgan('dev')); 

app.use(express.json()); // No puedo definir bien el uso. pero permite manejar json creo.


//Routes
app.get('/', muestraSeccion);
app.get('/nosotros', muestraSeccion);
app.get('/productos', muestraSeccion);
app.get('/nuestraCarta',  muestraSeccion);
app.get('/contacto', muestraSeccion);
app.get('/login', muestraSeccion);
app.get('/dashboard', muestraSeccion); //Esta ruta no se si debería manejarse desde aca, creo que no!!

//Si ninguna de las rutas coincide usara esta carpeta y por defecto devolverá el archivo index que encuentre
app.use(express.static(path.join(__dirname, 'public'))); //Configuramos para servir archivos estáticos desde esta carpeta...


//Se le indica mediante .listen() que use el puerto X para escuchar o recibir peticiones, get post etc...
app.listen(app.get("port") , () => { 
    console.log(`Servidor ejecutándose en el puerto ${app.get("port")}`)
});