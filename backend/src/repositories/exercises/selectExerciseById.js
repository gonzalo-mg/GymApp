/* funcion SQL query: seleccionar exercise sabiendo su id */

const getPool = require("../../database/getPool");

async function selectExerciseById(idExercise) {
  // solicitar conexion a bbdd
  const pool = getPool();

  const [[exercise]] = await pool.query(
    "SELECT * FROM exercises WHERE idExercise = ?",
    [idExercise]
  );
  // devolver objeto exercise con todos sus campos
  return exercise;
}

module.exports = selectExerciseById;
