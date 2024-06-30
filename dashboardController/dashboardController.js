const express = require('express');
const crud = require("../user_controller/Crud"); //Para hacer consultas a la bd


const router = express.Router();



//Obtener todos los productos
router.get("/", (req, res) => {
    
    crud.obtenerTodosLosProductos().then(productosRecibidos => {
        console.log("exito al obtener todos los productos", productosRecibidos);
        res.json(productosRecibidos); // Son 3 tablas diferentes
    }).catch(errorEnLaConsulta => {
        console.log("error al obtener todos los productos", errorEnLaConsulta);
        res.json(errorEnLaConsulta);
    }
    )
});

//Crear un producto
router.post("/:tabla", (req, res) => {
    let productoCrearTabla = req.body.tabla; //productoCrearProducto debería ser un objeto con (nombrePizza, precioPizza, stock) y sus respectivos valores
    let {productoCrearProducto} = req.body;

    crud.crearProducto(productoCrearTabla, productoCrearProducto).then(productosCreado => { // Si todo sale Bien
        console.log("exito al crear el producto", productosCreado);
        res.json(productosCreado);
    }).catch(errorEnLaConsulta => { // Si todo sale Mal
        console.log("error al crear el producto", errorEnLaConsulta);
        res.json(errorEnLaConsulta);
    }

    )
});

//Eliminar un producto
router.delete("/:tabla/:id", (req, res)=>{
    let eliminarProductoTabla = req.params.tabla;
    let eliminarProductoId = req.params.id;

    crud.eliminarProducto(eliminarProductoTabla, eliminarProductoId).then(exito => {
        console.log("exito al eliminar el producto", exito);
        res.json({ success: true, message: 'Eliminado con exito' });
    }).catch(error => {
        //Ver esto dsps...
        console.log("error al eliminar el producto", error);
        res.json({ success: false, message: error });
    })
})

//Editar un producto
router.put("/:tabla/:id/:producto", (req, res)=>{
    let editarProductoTabla = req.params.tabla;
    let editarProductoId = req.params.id;
    
    let productoEdit = req.params.producto; //esto deberia ser un objeto el key del objeto debe ser igual que en la bd creo

    crud.editarProducto(editarProductoTabla, editarProductoId, productoEdit).then(exito =>{
        res.json({ success: true, message: 'Editado con exito' });
    }).catch(error => {
        res.json({ success: false, message: error });
    })

})



module.exports = router;