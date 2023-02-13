import "./index.css";
import { ExerciseCard } from "../../components/ExerciseCard";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import {TextBanner} from "../../components/TextBanner"

import { getExerciseById } from "../../services/exercises";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

export const ExerciseDetail = () => {
  // recuperar del param el id de exercise
  const { idExercise: id } = useParams();

  // f estado de "exercise"
  const [exercise, setExercise] = useState([]);

  // efecto obtener "exercise" del servidor
  // // funcion: getData; llamar al fetch y actualizar estado de "exercise"
  // // variables de escucha: [id]; cada vez q cambie el exercise
  useEffect(() => {
    const getData = async () => {
      const currentExercise = await getExerciseById(id);
      setExercise(currentExercise);
    };
    getData();
  }, []);

  // nombrar hook
  const navigate = useNavigate();
  // f navegar a /exercises
  const toExerciseList = () => {
    return navigate(`/exercises`);
  };

  return (
    <article className="ExerciseDetail">
      <TextBanner text={"Vista de Detalles"}></TextBanner>

      <ExerciseCard
        name={exercise.name}
        description={exercise.description}
        typology={exercise.typology}
        muscles={exercise.muscles}
        picture={exercise.picture}
        admin={false}
        likeCounter={"WIP"}
      ></ExerciseCard>

      <ButtonGeneric
        type="button"
        text="Volver"
        onClickFunction={() => toExerciseList()}
      ></ButtonGeneric>
    </article>
  );
};

/*  */

/*  */
