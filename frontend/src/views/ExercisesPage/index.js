/* VISTA de listado completo de ejercicios */

import "./index.css";

import { useState, useEffect, useContext } from "react";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { AuthContext } from "../../contexts/AuthContext";

import { useExercises } from "../../hooks/useExercises";

//import { getExercisesService } from "../../services/exercises";
import { ExerciseCard } from "../../components/ExerciseCard";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { TextBanner } from "../../components/TextBanner";
import { UserCard } from "../../components/UserCard";

export const ExercisesPage = () => {
  // cargar contexto autenticacion
  const { token, currentUser } = useContext(AuthContext);

  // f estado de "exercises"; para setear los filtros a usar para mostrar exercises
  const [filter, setFilter] = useState();

  //usar hook recuperar ejercicios
  const { useGetExercises } = useExercises();
  const exercises = useGetExercises({ token, filter });

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
        <form
          id="filters"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <ul>
            <li>
              <input
                id="filterName"
                name="name"
                placeholder="Busca por nombre, tipología o músculo"
                value={filter}
                onChange={(e) => setFilter(e.target.value.toLowerCase())}
              ></input>
            </li>
          </ul>

          {filter === "" ? null : (
            <ButtonGeneric
              type="button"
              text="Borrar filtro"
              onClickFunction={() => setFilter("")}
            ></ButtonGeneric>
          )}
        </form>

        {exercises.map((ex) => {
          return (
            <ExerciseCard
              key={ex.idExercise}
              idExercise={ex.idExercise}
              name={ex.name}
              picture={ex.picture}
              onClickCard={() => toExerciseDetailPage(ex.idExercise)}
            ></ExerciseCard>
          );
        })}
      </article>
    </>
  );
};
