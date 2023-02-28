/* f recuperar datos del usuario y comprobar validez del token, recibiendo un token */

const { selectUserById } = require("../../repositories/users");

async function getUserData(req, res, next) {
  try {
    const user = await selectUserById(req.auth.idUser);
    //console.log(`idUser: ${req.auth.idUser}`);
    //console.log(`user: ${user}`);
    res.send({
      status: "ok - user data recovered",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserData;
