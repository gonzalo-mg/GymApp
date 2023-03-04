/* VISTA de detalle de exercise recupeardo por :id */

import "./index.css";
import { ExerciseCard } from "../../components/ExerciseCard";
import { TextBanner } from "../../components/TextBanner";
import { UserCard } from "../../components/UserCard";
import { NavBar } from "../../components/NavBar";

import { useContext } from "react";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { useParams } from "react-router-dom";
import { useExercises } from "../../hooks/useExercises";
import { AuthContext } from "../../contexts/AuthContext";

export const ExerciseDetailPage = () => {
  // recuperar contexto autenticacion
  const { token, currentUser } = useContext(AuthContext);

  // recuperar del param el id del exercise
  const { idExercise } = useParams();

  //usar hook recuperar ejercicios
  const { useSingleExercises } = useExercises();
  const exercise = useSingleExercises({ token, idExercise });

  // invocar hook de navegacion entre ejercicios
  const { toExercisesPage, toAnonUserPage } = useViewNavigation();

  // devolver tarjeta usuario, texto indicativo, tarjeta del ejercicio y botones;
  // // si usuario invalido volver a vista login
  // // si no existe ejercicio volver a lista ejercicios general

  return !currentUser ? (
    toAnonUserPage()
  ) : (
    <>
      <UserCard></UserCard>
      <NavBar></NavBar>
      <article className="ExerciseDetail">
        <TextBanner text={"Vista de Detalles"}></TextBanner>

        {!exercise ? toExercisesPage() : undefined}

        <ExerciseCard
          key={exercise.idExercise}
          exercise={exercise}
          printDetails={true}
        ></ExerciseCard>
      </article>
    </>
  );
};
