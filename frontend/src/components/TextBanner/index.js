/* COMPONENTE TextBanner: banner/cinta de texto a modo de aviso/indicador */
import "./index.css";
import PropTypes from "prop-types";

export const TextBanner = ({ title, subtitle, text }) => {
  return (
    <div className="TextBanner">
      {title ? <h2>{title}</h2> : null}
      {subtitle ? <h4>{subtitle}</h4> : null}
      {text ? <p>{text}</p> : null }
    </div>
  );
};

TextBanner.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
