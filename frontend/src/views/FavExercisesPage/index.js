/* VISTA de listado de favs del currentUser */

import "./index.css";

import { useState, useEffect, useContext } from "react";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { AuthContext } from "../../contexts/AuthContext";

import { useExercises } from "../../hooks/useExercises";

//import { getFavExercisesService } from "../../services/exercises";
import { ExerciseCard } from "../../components/ExerciseCard";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { TextBanner } from "../../components/TextBanner";
import { UserCard } from "../../components/UserCard";

export const FavExercisesPage = () => {
  // cargar contexto autenticacion
  const { token, currentUser } = useContext(AuthContext);

  //usar hook recuperar ejercicios para favs
  let favs = true;
  const {useGetExercises} = useExercises();
  const exercises = useGetExercises({token, favs})

  // invocar hook de navegacion entre vistas
  const { toExercisesPage, toExerciseDetailPage, toAnonUserPage } =
    useViewNavigation();

  // devolver una card por cada exercise del server
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
              typology={ex.typology}
              muscles={ex.muscles}
              onClickCard={() => toExerciseDetailPage(ex.idExercise)}
            ></ExerciseCard>
          );
        })}
      </article>
    </>
  );
};
