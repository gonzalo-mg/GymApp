/* VISTA de detalle de exercise recupeardo por :id */

import "./index.css";
import { ExerciseCard } from "../../components/ExerciseCard";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { TextBanner } from "../../components/TextBanner";

import { getExerciseById } from "../../services/exercises";
import { useState, useEffect } from "react";
import { useExerciseNavigation } from "../../hooks/useNavigation";
import { useParams } from "react-router-dom";

export const ExerciseDetailPage = () => {
  // recuperar del param el id del exercise
  const { idExercise: id } = useParams();

  // f estado de "exercise"; para setear que exercise se muestra
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

  // invocar hook de navegacion entre ejercicios
  const { toExercises } = useExerciseNavigation();

  // devolver banner, tarjeta del ejercicio y boton de volver; si no existe el ejercicio lanzar alerta y volver a lista de ejercicios

  return (
    <article className="ExerciseDetail">
      <TextBanner text={"Vista de Detalles"}></TextBanner>

      {!exercise ? toExercises() : undefined}

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
        onClickFunction={() => toExercises()}
      ></ButtonGeneric>
    </article>
  );
};
