const path = require('path');

// Resuelve la ruta absoluta hacia los archivos index de las diferentes secciones
const routesPublic = {
    home : path.resolve(__dirname, '../public/index.html'),
    nosotros : path.resolve(__dirname, '../public/nosotros/nosotros.html'),
    productos : path.resolve(__dirname, '../public/productos/productos.html'),
    nuestraCarta : path.resolve(__dirname, '../public/carta/carta.html'),
    contacto : path.resolve(__dirname, '../public/contacto/contacto.html'),
    login : path.resolve(__dirname, '../public/index.html'),
    dashboard : path.resolve(__dirname, '../public/index.html')
};

function mostrarSeccion(req, res, seccion) {
    console.log(`1 impresión en ${seccion}`);
    console.log(`Este es el archivo redirect.js`);

    // Envía el archivo index.html como respuesta
    res.sendFile(routesPublic[seccion]);
}

module.exports = mostrarSeccion;