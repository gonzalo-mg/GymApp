/* archivo indice para exportar queries de exercises */
const insertExercise = require("./insertExercise");
const selectExerciseByName = require("./selectExerciseByName");
const selectExercises = require("./selectExercises");
const selectExerciseById = require("./selectExerciseById");
const deleteExerciseById = require("./deleteExerciseById");
const selectUserFavs = require("./selectUserFavs");
const selectUserLikes = require("./selectUserLikes");
const editExercise = require("./editExercise");
const selectExerciseLikesById = require("./selectExerciseLikesById");

module.exports = {
  insertExercise,
  selectExerciseByName,
  selectExercises,
  selectExerciseById,
  deleteExerciseById,
  selectUserFavs,
  selectUserLikes,
  editExercise,
  selectExerciseLikesById,
};
