/* funcion para recuperar los exercises del sistema
se espera: peticion get
 - opcionalmente query strings  (key=valu) para filtrar por:
 -- name
 -- typology
 -- muscles
se envia: array de objetos; cada objeto un exercise que pasa el filtrado
*/

const { filtersExercisesSchema } = require("../../validationSchemas");
const { selectExercises } = require("../../repositories/exercises");

async function getExercises(req, res, next) {
  try {
    //recoger filtros; sera un objeto con los key=values de la peticion
    const filters = req.query;

    // // validar filters
    await filtersExercisesSchema.validateAsync(filters);

    // recuper exercises de la bbdd con los criterios de los filtros
    const exercises = await selectExercises(filters);

    // enviar respuesta
    res.status(200).send({ status: "ok", data: { filters, exercises } });
  } catch (error) {
    next(error);
  }
}

module.exports = getExercises;
