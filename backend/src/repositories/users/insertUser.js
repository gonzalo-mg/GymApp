/* funcion SQL query: insertar nuevo usuario en la bbdd */

const getPool = require("../../database/getPool");

async function insertUser(user) {
  // recoger datos del objeto user
  const { email, encryptedPassword } = user;

  // conectar con bbdd
  const pool = getPool();

  // SQL
  await pool.query(
    `
        INSERT INTO users (email, password) VALUES (?, ?)`,
    [email, encryptedPassword]
  );
}

module.exports = insertUser;