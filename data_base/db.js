const mySqlDB = require("mysql2"); //Se importa el modulo para conectarse a la Base de Datos

//Se hace la conexión a la Base de Datos... (se logea)
const session = mySqlDB.createConnection({
    host : 'bsbg7biimj0ezhjbgpyv-mysql.services.clever-cloud.com',
    user : 'uxq982fe07ponu3i',
    password : '51iA8kk4HNj6LiescIRz',
    database : 'bsbg7biimj0ezhjbgpyv',
    port: 3306,
    });

//se llama al método connect y mediante una función anónima verificamos si la conexión se realizo correctamente
session.connect((err) => {
    if (err) console.log("ERROR!!!, No se pudo conectar a la Base de Datos.\n Error:", err);

    console.log("Conectado con éxito a la base de datos");
    });

module.exports = session;