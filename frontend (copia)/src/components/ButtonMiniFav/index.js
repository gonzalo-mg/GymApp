/* ButtonMiniFav: boton peqeño para fav
props:
  classFav: clase extra css del Boton
*/

import "./index.css";
import PropTypes from "prop-types";

export const ButtonMiniFav = ({ classFav }) => {
  return (
    <button
      className={`ButtonMiniFav ${classFav}`}
      type="button"
      onClick={"onClickFunction"}
    ></button>
  );
};

ButtonMiniFav.propTypes = {
  className2: PropTypes.string,
};
