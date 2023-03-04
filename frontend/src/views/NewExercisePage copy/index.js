/* VISTA formulario para q el admin cree un nuevo exercise */

import { ButtonGeneric } from "../../components/ButtonGeneric";
import { UserCard } from "../../components/UserCard";
import "./index.css";

import { postNewExerciseService } from "../../services/exercises";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useViewNavigation } from "../../hooks/useViewNavigation";

/* devolver formulario con todos los campos, y en submit enviar los valores introducidos como variables a la f postNewExercise, q ejexuta la peticion post al server */

export const NewExercisePage = () => {
  // recuperar contexto autenticacion
  const { token, currentUser } = useContext(AuthContext);
  // invocar hook de navegacion entre vistas
  const { toExercisesPage, toExerciseDetailPage, toAnonUserPage } =
    useViewNavigation();

  return !currentUser ? (
    toAnonUserPage()
  ) : (
    <>
      <UserCard></UserCard>
      <fieldset className="fieldset">
        <legend>
          Complete el formulario para CREAR la ficha del ejercicio
        </legend>
        <form
          id="NewExerciseAdminForm"
          onSubmit={(e) => {
            e.preventDefault();
            postNewExerciseService({
              token,
              name: e.target.name.value,
              typology: e.target.typology.value,
              muscles: e.target.muscles.value,
              description: e.target.desc.value,
              picture: e.target.pic.files[0],
            });
            e.reset();
          }}
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

          <ButtonGeneric type="submit" text="Crear"></ButtonGeneric>
          <ButtonGeneric type="reset" text="Limpiar datos"></ButtonGeneric>
          <ButtonGeneric
            text="Volver"
            onClickFunction={() => toExercisesPage()}
          ></ButtonGeneric>
        </form>
      </fieldset>
    </>
  );
};
