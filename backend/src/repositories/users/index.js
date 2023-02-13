/* archivo indice para exportar consultas sql users */
const selectUserByEmail = require("./selectUserByEmail");
const selectUserById = require("./selectUserById");

module.exports = {
    selectUserByEmail,
    selectUserById
};