/* funcion SQL query: editar ejercicio en la bbdd */

const getPool = require("../../database/getPool");

async function editExercise(exercise) {
  // recoger datos del objeto exercise
  const { name, description, typology, muscles, pictureName, idExercise } = exercise;

  // conectar con bbdd
  const pool = getPool();

  // SQL
  await pool.query(
    `
    UPDATE exercises SET name=?, description=?, typology=?, muscles=?, picture=? WHERE idExercise = ?`,
    [name, description, typology, muscles, pictureName, idExercise]
  );
}

module.exports = editExercise;
