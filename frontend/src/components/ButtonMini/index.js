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
  classNameType,
  classNameStatus,
  text,
  onClickFunction,
}) => {
  return (
    <button
      className={`ButtonMini ${classNameType} ${classNameStatus}`}
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
  classNameType: PropTypes.string,
  classNameStatus: PropTypes.string,
  onClickFunction: PropTypes.func,
}
