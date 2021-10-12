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
    //acotar
    let texto_matriz_acotada = texto.substring(1,(texto.length - 1));
    // crear variables de análisis
    let arregloMatriz = [];
    let arregloFila = [];
    let auxValor = 0;
    let dentroFila = false;
    // guardar tamaño matriz
    let tamMatrizCuadrada = 0;
    // convertir texto a matriz
    for(let i = 0; i < texto_matriz_acotada.length; i++) {
        if (texto_matriz_acotada[i] === "["){
            // inicia el ingreso de una fila y un valor, se incrementa el tam de la matriz en 1
            tamMatrizCuadrada++;
            dentroFila = true;
        }else if (texto_matriz_acotada[i] === "," ){
            // termina el ingreso de un valor y sigue otro
            if(dentroFila){
               arregloFila.push(auxValor); 
            }
            auxValor = 0;
        }else if (texto_matriz_acotada[i] === "]"){
            // termina el ingreso de una fila
            arregloFila.push(auxValor);
            auxValor = 0;
            arregloMatriz.push(arregloFila);
            arregloFila = [];
            dentroFila = false;
        }else if(texto_matriz_acotada[i] >= "0" && texto_matriz_acotada[i] <= "9"){
            // es un valor numérico
            auxValor = auxValor * 10 + parseInt(texto_matriz_acotada[i]);
        }else{
            // omitir en caso no sea un número
            continue;
        }
    }
        
    // invertir matriz
    let matrizInvertida = [];
    arregloFila = [];

    for (let i = 1; i <= tamMatrizCuadrada; i++) {
        let auxArray;
        for (let j = 1; j <= tamMatrizCuadrada; j++) {
            auxArray =  arregloMatriz[j-1];
            arregloFila.push(auxArray[tamMatrizCuadrada-i]);
        }
        matrizInvertida.push(arregloFila);
        arregloFila = [];
    }
    let textoMatrizInvertida = matrizInvertida.toString();

    return matrizInvertida;
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