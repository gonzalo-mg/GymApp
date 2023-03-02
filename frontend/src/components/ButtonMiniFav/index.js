/* ButtonMiniFav: boton peqeño para fav
props:
  classFav: clase extra css del Boton
*/

import "./index.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toggleFavService } from "../../services/exercises";

export const ButtonMiniFav = ({ idExercise, classFav }) => {
  // recuperar usuario activo del contexto
  const { token } = useContext(AuthContext);
  return (
    <button
      className={`ButtonMiniFav ${classFav}`}
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        console.log(`ButtonMiniFav - idExercise: ${idExercise}; token: ${token}`);
        toggleFavService({ token, idExercise });
      }}
    ></button>
  );
};

ButtonMiniFav.propTypes = {
  className2: PropTypes.string,
};
