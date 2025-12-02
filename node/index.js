// 📦 Tienes que ir a la tienda a buscar un ingrediente especial llamado 'Mongoose'.
// Mongoose es la herramienta que te permite hablar con la base de datos (MongoDB).
import db from "mongoose";

// 🚀 ¡EMPEZAR! Aquí le decimos a la cocina que empiece a hacer la 'receta' llamada leer().
leer();

// 🥣 Definimos la RECETA completa, la llamamos 'leer'. Es una receta 'async' (asíncrona),
// lo que significa que tiene pasos que tardan mucho (como esperar a que hierva el agua)
// y hay que esperar a que terminen usando 'await'.
async function leer() {
  // 🛡️ 'try' es como decir: "Intenta hacer todo esto. Si algo sale mal, no explotes, ¡ve a 'catch'!"
  try {
    // 🔌 PASO 1: CONECTAR
    // Le decimos a Mongoose (db) que se conecte al armario donde está la base de datos.
    db.connect(
      "mongodb+srv://prueba_user:prueba1@cluster0.efyz5yl.mongodb.net/Paprika"
    )
      // Si la conexión funciona, imprime en la consola: "¡Conectado!".
      .then(() => console.log("Connected!"));

    // 📜 PASO 2: EL MOLDE
    // Creamos un 'Molde' (Schema) para saber qué forma tienen los datos.
    // Le decimos que los documentos (las personas) tienen un nombre, un apellido, un email y una edad,
    // y que todos son de tipo texto (String).
    const EjemploSchema = await new db.Schema({
      nombre: String,
      apellido: String,
      email: String,
      edad: String,
    });

    // 🛠️ PASO 3: EL CONSTRUCTOR
    // Usamos el Molde para crear un 'Constructor' (Model) que sabe cómo interactuar
    // con la colección (la lista de datos) llamada "usuarios_proyecto".
    const ejemplo = await db.model(
      "usuarios_proyecto",
      EjemploSchema,
      "usuarios_proyecto"
    );

    // ⚙️ (Paso técnico): Inicializa el Constructor. A veces es necesario para que todo se prepare bien.
    await ejemplo.init();

    // 🔎 PASO 4: BUSCAR EL TESORO
    // Usamos el Constructor ('ejemplo') para buscar (find) todos los documentos.
    // La condición de búsqueda es: que en el campo 'nombre' ponga "Paprika".
    const buscarEjemplos = await ejemplo.find({ nombre: "Paprika" });

    // 💬 PASO 5: MOSTRAR RESULTADO
    // Imprime en tu terminal lo que encontró.
    // Nota: El mensaje "usuario insertado" es un poco confuso, ¡en realidad muestra el usuario ENCONTRADO!
    console.log("usuario insertado", buscarEjemplos);
  } catch (e) {
    // 🛑 Si algo falló en los pasos anteriores (ej: no hay internet, la contraseña de la BD está mal),
    // el programa viene aquí y nos dice qué error pasó.
    console.log(e);
  }
}
