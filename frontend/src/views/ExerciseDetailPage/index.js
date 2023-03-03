/* VISTA de detalle de exercise recupeardo por :id */

import "./index.css";
import { ExerciseCard } from "../../components/ExerciseCard";
import { TextBanner } from "../../components/TextBanner";
import { UserCard } from "../../components/UserCard";

import {
  toggleFavService,
  toggleLikeService,
  getFavExercisesService,
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

  // f para comprobar si el ej es un fav
  const checkFavStatus = async (exercise) => {
    const currentFavs = await getFavExercisesService(token);
    console.log(`checkFavStatus - llamando con exercise: ${exercise}`);
    console.log(exercise);
    console.log(`checkFavStatus - recupera currentFavs: ${currentFavs}`);
    console.log(currentFavs);
    let filtered = currentFavs.filter(
      (f) => f.idExercise === exercise.idExercise
    );
    console.log(`checkFavStatus - filtrado: ${filtered}`);
    console.log(filtered);
    console.log(`filtered length: ${filtered.length}`);
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
    // cambiar css segun accion
    indicator ? setFavClass("isFav") : setFavClass("notFav");
  };


  // efecto para setear estado de favClass al montar componente o modificar favClass con clicado
  useEffect(() => {
    checkFavStatus(exercise);
  }, [favClass]);

  // GESTION LIKES

  // f estado para trackear cambios de like y re-renderizar ante clicks del usuario
  const [likeChange, setLikeChange] = useState("likeChange0");
  // f estado para modificar css boton like
  const [likeClass, setLikeClass] = useState("likeClass0");
  // solicitar listado actualizado de liked del usuario
  let getLiked = true;
  const likedEx = useLikedExercises({ token, getLiked, likeChange });

  // f estado likes totales del ejercicio
  const [likeCount, setLikeCount] = useState("likeCount0");

  // f aux para indicar cambio en like
  const handleClickLike = () => {
    setLikeChange(likeChange + 1);
  };

  // f para comprobar si el ej tiene like
  const checkLikedStatus = ({ likedEx, exercise }) => {
    let filtered = likedEx.filter((l) => l.idExercise === exercise.idExercise);

    if (filtered.length !== 0) {
      console.log(`checkLikeStatus isLike`);
      setLikeClass("isLike");
    } else {
      console.log(`checkLikeStatus notLiked`);
      setLikeClass(null);
    }
  };

  // f para recuprar likeCount
  const updateLikeCount = async ({ token, idExercise }) => {
    const num = await getExerciseLikesCountService({ token, idExercise });
    setLikeCount(num);
  };

  // efecto refrescar cuando clica boton de like
  useEffect(() => {
    const handleLikeChange = async () => {
      checkLikedStatus({ likedEx, exercise });
      updateLikeCount({ token, idExercise });
    };
    handleLikeChange();
  }, [likeChange, likeClass]);

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
          onClickLike={(e) => {
            e.stopPropagation();
            toggleLikeService({ token, idExercise });
            handleClickLike();
          }}
          classNameLike={`ButtonMiniLike ${likeClass}`}
          likeCount={likeCount}
        ></ExerciseCard>
      </article>
    </>
  );
};
/* 
onClickFav={(e) => {
            e.stopPropagation();
            toggleFavService({ token, idExercise });
            handleClickFav();
          }}

*/
