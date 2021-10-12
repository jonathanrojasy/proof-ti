const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let matriz;
app.get('/', function(req, res) {
    respuesta = {
     error: false,
     codigo: 200,
     mensaje: 'Bienvenido'
    };
    res.send(respuesta);
   });
app.route('/resolver')
 .post(function (req, res) {
  if(!req.body.matriz) {
   respuesta = {
    error: true,
    codigo: 502,
    mensaje: 'Ingrese valores a la matriz'
   };
  } else {
    matriz = invertirMatriz(req.body.matriz);
    respuesta = {
     error: false,
     codigo: 200,
     mensaje: 'Matriz invertida',
     respuesta: matriz
    };
  }
  res.send(respuesta);
 })

 function invertirMatriz(texto){
    let matriz_invertida;
    matriz_invertida = texto;
    // convertir texto a matriz
    let tamMatrizCuadrada = -1;
    for(let i = 0; i < texto.length; i++) {
        if (cadena[i].toLowerCase() === "[") tamMatrizCuadrada++;
    }
    // invertir matriz

    return matriz_invertida;
 }

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
    respuesta = {
    error: true, 
    codigo: 404, 
    mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});
app.listen(process.env.PORT || 3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});