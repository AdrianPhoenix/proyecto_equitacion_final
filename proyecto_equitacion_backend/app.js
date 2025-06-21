const express = require("express");
const users = require("./routes/users");
const enviar_aviso = require("./routes/enviar-aviso");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bienvenidos a la API!!!");
});

app.use("/users", users);
app.use("/enviar-aviso", enviar_aviso);

app.listen(port, () => {
  console.log(`Servidor Ejecutandose en: http://localhost:${port}`);
});
