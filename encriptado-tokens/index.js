import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 2000;


/*
 * Esto define una ruta (URL) que la aplicación escuchará para peticiones.
 * 'app.post' indica que solo manejará peticiones HTTP de tipo POST,
 * que es el método habitual para enviar datos de formularios (como un login).
 * '/login' es la parte final de la URL, por ejemplo: http://tuweb.com/login.
 * 'async (req, res) => {...}' es la función que se ejecuta cuando se recibe la petición.
 * 'async' es necesario porque usaremos 'await' dentro para esperar procesos lentos.
 * 'req' (request) contiene los datos que el cliente envió.
 * 'res' (response) contiene las herramientas para enviar una respuesta al cliente.
*/
app.post('/login', async (req, res) => {
    /*
     * Define el número de rondas de "salting" (añadir datos aleatorios) que bcrypt
     * utilizará para cifrar la contraseña. Un valor de 10 es un buen compromiso
     * entre seguridad y velocidad de procesamiento.
    */
    const saltRounds = 10;
    
    /*
     * Esta variable simula la contraseña que el usuario introdujo en el formulario.
     * En una aplicación real, esta contraseña se obtendría de 'req.body.password'.
    */
    const myPlaintextPassword = '123';

    /*
     * bcrypt.hash toma la contraseña legible (myPlaintextPassword) y la cifra
     * usando el número de rondas especificado (saltRounds).
     * NOTA: En un proceso de LOGIN real, NO cifraríamos la clave; esta línea
     * solo sería útil en un proceso de REGISTRO para guardar la clave CIFRADA.
     * La función devuelve una 'Promesa' (algo que se ejecutará en el futuro).
    */
    const clave = bcrypt.hash(myPlaintextPassword, saltRounds);
    
    /*
     * 'await' detiene la ejecución del código hasta que la Promesa de 'clave' se resuelve (termina el cifrado).
     * 'console.log' imprime la contraseña ya cifrada en la consola del servidor.
     * Esto solo es para depuración (debugging), no es funcional para el login.
    */
    console.log(await clave)
    
    /*
     * El bloque 'try...catch' se usa para manejar errores de forma segura.
     * Si ocurre algún error dentro de 'try', el control salta a 'catch'
     * y el programa no se detiene.
    */
    try {
        /*
         * bcrypt.compare es la función clave para el login.
         * Compara la contraseña que el usuario escribió (myPlaintextPassword, el primer argumento)
         * con la contraseña cifrada guardada (el segundo argumento, que simula ser la de la base de datos).
         * La función NO descifra la clave guardada; en su lugar, cifra el primer argumento
         * y compara los resultados.
         * 'await' es crucial para esperar el resultado de esta operación.
        */
        const compare = await bcrypt.compare(myPlaintextPassword, '$2b$10$Laycuo6Uix74IwNvhY4hB.5Bn/cx8TsvlsfuZ8vCubvMFfGwx7Gji')
        
        /*
         * Imprime 'true' o 'false' en la consola, mostrando si la comparación fue exitosa.
        */
        console.log(compare)
        
        /*
         * 'if (compare)' comprueba si el resultado de la comparación es verdadero ('true').
         * Si es verdadero, las contraseñas coinciden.
        */
        if (compare) {
            /*
             * res.status(200) envía el código de estado HTTP 200 (OK), indicando éxito.
             * .send(...) envía el mensaje de éxito al cliente.
            */
            res.status(200).send("clave correcta")
        } else {
            /*
             * Si 'compare' es falso, las contraseñas NO coinciden.
             * res.status(401) envía el código de estado HTTP 401 (Unauthorized),
             * el estándar para credenciales incorrectas.
             * .send(...) envía el mensaje de error al cliente.
            */
            res.status(401).send("clave Incorrecta")

        }
    } catch (e) {
        /*
         * Si algo falla en el bloque 'try' (un error en bcrypt, por ejemplo),
         * se ejecuta este bloque. 'e' contiene la información del error.
         * res.status(403) envía el código 403 (Forbidden), indicando que algo
         * impidió el acceso por una razón que no son credenciales incorrectas
         * (generalmente un error interno del servidor).
        */
        res.status(403).send("pa tu casa")
    }
})

app.listen(PORT, ()=>{
    console.log(`connected at url http://localhost:${PORT}`)
})