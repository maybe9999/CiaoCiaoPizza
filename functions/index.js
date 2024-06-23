const express = require('express');  // Importamos el modulo express
const path = require('path');
const morgan = require('morgan');
const serverless = require('serverless-http');

const app = express();


//configuración
app.set("port", 5001)
app.use(morgan('dev')); //Muestra las consultas echas


const router = express.Router();
//Aca están las rutas de los archivos.html y se envian dichos archivos
const muestraSeccion = require('../routes/redirect'); 


//Middleware
app.use(express.json());


//Routes


router.get('/', (req, res) => muestraSeccion(req, res, "home"));
router.get('/nosotros', (req, res) => muestraSeccion(req, res, "nosotros"));
router.get('/productos', (req, res) => muestraSeccion(req, res, "productos"));
router.get('/nuestraCarta', (req, res) => muestraSeccion(req, res, "nuestraCarta"));
router.get('/contacto', (req, res) => muestraSeccion(req, res, "contacto"));
router.get('/login', (req, res) => muestraSeccion(req, res, "login"));
router.get('/dashboard', (req, res) => muestraSeccion(req, res, "dashboard")); //Esta ruta no se si deberia manejarse desde aca, creo que no


/*Si ninguna de las rutas coincide usara esta carpeta y por defecto devolverá el archivo 
index que encuentre. Tambien es necesario por que sino no carga los css. */
app.use(express.static(path.join(__dirname, 'public'))); //Configuramos para servir archivos estáticos desde esta carpeta...


//ESTO ES PARA CORRER EN NETLIFY:
app.use("/.netlify/functions/index", router);

const handler = serverless(app);

module.exports = handler; 

/* ESTO ES PARA CORRER SERVER EN LOCAL 
app.listen(app.get("port") , () => console.log(`Servidor ejecutándose en el puerto ${app.get("port")}`))
*/