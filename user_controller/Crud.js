const baseDeDatos = require("../data_base/db");


/**
 * Obtiene todos los productos de la tabla especificada
 * "Promise" - Una promesa que se resuelve con los productos obtenidos
 */
function obtenerTodosLosProductos(){
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM Pizza, OtroMenu, Bebida`;
        baseDeDatos.query(sql, (err, result) =>{
            if(err){
                reject(err);
            }else{
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
        let sql = `INSERT INTO ${tabla} SET ?`; //set recibe un objeto con el nombre de el valor a insertar y el valor en si 
        baseDeDatos.query(sql, producto, (err, result) =>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}

/**
 * Elimina un producto de la tabla especificada
 * "tabla" - Nombre de la tabla de la base de datos
 * "id" - ID del producto a eliminar
 * "Promise"  - Una promesa que se resuelve con el resultado de la operación
 */
function eliminarProducto(tabla, id){
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM ${tabla} WHERE pizzaID = ${id}`;
        baseDeDatos.query(sql, (err, result) =>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}

/**
 * Edita un producto en la tabla especificada
 * "tabla" - Nombre de la tabla de la base de datos
 * "id" - ID del producto a editar
 * "nuevoProducto" - Objeto que contiene los nuevos datos del producto
 * "Promise"  - Una promesa que se resuelve con el resultado de la operación
 */
function editarProducto(tabla, id, nuevoProducto){
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ${tabla} SET ? WHERE pizzaID = ${id}`;
        baseDeDatos.query(sql, nuevoProducto, (err, result) =>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}

/**
 * Obtiene un producto específico de la tabla especificada
 * "tabla" - Nombre de la tabla de la base de datos
 * "id" - ID del producto a obtener
 * "Promise"  - Una promesa que se resuelve con el resultado de la operación
 */
function obtenerProductoPorID(tabla, id){
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${tabla} WHERE pizzaID = ${id}`;
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
