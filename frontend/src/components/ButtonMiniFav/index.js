/* ButtonMiniFav: boton peqeño para fav*/

import "./index.css";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FavLikeContext } from "../../contexts/FavLikeContext";
import { toggleFavService } from "../../services/exercises";
import { useExercises } from "../../hooks/useExercises";

export const ButtonMiniFav = ({ idExercise, onClickFav }) => {
  // recuperar usuario activo del contexto
  const { token } = useContext(AuthContext);
  const {favCounter, setFavCounter} = useContext(FavLikeContext);

  // modificar clase css si el ejercicio es un fav del usuario
  const { useCheckFav } = useExercises();

  return (
    <button
      className={`ButtonMiniFav ${useCheckFav({ idExercise, token })}`}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        const stateFav = toggleFavService({ token, idExercise });
        // modificar contador de fav segun el stateFav devuleto
        stateFav ? setFavCounter(favCounter+1) : setFavCounter(favCounter-1)

      }}
    ></button>
  );
};
