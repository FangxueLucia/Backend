import { traerColeccion } from "./config/db.js";
import express from 'express';
const PORT = 3000;
const api = express();
api.use(express.json());
api.post('/traercoleccion', async(req, res)=>{
    console.log("holi")
    res.status(200).send('funciona?')
})

api.listen(prompt, ()=>{
    console.log(`está conectado a la url http//localhost:3000:${PORT}`)
})
