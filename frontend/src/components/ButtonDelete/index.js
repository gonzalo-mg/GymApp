/* COMPONENETE ButtonDelete
Boton html generico para borrar
props:
  className2: clase extra css del Boton (para tema claro/oscuro)
  onClickFunction: f de clicado
*/
import "./index.css";
import PropTypes from "prop-types";

export const ButtonDelete = ({ className2, onClickFunction }) => {
  return (
    <button
      type={"button"}
      className={`ButtonDelete ${className2}`}
      onClick={onClickFunction}
    >
      {"BORAR"}
    </button>
  );
};

ButtonDelete.propTypes = {
  className2: PropTypes.string,
  onClickFunction: PropTypes.func,
};
