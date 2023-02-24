const getPool = require("../../database/getPool");

const selectFavByExerciseAndUser = async (idExercise, idUser) => {
  const pool = getPool();

  const [[fav]] = await pool.query(
    "SELECT * FROM favs WHERE idExercise = ? AND idUser = ?",
    [idExercise, idUser]
  );

  return fav;
};

module.exports = selectFavByExerciseAndUser;