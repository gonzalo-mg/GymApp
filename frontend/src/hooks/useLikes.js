/* HOOK para gestionar likes */

import {
  getLikedExercisesService,
  toggleLikeService,
  getExerciseLikesCountService,
} from "../services/exercises";

export const useLikes = () => {
  // f para comprobar si el ej tiene like
  const checkLikedStatus = async ({ token, exercise }) => {
    const currentLiked = await getLikedExercisesService(token);
    console.log(`checkLikedStatus - llamando con exercise: ${exercise}`);
    console.log(exercise);
    console.log(`checkLikedStatus - recupera currentLikes: ${currentLiked}`);
    console.log(currentLiked);
    let filtered = currentLiked.filter(
      (l) => l.idExercise === exercise.idExercise
    );
    console.log(`checkLikedStatus - filtrado: ${filtered}`);
    console.log(filtered);
    console.log(`filtered length: ${filtered.length}`);
    if (filtered.length === 1) {
      console.log(`checkLikedStatus isLike`);
      return "isLike";
    } else {
      console.log(`checkLikedStatus notLike`);
      return "notLike";
    }
  };

  // f para gestionar click en like q devuelve el nuevo estado de like
  const handleClickLike = async ({ e, token, idExercise }) => {
    e.stopPropagation();
    // post a backend
    const indicator = await toggleLikeService({ token, idExercise });
    //console.log(`indicator ${indicator}`)
    // cambiar css segun accion
    if (indicator) {
      return "isLike";
    } else {
      return "notLike";
    }
  };

  // f para recuperar num total de likes de un ejercicio
  const checkLikeCount = async ({
    token,
    idExercise,
  }) => {
    console.log(`checkLikeCount-llamada con id ${idExercise}`);
    const recoveredLikeCount = await getExerciseLikesCountService({
      token,
      idExercise,
    });
    console.log(`checkLikeCount-recoveredLikeCount: ${recoveredLikeCount}`);
    return(recoveredLikeCount);
  };

  return { handleClickLike, checkLikedStatus, checkLikeCount };
};
