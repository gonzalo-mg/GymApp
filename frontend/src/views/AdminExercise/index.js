import { ButtonGeneric } from "../../components/ButtonGeneric";
import "./index.css";

export const AdminExercise = ({ formAction, buttonText }) => {
  return (
    <fieldset className="fieldset">
      <legend>
        Complete el formulario para {buttonText.toUpperCase()} la ficha del ejercicio
      </legend>
      <form id="AdminExercise" action={"formAction"}>
        <ul>
          <li>
            <label for="name">Nombre del ejercicio: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Introduzca un nombre para el ejercicio"
            ></input>
          </li>

          <li>
            <label for="group">Grupo muscular: </label>
            <input
              type="text"
              id="group"
              name="group"
              placeholder="Introduzca el grupo muscular"
            ></input>
          </li>

          <li>
            <label for="typology">Tipología: </label>
            <input
              type="text"
              id="typology"
              name="typology"
              placeholder="Introduzca la tipología del ejercicio"
            ></input>
          </li>

          <li>
            <label for="pic">Imagen del ejercicio: </label>
            <input id="pic" type="file" />
          </li>

          <li>
            <label for="desc">Descripción: </label>
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="10"
              placeholder="Describa el ejercicio."
            ></textarea>
          </li>
        </ul>

        <ButtonGeneric type="submit" text={buttonText}></ButtonGeneric>
      </form>
    </fieldset>
  );
};
