/* archivo indice para exportar middlewares auxiliares */
const errorNotFound = require("./errorHandler");
const errorHandler = require("./errorHandler");
const checkAdmin = require("./checkAdmin");

module.exports = {
    errorNotFound,
    errorHandler,
    checkAdmin
};