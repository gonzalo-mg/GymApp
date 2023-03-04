/* VISTA de listado de favs del currentUser */

import "./index.css";

import { useState, useEffect, useContext } from "react";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { AuthContext } from "../../contexts/AuthContext";

import { useExercises } from "../../hooks/useExercises";

import { ExerciseCard } from "../../components/ExerciseCard";
import { TextBanner } from "../../components/TextBanner";
import { UserCard } from "../../components/UserCard";

export const FavExercisesPage = () => {
  console.log("En FavExercisesPage");
  // cargar contexto autenticacion
  const { token, currentUser } = useContext(AuthContext);

  //usar hook recuperar ejercicios para favs
  //let getFavs = true;
  let favChange = true;
  const { useFavExercises } = useExercises();

  const exercises = useFavExercises({ token, favChange });
  console.log(
    `FavExercisesPage llamando a useFavExercises con ${token} y ${favChange}`
  );
  console.log(`FavExercisesPage recupera de useFavExercises: ${exercises}`);
  console.log(exercises);
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

        {exercises.map((exercise) => {
          return (
            <ExerciseCard
              key={exercise.idExercise}
              exercise={exercise}
              onClickCard={(e) => {
                e.stopPropagation();
                console.log(`ExercisesPage - onClickCard`);
                toExerciseDetailPage(exercise.idExercise);
              }}
            ></ExerciseCard>
          );
        })}
      </article>
    </>
  );
};
