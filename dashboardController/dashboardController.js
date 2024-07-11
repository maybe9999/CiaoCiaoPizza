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
const crearProducto = (req,res)=>{
    const {tabla, nombre, precio, stock} = req.body;
    console.log(req.body);
    const estado = 1; // Estado activo por defecto

    const sql = `INSERT INTO ${tabla} (nombre, precio, stock, estado) VALUES (?, ?, ?, ?)`;
    db.query(sql, [ nombre, precio, stock, estado], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la tabla Pizza:', err);
            res.status(500).send('Error al insertar datos');
        } else {
            console.log("todo correcto en dashboard controller");
            res.json({message: 'Datos insertados correctamente en Pizza'});
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


// ----- BORRAR - ELIMINAR PRODUCTO ----- //
const BorrarProducto = (req, res)=>{
    const {tabla, idProducto} = req.body;
    const sql = `DELETE FROM ${tabla} WHERE id = ?`;
    db.query(sql,[idProducto],(err,result)=>{
        if(err) throw err;

        res.json(
            {
                message : 'Producto eliminado'
            });
    });
};


module.exports = {
    validaLogueoUsuario, crearProducto, BorrarProducto,
    //Pizza
    ObtenerTablaPizza, ObtenerPizzaID, actualizarPizza,
    //Menu
    ObtenerTablaMenu, ObtenerMenuID, actualizarMenu,
    //Bebida
    ObtenerTablaBebida, ObtenerBebidaID, actualizarBebida
};


