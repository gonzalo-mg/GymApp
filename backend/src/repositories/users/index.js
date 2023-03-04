/* archivo indice para exportar consultas sql users */
const selectUserByEmail = require("./selectUserByEmail");
const selectUserById = require("./selectUserById");
const insertUser = require("./insertUser")
const deleteUserById = require("./deleteUserById")

module.exports = {
    selectUserByEmail,
    selectUserById,
    insertUser,
    deleteUserById
};