/* funcion para recuperar los exercise con like de un usuario sabiendo su token

se envia: array de objetos exercise con todas sus propiedades
*/

const { selectUserLikes } = require("../../repositories/exercises");
const { selectUserById } = require("../../repositories/users");
const { createError } = require("../../utilities");

async function getUserLikes(req, res, next) {
  try {
    // recoger parametro (path param - :idUser) (req.params devuelve objeto- desestrucutrar para obtener solo numero)
    const { idUser } = req.auth;

    // lanzar error si no existe el usuario
    const user = await selectUserById(idUser);
    if (!user) {
      createError("There is no user with that idUser", 404);
    }

    // recuperar likes de la bbdd con su idUser
    const userLikes = await selectUserLikes(idUser);

    // enviar respuesta
    res.status(200).send({ status: "ok - likes recovered", data: userLikes });
  } catch (error) {
    next(error);
  }
}

module.exports = getUserLikes;
