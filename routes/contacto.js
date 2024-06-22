const path = require('path');

function mostrarContactoPage(req, res) {
    // Resuelve la ruta absoluta hacia tu archivo index.html
    const indexPath = path.resolve(__dirname, '../public/contacto/contacto.html');
    
    console.log("1 Impresión en contacto");
    // Envía el archivo index.html como respuesta
    res.sendFile(indexPath);
}

module.exports = mostrarContactoPage;