/* funcion SQL query: insertar ejercicio en la bbdd */

const getPool = require("../../database/getPool");

async function insertExercise(exercise) {
  // recoger datos del objeto exercise
  const { name, description, typology, muscles, pictureName } = exercise;

  // conectar con bbdd
  const pool = getPool();

  // SQL
  await pool.query(
    `
        INSERT INTO exercises (name, description, typology, muscles, picture) VALUES (?, ?, ?, ?, ?)`,
    [name, description, typology, muscles, pictureName]
  );
}

module.exports = insertExercise;
