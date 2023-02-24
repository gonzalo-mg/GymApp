const getPool = require("../../database/getPool");

const newFav = async (idExercise, idUser) => {
  const pool = getPool();

  await pool.query(
    `INSERT INTO favs (idExercise, idUser, stateFav) VALUES (?,?,?)`,
    [idExercise, idUser, 1]
  );

};

module.exports = newFav;