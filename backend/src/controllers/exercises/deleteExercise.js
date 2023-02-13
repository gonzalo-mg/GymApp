/* funcion: borrar ejercicio de la bbdd 
se espera: peticion get con path param
 - path param   (:idExercise)
se envia: confirmacion
*/

const { idExerciseSchema } = require("../../validationSchemas");
const { selectExerciseById, deleteExerciseById } = require("../../repositories/exercises");
const { createError } = require("../../utilities");

async function deleteExercise(req, res, next) {
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

    // borrar
    await deleteExerciseById(idExercise);

    // enviar respuesta
    res.status(200).send({ status: "ok - exercise deleted succesfully"});
  } catch (error) {
    next(error);
  }
}

module.exports = deleteExercise;
