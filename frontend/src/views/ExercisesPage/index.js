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

  // f estado para setaer "vista" lo q cambia entre mostrar ejercios todos o favs
  // // si se llega desde otra pag indicando q se quieren ver los fav setear view con wantedView (enviado con useViewNavigation desde la vista ExerciseDetail con boton de fav)
  const wantedView = useLocation().state;
  const [view, setView] = useState(wantedView || "viewAll");

  //usar hook recuperar ejercicios
  const { useAllExercises, useFavExercises } = useExercises();
  const exercisesAll = useAllExercises({ token, filter, view });
  const exercisesFav = useFavExercises({ token, filter, view });

  // invocar hook de navegacion entre vistas
  const { toAnonUserPage, toExerciseDetailPage } = useViewNavigation();

  // f para texto condicional segun q este viendo
  const printTextBanner = ({ filter, view }) => {
    const avisoImagen = "Pincha la imagen para ver sus detalles.";
    // si en favoritos
    if (view === "viewFav") {
      // y si no hay favs ni filtro aplicaco
      if (exercisesFav.length === 0 && !filter) {
        return "No tienes favoritos";
        // sino y si no hay favs q pasen un filtrp
      } else if (exercisesFav.length === 0 && filter) {
        return `Ninguno de tus favoritos se ajusta al filtrado por <<${filter}>>`;
        // sino y si hay favs q pasan el filtro
      } else if (exercisesFav.length !== 0 && filter) {
        return `Estos son tus favoritos filtrados por <<${filter}>>. ${avisoImagen}`;
      } else {
        return `Estos son todos tus favoritos. ${avisoImagen}`;
      }
      // sino y si en todos
    } else if (view === "viewAll") {
      // y hay filtro
      if (filter) {
        return `Viendo todos los ejercicios filtrados por <<${filter}>>. ${avisoImagen}`;
        // sino y si no hay filtro
      } else if (!filter) {
        return `Viendo todos los ejercicios. ${avisoImagen}`;
      }
      // en otro caso ups!
    } else {
      return "Parece que algo va mal. Consulta con el administrador.";
    }
  };

  /* 
    - si se pierde sesion ir a vista de login
    - devolver:
    -- card d usuario
    -- barra navegacion
    -- una card por cada ejercicio del server
   */
  return !currentUser ? (
    toAnonUserPage()
  ) : (
    <>
      <div className="divNav">
        <UserCard></UserCard>
        <NavBar
          onClickAll={() => setView("viewAll")}
          onClickFav={() => setView("viewFav")}
        ></NavBar>
        <TextBanner text={printTextBanner({ view, filter })}></TextBanner>
      </div>
      <div className="divCards">
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
        <article className="articleExercisesList">
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
      </div>
    </>
  );
};
