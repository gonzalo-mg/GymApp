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
  getUserData,
  deleteUser,
  getAllUsers
} = require("./controllers/users");

// de exercices
const {
  postNewExercise,
  getExercises,
  getExerciseDetails,
  deleteExercise,
  getUserFavs,
  getUserLikes,
  putEditExercise,
  getExerciseLikesCount
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

/* ENDPOINTS users */

app.post("/login", loginUser);

app.post("/register", registerUser);

app.get("/currentUser", validateAuth, getUserData)

/* ENDPOINTS exercises - worker */

app.get("/exercises", validateAuth, getExercises);


app.get("/exercises/:idExercise", validateAuth, getExerciseDetails);


app.post("/exercises/:idExercise/like", validateAuth, toggleExerciseLike);

app.get("/exercises/:idExercise/like/count", validateAuth, getExerciseLikesCount);

app.post("/exercises/:idExercise/fav", validateAuth, toggleExerciseFav);

app.get("/favorites", validateAuth, getUserFavs);

app.get("/likes", validateAuth, getUserLikes);


/* ENDPOINTS admin */

app.post("/newExercise", validateAuth, checkAdmin, postNewExercise);

app.put("/exercises/:idExercise", validateAuth, checkAdmin, putEditExercise);

app.delete("/exercises/:idExercise", validateAuth, checkAdmin, deleteExercise);

app.delete("/users/:idUser", validateAuth, checkAdmin, deleteUser);

app.get("/users", validateAuth, checkAdmin, getAllUsers);

app.post("/newUser", validateAuth, checkAdmin, registerUser);

/* MIDDLEWARES ERRORES */

// error 404
app.use(errorNotFound);

// errores generico
app.use(errorHandler);

/* ABRIR SERVIDOR */
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});