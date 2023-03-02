/* ButtonMiniFav: boton peqeño para fav
props:
  className2: clase extra css del Boton
  onClickFunction: f de clicado
  text: texto a mostrar
*/

import "./index.css";
import PropTypes from "prop-types";

export const ButtonMiniFav = ({ className2, onClickFunction, text = "" }) => {
  return (
    <button
      className={`ButtonMiniFav ${className2}`}
      type="button"
      onClick={onClickFunction}
    >
      {text ? text : undefined}
    </button>
  );
};

ButtonMiniFav.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  className2: PropTypes.string,
  onClickFunction: PropTypes.func,
};
