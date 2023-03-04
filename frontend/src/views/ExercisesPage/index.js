/* VISTA de listado completo de ejercicios */

import "./index.css";

import { useState, useContext } from "react";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { useExercises } from "../../hooks/useExercises";
import { useLocation } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import { ExerciseCard } from "../../components/ExerciseCard";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { TextBanner } from "../../components/TextBanner";
import { UserCard } from "../../components/UserCard";
import { NavBar } from "../../components/NavBar";

export const ExercisesPage = () => {
  // cargar contexto autenticacion
  const { token, currentUser } = useContext(AuthContext);

  // f estado de "exercises"; para setear los filtros a usar para mostrar exercises
  const [filter, setFilter] = useState();

  //usar hook recuperar ejercicios
  const { useAllExercises, useFavExercises } = useExercises();
  const exercisesAll = useAllExercises({ token, filter });
  const exercisesFav = useFavExercises({ token, filter });

  // f estado para setaer "vista" lo q cambia entre mostrar ejercios todos o favs
  // // si se llega desde otra pag indicando q se quieren ver los fav setear view; desde la vista ExerciseDetail con boton de fav
  const wantedView = useLocation().state;
  console.log(`wantedView: ${wantedView}`);
  const [view, setView] = useState(wantedView || "viewAll");

  // efecto actualiza estado view
  //useEffect();

  // invocar hook de navegacion entre vistas
  const { toAnonUserPage, toExerciseDetailPage } = useViewNavigation();

  /* 
    - si se pierde sesion ir a vista de login
    - devolver:
    -- card d usuario
    -- barra navegacion
    -- una card por cada ejercicio del server; el estado de view cambia entre mostrar todos o solo los fav del usuario
   */
  return !currentUser ? (
    toAnonUserPage()
  ) : (
    <>
      <UserCard></UserCard>
      <NavBar
        onClickAll={() => setView("viewAll")}
        onClickFav={() => setView("viewFav")}
      ></NavBar>

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

          <ButtonGeneric
            type="button"
            text="Borrar filtro"
            onClickFunction={() => setFilter("")}
          ></ButtonGeneric>
        </form>

        <TextBanner
          text={
            view === "viewFav"
              ? exercisesFav.length === 0
                ? "No tienes favoritos"
                : filter
                ? "Viendo tus favoritos filtrados"
                : "Viendo tus favoritos"
              : filter
              ? "Viendo ejericios filtrados"
              : "Viendo todos los ejercicios"
          }
        ></TextBanner>

        {view === "viewFav"
          ? exercisesFav.map((exercise) => {
              return (
                <ExerciseCard
                  key={exercise.idExercise}
                  exercise={exercise}
                  onClickPic={() => toExerciseDetailPage(exercise.idExercise)}
                ></ExerciseCard>
              );
            })
          : exercisesAll.map((exercise) => {
              return (
                <ExerciseCard
                  key={exercise.idExercise}
                  exercise={exercise}
                  onClickPic={() =>
                    currentUser.role !== "admin"
                      ? toExerciseDetailPage(exercise.idExercise)
                      : null
                  }
                  printDetails={currentUser.role === "admin" ? true : false}
                ></ExerciseCard>
              );
            })}
      </article>
    </>
  );
};
