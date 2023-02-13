/* schema de validadcion de los filtros de exercise */
const Joi = require("joi");

const filtersExercisesSchema = Joi.object({
  name: Joi.string().max(50),
  typology: Joi.string().max(50),
  muscles: Joi.string().max(50),
});

module.exports = filtersExercisesSchema;
