const express = require('express');
const crud = require("../user_controller/Crud"); //Para hacer consultas a la bd

const router = express.Router();


console.log("dashboard controller");
//Obtener todos los productos
// router.get("/", (req, res) => {
//     const tabla = req.params.tabla;

//     crud.obtenerTodosLosProductos(tabla).then(productosRecibidos => {
//         res.json(productosRecibidos);
//     }).catch(errorEnLaConsulta => {
//         res.json(errorEnLaConsulta);
//     });
// });



//OBTENER los productos test -alexis-
// Se agregó ":tabla", y el const que le sigue para obtener los valores.
router.get("/:tabla", (req, res) => {
    console.log("Obteniendo todos los productos");
    const tabla = req.params.tabla;

    crud.obtenerTodosLosProductos(tabla).then(productosRecibidos => {
        res.json(productosRecibidos);
    }).catch(errorEnLaConsulta => {
        res.json(errorEnLaConsulta);
    });
});


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


//CREAR producto v:2 testeando para dashboard -alexis-
router.post("/", (req, res) => {
    console.log("Creando un producto...")
    const {producto, nombreProducto, precioProducto, stockProducto} = req.body;
    crud.crearProducto(producto, {nombreProducto, precioProducto, stockProducto}).then(resultado => {
        res.json({ success: true, message: 'Producto creado exitosamente', producto: resultado });
    }).catch(error => {
        res.json({ success: false, message: error });
    });
});




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


// ELIMINAR producto testeo dash -alexis-
router.delete("/:tabla/:id", (req, res) => {
    console.log("eliminando productos");
    const tabla = req.params.tabla;
    const id = req.params.id;

    crud.eliminarProducto(tabla, id).then(resultado => {
        res.json({ success: true, message: 'Producto eliminado exitosamente' });
    }).catch(error => {
        res.json({ success: false, message: error });
    });
});




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

// ACTUALIZAR un producto - test dashboard -alexis-
router.put("/:tabla/:id", (req, res) => {
    console.log("actualizar productos");
    const tabla = req.params.tabla;
    const id = req.params.id;
    const productoActualizar = req.body;

    crud.actualizarProducto(tabla, id, productoActualizar).then(resultado => {
        res.json({ success: true, message: 'Producto actualizado exitosamente', producto: resultado });
    }).catch(error => {
        res.json({ success: false, message: error });
    });
});


module.exports = router;