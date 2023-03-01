/* VISTA de listado de favs del currentUser */

import "./index.css";

import { useState, useEffect, useContext } from "react";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { AuthContext } from "../../contexts/AuthContext";

import { getFavExercisesService } from "../../services/exercises";
import { ExerciseCard } from "../../components/ExerciseCard";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { TextBanner } from "../../components/TextBanner";
import {UserCard} from "../../components/UserCard"

export const FavExercisesPage = () => {
  // cargar contexto autenticacion
  const {token, currentUser} = useContext(AuthContext);

  // f estado de "exercises"; para setear los exercises recuperados y a mostrar
  const [exercises, setExercises] = useState([]);

  // efecto obtener "exercises" del servidor
  // // funcion: getData; llamar al server y actualizar estado de "exercises"; al estar dentro de useEffect hay q hacerlo con un callback por sen asincrono
  // // variables de escucha: []; cada vez q se arrance el elemento
  useEffect(() => {
    const getData = async () => {
      // recuperar exercises q sean fav del server
      const favs = await getFavExercisesService(token);
      setExercises(favs);
    };
    getData();
  }, []);

  // invocar hook de navegacion entre vistas
  const { toExercisesPage, toExerciseDetailPage, toAnonUserPage } = useViewNavigation();

  // devolver una card por cada exercise del server
  return  !currentUser ? toAnonUserPage() : (
    <>
    <UserCard></UserCard>
    <article className="exercisesList">
      <TextBanner text={exercises.length===0 ? "No tienes favoritos" : "Estos son tus favoritos"}></TextBanner>

      {exercises.map((ex) => {
        return (
          <ExerciseCard
            key={ex.idExercise}
            name={ex.name}
            picture={ex.picture}
            typology={ex.typology}
            muscles={ex.muscles}
            onClickCard={() => toExerciseDetailPage(ex.idExercise)}
          ></ExerciseCard>
        );
      })}
      <ButtonGeneric
        type="button"
        text="Volver"
        onClickFunction={() => toExercisesPage()}
      ></ButtonGeneric>
    </article>
    </>
  );
};
