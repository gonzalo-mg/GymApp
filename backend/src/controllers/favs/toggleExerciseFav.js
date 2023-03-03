const {
  selectFavByExerciseAndUser,
  insertFav,
  deleteFav,
  newFav,
} = require("../../repositories/favs");
const { selectExerciseById } = require("../../repositories/exercises");
const { idExerciseSchema } = require("../../validationSchemas");
const { createError } = require("../../utilities");

const toggleExerciseFav = async (req, res, next) => {
  try {
    // validar parametro recibido
    await idExerciseSchema.validateAsync(req.params);

    // recoger parametro (path param - :idExercise) (req.params devuelve objeto- desestrucutrar para obtener solo numero)
    const { idExercise } = req.params;
    console.log(`backend toggleExerciseFav - idExercise: ${idExercise}`)

    // recoger idUser de la autenticacion
    const { idUser } = req.auth;
    console.log(`backend toggleExerciseFav - idUser: ${idUser}`)

    // recuperar exercise de la bbdd con su idExercise
    const exercise = await selectExerciseById(idExercise);

    // lanzar error si no existe el idExercise solicitado
    if (typeof exercise === "undefined") {
      createError("There is no exercise with that idExercise", 404);
    }

    // seleccionar fav de la bbdd
    let fav = await selectFavByExerciseAndUser(idExercise, idUser);

    let statusCode;
    //let updatedFav;
    //si es la primera vez q el usuario le da crearlo
    if (fav === undefined) {
      await newFav(idExercise, idUser);
      statusCode = 201;
      // reseleccionar fav de la bbdd
      fav = await selectFavByExerciseAndUser(idExercise, idUser);
      res.status(statusCode).send({ status: "ok", fav });
    }

    // si tiene estado true se quita
    if (fav.stateFav === 1) {
      await deleteFav(idExercise, idUser);
      statusCode = 200;
    } //si no se pone
    else {
      await insertFav(idExercise, idUser);
      statusCode = 201;
    }

    // reseleccionar fav de la bbdd
    fav = await selectFavByExerciseAndUser(idExercise, idUser);

    res.status(statusCode).send({ status: "ok", fav });
  } catch (error) {
    next(error);
  }
};

module.exports = toggleExerciseFav;
