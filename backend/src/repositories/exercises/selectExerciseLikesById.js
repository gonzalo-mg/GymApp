/* funcion SQL query: seleccionar likes de un exercise sabiendo su id */

const getPool = require("../../database/getPool");

async function selectExerciseLikesById(idExercise) {
  // solicitar conexion a bbdd
  const pool = getPool();

  const [[likesCount]] = await pool.query(
    "SELECT count(stateLike) FROM likes WHERE idExercise = ? AND stateLike = 1",
    [idExercise]
  );

  // devolver num likes
  return likesCount["count(stateLike)"];
}

module.exports = selectExerciseLikesById;
