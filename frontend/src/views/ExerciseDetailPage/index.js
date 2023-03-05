/* VISTA de detalle de exercise recupeardo por :id */

import "./index.css";
import { ExerciseCard } from "../../components/ExerciseCard";
import { TextBanner } from "../../components/TextBanner";
import { UserCard } from "../../components/UserCard";
import { NavBar } from "../../components/NavBar";

import { useContext, useState } from "react";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { useParams } from "react-router-dom";
import { useExercises } from "../../hooks/useExercises";
import { AuthContext } from "../../contexts/AuthContext";
import { FormExercise } from "../../components/FormExercise";

export const ExerciseDetailPage = () => {
  // recuperar contexto autenticacion
  const { token, currentUser } = useContext(AuthContext);

  // recuperar del param el id del exercise
  const { idExercise } = useParams();

  // f estado para determinar si desplegar form edicion
  const [editForm, setEditForm] = useState(false);

  //usar hook recuperar ejercicios
  const { useSingleExercises } = useExercises();
  const exercise = useSingleExercises({ token, idExercise, editForm });

  // f aux para manejar cambio estado con boton
  const handleOpenEditForm = (e) => {
    e.stopPropagation();
    setEditForm(!editForm);
  };

  // invocar hook de navegacion entre ejercicios
  const { toExercisesPage, toFavExercisesPage, toAnonUserPage } =
    useViewNavigation();

  // devolver tarjeta usuario, texto indicativo, tarjeta del ejercicio y botones;
  // // si usuario invalido volver a vista login
  // // si no existe ejercicio volver a lista ejercicios general
  // // si admin y pulsa boton Editar deplegar formulario

  return !currentUser ? (
    toAnonUserPage()
  ) : (
    <>
      <div className="divNavs">
        <UserCard></UserCard>
        <NavBar
          onClickAll={() => toExercisesPage()}
          onClickFav={() => toFavExercisesPage()}
        ></NavBar>
        {currentUser.role === "admin" ? (
          <TextBanner title={"Edición de datos"}></TextBanner>
        ) : undefined}
      </div>
          {!exercise ? toExercisesPage() : undefined}

          <ExerciseCard
            key={exercise.idExercise}
            exercise={exercise}
            printDetails={true}
            openEditForm={(e) => handleOpenEditForm(e)}
            clickablePic={false}
          ></ExerciseCard>


        {currentUser.role === "admin" && editForm === true ? (
          <article className="EditForm">
            <FormExercise
              token={token}
              makeEdit={"ok"}
              idExercise={idExercise}
              editForm={editForm}
              setEditForm={setEditForm}
            ></FormExercise>
          </article>
        ) : null}
    </>
  );
};
