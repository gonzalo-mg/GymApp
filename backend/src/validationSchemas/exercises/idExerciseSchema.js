/* schema de validadcion del idExercise para recibir como parametro en una peticion */

const Joi = require("joi");

const idExerciseSchema = Joi.object({
  idExercise: Joi.number().integer().positive().required(),
});

module.exports = idExerciseSchema;
