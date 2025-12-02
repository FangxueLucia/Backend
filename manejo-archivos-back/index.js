import express from "express";
import dotenv from "dotenv";
import fs from "fs-extra";
import multer from "multer";
import db from "mongoose";

dotenv.config();
const app = express();
const port = 3000 || process.env.PORT;


//---------------------------------------------------
//conexion a la base de datos
//---------------------------------------------------
async function getUsers() {
    try {
      await db.connect(
        "mongodb+srv://prueba_user:prueba1@cluster0.efyz5yl.mongodb.net/Paprika"
      ).then(() => console.log("connected"));
      const EjemploSchema = await new db.Schema({
        nombre: String,
        apellido: String,
        email: String,
        edad: String,
      });
      const ejemploModel = await db.model(
        "usuarios_proyecto",
        EjemploSchema,
        "usuarios_proyecto"
      );
    
      ejemploModel.init();
      const busqueda = await ejemploModel.find();
      console.log("--- Documentos encontrados en la colección ---");
            console.log(busqueda);
            console.log("------------------------------------------");
    
    } catch (e) {
      console.error("--- ERROR DE CONEXIÓN A MONGODB ---");
            console.error("No se pudo conectar. Necesitamos ver el detalle del error para solucionarlo:");
            console.error("Detalles del Error:", e); 
            console.error("-----------------------------------");
    }
    
}
//--------------------------------------------------
//api para leer la base de datos en postman
//--------------------------------------------------
app.get("/prueba", async(req, res)=>{
    console.log("ruta alcanzadaaa!!!!!!!!");
    res.status(201).send("prueba funciona")
})

app.post("/request", async(req, res)=>{
    console.log("ruta alcanzada enPOSTTT"); 
    res.status(201).send(await getUsers());
})


//-----------------------------------------------------
//conexión al puertoo
//-----------------------------------------------------
app.listen(3000, () => {
  console.log(`server running at ${port}`); 
});
