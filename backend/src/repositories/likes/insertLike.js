const getPool = require("../../database/getPool");

const insertLike = async (idExercise, idUser) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "UPDATE likes SET stateLike=1 WHERE idExercise = ? AND idUser =?",
    [idExercise, idUser]
  );

  return insertId;
};

module.exports = insertLike;
