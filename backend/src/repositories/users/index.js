/* archivo indice para exportar consultas sql users */
const selectUserByEmail = require("./selectUserByEmail");
const selectUserById = require("./selectUserById");
const insertUser = require("./insertUser")
const deleteUserById = require("./deleteUserById")
const selectAllUsers = require("./selectAllUsers")

module.exports = {
    selectUserByEmail,
    selectUserById,
    insertUser,
    deleteUserById,
    selectAllUsers
};