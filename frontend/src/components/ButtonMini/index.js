/* ButtonMini: boton peqeño para funciones axuliares como fav, like
props:
  type: tipo html del Boton
  text: texto del Boton
  className2: clase extra css del Boton (para tema claro/oscuro)
  onClickFunction: f de clicado
*/

import "./index.css";
import PropTypes from "prop-types";

export const ButtonMini = ({
  type = "button",
  className2,
  text,
  onClickFunction,
}) => {
  return (
    <button
      className={`ButtonMini ${className2}`}
      type={type}
      onClick={onClickFunction}
    >
      {text ? text : undefined}
    </button>
  );
};

ButtonMini.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  className2: PropTypes.string,
  onClickFunction: PropTypes.func,
}
