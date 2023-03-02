/* ButtonMiniFav: boton peqeño para fav
props:
  classFav: clase extra css del Boton
*/

import "./index.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toggleFavService } from "../../services/exercises";
import { useExercises } from "../../hooks/useExercises";

export const ButtonMiniFav = ({ idExercise, isFav = undefined }) => {
  // recuperar usuario activo del contexto
  const { token } = useContext(AuthContext);

  const { useGetExercises, useCheckFav } = useExercises();

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
