import db from "mongoose";
db.connect(
  "mongodb+srv://prueba_user:prueba1@cluster0.efyz5yl.mongodb.net/Paprika"
)
  .then(() => console.log("connected"))
  .catch(() => console.log("no conectado"));

export async function mongo() {
  try {
    const ClienteSchema = new db.Schema({});
    const EjemploModel =
      db.models.usuarios_proyecto ||
      db.model("usuarios_proyecto", ClienteSchema, "usuarios_proyecto"); //para que se pueda reutilizar la base de datos
    EjemploModel.init();
    const busqueda = await EjemploModel.find();
    return busqueda;
    console.log(busqueda);
  } catch (e) {
    console.log(e);
  }
}
