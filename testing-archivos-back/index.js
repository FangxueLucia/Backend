/*
 * -----------------------------------------------------------------------
 * 1. IMPORTACIÓN DE LIBRERÍAS (Los 'ingredientes' que necesitamos)
 * -----------------------------------------------------------------------
*/
import express from 'express'; // Importa el framework Express, esencial para crear el servidor web.
import dotenv from 'dotenv';  // Importa dotenv, usado para cargar variables de entorno desde un archivo .env.
import fs from 'fs-extra'  // Importa fs-extra, que proporciona funciones útiles para interactuar con el sistema de archivos.
import multer from 'multer' // Importa multer, un middleware diseñado específicamente para manejar la subida de archivos.

/*
 * -----------------------------------------------------------------------
 * 2. CONFIGURACIÓN INICIAL
 * -----------------------------------------------------------------------
*/
dotenv.config(); // Carga las variables de entorno definidas en el archivo .env.
const app = express() // Crea la instancia principal de la aplicación Express. 'app' será nuestro servidor.

/*
 * -----------------------------------------------------------------------
 * 3. CONFIGURACIÓN DE MULTER (CÓMO, DÓNDE GUARDAR Y QUÉ ARCHIVOS PERMITIR)
 * -----------------------------------------------------------------------
*/

/*
 * 3.1. Configuración de Almacenamiento (diskStorage)
 * Define cómo se deben almacenar los archivos en el disco duro del servidor.
*/
const storage = multer.diskStorage({
  /*
   * 'destination': Define dónde se guardarán los archivos.
   * cb(null, './uploads'): Indica que los archivos se guardarán en la carpeta 'uploads'
   * en la raíz del proyecto. 'null' indica que no hubo errores.
  */
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  /*
   * 'filename': Define qué nombre tendrá el archivo en el disco.
   * Usamos 'Date.now()' para asegurar un nombre único (timestamp) antes del nombre original,
   * lo que previene que archivos nuevos sobrescriban a los anteriores.
  */
  filename: function (req, file, cb) {
    // Ejemplo: 1678886400000-mi_imagen.png
    cb(null, Date.now() + '-' + file.originalname);
  }
});

/*
 * 3.2. Configuración de Filtro (fileFilter)
 * Es una función personalizada para restringir los tipos de archivos que se aceptarán.
*/
const fileFilter = (req, file, cb) => {
  // Tipos MIME permitidos (solo imágenes PNG, JPEG o JPG)
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  if (allowedTypes.includes(file.mimetype)) {
    // Si el tipo es permitido, llamar al callback: 'null' para el error y 'true' para aceptar.
    cb(null, true);
  } else {
    // Si el tipo NO es permitido, rechazar y lanzar un error.
    cb(new Error('Solo se permiten imágenes PNG, JPG o JPEG'), false);
  }
};

/*
 * 3.3. Creación del Middleware 'upload'
 * Combina la configuración de almacenamiento y el filtro de archivos.
*/
const upload = multer({
  storage, // Usa la configuración de almacenamiento que definimos
  fileFilter // Usa la función de filtro para tipos de archivos
  // Opcional: Se puede agregar un límite de tamaño, por ejemplo:
  // limits: { fileSize: 1024 * 1024 * 5 } // 5MB
});

/*
 * Define el puerto en el que correrá el servidor.
 * Usará el puerto definido en las variables de entorno o 3000 por defecto.
*/
const port = 3000 || process.env.PORT;

/*
 * -----------------------------------------------------------------------
 * 4. MIDDLEWARE GENERAL Y RUTA
 * -----------------------------------------------------------------------
*/

/*
 * Middleware incorporado de Express: Permite a Express leer y entender
 * el cuerpo de las peticiones que están en formato JSON.
*/
app.use(express.json());

/*
 * Define una ruta que solo responde a peticiones POST en la URL '/stats'.
 * 'upload.single('uploaded_file')' es el middleware de Multer que se ejecuta primero:
 * - '.single()': Indica que solo se espera un único archivo.
 * - 'uploaded_file': Es el nombre del campo (atributo 'name' en HTML) que Multer buscará.
*/
app.post('/stats', upload.single('uploaded_file'), function (req, res) {
  /*
   * Después de Multer:
   * 'req.file' es un objeto que contiene toda la información del archivo subido.
   * 'req.body' contiene los datos de los campos de texto del formulario.
  */

  // Imprime la información del archivo subido en la consola del servidor (para depuración).
  console.log('Archivo subido (req.file): ', req.file);

  // Imprime la información de otros campos de texto del formulario (para depuración).
  console.log('Cuerpo de la petición (req.body):', req.body);

  // Envía la información del archivo de vuelta al cliente como confirmación de la subida exitosa.
  res.status(200).json({
      message: 'Archivo subido exitosamente.',
      file: req.file,
      body: req.body
  });
});

/*
 * -----------------------------------------------------------------------
 * 5. INICIO DEL SERVIDOR
 * -----------------------------------------------------------------------
*/

/*
 * app.listen(port, ...) inicia el servidor Express.
*/
app.listen(port, () => {
  // Mensaje de confirmación cuando el servidor está activo.
  console.log(`Servidor conectado y escuchando en el puerto: ${port}`);
});