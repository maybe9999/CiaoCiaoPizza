const path = require('path');

function mostrarCartaPage(req, res) {
    // Resuelve la ruta absoluta hacia tu archivo index.html
    const indexPath = path.resolve(__dirname, '../public/carta/carta.html');
    
    console.log("1 Impresión en carta");
    // Envía el archivo index.html como respuesta
    res.sendFile(indexPath);
}

module.exports = mostrarCartaPage;