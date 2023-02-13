/* funcion para recuperar un exercise del sistema sabiendo su idExercise
se espera: peticion get con path param
 - path param   (:idExercise)

se envia: objeto exercise con todas sus propiedades
*/

const { idExerciseSchema } = require("../../validationSchemas");
const { selectExerciseById } = require("../../repositories/exercises");
const { createError } = require("../../utilities");

async function getExerciseDetails(req, res, next) {
  try {
    // validar parametro recibido
    await idExerciseSchema.validateAsync(req.params);

    // recoger parametro (path param - :idExercise) (req.params devuelve objeto- desestrucutrar para obtener solo numero)
    const { idExercise } = req.params;

    // recuperar exercise de la bbdd con su idExercise
    const exercise = await selectExerciseById(idExercise);

    // lanzar error si no existe el idExercise solicitado
    if (typeof exercise === "undefined") {
      createError("There is no exercise with that idExercise", 404)
    }

    // enviar respuesta
    res.status(200).send({ status: "ok - exercise recovered", data: exercise });
  } catch (error) {
    next(error);
  }
}

module.exports = getExerciseDetails;
