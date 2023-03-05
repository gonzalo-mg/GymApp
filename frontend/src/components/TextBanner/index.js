/* COMPONENTE TextBanner: banner/cinta de texto a modo de aviso/indicador */
import "./index.css";
import PropTypes from "prop-types";

export const TextBanner = ({ title, text }) => {
  return (
    <div className="TextBanner">
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

TextBanner.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string,
};
