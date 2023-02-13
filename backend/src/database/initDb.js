// cargar modulos
require("dotenv").config();

const getPool = require("./getPool");

// funcion: crear la bd
async function initDb() {
  try {
    // variable para solicitar conexion a la bd
    const pool = getPool();

    console.log("initDB script running.");
    console.log("Deleting existing tables.");
    await pool.query(`DROP TABLE IF EXISTS favs`);
    await pool.query(`DROP TABLE IF EXISTS likes`);
    await pool.query(`DROP TABLE IF EXISTS exercises`);
    await pool.query(`DROP TABLE IF EXISTS users`);

    console.log("Creating table: users.");
    await pool.query(`
        CREATE TABLE users (
            idUser INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(500) NOT NULL,
            role ENUM("admin", "worker") DEFAULT "worker",
            created DATETIME DEFAULT CURRENT_TIMESTAMP
        );    
    `);

    console.log("Creating table: exercises.");
    await pool.query(`
        CREATE TABLE exercises (
            idExercise INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(500) NOT NULL,
            typology VARCHAR(200),
            muscles VARCHAR(200),
            picture VARCHAR(500),
            created DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    console.log("Creating table: likes.");
    await pool.query(`
      CREATE TABLE likes (
        idUser INT NOT NULL,
        FOREIGN KEY (idUser) REFERENCES users (idUser) ON DELETE CASCADE,
        idExercise INT NOT NULL,
        FOREIGN KEY (idExercise) REFERENCES exercises (idExercise) ON DELETE CASCADE,
        stateLike BOOLEAN NOT NULL DEFAULT FALSE,
        created DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Creating table: favs.");
    await pool.query(`
      CREATE TABLE favs (
        idUser INT NOT NULL,
        FOREIGN KEY (idUser) REFERENCES users (idUser) ON DELETE CASCADE,
        idExercise INT NOT NULL,
        FOREIGN KEY (idExercise) REFERENCES exercises (idExercise) ON DELETE CASCADE,
        stateFav BOOLEAN NOT NULL DEFAULT FALSE,
        created DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("initDB script run succesfully.");
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
}

// llamar funcion
initDb();