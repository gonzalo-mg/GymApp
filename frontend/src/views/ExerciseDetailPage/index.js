/* VISTA de detalle de exercise recupeardo por :id */

import "./index.css";
import { ExerciseCard } from "../../components/ExerciseCard";
import { TextBanner } from "../../components/TextBanner";
import { UserCard } from "../../components/UserCard";

import {
  toggleFavService,
  toggleLikeService,
  getFavExercisesService,
  getLikedExercisesService,
  getExerciseLikesCountService,
} from "../../services/exercises";
import { useState, useEffect, useContext } from "react";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { useParams } from "react-router-dom";
import { useExercises } from "../../hooks/useExercises";
import { AuthContext } from "../../contexts/AuthContext";

export const ExerciseDetailPage = () => {
  // recuperar contexto autenticacion
  const { token, currentUser } = useContext(AuthContext);

  // recuperar del param el id del exercise
  const { idExercise } = useParams();

  //usar hook recuperar ejercicios
  const { useSingleExercises, useFavExercises, useLikedExercises } =
    useExercises();
  const exercise = useSingleExercises({ token, idExercise });

  // GESTION FAVS

  // f para comprobar si el ej es un fav y setear acorde
  const checkFavStatus = async (exercise) => {
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

  // f estado para modificar css boton fav
  const [favClass, setFavClass] = useState(() => checkFavStatus(exercise));

  // f aux para gestionar click en fav
  const handleClickFav = async (e) => {
    e.stopPropagation();
    // post a backend
    const indicator = await toggleFavService({ token, idExercise });
    //console.log(`indicator ${indicator}`)
    // cambiar css segun indica backend
    indicator ? setFavClass("isFav") : setFavClass("notFav");
  };

  // efecto para setear estado de favClass al montar componente y ante cambios
  useEffect(() => {
    checkFavStatus(exercise);
  }, [favClass]);

  // GESTION LIKES

  // f para comprobar si el ej tiene like
  const checkLikedStatus = async (exercise) => {
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

  // f estado para modificar css boton like
  const [likeClass, setLikeClass] = useState(() => checkLikedStatus(exercise));

  // f aux para gestionar click en like
  const handleClickLike = async (e) => {
    e.stopPropagation();
    // post a backend
    const indicator = await toggleLikeService({ token, idExercise });
    //console.log(`indicator ${indicator}`)
    // cambiar css segun accion
    indicator ? setLikeClass("isLike") : setLikeClass("notLike");
  };

  // f para recuperar num total de likes de un ejercicio y setear acorde
  const checkLikeCount = async ({ token, idExercise }) => {
    console.log(`checkLikeCount-llamada con id ${idExercise}`);
    const recoveredLikeCount = await getExerciseLikesCountService({
      token,
      idExercise,
    });
    console.log(`checkLikeCount-recoveredLikeCount: ${recoveredLikeCount}`);
    setLikeCount(recoveredLikeCount);
    console.log(`checkLikeCount-likeCount setTo: ${likeCount}`);
  };

  // f estado para likeCount; iniciado a lo q devuelve backend
  const [likeCount, setLikeCount] = useState(() => {
    checkLikeCount({ token, idExercise });
  });

  // efecto para setear estado de likeClass y likeCount al montar componente y ante cambios
  useEffect(() => {
    checkLikedStatus(exercise);
    checkLikeCount({ token, idExercise });
  }, [likeClass]);


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
          idExercise={exercise.idExercise}
          name={exercise.name}
          description={exercise.description}
          typology={exercise.typology}
          muscles={exercise.muscles}
          picture={exercise.picture}
          onClickFav={(e) => handleClickFav(e)}
          classNameFav={`ButtonMiniFav ${favClass}`}
          onClickLike={(e) => handleClickLike(e)}
          classNameLike={`ButtonMiniLike ${likeClass}`}
          likeCount={likeCount}
        ></ExerciseCard>
      </article>
    </>
  );
};
