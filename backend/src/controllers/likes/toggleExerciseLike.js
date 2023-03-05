const {
  selectLikeByExerciseAndUser,
  insertLike,
  deleteLike,
  newLike,
} = require("../../repositories/likes");
const { selectExerciseById } = require("../../repositories/exercises");
const { idExerciseSchema } = require("../../validationSchemas");
const { createError } = require("../../utilities");

const toggleExerciseLike = async (req, res, next) => {
  try {
    // validar parametro recibido
    await idExerciseSchema.validateAsync(req.params);

    // recoger parametro (path param - :idExercise) (req.params devuelve objeto- desestrucutrar para obtener solo numero)
    const { idExercise } = req.params;

    // recuperar exercise de la bbdd con su idExercise
    const exercise = await selectExerciseById(idExercise);

    // lanzar error si no existe el idExercise solicitado
    if (typeof exercise === "undefined") {
      createError("There is no exercise with that idExercise", 404);
    }

    // recoger idUser de la autenticacion
    const { idUser } = req.auth;

    // seleccionar like de la bbdd
    const like = await selectLikeByExerciseAndUser(idExercise, idUser);

    let statusCode;
    //si es la primera vez q el usuario le da crearlo
    if (like === undefined) {
      await newLike(idExercise, idUser);
      statusCode = 201;
      // reseleccionar like de la bbdd
      //const updatedLike = await selectLikeByExerciseAndUser(idExercise, idUser);
      //res.status(statusCode).send({ status: "ok", updatedLike });
    }

    // si tiene estado true se quita
    else if (like.stateLike === 1) {
      await deleteLike(idExercise, idUser);
      statusCode = 200;
    } //si no se pone
    else {
      await insertLike(idExercise, idUser);
      statusCode = 201;
    }

    // reseleccionar like de la bbdd
    const updatedLike = await selectLikeByExerciseAndUser(idExercise, idUser);

    res.status(statusCode).send({ status: "ok", updatedLike });
  } catch (error) {
    next(error);
  }
};

module.exports = toggleExerciseLike;
