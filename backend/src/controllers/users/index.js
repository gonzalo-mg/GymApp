/* archivo indice para exportar controllers de users */
const loginUser = require("./loginUser");
const registerUser = require("./registerUser");
const getUserData = require("./getUserData");
const deleteUser = require("./deleteUser")

module.exports = {
  loginUser,
  registerUser,
  getUserData,
  deleteUser
};
