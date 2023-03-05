/* VISTA formulario para q el admin cree un nuevo exercise */

import { UserCard } from "../../components/UserCard";
import "./index.css";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { FormExercise } from "../../components/FormExercise";
import { NavBar } from "../../components/NavBar";
import { TextBanner } from "../../components/TextBanner";

/* devolver formulario con todos los campos, y en submit enviar los valores introducidos como variables a la f postNewExercise, q ejexuta la peticion post al server */

export const NewExercisePage = () => {
  // recuperar contexto autenticacion
  const { token, currentUser } = useContext(AuthContext);
  // invocar hook de navegacion entre vistas
  const { toExercisesPage, toAnonUserPage } = useViewNavigation();

  return !currentUser ? (
    toAnonUserPage()
  ) : (
    <>
      <div className="divNav">
        <UserCard></UserCard>
        <NavBar onClickAll={() => toExercisesPage()}></NavBar>
      </div>
      <TextBanner title="Crear nuevo ejercicio"></TextBanner>
      <FormExercise token={token} makeNew={true}></FormExercise>
    </>
  );
};
