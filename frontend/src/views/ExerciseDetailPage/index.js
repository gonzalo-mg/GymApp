/* VISTA de detalle de exercise recupeardo por :id */

import "./index.css";
import { ExerciseCard } from "../../components/ExerciseCard";
import { TextBanner } from "../../components/TextBanner";
import { UserCard } from "../../components/UserCard";

import { toggleFavService, toggleLikeService } from "../../services/exercises";
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
  const { useGetExercises } = useExercises();
  const exercise = useGetExercises({ token, idExercise });

  // GESTION FAVS

  // f estado para trackear cambios de fav y re-renderizar ante clicks del usuario
  const [favChange, setFavChange] = useState(0);
  // f estado para modificar css boton fav
  const [favClass, setFavClass] = useState("favClass0");
  // solicitar listado actualizado de favs del usuario
  let getFavs = true;
  const favEx = useGetExercises({ token, getFavs, favChange });

  // f aux para indicar cambio en los favs
  const handleClickFav = () => {
    setFavChange(favChange + 1);
  };

  // f para comprobar si el ej es un fav
  const checkFavStatus = ({ favEx, exercise }) => {
    console.log(`checkFavStatus llamada`);
    console.log(`checkFavStatus favEx ${favEx}`);
    console.log(favEx);
    console.log(`checkFavStatus favEx ${exercise}`);
    console.log(exercise);
    let filtered = favEx.filter((f) => f.idExercise === exercise.idExercise);
    console.log(`checkFavStatus filtered ${filtered}`);
    console.log(filtered);
    if (filtered.length !== 0) {
      console.log(`checkFavStatus isFav`);
      setFavClass("isFav");
    } else {
      console.log(`checkFavStatus notFav`);
      setFavClass(null);
    }
  };

  // efecto refrescar cuando clica boton de fav
  useEffect(() => {
    const handleFavChange = async () => {
      checkFavStatus({ favEx, exercise });
    };
    handleFavChange();
  }, [favChange, favClass]);


// GESTION LIKES

  // f estado para trackear cambios de like y re-renderizar ante clicks del usuario
  const [likeChange, setLikeChange] = useState(0);
  // f estado para modificar css boton like
  const [likeClass, setLikeClass] = useState("likeClass0");
  // solicitar listado actualizado de liked del usuario
  let getLiked = true;
  const likedEx = useGetExercises({ token, getLiked, likeChange });

  // f aux para indicar cambio en like
  const handleClickLike = () => {
    setLikeChange(likeChange + 1);
  };

  // f para comprobar si el ej tiene like
  const checkLikedStatus = ({ likedEx, exercise }) => {
    console.log(`checkLikeStatus llamada`);
    console.log(`checkLikeStatus favEx ${favEx}`);
    console.log(favEx);
    console.log(`checkLikeStatus favEx ${exercise}`);
    console.log(exercise);
    let filtered = favEx.filter((f) => f.idExercise === exercise.idExercise);
    console.log(`checkLikeStatus filtered ${filtered}`);
    console.log(filtered);
    if (filtered.length !== 0) {
      console.log(`checkLikeStatus isLike`);
      setFavClass("isLike");
    } else {
      console.log(`checkLikeStatus notLiked`);
      setFavClass(null);
    }
  };

  // efecto refrescar cuando clica boton de like
  useEffect(() => {
    const handleLikeChange = async () => {
      checkFavStatus({ likedEx, exercise });
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
          onClickFav={(e) => {
            e.stopPropagation();
            toggleFavService({ token, idExercise });
            handleClickFav();
          }}
          classNameFav={`ButtonMiniFav ${favClass}`}
          onClickLike={(e) => {
            e.stopPropagation();
            toggleLikeService({ token, idExercise });
            handleClickLike();
          }}
          classNameLike={`ButtonMiniLike ${likeClass}`}
        ></ExerciseCard>
      </article>
    </>
  );
};
