/* funcion SQL query: seleccionar likes de user sabiendo su idUser */

const getPool = require("../../database/getPool");

async function selectUserLikes(idUser) {
  // solicitar conexion a bbdd
  const pool = getPool();

  // seleccionar los exercises con fav del usuario
  const [likes] = await pool.query(
    "SELECT * FROM exercises WHERE idExercise IN (SELECT idExercise FROM likes WHERE idUser = ? AND stateLike = ?)",
    [idUser, true]
  );
  
  // devolver array de objetos exercise con todos sus campos
  return likes;
}

module.exports = selectUserLikes;
