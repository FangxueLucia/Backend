import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
app.use(express.json());
const tkey = process.env.TKEY;

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
/*
 * Este bloque contiene tres partes principales que manejan los tokens JWT:
 * 1. Generar un Token (POST /addtoken): Le da al usuario su pase de seguridad.
 * 2. Verificar un Token (POST /verifytoken): Comprueba si el pase de seguridad es válido.
 * 3. Iniciar el Servidor (app.listen): Pone la aplicación en funcionamiento.
*/

/*
 * ----------------------------------------------------
 * 1. RUTA PARA AÑADIR/GENERAR UN TOKEN (EL PASE DE SEGURIDAD)
 * ----------------------------------------------------
 * Esta ruta se usa para crear el pase de seguridad digital (el token) que
 * se le dará al usuario después de que inicie sesión exitosamente.
*/
app.post('/addtoken', (req, res) => {
    
    /*
     * Esto es la información que queremos "guardar" dentro del token.
     * Es como poner el nombre en el pase de seguridad.
     * En un caso real, aquí iría el ID del usuario o su nombre de usuario.
    */
    const document = { name: 'Fernando' }
    
    /*
     * jwt.sign crea el token. Es la función que "firma" el pase de seguridad.
     * 1. 'document': La información que va dentro del token (el nombre, etc.).
     * 2. 'tkey': La CLAVE SECRETA del servidor. Esta clave solo la conoce
     * el servidor y se usa para crear la firma del token, asegurando
     * que nadie más puede crear un token válido.
    */
    var token = jwt.sign(document, tkey);
    
    /*
     * res.status(201) envía el código HTTP 201 (Created), que es común
     * cuando se crea un nuevo recurso (en este caso, el token).
     * .send(token) envía el token generado de vuelta al cliente.
     * Ahora el cliente tiene su "pase de seguridad".
    */
    res.status(201).send(token)
})

/*
 * ----------------------------------------------------
 * 2. RUTA PARA VERIFICAR UN TOKEN (COMPROBAR EL PASE)
 * ----------------------------------------------------
 * Esta ruta simula una operación que requiere que el usuario demuestre
 * que está logueado, verificando su pase de seguridad (el token).
*/
app.post('/verifytoken', (req, res) => {
    
    /*
     * El bloque 'try...catch' se usa para manejar errores.
     * Si la verificación del token falla (porque está expirado o fue manipulado),
     * el código dentro de 'try' fallará y pasará a ejecutarse 'catch'.
    */
    try {
        /*
         * El token (el pase de seguridad) se suele enviar en las "cabeceras" (headers)
         * de la petición HTTP, específicamente en la cabecera 'Authorization'.
         * .replace('Bearer ', '') quita la palabra 'Bearer ' (que es un estándar)
         * para dejar solo el valor limpio del token.
        */
        const token=req.headers['authorization'].replace('Bearer ', '')
        
        /*
         * jwt.verify es la función crucial que COMPRUEBA la validez del token.
         * 1. 'token': El pase de seguridad recibido del cliente.
         * 2. 'tkey': La MISMA CLAVE SECRETA del servidor usada para firmarlo.
         * Si la firma del token no coincide con la firma que se debería
         * obtener usando 'tkey', significa que el token fue manipulado o
         * no fue creado por este servidor, y lanza un error.
        */
        var decoded = jwt.verify(token, tkey);
        
        /*
         * Si la línea anterior (jwt.verify) NO lanza un error, significa que
         * el token es VÁLIDO y fue creado por nosotros.
         * res.status(200) envía el código OK de éxito.
        */
        res.status(200).send("token OK")
    } catch (err) {
        /*
         * Si llegamos aquí, es porque jwt.verify falló. El token es inválido
         * (posiblemente manipulado o expirado).
         * res.status(401) envía el código HTTP 401 (Unauthorized - No Autorizado).
         * También enviamos el mensaje de error (err) para ayudar en la depuración.
        */
        res.status(401).send("token NO OK", err)

        // err: Este comentario solo indica dónde estaría disponible el objeto de error.
    }
})

/*
 * ----------------------------------------------------
 * 3. INICIAR EL SERVIDOR
 * ----------------------------------------------------
 * Esta parte es la que pone la aplicación en línea.
*/
app.listen(PORT, () => {
    /*
     * Cuando el servidor está listo para recibir peticiones, imprime un mensaje
     * en la consola indicando el puerto que está usando (ej. Puerto 3000).
    */
    console.log(`Server running on port ${PORT}`);
});