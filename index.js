const express = require('express');  // Importamos el modulo express
const path = require('path');

const app = express();


//configuración
app.set("port", 5001)

const muestraSeccion = require('./routes/redirect');


//Middleware
app.use(express.json());

//Routes
app.get('/', (req, res) => muestraSeccion(req, res, "home"));
app.get('/nosotros', (req, res) => muestraSeccion(req, res, "nosotros"));
app.get('/productos', (req, res) => muestraSeccion(req, res, "productos"));
app.get('/nuestraCarta', (req, res) => muestraSeccion(req, res, "nuestraCarta"));
app.get('/contacto', (req, res) => muestraSeccion(req, res, "contacto"));
app.get('/login', (req, res) => muestraSeccion(req, res, "login"));
app.get('/dashboard', (req, res) => muestraSeccion(req, res, "dashboard")); //Esta ruta no se si deberia manejarse desde aca, creo que no

//Si ninguna de las rutas coincide usara esta carpeta y por defecto devolverá el archivo index que encuentre
app.use(express.static(path.join(__dirname, 'public'))); //Configuramos para servir archivos estáticos desde esta carpeta...

app.listen(app.get("port") , () => {
    console.log(`Servidor ejecutándose en el puerto ${app.get("port")}`)
});