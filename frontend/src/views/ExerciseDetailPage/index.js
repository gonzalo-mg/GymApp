/* VISTA de detalle de exercise recupeardo por :id */

import "./index.css";
import { ExerciseCard } from "../../components/ExerciseCard";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { TextBanner } from "../../components/TextBanner";
import {UserCard} from "../../components/UserCard"

import { getExerciseByIdService } from "../../services/exercises";
import { useState, useEffect, useContext } from "react";
import { useExerciseNavigation } from "../../hooks/useNavigation";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export const ExerciseDetailPage = () => {
  // recuperar contexto autenticacion
  const { token } = useContext(AuthContext);

  // recuperar del param el id del exercise
  const { idExercise: id } = useParams();

  // f estado de "exercise"; para setear que exercise se muestra
  const [exercise, setExercise] = useState([]);

  // efecto obtener "exercise" del servidor
  // // funcion: getData; llamar al fetch y actualizar estado de "exercise"
  // // variables de escucha: [id]; cada vez q cambie el exercise
  useEffect(() => {
    const getData = async () => {
      const currentExercise = await getExerciseByIdService({ id, token });
      setExercise(currentExercise);
    };
    getData();
  }, []);

  // invocar hook de navegacion entre ejercicios
  const { toExercisesPage, toAnonUserPage } = useExerciseNavigation();

  // devolver banner, tarjeta del ejercicio y boton de volver; si no existe el ejercicio lanzar alerta y volver a lista de ejercicios

  return (
    <>
    <UserCard></UserCard>
    <article className="ExerciseDetail">
      <TextBanner text={"Vista de Detalles"}></TextBanner>

      {!exercise ? toExercisesPage() : undefined}

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
        onClickFunction={() => toExercisesPage()}
      ></ButtonGeneric>
    </article></>
  );
};
