/* COMPONENETE ButtonGeneric
Boton html generico multitproposito
*/
import "./index.css";
import PropTypes from "prop-types";

export const ButtonGeneric = ({
  type = "button",
  text,
  className2,
  onClickFunction,
}) => {
  return (
    <button
      type={type}
      className={`ButtonGeneric ${className2}`}
      onClick={onClickFunction}
    >
      {text}
    </button>
  );
};

ButtonGeneric.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  className2: PropTypes.string,
  onClickFunction: PropTypes.func,
};
