// cargar modulos
require("dotenv").config();
const bcrypt = require("bcrypt");
const getPool = require("./getPool");

// funcion: insertar datos de test en la bd
async function populateDb() {
  let pool;
  try {
    console.log("populateDb script running.");

    // variable para solicitar conexion a la bd
    pool = getPool();

    console.log("Inserting mock data into: users");
    await pool.query(`
        INSERT INTO users (email, password, role) VALUES
            ("administrator@mail.com", "${await bcrypt.hash("1234567890",10)}", "admin"),
            ("worker1@mail.com", "${await bcrypt.hash("1234567890", 10)}", "worker"),
            ("worker2@mail.com", "${await bcrypt.hash("1234567890", 10)}", "worker"),
            ("worker3@mail.com", "${await bcrypt.hash("1234567890", 10)}", "worker")
        `);

    console.log("Inserting mock data into: exercises");
    await pool.query(`
        INSERT INTO exercises (name, description, typology, muscles, picture) VALUES
            ("Press de banca", "Tumbado, levantar con los brazos barra con peso.", "Peso auxiliar", "Pectorales", "meme2.jpeg"),
            ("Aperturas", "Tumbado, levantar pesas lateralmente.", "Peso auxiliar", "Pectorales", "meme2.jpeg"),
            ("Flexiones", "Tumbado, levantar el cuerpo.", "Peso propio", "Pectorales", "meme1.jpeg"),
            ("Dominadas", "Colgarse de una barra, subir y levantar el cuerpo.", "Peso propio", "Dorsales", "meme1.jpeg"),
            ("Press militar", "Sentao, levantar con los brazos barra con peso", "Peso auxiliar", "Hombros", "meme2.jpeg"),
            ("Curls con barra", "De pie, levantar barra desde la cadero al pecho.", "Peso auxiliar", "Biceps", "meme1.jpeg"),
            ("Curls concentrado", "Sentado levantar pesas.", "Peso auxiliar", "Biceps", "meme2.jpeg")
        `);

    console.log("Inserting mock data into: likes");
    await pool.query(`
        INSERT INTO likes (idUser, idExercise, stateLike) VALUES
            ("2","1", true),
            ("3","1", true),
            ("2","2", true),
            ("3","3", true)
    `);

    console.log("Inserting mock data into: favs");
    await pool.query(`
        INSERT INTO favs (idUser, idExercise, stateFav) VALUES
            ("2","2", true),
            ("3","1", true),
            ("3","2", true),
            ("3","3", true)
    `);

    console.log("populateDb script run succesfully.");

  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

// llamar funcion
populateDb();