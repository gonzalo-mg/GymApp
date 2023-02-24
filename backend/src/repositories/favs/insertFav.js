const getPool = require("../../database/getPool");

const insertFav = async (idExercise, idUser) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "UPDATE favs SET stateFav=1 WHERE idExercise = ? AND idUser =?",
    [idExercise, idUser]
  );

  return insertId;
};

module.exports = insertFav;
