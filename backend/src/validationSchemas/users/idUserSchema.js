/* schema de validadcion del idUser para recibir como parametro en una peticion */

const Joi = require("joi");

const idUserSchema = Joi.object({
  idUser: Joi.number().integer().positive().required(),
});

module.exports = idUserSchema;
