const getPool = require("../../database/getPool");

const selectLikeByExerciseAndUser = async (idExercise, idUser) => {
  const pool = getPool();

  const [[like]] = await pool.query(
    "SELECT * FROM likes WHERE idExercise = ? AND idUser = ?",
    [idExercise, idUser]
  );

  return like;
};

module.exports = selectLikeByExerciseAndUser;
