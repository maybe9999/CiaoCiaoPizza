const path = require('path');

function mostrarNosotrosPage(req, res) {
    // Resuelve la ruta absoluta hacia tu archivo index.html
    const indexPath = path.resolve(__dirname, '../public/nosotros/nosotros.html');
    
    console.log("1 impresión en nosotros");
    // Envía el archivo index.html como respuesta
    res.sendFile(indexPath);
}

module.exports = mostrarNosotrosPage;