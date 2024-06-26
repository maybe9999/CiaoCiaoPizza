const express = require('express');  // Importamos el modulo express
const path = require('path'); //
const morgan = require('morgan'); //Info por consola sobre las peticiones entrantes
require("dotenv").config(); //Sirve para usar variables de entorno... No es necesario almacenarlo

//--- creado para obtener el acceso mediante el login
const session = require('./data_base/db'); // Importamos la conexión a la base de datos
//---

const muestraSeccion = require('./routes/redirect'); //Contiene ubicación de los index y devuelve archivos

const app = express();


//Configuración y Middleware
app.set("port", 5001)//Se setae o guarda en una "variable", denominada por conveniencia port, el puerto...

//Este modulo con el valor "dev" se encarga de mostrar por consola: Petición(Get, post, etc), ruta solicitada (/nosotros), Codigo de respuesta(200, 404, etc), y tiempo que tomo la peticion...
app.use(morgan('dev')); 

app.use(express.json()); //

//----
app.use(express.urlencoded({ extended: false })); // Middleware para manejar URL-encoded
//----



//Routes
app.get('/', muestraSeccion);
app.get('/nosotros', muestraSeccion);
app.get('/productos', muestraSeccion);
app.get('/nuestraCarta',  muestraSeccion);
app.get('/contacto', muestraSeccion);


// Ruta para manejar el login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM Usuario WHERE username = ? AND password = ?';
    session.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            res.status(500).json({ success: false, message: 'Error en el servidor' });
            return;
        }
        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Credenciales incorrectas' });
        }
    });
});


//Si ninguna de las rutas coincide usara esta carpeta y por defecto devolverá el archivo index que encuentre
app.use(express.static(path.join(__dirname, 'public'))); //Configuramos para servir archivos estáticos desde esta carpeta...


//Se le indica mediante .listen() que use el puerto X para escuchar o recibir peticiones, get post etc...
app.listen(app.get("port") , () => { 
    console.log(`Servidor ejecutándose en el puerto ${app.get("port")}`)
});