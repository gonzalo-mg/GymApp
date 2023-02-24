/* funcion SQL query: seleccionar usuario sabiendo su email */
const getPool = require("../../database/getPool");

async function selectUserByEmail(email) {
  // solicitar conexion a bbdd
  const pool = getPool();

  const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  
  // devolver objeto user con: idUser, email, password (encriptada), role
  return user;
};

module.exports = selectUserByEmail;