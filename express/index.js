import express from "express";
import {sumar} from './services/funciones.service.js'; //importación de la función
import {resta} from './services/funciones.service.js';
import {multiplica} from './services/funciones.service.js';
import {divide} from './services/funciones.service.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Get");
});

app.post("/", (req, res) => {
    const { name, age, owner, color, personality } = req.body; //para imprimir directamente name, age, etc
    console.log(req.body);
    // console.log(req.body) //para llegar a name
    res.send(`El nombre del gato es ${name}, tiene ${age}, su dueño es ${owner}, su color es ${color} y es ${personality}`);
  });
  // repliquen el ejercicio de sumar restar multiplicar y dividir con las API’s, en cada api debe tener la ruta referente a la operación matematica, es decir “/sumar”, “/restar”, etc
  // estas apis deben recibir 2 parámetros (recuerden que estos parámetros los enviamos en formato json desde el body en la opción de raw) y deben devolver la respuesta
  // usen el metodo post
app.post("/sumar", (req, res)=>{
    const {numero1, numero2} = req.body;
    console.log(req.body);
    let suma = numero1 + numero2;
    res.send("el resultado de la suma de 6 + 2 es: " + suma);
    
})
app.post("/restar", (req, res)=>{
    const {numero1, numero2} = req.body;
    console.log(req.body);
    let resta = numero1 - numero2;
    res.send("el resultado de la resta 6 - 2 es: " + resta);
    
})
app.post("/multiplicar", (req, res)=>{
    const {numero1, numero2} = req.body;
    console.log(req.body);
    let multi = numero1 * numero2;
    res.send("el resultado de la multiplicación 6 * 2 es: " + multi);
    
})
app.post("/dividir", (req, res)=>{
    const {numero1, numero2} = req.body;
    console.log(req.body);
    let div = numero1 / numero2;
    res.send("el resultado de la división 6 / 2 es: " + div);
    
})

//corresponde a la función importada
app.post("/suma", (req, res)=>{
    const {numero1, numero2} = req.body;
    const resultadoSuma = sumar(numero1, numero2); // si la función exportada tiene parámetros, la función se tiene que importar con esos mismos parámetros
    res.send("el resultado de la suma de la función es: " + resultadoSuma);
})
app.post("/resta", (req, res)=>{
    const {numero1, numero2} = req.body;
    const resultadoResta = resta(numero1, numero2);
    res.send("el resultado de la resta de la función es: " + resultadoResta);
})
app.post("/multiplica", (req, res)=>{
    try{
        const {numero1, numero2} = req.body;
        const resultadoMulti = multiplica(numero1, numero2);
        res.status(502).send("el resultado de la función de la multiplicación es: " + resultadoMultixxx)

    }catch(e){
        res.status(403).send({
            success: true,
            message: "hubo un error: " +e,
            body: req.body
        })
    }
})

app.post("/divide", (req, res)=>{
    const {numero1, numero2} = req.body;
    const resultadoDivide = divide(numero1, numero2);
    res.send("el resultado de la resta de la función es: " + resultadoDivide);
})

// app.listen(PORT) Lo de abajo es lo mismo que lo de esta línea, es una formalidad
app.listen(PORT, () => {
  console.log(`Conectado en la ruta http://localhost:${PORT}`);
});
