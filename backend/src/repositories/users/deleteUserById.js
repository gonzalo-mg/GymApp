/* funcion SQL query: borrar user sabiendo su id */

const getPool = require("../../database/getPool");

async function deleteUserById(idExercise) {
  // conectar con bbdd
  const pool = getPool();

  // SQL
  await pool.query(`DELETE FROM users WHERE idUser = ?`, [idExercise]);
}

module.exports = deleteUserById;
