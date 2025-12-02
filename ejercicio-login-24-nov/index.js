import dotenv from 'dotenv';
import express from 'express';
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/prueba", (req, res)=>{
    res.send("Wiwiwiwiii") //para comprobar que estoy bien conectada y se imprime en postman
})

app.post('/login', async (req, res)=>{ //ruta a la que se accede con postman
    const saltRounds = 10; //veces que encripta la contraseña, en este caso 10 veces 
    const myPlaintextPassword = '123'; //donde indicas cuál será la la contraseña
    //bcrypt.has toma la contraseña guardada en myPlaintextPassword y la encripta utilizando el número de veces que se ha indicado en saltRounds
    //devuelve una promesa, que se ejecutará en el futuro
    const clave = bcrypt.hash(myPlaintextPassword, saltRounds); 
    console.log(await clave);// aquí se resuelve la promesa de la constante clave e imprime la contraseña encriptada
    try {
        // bycript.compare es la función clave para el login. Compara la contraseña que el usuario escribe (myPlaintextPassword) con la contraseña encriptada. Compara los resultados
        //await imprescindible para esperar el resultado
        const compare = await bcrypt.compare(myPlaintextPassword, '$2b$10$/eC2BK41hZByIhE0LAHnCeUkbkkCv.2n7oRW/zTcyuWXRX/Wlo9Xe');
        console.log(compare);
        if (compare){ //comprueba si el resultado de la comparación es verdadero o falso, y si es verdadero las contraseñas coinciden
            res.status(200).send("clave correcta")
        }else {
            res.status(401).send("clave incorrecta")
        }
    }catch(err){
        res.status(403).send("not working");

    }
})

app.listen(PORT, ()=>{
    console.log(`successfuly connected to url http://localhost:${PORT}`)
})