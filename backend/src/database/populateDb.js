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
            ("Correr", "Es como caminar, pero en rápido.", "Sin equipo.", "Piernas", "correr.jpeg"),
            ("Nadar", "Te tiras al agua y braceas y le das a las piernas, así como si tuevieras el baile de San Vito.", "Piscina", "Todo", "nadar.jpeg"),
            ("Pesas", "Como ponerse a sachar, pero a lo tonto.", "Peso auxiliar", "Brazos", "pesas.jpeg"),
            ("Levantamiento de birra", "Sacar una cerveza bien fresquita de la nevera, ponerla en una jarra, e iniciar repeticiones de levantamieto con el brazo.", "Peso auxiliar", "Brazo", "birra.jpeg"),
            ("Escribir código", "Aporrea las teclas, y reza para que salga algo coherente.", "Peso auxiliar", "Dedos", "codigo.jpeg"),
            ("La siesta", "Túmbate sobre una superficie blandita, tápate con una mantita y cierra los ojos. Pro-tip: cuenta ovejitas.", "Peso propio", "Todo", "siesta.jpeg"),
            ("Curling", "Sí ho, la petanca esa rara de los nórdicos, que van con escobas sobre el hielo.", "Peso auxiliar", "Brazos", "curling.jpeg")
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