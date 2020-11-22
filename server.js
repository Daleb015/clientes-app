/* dentro de la carpeta dist
npm init
npm install express --save
en el archivo package.json en el punto de entrada cambiar a server.js
agregar este archivo js
*/

let express = require('express');
let path = require('path');
let app = express();
let port = 8089;

app.use(express.static('clientes-app'));

app.get('*',(req, res, next) => {
  res.sendFile(path.resolve('clientes-app/index.html'))
});

app.listen(port, () => {
  console.log('el servidor express se ha iniciando en el puerto '+port)
})
