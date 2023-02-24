/* archivo indice para exportar consultas sql users */
const selectUserByEmail = require("./selectUserByEmail");
const selectUserById = require("./selectUserById");
const insertUser = require("./insertUser")

module.exports = {
    selectUserByEmail,
    selectUserById,
    insertUser
};