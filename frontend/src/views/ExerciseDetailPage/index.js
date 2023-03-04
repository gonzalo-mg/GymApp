/* VISTA de detalle de exercise recupeardo por :id */

import "./index.css";
import { ExerciseCard } from "../../components/ExerciseCard";
import { TextBanner } from "../../components/TextBanner";
import { UserCard } from "../../components/UserCard";

import { useState, useEffect, useContext } from "react";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { useParams } from "react-router-dom";
import { useExercises } from "../../hooks/useExercises";
import { useFavs } from "../../hooks/useFavs";
import { useLikes } from "../../hooks/useLikes";
import { AuthContext } from "../../contexts/AuthContext";

export const ExerciseDetailPage = () => {
  // recuperar contexto autenticacion
  const { token, currentUser } = useContext(AuthContext);

  // recuperar del param el id del exercise
  const { idExercise } = useParams();

  //usar hook recuperar ejercicios
  const { useSingleExercises } = useExercises();
  const exercise = useSingleExercises({ token, idExercise });

/*   // GESTION FAVS

  // hook favs
  const { handleClickFav, checkFavStatus } = useFavs();

  // f estado para modificar css boton fav
  const [favClass, setFavClass] = useState(() => checkFavStatus(exercise));

  // efecto para setear estado de favClass al montar componente y ante cambios
  useEffect(() => {
    checkFavStatus(exercise);
  }, [favClass]);

  // GESTION LIKES
  const { handleClickLike, checkLikedStatus, checkLikeCount } = useLikes();

  // f estado para modificar css boton like
  const [likeClass, setLikeClass] = useState(() => checkLikedStatus(exercise));

  // f estado para likeCount; iniciado a lo q devuelve backend
  const [likeCount, setLikeCount] = useState(() => {
    checkLikeCount({ token, idExercise });
  });

  // efecto para setear estado de likeClass y likeCount al montar componente y ante cambios
  useEffect(() => {
    checkLikedStatus(exercise);
    checkLikeCount({ token, idExercise });
  }, [likeClass]);
 */
  // invocar hook de navegacion entre ejercicios
  const { toExercisesPage, toAnonUserPage } = useViewNavigation();

  // devolver tarjeta usuario, texto indicativo, tarjeta del ejercicio y botones;
  // // si usuario invalido volver a vista login
  // // si no existe ejercicio volver a lista ejercicios general

  return !currentUser ? (
    toAnonUserPage()
  ) : (
    <>
      <UserCard></UserCard>
      <article className="ExerciseDetail">
        <TextBanner text={"Vista de Detalles"}></TextBanner>

        {!exercise ? toExercisesPage() : undefined}

        <ExerciseCard
          key={exercise.idExercise}
          exercise={exercise}
        ></ExerciseCard>
      </article>
    </>
  );
};
