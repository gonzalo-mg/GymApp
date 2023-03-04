/* Componente formulario para introducir los datos de un ejericio */
import "./index.css";

import {
  postNewExerciseService,
  putEditExerciseService,
} from "../../services/exercises";

import { ButtonGeneric } from "../ButtonGeneric";

export const FormExercise = ({
  token,
  idExercise,
  makeNew,
  makeEdit,
  editForm,
  setEditForm,
}) => {
  console.log(
    `FormExercise makeNew:${makeNew}, makeEdit:${makeEdit}, idExercise:${idExercise}`
  );
  // f para elegir q servicio llamar segun se quiera crear/editar
  const doSubmit = ({ e, makeNew, makeEdit, idExercise }) => {
    console.log(`doSubmit llamado`);
    console.log(`doSubmit makeNew:${makeNew}`);
    console.log(`doSubmit makeEdit:${makeEdit}`);
    if (makeNew) {
      console.log(`doSubmit makeNew`);
      postNewExerciseService({
        token,
        name: e.target.name.value,
        typology: e.target.typology.value,
        muscles: e.target.muscles.value,
        description: e.target.desc.value,
        picture: e.target.pic.files[0],
      });
    } else if (makeEdit) {
      console.log(`doSubmit makeEdit`);
      putEditExerciseService({
        token,
        idExercise,
        name: e.target.name.value,
        typology: e.target.typology.value,
        muscles: e.target.muscles.value,
        description: e.target.desc.value,
        picture: e.target.pic.files[0],
      });
      setEditForm(!editForm);
    }
  };

  const handleSubmit = async ({ e, makeNew, makeEdit, idExercise, editForm, setEditForm }) => {
    e.preventDefault();
    await doSubmit({ e, makeNew, makeEdit, idExercise });
    setEditForm(!editForm);
  };

  return (
    <fieldset className="fieldset">
      <legend>Complete el formulario con todos los datos del ejercicio.</legend>
      <form
        id="ExerciseForm"
        onSubmit={(e) => handleSubmit({ e, makeNew, makeEdit, idExercise, editForm, setEditForm })}
      >
        <ul>
          <li>
            <label htmlfor="name">Nombre del ejercicio: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Introduzca un nombre para el ejercicio"
              required
            ></input>
          </li>

          <li>
            <label htmlfor="typology">Tipología: </label>
            <input
              type="text"
              id="typology"
              name="typology"
              placeholder="Introduzca la tipología del ejercicio"
              required
            ></input>
          </li>

          <li>
            <label htmlfor="muscles">Grupo muscular: </label>
            <input
              type="text"
              id="muscles"
              name="muscles"
              placeholder="Introduzca el grupo muscular"
              required
            ></input>
          </li>

          <li>
            <label htmlfor="pic">Imagen del ejercicio: </label>
            <input id="pic" type="file" required />
          </li>

          <li>
            <label htmlfor="desc">Descripción: </label>
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="10"
              placeholder="Describa el ejercicio."
              required
            ></textarea>
          </li>
        </ul>

        <ButtonGeneric type="submit" text="Aceptar"></ButtonGeneric>
        <ButtonGeneric type="reset" text="Limpiar"></ButtonGeneric>
      </form>
    </fieldset>
  );
};
