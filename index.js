const express = require('express');  // Importamos el modulo express
const path = require('path');

const app = express();


//configuración
app.set("port", 5001)

const home = require('./routes/home');
const nosotros = require('./routes/nosotros');
const productos = require('./routes/productos');
const nuestraCarta = require('./routes/nuestraCarta');
const contacto = require('./routes/contacto');
const login = require('./routes/login');


//Middleware
app.use(express.json());
// Middleware para interceptar la solicitud a '/', y no dejar que express.static envie el index
app.use('/', (req, res, next) => {
    if (req.path === '/' && req.method === 'GET') {
        // Si la solicitud es GET a '/', llamamos directamente a la función home
        console.log("home capturado")
        home(req, res);
    } else {
        // Si no es GET a '/', pasamos al siguiente middleware (puede ser express.static)
        next();
    }
});
app.use(express.static(path.join(__dirname, 'public'))); //Configuramos para servir archivos estáticos desde esta carpeta...

//Routes
app.get('/', home); // Si en el navegador
app.get('/nosotros', nosotros);
app.get('/productos', productos);
app.get('/nuestraCarta', nuestraCarta);
app.get('/contacto', contacto);
app.get('/login', login);


app.listen(app.get("port") , () => {
    console.log(`Servidor ejecutándose en el puerto ${app.get("port")}`)
});