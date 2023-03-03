/* archivo indice para exportar controllers de exercises */
const postNewExercise = require("./postNewExercise");
const getExercises = require("./getExercises");
const getExerciseDetails = require("./getExerciseDetails");
const deleteExercise = require("./deleteExercise");
const getUserFavs = require("./getUserFavs");
const getUserLikes = require("./getUserLikes");
const putEditExercise = require("./putEditExercise");
const getExerciseLikesCount = require("./getExerciseLikesCount")

module.exports = {
  postNewExercise,
  getExercises,
  getExerciseDetails,
  deleteExercise,
  getUserFavs,
  getUserLikes,
  putEditExercise,
  getExerciseLikesCount,
};
