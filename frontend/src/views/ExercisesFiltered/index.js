import "./index.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";

import { getExercises } from "../../services/exercises";
import { ExerciseCard } from "../../components/ExerciseCard";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { TextBanner } from "../../components/TextBanner";

export const Exercises = () => {
  // f estado de "exercises"
  const [exercises, setExercises] = useState([]);


  // efecto obtener "exercises" del servidor
  // // funcion: getData; llamar al fetch y actualizar estado de "exercises"
  // // variables de escucha: []; cada vez q se arrance el elemento
  useEffect(() => {
    const getData = async () => {
      const currentExercises = await getExercises();
      setExercises(currentExercises);
      console.log("currentExercises set to:");
      console.log(currentExercises);
    };
    getData();
  }, []);

  // nombrar hook
  const navigate = useNavigate();

     // f navegar a /exercises
  const toExerciseList = () => {
    return navigate(`/exercises`);
  };

  // f navegar a detalle del exercise
  const toExerciseDetail = (id) => {
    return navigate(`/exercises/${id}`);
  };

  

  // devolver una card por cada exercise del server
  return (
    <article className="exercisesList">
      <TextBanner text={"Vista Lista Ejercicios Disponibles tras filtrado"}></TextBanner>

      
        <ButtonGeneric
          type="button"
          text="Desfiltrar"
          onClickFunction={() =>  toExerciseList()}
        ></ButtonGeneric>


    

      {exercises.map((ex) => {
        return (
          <ExerciseCard
            key={ex.idExercise}
            name={ex.name}
            picture={ex.picture}
            typology={ex.typology}
            muscles={ex.muscles}
            onClickCard={() => toExerciseDetail(ex.idExercise)}
          ></ExerciseCard>
        );
      })}
    </article>
  );
};
