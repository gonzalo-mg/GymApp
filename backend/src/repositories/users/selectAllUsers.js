/* funcion SQL query: seleccionar usuario sabiendo su id */
const getPool = require("../../database/getPool");

async function selectAllUsers() {
  // solicitar conexion a bbdd
  const pool = getPool();

  const [users] = await pool.query(`
    SELECT idUser, email, role, created FROM users;
    `);
  // devolver array users con: idUser, email, password (encriptada), role
  return users;
}

module.exports = selectAllUsers;
