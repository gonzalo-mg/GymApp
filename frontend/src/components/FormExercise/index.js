/* Componente formulario para introducir los datos de un ejericio */
import "./index.css";

import {
  postNewExerciseService,
  putEditExerciseService,
} from "../../services/exercises";

import { ButtonGeneric } from "../ButtonGeneric";
import { TextBanner } from "../TextBanner";

export const FormExercise = ({
  token,
  idExercise,
  makeNew,
  makeEdit,
  editForm,
  setEditForm,
}) => {
  // f para elegir q servicio llamar segun se quiera crear/editar
  const doSubmit = ({ e, makeNew, makeEdit, idExercise }) => {
    if (makeNew) {
      postNewExerciseService({
        token,
        name: e.target.name.value,
        typology: e.target.typology.value,
        muscles: e.target.muscles.value,
        description: e.target.desc.value,
        picture: e.target.pic.files[0],
      });
    } else if (makeEdit) {
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

  const handleSubmit = async ({
    e,
    makeNew,
    makeEdit,
    idExercise,
    editForm,
    setEditForm,
  }) => {
    e.preventDefault();
    await doSubmit({ e, makeNew, makeEdit, idExercise });
    setEditForm(!editForm);
  };

  return (
    <fieldset className="exerciseFieldset">
      <TextBanner text="Complete el formulario con todos los datos del ejercicio."></TextBanner>
      <form
        id="ExerciseForm"
        onSubmit={(e) =>
          handleSubmit({
            e,
            makeNew,
            makeEdit,
            idExercise,
            editForm,
            setEditForm,
          })
        }
      >
        <label htmlfor="name">Nombre del ejercicio: </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Introduzca un nombre para el ejercicio"
          required
        ></input>

        <label htmlfor="typology">Tipología: </label>
        <input
          type="text"
          id="typology"
          name="typology"
          placeholder="Introduzca la tipología del ejercicio"
          required
        ></input>

        <label htmlfor="muscles">Grupo muscular: </label>
        <input
          type="text"
          id="muscles"
          name="muscles"
          placeholder="Introduzca el grupo muscular"
          required
        ></input>

        <label htmlfor="pic">Imagen del ejercicio: </label>
        <input id="pic" type="file" required />

        <label htmlfor="desc">Descripción: </label>
        <textarea
          name="desc"
          id="desc"
          cols="30"
          rows="10"
          placeholder="Describa el ejercicio"
          required
        ></textarea>

        <div className="divAdminButtons">
          <ButtonGeneric type="submit" text="Aceptar"></ButtonGeneric>
          <ButtonGeneric type="reset" text="Limpiar"></ButtonGeneric>
        </div>
      </form>
    </fieldset>
  );
};
