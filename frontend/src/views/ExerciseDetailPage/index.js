/* VISTA de detalle de exercise recupeardo por :id */

import "./index.css";
import { ExerciseCard } from "../../components/ExerciseCard";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { TextBanner } from "../../components/TextBanner";
import { UserCard } from "../../components/UserCard";

import {
  getExerciseByIdService,
  toggleFavService,
  getFavExercisesService,
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
  const { useGetExercises } = useExercises();
  const exercise = useGetExercises({ token, idExercise });
  const [favChange, setFavChange] = useState(0);
  const [favClass, setFavClass] = useState("favClass0");
  let getFavs = true;
  const favEx = useGetExercises({ token, getFavs, favChange });

  const handleClickFav = () => {
    setFavChange(favChange + 1);
  };

  const checkFavStatus = ({ favEx, exercise }) => {
    console.log(`checkFavStatus llamada`);
    console.log(`checkFavStatus favEx ${favEx}`);
    console.log(favEx);
    console.log(`checkFavStatus favEx ${exercise}`);
    console.log(exercise);
    //devolver "isFav" si sí
    // sera fav si el filtrado devuelve q lo encontro
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

  // efecto refrescar css y listado de favs
  useEffect(() => {
    const handleFavChange = async () => {
      
      checkFavStatus({ favEx, exercise });
    };
    handleFavChange();
  }, [favChange, favClass]);

  // invocar hook de navegacion entre ejercicios
  const { toExercisesPage, toAnonUserPage } = useViewNavigation();

  // devolver banner, tarjeta del ejercicio y boton de volver; si no existe el ejercicio lanzar alerta y volver a lista de ejercicios

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
        ></ExerciseCard>
      </article>
    </>
  );
};
