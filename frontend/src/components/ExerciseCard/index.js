/* COMPONENETE ExerciseCard: tarjeta de cada ejercicio */

import { ButtonGeneric } from "../ButtonGeneric";
import { ButtonMini } from "../ButtonMini";
import "./index.css";

import PropTypes from 'prop-types'

//const serverRoot = process.env.REACT_APP_BACKEND_URL;

export const ExerciseCard = ({
  name,
  description,
  typology,
  muscles,
  picture,
  likeCounter,
  admin,
  onClickCard,
}) => {
  return (
    <article className="ExerciseCard" onClick={onClickCard}>
      <h2 className="name">{name}</h2>

      <section className="list">
        <ul>
          <li>
            <strong>Tipología:</strong> {typology}
          </li>
          <li>
            <strong>Músculos:</strong> {muscles}
          </li>
        </ul>
      </section>

      <img src={`http://localhost:8080/pics/${picture}`} alt={name}></img>

      {description ? (
        <section className="description">
          <strong>Descripción: </strong>
          {description}
        </section>
      ) : (
        <></>
      )}

      {!admin ? (
        <div className="workerButtons">
          <ButtonMini className2={"fav"} onClickFunction={"WIP"}></ButtonMini>
          <ButtonMini
            className2={"like"}
            onClickFunction={"WIP"}
            text={likeCounter}
          ></ButtonMini>
        </div>
      ) : (
        <div className="adminButtons">
          <ButtonGeneric text={"Edit"} onClickFunction={"WIP"}></ButtonGeneric>
          <ButtonGeneric
            text={"Delete"}
            onClickFunction={"WIP"}
          ></ButtonGeneric>
        </div>
      )}
    </article>
  );
};

ExerciseCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  typology: PropTypes.string.isRequired,
  muscles: PropTypes.string.isRequired,
  //picture: PropTypes.string.isRequired,
  //likeCounter,
  //admin,
  //onClickCard: PropTypes.func.isRequired
}