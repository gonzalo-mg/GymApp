/* ButtonMiniLike: boton peqeño para like*/

import "./index.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toggleLikeService } from "../../services/exercises";
import { useExercises } from "../../hooks/useExercises";

export const ButtonMiniLike = ({ idExercise, likeCounter=99 }) => {
  // recuperar usuario activo del contexto
  const { token } = useContext(AuthContext);

  // modificar clase css si el ejercicio es un fav del usuario
  const { useCheckLike } = useExercises();

  return (
    <button
      className={`ButtonMiniLike ${useCheckLike({ idExercise, token })}`}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleLikeService({ token, idExercise });
      }}
    >{likeCounter}</button>
  );
};
