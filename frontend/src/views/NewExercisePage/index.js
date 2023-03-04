/* VISTA formulario para q el admin cree un nuevo exercise */

import { ButtonGeneric } from "../../components/ButtonGeneric";
import { UserCard } from "../../components/UserCard";
import "./index.css";

import { postNewExerciseService } from "../../services/exercises";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { FormExercise } from "../../components/FormExercise";
import { NavBar } from "../../components/NavBar";

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
      <NavBar onClickAll={() => toExercisesPage()}></NavBar>
      <FormExercise token={token} makeNew={true}></FormExercise>
    </>
  );
};
