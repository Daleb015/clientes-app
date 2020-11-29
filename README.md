![Build Status](https://travis-ci.org/ExampleDriven/swagger-java-spring-example.svg)

# Clientes-App

Este es un proyecto de frontend en el framework de angular 10, que permite al usuario gestionar una base de clientes, con sus datos, agruparlos, crearlos, eliminarlos... además gestionar sus productos, facturas, regiones, fotos etc, la aplicación es una PWA que requiere un login de usuario, en este paso el backend de la aplicación genera un token con los roles del usuario, esto permite desde la página tener acceso a funcionalidades tanto en las API como visualmente.


# Tecnologías usadas

- Angular HttpclientModule (Http 2.0 reactivo)
- Angular Router 
- Angular Material (Paginador)
- Angular Forms, Reactive Forms (Binding DOM)
- Angular Material Animations
- Angular Material Autocomplete (Lista productos)
- Angular Material datepicker
- Bootstrap 4
- Angular Core Guards (Protección rutas)
- HttpInterceptors (Firma consumos API)

- Se construyeron los componentes por medio del Cli de angular, en base al patrón de componente/controlador del framework.
- La gestión de dependencias se realiza con node package manager.


## Despliegue

Dentro de la raiz del proyecto se dejan alojados los archivos necesarios para algunos de los posibles tipos de despliegue.

- Archivo .htaccess para reemplazar al desplegar en servidor Apache httpd.
- Archivo dockerfile para generar un contenedor con apache, copiar el archivo htaccess y el archivo htps.conf a fin de desplegar como microservicio.
- Archivo server.js para exponer por medio de node js y express.
- Para usarlo en local se `ng serve -o`


## Ubicación

La página está desplegada en Firebase hosting en : [clientes-app](https://clientes-app-daleb-015.web.app/clientes)

Inicialmente puede demorar la primera consulta ya que el backend es un microservicio en un free tier, por lo que al dejar de recibir peticiones el proveedor dispone de los recursos, sin embargo tras la primera petición responderá eficientemente

## Api Backend

- Los ejemplos de consumo de los endpoints se encuentran en el siguiente link de postman:
https://www.getpostman.com/collections/c5b383b8a6f864d0f2bd

Los servicios se consumen haciendo uso de un token jwt que se genera en el servicio de Generar token JWT,  las credenciales para un usuario tipo administrador son admin:12345 o tipo usuario daniel:12345, esto limita las funcionalidades que puede realizar en los endpoints, ya que estos están protegidas de manera granular por el framework de spring security, lo que limita lo que se puede hacer en el backend y lo que se puede ver en el frontend.

![enter image description here](https://i.ibb.co/3MbQ6Yb/modal.png)

![enter image description here](https://i.ibb.co/q1WWGnf/clientes.png)

![enter image description here](https://i.ibb.co/8s2gdMC/validaciones.png)![enter image description here](https://i.ibb.co/ZcBqKdY/autocomplete.png)![enter image description here](https://i.ibb.co/Jtqc2db/creada.png)

