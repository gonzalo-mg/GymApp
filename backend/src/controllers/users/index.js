/* archivo indice para exportar controllers de users */
const loginUser = require("./loginUser");
const registerUser = require("./registerUser");
const getUserData = require("./getUserData");
const deleteUser = require("./deleteUser")
const getAllUsers = require("./getAllUsers")

module.exports = {
  loginUser,
  registerUser,
  getUserData,
  deleteUser,
  getAllUsers
};
