/* COMPONENETE ExerciseCard: tarjeta de cada ejercicio */

import { ButtonGeneric } from "../ButtonGeneric";
import { ButtonDelete } from "../ButtonDelete";
import { ButtonMiniFav } from "../ButtonMiniFav";
import { ButtonMini } from "../ButtonMini";
import "./index.css";

import PropTypes from "prop-types";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteExerciseService } from "../../services/exercises";
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
  likeCounter,
  onClickCard,
}) => {
  // recuperar usuario activo del contexto
  const { token, currentUser } = useContext(AuthContext);
  // invocar hook de navegacion entre vistas
  const { toExercisesPage, toExerciseDetailPage } = useViewNavigation();

  // localizar ruta
  const location = useLocation();

  return (
    <article className="ExerciseCard" onClick={onClickCard}>
      <h2 className="name">{name}</h2>

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

      <img src={`${serverRoot}/pics/${picture}`} alt={name}></img>

      {description ? (
        <section className="description">
          <strong>Descripción: </strong>
          {description}
        </section>
      ) : (
        <></>
      )}

      {currentUser.role === "worker" ? (
        <div className="workerButtons">
          <ButtonMiniFav></ButtonMiniFav>
          <ButtonMini
            className2={"like"}
            onClickFunction={"WIP"}
            text={likeCounter}
          ></ButtonMini>
        </div>
      ) : (
        <div className="adminButtons">
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
              onClickFunction={() => {
                alert(
                  `Recuerde que dichas acciones no se pueden deshacer. Proceda con cautela.`
                );
                toExerciseDetailPage(idExercise);
              }}
            ></ButtonGeneric>
          )}
        </div>
      )}
    </article>
  );
};

ExerciseCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  typology: PropTypes.string.isRequired,
  muscles: PropTypes.string.isRequired,
  //picture: PropTypes.string.isRequired,
  //likeCounter,
  //admin,
  //onClickCard: PropTypes.func.isRequired
};
