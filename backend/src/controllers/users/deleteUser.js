/* funcion: borrar usuario de la bbdd 
se espera: peticion get con path param
 - path param   (:idUser)
se envia: confirmacion
*/

//const { idExerciseSchema } = require("../../validationSchemas");
const { selectUserById, deleteUserById } = require("../../repositories/users");
const { createError } = require("../../utilities");

async function deleteUser(req, res, next) {
  try {
    // validar parametro recibido Modificar si hay tiempo
    //await idExerciseSchema.validateAsync(req.params);

    // recoger parametro (path param - :idUser) (req.params devuelve objeto- desestrucutrar para obtener solo numero)
    const { idUser} = req.params;

    // recuperar user de la bbdd con su idExercise
    const user = await selectUserById(idUser);

    // lanzar error si se solicita admin
    if (user.role === "admin") {
      createError("Admins can not be deleted", 404)
    }

    // lanzar error si no existe el id solicitado
    if (typeof user === "undefined") {
      createError("There is no user with that idUser", 404)
    }

    // borrar
    await deleteUserById(idUser);

    // enviar respuesta
    res.status(200).send({ status: "ok - user deleted succesfully"});
  } catch (error) {
    next(error);
  }
}

module.exports = deleteUser;
