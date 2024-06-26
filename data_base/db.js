const mySqlDB = require("mysql2"); //Se importa el modulo para conectarse a la Base de Datos

//Se hace la conexión a la Base de Datos... (se logea)
const session = mySqlDB.createConnection({
    host : process.env.hostDataBase,
    user : process.env.userDataBase,
    password : process.env.passwordDataBase,
    database : process.env.nameDataBase,
    port: process.env.portDataBase,
    });


//se llama al método connect y mediante una función anónima verificamos si la conexión se realizo correctamente
session.connect((err) => {
    if (err) {
        console.log("ERROR!!!, No se pudo conectar a la Base de Datos.\n Error:", err);
    }else{
        console.log("Conectado con éxito a la base de datos");
    }
});

module.exports = session;