const mariadb = require("mariadb");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "123456",
  database: "equitacion",
};

// Función asíncrona para obtener una conexión
async function getConnection() {
  let conn;
  try {
    conn = await mariadb.createConnection(dbConfig);
    console.log("Conexión establecida con la bd");
    return conn;
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
    // Lanza el error para que la aplicación que llama pueda manejarlo
    throw err;
  }
}

module.exports = getConnection;
