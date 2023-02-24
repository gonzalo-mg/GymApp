/* funcion SQL query: seleccionar usuario sabiendo su id */
const getPool = require("../../database/getPool");

async function selectUserById(idUser) {
  // solicitar conexion a bbdd
  const pool = getPool();

    const [[user]] = await pool.query(`
        SELECT * FROM users WHERE idUser = ?
    `, [idUser]
    );
  // devolver objeto user con: idUser, email, password (encriptada), role
  return user;
}

module.exports = selectUserById;
