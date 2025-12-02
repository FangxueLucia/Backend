import db from "mongoose";
db.connect(
  "mongodb+srv://prueba_user:prueba1@cluster0.efyz5yl.mongodb.net/Paprika"
)
.then(() => console.log("connected"))
.catch(() => console.log("no conectado"));

export async function read() {
  try {
    const EjemploSchema = new db.Schema();
    const EjemploModel =  db.model(
      "usuarios_proyecto",
      EjemploSchema,
      "usuarios_proyecto"
    );
    EjemploModel.init();
  }catch(e){
    console.log(e)
  }
}

