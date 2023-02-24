const getPool = require("../../database/getPool");

const newLike = async (idExercise, idUser) => {
  const pool = getPool();

  await pool.query(
    `INSERT INTO likes (idExercise, idUser, stateLike) VALUES (?,?,?)`,
    [idExercise, idUser, 1]
  );

};

module.exports = newLike;