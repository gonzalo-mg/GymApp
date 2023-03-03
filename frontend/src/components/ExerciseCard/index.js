/* COMPONENETE ExerciseCard: tarjeta de cada ejercicio */

import { ButtonGeneric } from "../ButtonGeneric";
import { ButtonDelete } from "../ButtonDelete";
//import { ButtonMiniFav } from "../ButtonMiniFav";
import { ButtonMiniLike } from "../ButtonMiniLike";
import "./index.css";

import PropTypes from "prop-types";

import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  deleteExerciseService,
  toggleFavService,
  getFavExercisesService,
} from "../../services/exercises";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { useLocation } from "react-router-dom";
import { FavLikeContext } from "../../contexts/FavLikeContext";
import { useExercises } from "../../hooks/useExercises";

const serverRoot = process.env.REACT_APP_BACKEND_URL;

export const ExerciseCard = ({
  idExercise,
  name,
  description,
  typology,
  muscles,
  picture,
  onClickCard,
  onClickFav,
  classNameFav,
}) => {
  // recuperar usuario activo del contexto
  const { token, currentUser } = useContext(AuthContext);

  const { favCounter, setFavCounter } = useContext(FavLikeContext);

  // modificar clase css si el ejercicio es un fav del usuario
  const { useCheckFav } = useExercises();

  // invocar hook de navegacion entre vistas
  const { toExercisesPage, toExerciseDetailPage } = useViewNavigation();

  // localizar ruta
  const location = useLocation();

 



  return (
    <article className="ExerciseCard" onClickCapture={onClickCard}>
      <h2 className="name">{name}</h2>

      <img src={`${serverRoot}/pics/${picture}`} alt={name}></img>

      {typology && muscles && description ? (
        <>
          <section className="list">
            <ul>
              <li>
                <strong>Tipología:</strong> {typology}
              </li>
              <li>
                <strong>Músculos:</strong> {muscles}
              </li>
            </ul>
          </section>
          <section className="description">
            <strong>Descripción: </strong>
            {description}
          </section>
        </>
      ) : (
        <></>
      )}

      {currentUser.role === "worker" &&
      location.pathname !== "/exercises" &&
      location.pathname !== "/favorites" ? (
        <div className="workerButtons">
          <button
            className={classNameFav}
            type="button"
            onClickCapture={onClickFav}
          ></button>
          <ButtonMiniLike idExercise={idExercise}></ButtonMiniLike>
        </div>
      ) : undefined}

      {currentUser.role === "admin" ? (
        <div className=" adminButtons">
          {location.pathname !== "/exercises" ? (
            <>
              <ButtonGeneric
                text={"Editar"}
                onClickFunction={"WIP"}
              ></ButtonGeneric>
              <ButtonDelete
                onClickFunction={(e) => {
                  e.stopPropagation();
                  deleteExerciseService({ token, idExercise });
                  alert(`Ejercicio ${name} borrado.`);
                  toExercisesPage();
                }}
              ></ButtonDelete>
            </>
          ) : (
            <ButtonGeneric
              text={"Editar o Borrar"}
              onClickFunction={(e) => {
                e.stopPropagation();
                alert(
                  `Recuerde que dichas acciones no se pueden deshacer. Proceda con cautela.`
                );
                toExerciseDetailPage(idExercise);
              }}
            ></ButtonGeneric>
          )}
        </div>
      ) : undefined}
    </article>
  );
};

ExerciseCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  typology: PropTypes.string,
  muscles: PropTypes.string,
  //picture: PropTypes.string.isRequired,
  //likeCounter,
  //admin,
  //onClickCard: PropTypes.func.isRequired
};
