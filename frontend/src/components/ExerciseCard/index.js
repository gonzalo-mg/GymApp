/* COMPONENETE ExerciseCard: tarjeta de cada ejercicio */

import { ButtonGeneric } from "../ButtonGeneric";
import { ButtonMini } from "../ButtonMini";
import "./index.css";

import axios from "axios";

import PropTypes from 'prop-types'

//const imagesExDir = REACT_APP_BACKEND_IMAGES_EXERCISES_DIR

const getPic = async (name) => {
  // wip- construir ruta; token
  console.log(`executing getPic with name: ${name}`);

  let url = `http://localhost:8080/uploads/images/exercises/${name}`;
  console.log(`getPic calls to url: ${url}`);

  let response = await axios.get(url);
  return response.data;
};

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

      <img src={"getPic(picture)"} alt="exercise"></img>

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