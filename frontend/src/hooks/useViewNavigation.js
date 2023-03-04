/* HOOK para manejar la navegacion entre ejercicios */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useViewNavigation = () => {
  // renombrar hook useNavigate
  const navigate = useNavigate();

  // f estados para activar al llegar a la nueva pag
  // eslint-disable-next-line
  const [filter, setFilter] = useState("");
  const [view, setView]=useState("");

  // f navegar a lista de exercises
  const toExercisesPage = () => {
    setFilter("");
    return navigate(`/exercises`);
  };

  // f navegar a detalle del exercise
  const toExerciseDetailPage = (id) => {
    return navigate(`/exercises/${id}`);
  };

  // f navegar a AnonUserPage
  const toAnonUserPage = () => {
    return navigate('/')
  }

  // f navegar a NewExercisePage
  const toNewExercisePage = () => {
    return navigate('/newExercise')
  }

  // f navegar a toFavExercisesPage
  const toFavExercisesPage = () => {
    setView("viewFav")
    return navigate('/exercises')
  }
  
  return {toExercisesPage, toExerciseDetailPage, toAnonUserPage, toNewExercisePage, toFavExercisesPage}
};
