/* funcion para recuperar los exercise favoritos de un usuario sabiendo su idUser
se espera: peticion get con path param
 - path param   (:idUser)

se envia: array de objetos exercise con todas sus propiedades
*/

const { idUserSchema } = require("../../validationSchemas");
const { selectUserFavs } = require("../../repositories/exercises");
const { selectUserById } = require("../../repositories/users");
const { createError } = require("../../utilities");

async function getUserFavs(req, res, next) {
  try {
    // validar parametro recibido
    await idUserSchema.validateAsync(req.params);

    // recoger parametro (path param - :idUser) (req.params devuelve objeto- desestrucutrar para obtener solo numero)
    const { idUser } = req.params;

    // lanzar error si no existe el usuario
    const user = await selectUserById(idUser);
    console.log(user)
    if (!user) {
      createError("There is no user with that idUser", 404);
    }

    // recuperar favs de la bbdd con su idUser
    const userFavs = await selectUserFavs(idUser);

    // lanzar error si no existen favs para el idUser solicitado
    if (userFavs.length === 0) {
      createError("The user has no favs", 404);
    }

    // enviar respuesta
    res.status(200).send({ status: "ok - favs recovered", data: userFavs });
  } catch (error) {
    next(error);
  }
}

module.exports = getUserFavs;
