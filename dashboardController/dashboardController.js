const express = require('express');
const crud = require("../user_controller/Crud"); //Para hacer consultas a la bd


const router = express.Router();



//Obtener todos los productos
router.get("/", (req, res) => {
    
    crud.obtenerTodosLosProductos().then(productosRecibidos => {
        res.json(productosRecibidos); // Son 3 tablas diferentes
    }).catch(errorEnLaConsulta => {
        res.json(errorEnLaConsulta);
    }
    )
});

//Crear un producto
router.post("/", (req, res) => {
    let {productoCrearTabla, productoCrearProducto} = req.body; //productoCrearProducto debería ser un objeto con (nombrePizza, precioPizza, stock) y sus respectivos valores

    crud.crearProducto(productoCrearTabla, productoCrearProducto).then(productosRecibidos => { // Si todo sale Bien
        res.json(productosRecibidos);
    }).catch(errorEnLaConsulta => { // Si todo sale Mal
        res.json(errorEnLaConsulta);
    }

    )
});

//Eliminar un producto
router.delete("/:tabla/:id", (req, res)=>{
    let eliminarProductoTabla = req.params.tabla;
    let eliminarProductoId = req.params.id;

    crud.eliminarProducto(eliminarProductoTabla, eliminarProductoId).then(exito => {
        res.json({ success: true, message: 'Eliminado con exito' });
    }).catch(error => {
        //Ver esto dsps...
        res.json({ success: false, message: error });
    })
})