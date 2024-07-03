const baseDeDatos = require("../data_base/db");



// Obtener los productos dependiendo el botón que se haya seleccionado. -edit: alexis-
function obtenerTodosLosProductos(tabla) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM '${tabla}'`;
        baseDeDatos.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function validaLogueoUsuario(user, pass) {
    return new Promise((resolve, reject) => {
        console.log("el user se esta logeando")
        let sql = `SELECT * FROM Usuario WHERE username = '${user}' AND passwor = '${pass}'`;
        baseDeDatos.query(sql, (err, result) => {
            console.log("result")
            if (err) {
                console.log("11111111");
                reject({ tipo: 'error', mensaje: 'Error en la consulta a la base de datos', error: err });
            } else if (result.length > 0) {
                resolve({ tipo: 'exito', datos: result });
            } else {
                console.log("2222222");
                reject({ tipo: 'credencialesIncorrectas', error: err});
            }
        });
    })
}



/**
 * Crea un nuevo producto en la tabla especificada
 * "tabla" - Nombre de la tabla de la base de datos
 * "producto" - Objeto que contiene los datos del producto a crear
 * "Promise" - Una promesa que se resuelve con el resultado de la operación
 */
function crearProducto(tabla, producto){
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO '${tabla}' set ${producto}`; //set recibe un objeto con el nombre de el valor a insertar y el valor en si 
        baseDeDatos.query(sql, (err, result) =>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}


function eliminarProducto(tabla, id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM '${tabla}' WHERE id = ?`;
        baseDeDatos.query(sql, id, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function editarProducto(tabla, id, nuevoProducto) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE ${tabla} SET ? WHERE id = ?`;
        baseDeDatos.query(sql, [nuevoProducto, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}



function obtenerProductoPorID(tabla, id){
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM '${tabla}' WHERE id = '${id}'`;
        baseDeDatos.query(sql, (err, result) =>{
            if(err){
                reject(err);
            }else{
                resolve(result[0]);
            }
        });
    });
}


module.exports = {
    obtenerTodosLosProductos: obtenerTodosLosProductos,
    validaLogueoUsuario: validaLogueoUsuario,
    crearProducto: crearProducto,
    eliminarProducto: eliminarProducto,
    editarProducto: editarProducto,
    obtenerProductoPorID: obtenerProductoPorID
};
