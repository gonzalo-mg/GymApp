/* COMPONENETE ExerciseCard: tarjeta de cada ejercicio */

import { ButtonGeneric } from "../ButtonGeneric";
import { ButtonDelete } from "../ButtonDelete";
import "./index.css";

import PropTypes from "prop-types";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteExerciseService } from "../../services/exercises";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { useLocation } from "react-router-dom";
import { useFavs } from "../../hooks/useFavs";
import { useLikes } from "../../hooks/useLikes";

const serverRoot = process.env.REACT_APP_BACKEND_URL;

export const ExerciseCard = ({ exercise, onClickCard }) => {
  // desestructurar objeto exercise
  const { idExercise, name, description, typology, muscles, picture } =
    exercise;

  // recuperar usuario activo del contexto
  const { token, currentUser } = useContext(AuthContext);

  // GESTION FAVS
  const { handleClickFav, checkFavStatus } = useFavs();

  // f estado para modificar css boton fav
  const [favClass, setFavClass] = useState(() =>
    checkFavStatus({ token, exercise })
  );

  // efecto para setear estado de favClass al montar componente y ante cambios
  useEffect(() => {
    checkFavStatus({ token, exercise });
  }, [favClass]);

  // GESTION LIKES
  const { handleClickLike, checkLikedStatus, checkLikeCount } = useLikes();

  // f estado para modificar css boton like
  const [likeClass, setLikeClass] = useState(() =>
    checkLikedStatus({ token, exercise })
  );

  // f estado para likeCount; iniciado a lo q devuelve backend
  const [likeCount, setLikeCount] = useState(() => {
    checkLikeCount({ token, idExercise });
  });

  // efecto para setear estado de likeClass y likeCount al montar componente y ante cambios
  useEffect(() => {
    checkLikedStatus({ token, exercise });
    checkLikeCount({ token, idExercise, setLikeCount });
  }, [likeClass]);

  // invocar hook de navegacion entre vistas
  const { toExercisesPage, toExerciseDetailPage } = useViewNavigation();

  // localizar ruta
  const location = useLocation();

  // funciones callback auxiliares por asincronia useState
  const clickFav = async (e) => {
      e.preventDefault();
      setFavClass(await handleClickFav({ e, token, idExercise }));
  };
  const clickLike = async (e) => {
    e.preventDefault();
    setLikeClass(await handleClickLike({ e, token, idExercise }));
  }

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
            className={`ButtonMiniFav ${favClass}`}
            type="button"
            onClickCapture={(e)=>clickFav(e)}
          ></button>
          <button
            className={`ButtonMiniLike ${likeClass}`}
            type="button"
            onClickCapture={(e) => clickLike(e)}
          >
            {likeCount}
          </button>
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
