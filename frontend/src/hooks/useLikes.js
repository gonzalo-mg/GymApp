/* HOOK para gestionar likes */

import {
  getLikedExercisesService,
  toggleLikeService,
  getExerciseLikesCountService,
} from "../services/exercises";

export const useLikes = () => {
  // f para comprobar si el ej tiene like
  const checkLikedStatus = async ({ token, exercise, setLikeClass }) => {
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
      setLikeClass("isLike");
    } else {
      console.log(`checkLikedStatus notLike`);
      setLikeClass("notLike");
    }
  };

  // f aux para gestionar click en like
  const handleClickLike = async ({ e, token, idExercise, setLikeClass }) => {
    e.stopPropagation();
    // post a backend
    const indicator = await toggleLikeService({ token, idExercise });
    //console.log(`indicator ${indicator}`)
    // cambiar css segun accion
    indicator ? setLikeClass("isLike") : setLikeClass("notLike");
  };

  // f para recuperar num total de likes de un ejercicio y setear acorde
  const checkLikeCount = async ({
    token,
    idExercise,
    setLikeCount,
    likeCount,
  }) => {
    console.log(`checkLikeCount-llamada con id ${idExercise}`);
    const recoveredLikeCount = await getExerciseLikesCountService({
      token,
      idExercise,
    });
    console.log(`checkLikeCount-recoveredLikeCount: ${recoveredLikeCount}`);
    setLikeCount(recoveredLikeCount);
    console.log(`checkLikeCount-likeCount setTo: ${likeCount}`);
  };

  return { handleClickLike, checkLikedStatus, checkLikeCount };
};
