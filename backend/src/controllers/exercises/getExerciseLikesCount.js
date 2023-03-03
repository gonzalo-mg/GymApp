/* funcion para recuperar numero de likes del exercise sabiendo su idExercise
se espera: peticion get con path param
 - path param   (:idExercise)

se envia: numero
*/

const { idExerciseSchema } = require("../../validationSchemas");
const { selectExerciseLikesById } = require("../../repositories/exercises");
const { createError } = require("../../utilities");

async function getExerciseLikesCount(req, res, next) {
  try {
    // validar parametro recibido
    await idExerciseSchema.validateAsync(req.params);

    // recoger parametro (path param - :idExercise) (req.params devuelve objeto- desestrucutrar para obtener solo numero)
    const { idExercise } = req.params;

    // recuperar likes de la bbdd con su idExercise
    const likes = await selectExerciseLikesById(idExercise);

    console.log(`getExerciseLikesCount - likes: ${likes}`)
    console.log(likes)

    // enviar respuesta
    res.status(200).send({ status: "ok - like count recovered", data: likes });
  } catch (error) {
    next(error);
  }
}

module.exports = getExerciseLikesCount;
