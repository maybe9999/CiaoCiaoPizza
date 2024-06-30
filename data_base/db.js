const mySqlDB = require("mysql2"); //Se importa el modulo para conectarse a la Base de Datos

//Se hace la conexión a la Base de Datos... (se logea)
const session = mySqlDB.createConnection({
    host : process.env.hostDataBase,
    user : process.env.userDataBase,
    password : process.env.passwordDataBase,
    database : process.env.nameDataBase,
    port: process.env.portDataBase,
    });


//se llama al método connect y mediante una función anónima verificamos si la conexión se realizo correctamente
session.connect((err) => {
    if (err) {
        console.log("ERROR!!!, No se pudo conectar a la Base de Datos.\n Error:", err);
    }else{
        console.log("Conectado con éxito a la base de datos");
    }
});


/*
CREATE TABLE Pizza (    
	pizzaID int AUTO_INCREMENT PRIMARY KEY,
    nombrePizza varchar(100) NOT NULL,
    precioPizza decimal(10,2) NOT NULL,
    stock int,
    estado int
);

CREATE TABLE OtroMenu (
	menuID int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombreMenu varchar(100) NOT NULL,
    precioMenu decimal(10,2) NOT NULL,
    stock int,
    estado int
);

CREATE TABLE Bebida (
    bebidaID int AUTO_INCREMENT PRIMARY KEY,
    nombreBebida varchar(100),
    precioBebida decimal(10,2),
    stock int,
    estado int
);

SELECT * FROM Bebida, Pizza;

show tables;

CREATE TABLE Cliente (
	clienteID int AUTO_INCREMENT PRIMARY KEY,
    nombreCliente varchar(100),
    direccion varchar(100),
    telefono varchar(100)
);

CREATE TABLE Pedido (
    pedidoID int AUTO_INCREMENT PRIMARY KEY,
    montoTotal decimal(10,2),
    fechaPedido datetime,
    clienteID int,
    FOREIGN KEY (clienteID) REFERENCES Cliente(clienteID)
);

CREATE TABLE DetallePedido (
    detalleID int AUTO_INCREMENT PRIMARY KEY,
    pedidoID int,
    pizzaID int,
    menuID int,
    bebidaID int,
    cantidad int,
    FOREIGN KEY (pedidoID) REFERENCES Pedido(pedidoID),
    FOREIGN KEY (pizzaID) REFERENCES Pizza(pizzaID),
    FOREIGN KEY (menuID) REFERENCES OtroMenu(menuID),
    FOREIGN KEY (bebidaID) REFERENCES Bebida(bebidaID)
);

SHOW TABLE STATUS;

select * from Pizza;




INSERT INTO Pizza (nombrePizza, precioPizza, stock, estado) VALUES
('Stella', 6000.00, 2, 1),
('Palmitos', 4500.00, 4, 1),
('Rucula', 5000.00, 0, 0),
('Fugazza', 5500.00, 1, 1),
('Izabella', 4800.00, 4, 1),
('Francesca', 5800.00, 3, 1),
('Emilia', 5200.00, 1, 1),
('Roquefort', 5700.00, 1, 1),
('Chiara', 4300.00, 0, 0),
('Bianca', 5900.00, 11, 1),
('Napolitana', 6000.00, 50, 1),
('Especial', 5600.00, 4, 1),
('Nicoletta', 4300.00, 0, 0),
('Gianina', 5100.00, 7, 1),
('Marggaritaha', 5400.00, 2, 1),
('Donatella', 5300.00, 1, 1);




INSERT INTO OtroMenu (nombreMenu, precioMenu, stock, estado) VALUES
('PAPAS CON CHEDDAR', 3000.00, 10, 1),
('PAPAS CIAO CIAO', 2500.00, 10, 1),
('PAPAS C/SALSA PICANTE', 2000.00, 10, 1),
('PATITAS DE POLLO', 1800.00, 10, 1),
('ENSALADA RÚCULA', 1500.00, 10, 1),
('CHEESECAKE', 3500.00, 10, 1),
('TIRAMISÚ', 3200.00, 10, 1);


INSERT INTO Bebida (nombreBebida, envase, precioBebida, stock, estado) VALUES
('Agua Mineral', 'Botella 500 mL', 1500.00, 20, 1),
('Jugo de Naranja Natural', 'Botella 500 mL', 1800.00, 10, 1),
('Mojito Clásico', 'Vaso', 2800.00, 12, 1),
('Café Americano', 'Taza', 1700.00, 15, 1),
('Agua Villavicencio', 'Botella 500 mL', 1200.00, 25, 1),
('Fanta', 'Lata 355 mL', 1800.00, 18, 1),
('Coca-Cola', 'Lata 355 mL', 2000.00, 15, 1),
('Manaos Cola', 'Lata 355 mL', 1600.00, 20, 1),
('Manaos Naranja', 'Lata 355 mL', 1600.00, 20, 1),
('Manaos Lima-limón', 'Lata 355 mL', 1600.00, 20, 1),
('Cerveza Artesanal IPA', 'Botella 500 mL', 3500.00, 8, 1),
('Cerveza Brahma', 'Lata 355 mL', 2500.00, 10, 1),
('Cerveza Quilmes', 'Lata 355 mL', 2400.00, 12, 1),
('Cerveza Corona', 'Botella 355 mL', 2800.00, 8, 1),
('Cerveza Heineken', 'Lata 355 mL', 2700.00, 10, 1),
('Cerveza Schneider', 'Lata 355 mL', 2300.00, 15, 1),
('Cerveza Stella Artois', 'Lata 355 mL', 2600.00, 12, 1),
('Vino Tinto Malbec', 'Botella 750 mL', 55000.00, 6, 1),
('Vino Tinto Cabernet Sauvignon', 'Botella 750 mL', 6000.00, 5, 1);

INSERT INTO Cliente (nombreCliente, direccion, telefono) VALUES
('Juan Pérez', 'Calle 123, Ciudad Principal', '+1234567890'),
('María Rodríguez', 'Av. Libertador 456, Pueblo Nuevo', '+0987654321'),
('Carlos García', 'Plaza Mayor 789, Villa Alta', '+1122334455'),
('Laura Martínez', 'Ruta 7 KM 10, Barrio Obrero', '+5544332211'),
('Pedro Sánchez', 'Av. Bolívar 321, Casco Viejo', '+6677889900'),
('Ana López', 'Calle 456, Colonia Jardín', '+9900112233'),
('Luis Fernández', 'Av. Central 789, Centro Histórico', '+2244668800');


 */



module.exports = session;