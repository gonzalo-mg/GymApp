/* ButtonMiniFav: boton peqeño para fav*/

import "./index.css";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toggleFavService } from "../../services/exercises";
import { useExercises } from "../../hooks/useExercises";

export const ButtonMiniFav = ({ idExercise }) => {
  // recuperar usuario activo del contexto
  const { token } = useContext(AuthContext);

  // modificar clase css si el ejercicio es un fav del usuario
  const { useCheckFav } = useExercises();

  return (
    <button
      className={`ButtonMiniFav ${useCheckFav({ idExercise, token })}`}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleFavService({ token, idExercise });
      }}
    ></button>
  );
};

ButtonMiniFav.propTypes = {
  isFav: PropTypes.string,
};
