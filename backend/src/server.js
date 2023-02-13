/* ARCHIVO PRINCIPAL DEL SERVIDOR */
/* CARGAR MODULOS */
require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const fileUpload = require("express-fileupload");
app.use(fileUpload());

/* CARGAR CONTROLLERS */
// de users
const { loginUser } = require("./controllers/users");

// de exercices
const {
  postNewExercise,
  getExercises,
  getExerciseDetails,
  deleteExercise,
  getUserFavs,
} = require("./controllers/exercises");

/* CARGAR MIDDLEWARES (desde su index.js) */
const { errorNotFound, errorHandler, checkAdmin } = require("./middlewares");

/* RECOGER VARIABLES PRIVADAS del .env */
const { PORT } = process.env;

/* ABRIR SERVIDOR */
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

/* ENDPOINTS users - not logged */

app.get("/login", loginUser);

//app.get("/register", registerUser);

/* ENDPOINTS exercises - worker */

//app.get("/exercises", validateAuth, getExercises);
app.get("/exercises", getExercises); // para testear pendiente de juntar validateAuth

//app.get("/exercises:idExercise", validateAuth, getExerciseDetails);
app.get("/exercises/:idExercise", getExerciseDetails); // para testear pendiente de juntar validateAuth

//app.post("/exercises/:idExercise/like", validateAuth, toggleExerciseLike);

//app.post("/exercises/:idExercise/fav", validateAuth, toggleExerciseFav);

//app.get("/favorites/:idUser", validateAuth, getUserFavs);
app.get("/favorites/:idUser", getUserFavs); // para testear pendiente de juntar validateAuth

/* ENDPOINTS exercises admin */

//app.post("/newExercise", validateAuth, checkAdmin, postNewExercise);
app.post("/newExercise", postNewExercise); // para testear pendiente de juntar validateAuth y checkAdmin

//app.put("/exercises/:idExercise", validateAuth, checkAdmin, putEditExercise);

//app.delete("/exercises/:idExercise", validateAuth, checkAdmin, deleteExercise);
app.delete("/exercises/:idExercise", deleteExercise); // para testear pendiente de juntar validateAuth y checkAdmin

/* MIDDLEWARES ERRORES */

// error 404
app.use(errorNotFound);

// errores generico
app.use(errorHandler);
