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

router.get("/:user", async (req, res) => {
  let conn; // Declaramos 'conn' fuera del try
  try {
    const { user } = req.params;
    console.log("Usuario solicitado:", user);
    conn = await getConnection(); // Obtener la conexión
    const query = "SELECT * FROM users WHERE user = ?";
    const values = [user]; // Usamos un array para los valores
    const rows = await conn.query(query, values);
    console.log("Datos del usuario:", rows[0]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(rows[0]); // Enviamos solo el primer resultado como respuesta JSON
  } catch (err) {
    console.error("Error en la ruta GET /:user:", err);
    res.status(500).json({ error: "Error al obtener usuario" });
  } finally {
    if (conn) conn.end(); // Cierra la conexión
  }
});

router.put("/alumno/:id", async (req, res) => {
  const userId = req.params.id;
  const { nivel } = req.body; // Esperamos que solo se envíe el nivel

  try {
    console.log(
      "Actualizando nivel del usuario:",
      userId,
      "Nuevo nivel:",
      nivel
    );
    const conn = await getConnection(); // Obtener la conexión
    const query = "UPDATE users SET nivel = ? WHERE id = ?";
    const values = [nivel, userId]; // Usamos un array para los valores
    const result = await conn.query(query, values);
    console.log("Resultado de la actualización:", result);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Si la actualización fue exitosa, enviamos una respuesta positiva
    res.json({ ok: true, message: "Nivel actualizado con éxito" });
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

router.put("/", async (req, res) => {
  let conn; // Declaramos 'conn' fuera del try
  try {
    const { user, horario } = req.body;
    console.log("Datos recibidos:", req.body);

    conn = await getConnection(); // Obtener la conexión

    // Cambio de horario del usuario
    const query = "UPDATE users SET horario = ? WHERE user = ?";

    // Pasar los valores como un array en el mismo orden que las columnas en la consulta
    const values = [horario, user];

    // Para mysql2, conn.query devuelve un array [result, fields] para INSERT/UPDATE/DELETE
    const result = await conn.query(query, values);

    console.log("Resultado de la actualización:", result);

    res.status(200).json({
      message: "Usuario actualizado exitosamente",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.error("Error en la ruta PUT /:", err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  } finally {
    if (conn) conn.end(); // Cierra la conexión
  }
});

router.post("/", async (req, res) => {
  let conn; // Declaramos 'conn' fuera del try
  try {
    const { user, password, role, nombre, horario, profesor } = req.body;
    console.log("Datos recibidos:", req.body);
    console.log("Usuario:", user, "Contraseña:", password);

    // *** CAMBIO CLAVE AQUÍ: Especificar las columnas y usar ? por cada valor ***
    const query =
      "INSERT INTO users (user, password, role, nombre, horario, profesor_asignado) VALUES (?, ?, ?, ?, ?, ?)";

    // Pasar los valores como un array en el mismo orden que las columnas en la consulta
    const values = [user, password, role, nombre, horario, profesor];

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
