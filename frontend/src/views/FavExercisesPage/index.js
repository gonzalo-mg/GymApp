/* VISTA de listado de favs del currentUser */

import "./index.css";

import { useState, useEffect, useContext } from "react";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { AuthContext } from "../../contexts/AuthContext";

import { useExercises } from "../../hooks/useExercises";

import { toggleFavService } from "../../services/exercises";
import { ExerciseCard } from "../../components/ExerciseCard";
import { TextBanner } from "../../components/TextBanner";
import { UserCard } from "../../components/UserCard";

export const FavExercisesPage = () => {
  // cargar contexto autenticacion
  const { token, currentUser } = useContext(AuthContext);

  // f estado para rastrear elminiaciones de favs
  const [cacheFavs, setCacheFavs] = useState(0);

  //usar hook recuperar ejercicios para favs
  let getFavs = true;
  const { useGetExercises } = useExercises();
  const exercises = useGetExercises({ token, getFavs });

  // invocar hook de navegacion entre vistas
  const { toExercisesPage, toExerciseDetailPage, toAnonUserPage } =
    useViewNavigation();

  // devolver una card por cada fav
  return !currentUser ? (
    toAnonUserPage()
  ) : (
    <>
      <UserCard></UserCard>
      <article className="exercisesList">
        <TextBanner
          text={
            exercises.length === 0
              ? "No tienes favoritos"
              : "Estos son tus favoritos"
          }
        ></TextBanner>

        {exercises.map((ex) => {
          return (
            <ExerciseCard
              key={ex.idExercise}
              idExercise={ex.idExercise}
              name={ex.name}
              picture={ex.picture}
              onClickCard={(e) => {
                e.stopPropagation();
                console.log(`FavExercisesPage - onClickCard`)
                toExerciseDetailPage(ex.idExercise);
              }}
              onClickFav={(e) => {
                e.stopPropagation();
                console.log(`FavExercisesPage - onClickFav`);
                toggleFavService(token, ex.idExercise);
                setCacheFavs(cacheFavs + 1);
              }}
            ></ExerciseCard>
          );
        })}
      </article>
    </>
  );
};
