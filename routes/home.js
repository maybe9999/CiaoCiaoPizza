const path = require('path');

function mostrarHomePage(req, res) {
    // Resuelve la ruta absoluta hacia tu archivo index.html
    const indexPath = path.resolve(__dirname, '../public/index.html');
    
    console.log("1 Impresión en home");
    // Envía el archivo index.html como respuesta
    res.sendFile(indexPath);
}

module.exports = mostrarHomePage;