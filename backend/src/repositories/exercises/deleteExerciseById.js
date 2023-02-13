/* funcion SQL query: borrar exercise sabiendo su id */

const getPool = require("../../database/getPool");

async function deleteExerciseById(idExercise) {
  // conectar con bbdd
  const pool = getPool();

  // SQL
  await pool.query(`DELETE FROM exercises WHERE idExercise = ?`, [idExercise]);
}

module.exports = deleteExerciseById;
