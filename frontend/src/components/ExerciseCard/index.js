/* COMPONENETE ExerciseCard: tarjeta de cada ejercicio */

import { ButtonGeneric } from "../ButtonGeneric";
import { ButtonDelete } from "../ButtonDelete";
import "./index.css";

import PropTypes from "prop-types";

import { useContext} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  deleteExerciseService,
} from "../../services/exercises";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { useLocation } from "react-router-dom";

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
  onClickLike,
  classNameLike,
  likeCount,
}) => {
  // recuperar usuario activo del contexto
  const { token, currentUser } = useContext(AuthContext);

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

      {currentUser.role === "worker" ? (
        <div className="workerButtons">
          <button
            className={classNameFav}
            type="button"
            onClickCapture={onClickFav}
          ></button>
          <button
            className={classNameLike}
            type="button"
            onClickCapture={onClickLike}
          >{likeCount}</button>
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
  name: PropTypes.string,
  description: PropTypes.string,
  typology: PropTypes.string,
  muscles: PropTypes.string,
  //picture: PropTypes.string.isRequired,
  //admin,
  //onClickCard: PropTypes.func.isRequired
};
/* 
 &&
      location.pathname !== "/exercises" &&
      location.pathname !== "/favorites" 
*/
