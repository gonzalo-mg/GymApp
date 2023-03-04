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
    return navigate(`/exercises`);
  };

  // f navegar a detalle del exercise
  const toExerciseDetailPage = (id) => {
    navigate(`/exercises/${id}`);
  };

  // f navegar a AnonUserPage
  const toAnonUserPage = () => {
    navigate('/')
  }

  // f navegar a NewExercisePage
  const toNewExercisePage = () => {
    navigate('/newExercise')
  }

  // f navegar a toFavExercisesPage
  const toFavExercisesPage = () => {
    navigate('/exercises',{
      wantedView: "viewFav"
    })
  }
  
  return {toExercisesPage, toExerciseDetailPage, toAnonUserPage, toNewExercisePage, toFavExercisesPage}
};
