const express = require('express');  // Importamos el modulo express
const path = require('path');
const morgan = require('morgan');
const app = express();


//configuración
app.set("port", 5001)
app.use(morgan('dev'));
const muestraSeccion = require('./routes/redirect');


//Middleware
app.use(express.json());

//Routes
app.get('/', muestraSeccion);
app.get('/nosotros', muestraSeccion);
app.get('/productos', muestraSeccion);
app.get('/nuestraCarta',  muestraSeccion);
app.get('/contacto', muestraSeccion);
app.get('/login', muestraSeccion);
app.get('/dashboard', muestraSeccion); //Esta ruta no se si debería manejarse desde aca, creo que no

//Si ninguna de las rutas coincide usara esta carpeta y por defecto devolverá el archivo index que encuentre
app.use(express.static(path.join(__dirname, 'public'))); //Configuramos para servir archivos estáticos desde esta carpeta...

app.listen(app.get("port") , () => {
    console.log(`Servidor ejecutándose en el puerto ${app.get("port")}`)
});