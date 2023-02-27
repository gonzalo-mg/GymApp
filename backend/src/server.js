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
const { 
  loginUser,
  registerUser,
} = require("./controllers/users");

// de exercices
const {
  postNewExercise,
  getExercises,
  getExerciseDetails,
  deleteExercise,
  getUserFavs,
  putEditExercise
} = require("./controllers/exercises");

// de likes
const {
  toggleExerciseLike
} = require("./controllers/likes")

// de favs
const {
  toggleExerciseFav
} = require("./controllers/favs")

/* CARGAR MIDDLEWARES (desde su index.js) */
const { errorNotFound, errorHandler, validateAuth, checkAdmin } = require("./middlewares");

/* RECOGER VARIABLES PRIVADAS del .env */
const { PORT } = process.env;

/* middleware estatico para imagenes de los exercices*/
app.use('/pics', express.static(__dirname + '/uploads/images/exercises'));
console.log(`${__dirname} + '/uploads/images/exercises`)
/* ENDPOINTS users - not logged */

app.get("/login", loginUser);

app.post("/register", registerUser);

/* ENDPOINTS exercises - worker */
// validateAuth y checkAdmin deshabilitados temporalmente mientras se trabaja en el frontend
//app.get("/exercises", validateAuth, getExercises);
app.get("/exercises", getExercises);

//app.get("/exercises/:idExercise", validateAuth, getExerciseDetails);
app.get("/exercises/:idExercise", getExerciseDetails);

//app.post("/exercises/:idExercise/like", validateAuth, toggleExerciseLike);
app.post("/exercises/:idExercise/like", toggleExerciseLike);

//app.post("/exercises/:idExercise/fav", validateAuth, toggleExerciseFav);
app.post("/exercises/:idExercise/fav", toggleExerciseFav);

//app.get("/favorites/:idUser", validateAuth, getUserFavs);
app.get("/favorites/:idUser", getUserFavs);

/* ENDPOINTS exercises admin */

//app.post("/newExercise", validateAuth, checkAdmin, postNewExercise);
app.post("/newExercise", postNewExercise);
//el postman necesita recargar la imagen a veces

//app.put("/exercises/:idExercise", validateAuth, checkAdmin, putEditExercise);
app.put("/exercises/:idExercise", putEditExercise);

//app.delete("/exercises/:idExercise", validateAuth, checkAdmin, deleteExercise);
app.delete("/exercises/:idExercise", deleteExercise);

/* MIDDLEWARES ERRORES */

// error 404
app.use(errorNotFound);

// errores generico
app.use(errorHandler);

/* ABRIR SERVIDOR */
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});