import db from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.DB)
db.connect(process.env.DB)
.then(()=>console.log('conectado'))
.catch(()=>console.log('no conectado'))

export async function traerColeccion() {
    
}