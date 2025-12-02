//aquí se configuran los elementos externos como la conexión a mongoDB y dotenv
import db from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
db.connect(process.env.DB).then(()=>{
    console.log("connectet to MongoDB");
}).catch((error)=>{
    console.log(error)
});