/* HOOK para gestionar favs */

import {
  getFavExercisesService,
  toggleFavService,
} from "../services/exercises";

export const useFavs = () => {
  // f para comprobar si el ej es un fav y setear acorde
  const checkFavStatus = async ({ token, exercise, setFavClass }) => {
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
      setFavClass("isFav");
    } else {
      console.log(`checkFavStatus notFav`);
      setFavClass("notFav");
    }
  };

  // f aux para gestionar click en boton fav
  const handleClickFav = async ({ e, token, idExercise, setFavClass }) => {
    e.stopPropagation();
    // post a backend
    const indicator = await toggleFavService({ token, idExercise });
    //console.log(`indicator ${indicator}`)
    // cambiar css segun indica backend
    indicator ? setFavClass("isFav") : setFavClass("notFav");
  };

  return { handleClickFav, checkFavStatus };
};
