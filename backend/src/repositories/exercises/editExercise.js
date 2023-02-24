/* funcion SQL query: editar ejercicio en la bbdd */

const getPool = require("../../database/getPool");

async function editExercise(exercise) {
  // recoger datos del objeto exercise
  const { name, description, typology, muscles, pictureName } = exercise;

  // conectar con bbdd
  const pool = getPool();

  // SQL
  await pool.query(
    `
    UPDATE exercises SET name=?, description=?, typology=?, muscles=?, picture=?`,
    [name, description, typology, muscles, pictureName]
  );
}

module.exports = editExercise;
