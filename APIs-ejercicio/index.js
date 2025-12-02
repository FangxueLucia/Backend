// Tomar el ejercicio de ayer en donde imprimimos en pantalla todo lo que tenia una de sus tablas,
// es decir que usen el metodo “find” de mongoose
// el ejercicio consiste en crear una api desde un proyecto  NUEVO  con una ruta a su seleccion
// que no sea la de raiz “/” con el metodo post, esta api debe usar una funcion previamente
// importada desde otro fichero (que haran desde 0) y esta funcion debe estar en un fishero
// que conecte a su base de datos en mongoDB, la simple conexion debe hacerse en una
// variable FUERA de la funcion, pero la funcion debe aprovechar la conexion para usar
// el metodo find y RESPONDER a la llamada desde la api y que le permita a la api responder
// con toda la consulta a postman.

//////////////////////////////////
//IMPORTS
//////////////////////////////////

import express from "express";

import {read} from "./services/funciones.js";
// import { read } from "./services/funciones.services.js";
//////////////////////////////////
//
//////////////////////////////////

const app = express();
const PORT = 2000;
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Hello World"); //se comprueba el status para saber que funciona bien
});

app.post("/consulta", async(res, req) => {

  res.status(200).send(await read);
});

app.listen(PORT, () => {
  console.log(`Conectado en la ruta http://localhost:${PORT}`);
});
