/* archivo indice para exportar esquemas de validacion */
// de users
const userLoginSchema = require("./users/userLoginSchema");
const idUserSchema = require("./users/idUserSchema");

// de exercices
const exerciseSchema = require("./exercises/exerciseSchema");
const filtersExercisesSchema = require("./exercises/filtersExercisesSchema");
const idExerciseSchema = require("./exercises/idExerciseSchema");

module.exports = {
  userLoginSchema,
  exerciseSchema,
  filtersExercisesSchema,
  idExerciseSchema,
  idUserSchema,
};
