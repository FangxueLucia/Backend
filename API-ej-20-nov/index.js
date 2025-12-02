import express from "express";
import {mongo} from "./db.js";

const api = express();
const PORT = 4000;
api.use(express.json());

api.post("/prueba", async (req, res)=>{
    console.log("ruta alcanzada I guess");
    res.status(200).send("prueba funciona")
})
api.post("/consulta", async(req, res)=>{
    res.status(200).send(await mongo());
})
api.listen(PORT, ()=>{
    console.log(`está conectado a la url: http://localhost:${PORT}`);
})
