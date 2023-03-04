/* f recuperar todos usuarios */

const { selectAllUsers } = require("../../repositories/users");

async function getAllUsers(req, res, next) {
  try {
    const users = await selectAllUsers();
    res.send({
      status: "ok - users data recovered",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllUsers;
