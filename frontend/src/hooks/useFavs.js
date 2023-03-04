/* HOOK para gestionar favs */

import {
  getFavExercisesService,
  toggleFavService,
} from "../services/exercises";

export const useFavs = () => {
  // f para comprobar si el ej es un fav y setear acorde
  const checkFavStatus = async ({ token, exercise}) => {
    // recuperar inicialmente de backend favs
    const currentFavs = await getFavExercisesService(token);
    console.log(`checkFavStatus - llamando con exercise: ${exercise}`);
    console.log(exercise);
    console.log(`checkFavStatus - recupera currentFavs: ${currentFavs}`);
    console.log(currentFavs);
    // comprobar si el ejercicio renderizado esta entre los favs del usuario
    let filtered = currentFavs.filter(
      (f) => f.idExercise === exercise.idExercise
    );
    console.log(`checkFavStatus - filtrado: ${filtered}`);
    console.log(filtered);
    console.log(`filtered length: ${filtered.length}`);
    // setear estado segun resultados de filtro
    if (filtered.length === 1) {
      console.log(`checkFavStatus isFav`);
      return "isFav";
    } else {
      console.log(`checkFavStatus notFav`);
      return "notFav";
    }
  };

  // f aux para gestionar click en boton fav
  const handleClickFav = async ({ e, token, idExercise }) => {
    e.stopPropagation();
    // post a backend
    const indicator = await toggleFavService({ token, idExercise });
    //console.log(`indicator ${indicator}`)
    // cambiar css segun indica backend
    if (indicator) {
      return "isFav";
    } else {
      return "notFav";
    }
  };

  return { handleClickFav, checkFavStatus };
};
