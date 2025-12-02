// Importa la biblioteca 'mongoose', que es un modelado de datos de objetos (ODM) para MongoDB.
// Esto facilita interactuar con la base de datos MongoDB usando JavaScript.
import db from "mongoose";

// --- Configuración de la Conexión a la Base de Datos ---

// Establece la conexión a la base de datos MongoDB.
// La cadena de conexión es una URL que especifica la ubicación del servidor,
// las credenciales (prueba_user:prueba1) y el nombre de la base de datos a usar ("Paprika").
db.connect(
  "mongodb+srv://prueba_user:prueba1@cluster0.efyz5yl.mongodb.net/Paprika"
)
  // .then() se ejecuta si la conexión es exitosa.
  .then(() => console.log("connected"))
  // .catch() se ejecuta si hay un error en la conexión.
  .catch(() => console.log("no conectado"));

// --- Ejecución de las Funciones ---

// Llama a la función 'read()' para intentar leer datos de la base de datos.
// Nota: La ejecución de 'read()' y 'create()' es casi simultánea.
read();

// Llama a la función 'create()' para intentar insertar un nuevo documento.
create();

// --- Función para Leer Documentos (Read) ---

// Define una función asíncrona para manejar operaciones que requieren esperar (await).
async function read() {
  try {
    // Intenta ejecutar el código dentro de este bloque.

    // Crea un nuevo 'Schema' de Mongoose.
    // Un Schema define la estructura de los documentos dentro de una colección.
    // Aquí se está creando un Schema vacío.
    const EjemploSchema = await new db.Schema();

    // Crea un 'Model' a partir del Schema.
    // Un Model es la clase que se usa para interactuar con la colección específica.
    // 1. "usuarios_proyecto": Nombre del modelo (se usa internamente en Mongoose).
    // 2. EjemploSchema: El Schema que define la estructura.
    // 3. "usuarios_proyecto": El nombre de la colección en la base de datos (colección real).
    const EjemploModel = await db.model(
      "usuarios_proyecto",
      EjemploSchema,
      "usuarios_proyecto"
    );
    
    // Inicializa el modelo.
    EjemploModel.init();

    // Busca todos los documentos en la colección usando el método 'find()'.
    // 'await' pausa la ejecución hasta que la operación de la base de datos finalice.
    const busqueda = await EjemploModel.find()

    // Imprime los documentos encontrados en la consola.
    console.log(busqueda);
  } catch (e) {
    // Si ocurre algún error en el bloque 'try', se captura aquí y se imprime el error.
    console.log(e);
  }
}

// --- Función para Crear un Documento (Create) ---

// Define una función asíncrona para manejar la creación de un nuevo documento.
async function create(){
  try{
    // Intenta ejecutar el código.

    // Define el Schema (estructura) para un usuario.
    // Los documentos en la colección "usuarios_proyecto" deben tener campos 'name' y 'email',
    // ambos de tipo String.
    const UserSchema = await new db.Schema({
      name: String,
      email: String
    });

    // Crea el Model, similar a la función 'read', usando el nuevo UserSchema.
    const EjemploModel = await db.model("usuarios_proyecto", UserSchema, "usuarios_proyecto");
    
    // Inicializa el modelo.
    EjemploModel.init();

    // Inserta un nuevo documento en la colección.
    // Nota: Aunque estás usando 'insertOne' que es un método de MongoDB Driver,
    // Mongoose a menudo lo permite o traduce. El método más estándar de Mongoose
    // para crear sería `new EjemploModel({ ... }).save()`.
    const busqueda = await EjemploModel.insertOne({
      name: "Carmen",
      email: "crm@gmail.com"
    })

    // Imprime el resultado de la inserción (por ejemplo, el ID del documento insertado).
    console.log(busqueda)
  }catch(e){
    // Captura y registra cualquier error durante la inserción.
    console.log(e)
  }
}