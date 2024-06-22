const path = require('path');

function mostrarProductosPage(req, res) {
    // Resuelve la ruta absoluta hacia tu archivo index.html
    const indexPath = path.resolve(__dirname, '../public/productos/productos.html');
    
    console.log("1 Impresión en productos");
    // Envía el archivo index.html como respuesta
    res.sendFile(indexPath);
}

module.exports = mostrarProductosPage;