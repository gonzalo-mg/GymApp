/* HOOK para manejar la navegacion entre ejercicios */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useExerciseNavigation = () => {
  // nombrar hook por defecto
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");

  // f navegar a lista de exercises
  const toExercises = () => {
    setFilter("");
    return navigate(`/exercises`);
  };

  // f navegar a detalle del exercise
  const toExerciseDetail = (id) => {
    return navigate(`/exercises/${id}`);
  };

  return {toExercises, toExerciseDetail}
};
