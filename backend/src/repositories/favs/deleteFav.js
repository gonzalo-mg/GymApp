const getPool = require("../../database/getPool");

const deleteFav = async (idExercise, idUser) => {
  const pool = getPool();

  await pool.query("UPDATE favs SET stateFav=0 WHERE idExercise = ? AND idUser =?", [
    idExercise,
    idUser,
  ]);
};

module.exports = deleteFav;
