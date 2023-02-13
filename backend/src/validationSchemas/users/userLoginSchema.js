/* schema de validadcion de los datos de login */
const Joi = require("joi");

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
});

module.exports = userLoginSchema;