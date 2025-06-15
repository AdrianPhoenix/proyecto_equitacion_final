// Tu archivo de rutas (por ejemplo, routes/users.js)

const express = require("express");
const getConnection = require("../database/db"); // Aquí importas la función getConnection

const router = express.Router();

router.get("/", async (req, res) => {
  let conn; // Declaramos 'conn' fuera del try para que sea accesible en el finally
  try {
    conn = await getConnection(); // ¡Aquí es donde obtienes la conexión real!
    const query = "SELECT * FROM users";

    const rows = await conn.query(query);
    res.json(rows); // Enviamos solo las filas como respuesta JSON
  } catch (err) {
    console.error("Error en la ruta GET /:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  } finally {
    if (conn) conn.end(); // Siempre cierra la conexión para liberar recursos
  }
});

router.post("/", async (req, res) => {
  let conn; // Declaramos 'conn' fuera del try
  try {
    const { user, password, role, nombre, dias_horario, horario } = req.body;
    console.log("Datos recibidos:", req.body);
    console.log("Usuario:", user, "Contraseña:", password);

    // *** CAMBIO CLAVE AQUÍ: Especificar las columnas y usar ? por cada valor ***
    const query =
      "INSERT INTO users (user, password, role, nombre, dias_horario, horario) VALUES (?, ?, ?, ?, ?, ?)";

    // Pasar los valores como un array en el mismo orden que las columnas en la consulta
    const values = [user, password, role, nombre, dias_horario, horario];

    conn = await getConnection(); // Obtener la conexión

    // Para mysql2, conn.query devuelve un array [result, fields] para INSERT/UPDATE/DELETE
    const result = await conn.query(query, values);

    console.log("Resultado de la inserción:", result);

    res.status(201).json({
      message: "Usuario Registrado exitosamente",
      id: result.insertId.toString(), // Convierte el BigInt a String para JSON
    });
  } catch (err) {
    console.error("Error en la ruta POST /:", err);
    // Verificar si el error es por duplicado (si 'user' es UNIQUE)
    if (err.code === "ER_DUP_ENTRY") {
      res.status(409).json({ error: "El usuario ya existe" });
    } else {
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  } finally {
    if (conn) conn.end(); // Cierra la conexión
  }
});

module.exports = router;
