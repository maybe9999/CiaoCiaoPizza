const db = require('../data_base/db');

// ----- LOGIN ----- //
function validaLogueoUsuario(user, pass) {
    return new Promise((resolve, reject) => {
        console.log("el user se esta logeando")
        let sql = `SELECT * FROM Usuario WHERE username = '${user}' AND passwor = '${pass}'`;
        db.query(sql, (err, result) => {
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


// ----- OBTENER PRODUCTO ----- //
const ObtenerTablaPizza = (req,res, valor) =>{

    const sql = `SELECT * FROM ${valor}`;

    db.query(sql, (err,result)=>{
        if(err) throw err;

        res.json(result);
    });
}

const ObtenerTablaMenu = (req,res, valor) =>{

    const sql = `SELECT * FROM ${valor}`;

    db.query(sql, (err,result)=>{
        if(err) throw err;

        res.json(result);
    });
}

const ObtenerTablaBebida = (req,res, valor) =>{

    const sql = `SELECT * FROM ${valor}`;

    db.query(sql, (err,result)=>{
        if(err) throw err;

        res.json(result);
    });
}


// ----- OBTENER PIZZA POR ID -----
const ObtenerPizzaID = (req, res) =>{
    const {id} = req.params;
    const sql = 'SELECT * FROM Pizza WHERE id = ?';
    db.query(sql,[id], (err,result) =>{
        if(err) throw err;
        res.json(result);
    });
};

const ObtenerMenuID = (req, res) =>{
    const {id} = req.params;
    const sql = 'SELECT * FROM OtroMenu WHERE id = ?';
    db.query(sql,[id], (err,result) =>{
        if(err) throw err;
        res.json(result);
    });
};

const ObtenerBebidaID = (req, res) =>{
    const {id} = req.params;
    const sql = 'SELECT * FROM Bebida WHERE id = ?';
    db.query(sql,[id], (err,result) =>{
        if(err) throw err;
        res.json(result);
    });
};




// ----- INSERTAR - CREAR PIZZA ----- //
const crearProductoPizza = (req,res)=>{
    const {nombrePizza, precioPizza, stock} = req.body;
    const estado = 1; // Estado activo por defecto

    const sql = 'INSERT INTO Pizza (nombre, precio, stock, estado) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombrePizza, precioPizza, stock, estado], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la tabla Pizza:', err);
            res.status(500).send('Error al insertar datos');
        } else {
            res.send('Datos insertados correctamente en Pizza');
        }
    })
};

const crearProductoMenu = (req,res)=>{
    const {nombreMenu, precioMenu, stock} = req.body;
    const estado = 1; // Estado activo por defecto

    const sql = 'INSERT INTO OtroMenu (nombre, precio, stock, estado) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombreMenu, precioMenu, stock, estado], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la tabla OtroMenu:', err);
            res.status(500).send('Error al insertar datos');
        } else {
            res.send('Datos insertados correctamente en Menú');
        }
    })
};

const crearProductoBebida = (req,res)=>{
    const {nombreBebida, precioBebida, stock} = req.body;
    const estado = 1; // Estado activo por defecto

    const sql = 'INSERT INTO Bebida (nombre, precio, stock, estado) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombreBebida, precioBebida, stock, estado], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la tabla Bebida:', err);
            res.status(500).send('Error al insertar datos');
        } else {
            res.send('Datos insertados correctamente en Bebida');
        }
    })
};

// ----- EDITAR - ACTUALIIZAR PIZZA ----- //
const actualizarPizza = (req, res)=>{
    const {id} = req.params;
    const {nombrePizza, precioPizza, stock, estado} = req.body;

    const sql = 'UPDATE Pizza SET nombre = ?, precio = ?, stock = ?, estado = ?';
    db.query(sql,[nombrePizza, precioPizza, stock, estado], (err,result)=>{
        if(err) throw err;

        res.json(
            {
                message : 'Pizza editada'
            });
    });
};

const actualizarMenu = (req, res)=>{
    const {id} = req.params;
    const {nombreMenu, precioMenu, stock, estado} = req.body;

    const sql = 'UPDATE OtroMenu SET nombre = ?, precio = ?, stock = ?, estado = ?';
    db.query(sql,[nombreMenu, precioMenu, stock, estado], (err,result)=>{
        if(err) throw err;

        res.json(
            {
                message : 'Menu editada'
            });
    });
};

const actualizarBebida = (req, res)=>{
    const {id} = req.params;
    const {nombreBebida, precioBebida, stock, estado} = req.body;

    const sql = 'UPDATE Bebida SET nombre = ?, precio = ?, stock = ?, estado = ?';
    db.query(sql,[nombreBebida, precioBebida, stock, estado], (err,result)=>{
        if(err) throw err;

        res.json(
            {
                message : 'Bebida editada'
            });
    });
};


// ----- BORRAR - ELIMINAR PIZZA ----- //
const BorrarPizza = (req, res)=>{
    const {id} = req.params;
    const sql = 'DELETE FROM Pizza WHERE id = ?';
    db.query(sql,[id],(err,result)=>{
        if(err) throw err;

        res.json(
            {
                message : 'Producto eliminada'
            });
    });
};

const BorrarMenu = (req, res)=>{
    const {id} = req.params;
    const sql = 'DELETE FROM OtroMenu WHERE id = ?';
    db.query(sql,[id],(err,result)=>{
        if(err) throw err;

        res.json(
            {
                message : 'Producto eliminada'
            });
    });
};

const BorrarBebida = (req, res)=>{
    const {id} = req.params;
    const sql = 'DELETE FROM Bebida WHERE id = ?';
    db.query(sql,[id],(err,result)=>{
        if(err) throw err;

        res.json(
            {
                message : 'Producto eliminada'
            });
    });
};

module.exports = {
    validaLogueoUsuario,
    //Pizza
    ObtenerTablaPizza, ObtenerPizzaID, crearProductoPizza, actualizarPizza, BorrarPizza,
    //Menu
    ObtenerTablaMenu, ObtenerMenuID, crearProductoMenu, actualizarMenu, BorrarMenu,
    //Bebida
    ObtenerTablaBebida, ObtenerBebidaID, crearProductoBebida, actualizarBebida, BorrarBebida
};




//Obtener todos los productos
// router.get("/", (req, res) => {
//     const tabla = req.params.tabla;

//     crud.obtenerTodosLosProductos(tabla).then(productosRecibidos => {
//         res.json(productosRecibidos);
//     }).catch(errorEnLaConsulta => {
//         res.json(errorEnLaConsulta);
//     });
// });





//Crear un producto
// router.post("/:tabla", (req, res) => {
//     let productoCrearTabla = req.body.tabla; //productoCrearProducto debería ser un objeto con (nombrePizza, precioPizza, stock) y sus respectivos valores
//     let {productoCrearProducto} = req.body;

//     crud.crearProducto(productoCrearTabla, productoCrearProducto).then(productosRecibidos => { // Si todo sale Bien
//         res.json(productosRecibidos);
//     }).catch(errorEnLaConsulta => { // Si todo sale Mal
//         res.json(errorEnLaConsulta);
//     }

//     )
// });



// // Ruta para insertar datos en la tabla OtroMenu
// router.post('/menu', (req, res) => {
//     const { menuName, menuPrice, menuStock } = req.body;
//     const estado = 1; // Estado activo por defecto

//     const sql = 'INSERT INTO OtroMenu (nombreMenu, precioMenu, stock, estado) VALUES (?, ?, ?, ?)';
//     db.query(sql, [menuName, menuPrice, menuStock, estado], (err, result) => {
//         if (err) {
//             console.error('Error al insertar datos en la tabla OtroMenu:', err);
//             res.status(500).send('Error al insertar datos');
//         } else {
//             res.send('Datos insertados correctamente');
//         }
//     });
// });


//Eliminar un producto
// router.delete("/:tabla/:id", (req, res)=>{
//     let eliminarProductoTabla = req.params.tabla;
//     let eliminarProductoId = req.params.id;

//     crud.eliminarProducto(eliminarProductoTabla, eliminarProductoId).then(exito => {
//         res.json({ success: true, message: 'Eliminado con exito' });
//     }).catch(error => {
//         //Ver esto dsps...
//         res.json({ success: false, message: error });
//     })
// })







//Editar un producto
// router.put("/:tabla/:id/:producto", (req, res)=>{
//     let editarProductoTabla = req.params.tabla;
//     let editarProductoId = req.params.id;
    
//     let productoEdit = req.params.producto; //esto deberia ser un objeto el key del objeto debe ser igual que en la bd creo

//     crud.editarProducto(editarProductoTabla, editarProductoId, productoEdit).then(exito =>{
//         res.json({ success: true, message: 'Editado con exito' });
//     }).catch(error => {
//         res.json({ success: false, message: error });
//     })

// })




// module.exports = router;