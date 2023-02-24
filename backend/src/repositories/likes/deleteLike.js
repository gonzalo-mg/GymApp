const getPool = require("../../database/getPool");

const deleteLike = async (idExercise, idUser) => {
  const pool = getPool();

  await pool.query("UPDATE likes SET stateLike=0 WHERE idExercise = ? AND idUser =?", [
    idExercise,
    idUser,
  ]);
};

module.exports = deleteLike;
