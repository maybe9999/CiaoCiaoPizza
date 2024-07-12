<h1>Ciao Ciao Pizza</h1>

## Descripcion

Este proyecto es una aplicacion web sobre CiaoCiaoPizza, una pizzeria ubicada en Entre Rios. 
Consiste en una pagina web que permite al usuario conocer un poco mas sobre la pizzeria, ver los productos, contactar con el local.
Cuenta con un Dashboard o panel administrativo que es exlusivo para que el administra la pizzeria acceda, mediante un metodo de autenticacion, y cree nuevos productos, 
obtenega un listado de todos los productos existentes, modifique productos y elimine productos.

## Tecnologias usadas

### Lenguajes:
* **Html**
* **Javascript**
* **Css**

### Entorno de ejecucion:
* **Node.js**

### Bibliotecas y módulos:
* **Express**: usado para crear el servidor web
* **Morgan**: usado para mostrar las peticiones en consola
* **Path**: usado para obtener rutas de los archivos
* **Mysql2**: usado para conectar a la base de datos

## Instalacion

Para instalar el proyecto debes seguir los siguientes pasos:

1. Descargar el proyecto desde github o clonelo mediante el siguiente comando:
```
git clone https://github.com/maybe9999/CiaoCiaoPizza.git
```
   
2. Ir al directorio raiz del proyecto
3. Ejecutar el comando `npm install` para instalar las dependencias

## Correr el proyecto

Para correr el proyecto debes seguir los siguientes pasos:

1. Ir al directorio del proyecto
2. Ejecutar el comando `node --watch index.js`

## Uso

Despues de correr el proyecto puedes acceder a la pagina web desde el navegador.

Para iniciar sesion puedes usar los siguientes datos:

* Usuario: admin
* Contrasena: admin

Despues de loguearte puedes crear productos, editar productos, obtener productos, realizar pedidos y de esta forma administrar el stock del negocio de forma eficiente.

## Puntos Generales:
* El proyecto **cuenta con una Base de Datos** desarrollada con MySql2 y esta cuenta con **mas de 4 tablas**.
* Entre las tablas hay **relaciones de 1 a muchos**.
* Mediante una **Api** echa con **JavaScript** usando **Express** y ejecutandolo en **Node** se puede realizar:
   * **Alta** de nuevos productos mediante **POST**.
   * **Modificaciones** de productos existentes mediante **PUT**.
   * **Consultas** de productos registrados mediante **GET**.
   * **Borrado** de productos con el metodo **DELETE**.
* El proyecto esta subido a **"[ciao-ciao-pizza.vercel.app](https://ciao-ciao-pizza.vercel.app/)"** donde se puede navegar facilmente en el sitio.
* El proyecto tiene un **metodo de autenticacion** donde se puede iniciar sesion dependiendo el nivel o rol del usuario.
* El **BackEnd** esta **integrado** con el **FrontEnd**.

