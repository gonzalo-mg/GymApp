/* HOOK para checkear favs y likes de ejercicios */

import { useExercises } from "./useExercises";

export const useCheck = () => {
  const { useGetExercises } = useExercises();

  // COMPROBAR si un ejercicio es fav del usuario
  const useCheckFav = ({ idExercise, token }) => {
    let favs = true;
    // recueprar los favs del usuario
    const userFavs = useGetExercises({ token, favs });
    // comprobar si el array contiene un idExercise coincidente
    let idFavs = userFavs.filter((ex) => {
      return ex.idExercise === idExercise;
    });
    if (idFavs.length !== 0) {
      // si coincide devolver string "isFav" para usar como clase css
      return "isFav";
    } else {
      return null;
    }
  };

  // COMPROBAR si un ejercicio es like del usuario
  const useCheckLike = ({ idExercise, token }) => {
    let likes = true;
    // recueprar los favs del usuario
    const userLikes = useGetExercises({ token, likes });
    // comprobar si el array contiene un idExercise coincidente
    let idLikes = userLikes.filter((ex) => {
      return ex.idExercise === idExercise;
    });
    if (idLikes.length !== 0) {
      // si coincide devolver string "isLike" para usar como clase css
      console.log(`useCheckLike - isLike`);
      return "isLike";
    } else {
      console.log(`useCheckLike - null`);
      return null;
    }
  };

  return { useCheckFav, useCheckLike };
};
