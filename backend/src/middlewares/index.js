/* archivo indice para exportar middlewares auxiliares */
const errorNotFound = require("./errorHandler");
const errorHandler = require("./errorHandler");
const checkAdmin = require("./checkAdmin");
const validateAuth = require("./validateAuth");

module.exports = {
  errorNotFound,
  errorHandler,
  checkAdmin,
  validateAuth,
};
