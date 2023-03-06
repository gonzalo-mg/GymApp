/* COMPONENETE ExerciseCard: tarjeta de cada ejercicio */
import "./index.css";
import { ButtonGeneric } from "../ButtonGeneric";
import { ButtonMini } from "../ButtonMini";

import PropTypes from "prop-types";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteExerciseService } from "../../services/exercises";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { useLocation } from "react-router-dom";
import { useFavs } from "../../hooks/useFavs";
import { useLikes } from "../../hooks/useLikes";

const serverRoot = process.env.REACT_APP_BACKEND_URL;

export const ExerciseCard = ({
  exercise,
  onClickPic,
  clickablePic = "clickable",
  printDetails = false,
  openEditForm = null,
}) => {
  // desestructurar objeto exercise
  const { idExercise, name, description, typology, muscles, picture } =
    exercise;

  // recuperar usuario activo del contexto
  const { token, currentUser } = useContext(AuthContext);

  // GESTION FAVS
  const { handleClickFav, checkFavStatus } = useFavs();

  // f estado para modificar css boton fav

  // // inicializado a valor segun backend
  const [favClass, setFavClass] = useState("favClass0");

  // efecto para setear estado inicial de favClass y ante cambios de estado; con callback pq el seteo inicial depende de f asincrona
  useEffect(() => {
    checkFavStatus({ token, exercise }).then((data) => setFavClass(data));
  }, [token, favClass, exercise]);

  // GESTION LIKES
  const { handleClickLike, checkLikedStatus, checkLikeCount } = useLikes();

  // f estado para modificar css boton like
  const [likeClass, setLikeClass] = useState("likeClass0");

  // f estado para likeCount; iniciado a lo q devuelve backend
  const [likeCount, setLikeCount] = useState("likeCount0");

  // efecto para setear estado inicial de likeClass y likeCount y ante cambios de estados; con callback pq el seteo inicial depende de f asincronas
  useEffect(() => {
    checkLikedStatus({ token, exercise }).then((data) => setLikeClass(data));
    checkLikeCount({ token, exercise, idExercise }).then((lc) =>
      setLikeCount(lc)
    );
  }, [token, likeClass, exercise]);

  // invocar hook de navegacion entre vistas
  const { toExercisesPage, toExerciseDetailPage } = useViewNavigation();

  // identificar ruta actual
  const location = useLocation();

  // funciones callback auxiliares por asincronia useState, para q funcione con el primer click
  const clickFav = async (e) => {
    e.preventDefault();
    setFavClass(await handleClickFav({ e, token, idExercise }));
  };
  const clickLike = async (e) => {
    e.preventDefault();
    setLikeClass(await handleClickLike({ e, token, idExercise }));
  };

  return (
    <article className="ExerciseCard">
      <h2 className="name">{name}</h2>

      <img
        src={`${serverRoot}/pics/${picture}`}
        alt={name}
        className={clickablePic}
        onClickCapture={onClickPic}
      ></img>

      {printDetails ? (
        <section className="detailsSection">
          <h3>Detalles</h3>
          <ul>
            <li>
              <strong>Tipología:</strong> {typology}
            </li>
            <li>
              <strong>Músculos:</strong> {muscles}
            </li>
          </ul>
          <h4>Descripción</h4>
          <p>{description}</p>
        </section>
      ) : undefined}

      {currentUser.role === "worker" ? (
        <div className="divWorkerButtons">
          <button
            className={`ButtonMini favType ${favClass}`}
            type="button"
            onClickCapture={(e) => clickFav(e)}
          ></button>
          <button
            className={`ButtonMini likeType ${likeClass}`}
            type="button"
            onClickCapture={(e) => clickLike(e)}
          >
            {likeCount}
          </button>
        </div>
      ) : undefined}

      {currentUser.role === "admin" ? (
        <div className="divAdminButtons">
          {location.pathname !== "/exercises" ? (
            <>
              <ButtonGeneric
                text={"Edición"}
                onClickFunction={openEditForm}
              ></ButtonGeneric>
              <ButtonGeneric
                text={"BORRAR"}
                className2={"delete"}
                onClickFunction={(e) => {
                  e.stopPropagation();
                  deleteExerciseService({ token, idExercise });
                  alert(`Ejercicio ${name} borrado.`);
                  toExercisesPage();
                }}
              ></ButtonGeneric>
            </>
          ) : (
            <ButtonGeneric
              text={"Editar o Borrar"}
              className2={"delete"}
              onClickFunction={(e) => {
                e.stopPropagation();
                alert(
                  `El borrado o edición de datos afectan a la Base de Datos. Proceda con cautela.`
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
  exercise: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onClickPic: PropTypes.func,
  clickablePic: PropTypes.bool,
  printDetails: PropTypes.bool,
  openEditForm: PropTypes.func,
};
