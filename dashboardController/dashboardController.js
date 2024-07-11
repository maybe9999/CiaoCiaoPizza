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
    const {nombre, precio, stock} = req.body;
    const estado = 1; // Estado activo por defecto

    const sql = 'INSERT INTO Pizza (nombre, precio, stock, estado) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, precio, stock, estado], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la tabla Pizza:', err);
            res.status(500).send('Error al insertar datos');
        } else {
            res.send('Datos insertados correctamente en Pizza');
        }
    })
};

const crearProductoMenu = (req,res)=>{
    const {nombre, precio, stock} = req.body;
    const estado = 1; // Estado activo por defecto

    const sql = 'INSERT INTO OtroMenu (nombre, precio, stock, estado) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, precio, stock, estado], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la tabla OtroMenu:', err);
            res.status(500).send('Error al insertar datos');
        } else {
            res.send('Datos insertados correctamente en Menú');
        }
    })
};

const crearProductoBebida = (req,res)=>{
    const {nombre, precio, stock} = req.body;
    const estado = 1; // Estado activo por defecto

    const sql = 'INSERT INTO Bebida (nombre, precio, stock, estado) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, precio, stock, estado], (err, result) => {
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
    const {nombre, precio, stock, estado} = req.body;

    const sql = 'UPDATE Pizza SET nombre = ?, precio = ?, stock = ?, estado = ? WHERE id = ?';
    db.query(sql,[nombre, precio, stock, estado, id], (err,result)=>{
        if(err) throw err;

        res.json(
            {
                message : 'Pizza editada'
            });
    });
};

const actualizarMenu = (req, res)=>{
    const {id} = req.params;
    const {nombre, precio, stock, estado} = req.body;

    const sql = 'UPDATE OtroMenu SET nombre = ?, precio = ?, stock = ?, estado = ? WHERE id = ?';
    db.query(sql,[nombre, precio, stock, estado, id], (err,result)=>{
        if(err) throw err;

        res.json(
            {
                message : 'Menu editada'
            });
    });
};

const actualizarBebida = (req, res)=>{
    const {id} = req.params;
    const {nombre, precio, stock, estado} = req.body;

    const sql = 'UPDATE Bebida SET nombre = ?, precio = ?, stock = ?, estado = ? WHERE id = ?';
    db.query(sql,[nombre, precio, stock, estado, id], (err,result)=>{
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
                message : 'Producto eliminado'
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
                message : 'Producto eliminado'
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
                message : 'Producto eliminado'
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