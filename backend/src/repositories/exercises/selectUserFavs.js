/* funcion SQL query: seleccionar favs de user sabiendo su idUser */

const getPool = require("../../database/getPool");

async function selectUserFavs(idUser) {
  // solicitar conexion a bbdd
  const pool = getPool();

  const [favs] = await pool.query(
    "SELECT * FROM favs WHERE idUser = ? AND stateFav = ?",
    [idUser, true]
  );

  // devolver array de objetos exercise con todos sus campos
  return favs;
}

module.exports = selectUserFavs;
