/* HOOK para representar cards de ejercicios */

import { useState, useEffect } from "react";
import {
  getExercisesService,
  getFavExercisesService,
  getLikedExercisesService,
  getExerciseByIdService,
} from "../services/exercises";

export const useExercises = () => {
  // RECUPERAR ejercicios
  const useGetExercises = ({
    token,
    filter = undefined,
    //getFavs = undefined,
    favChange = undefined,
    getLiked = undefined,
    likeChange = undefined,
    idExercise = undefined,
  }) => {
    // f estado de "exercises"; para setear los exercises recuperados y a mostrar
    const [exercises, setExercises] = useState([]);

    // efecto obtener "exercises" del servidor
    // // funcion: getData; llamar al server y actualizar estado de "exercises"; al estar dentro de useEffect hay q hacerlo con un callback por ser asincrono
    // // variables de escucha: []; cada vez q se arrance el elemento o cambie el filtro o los propios ejercios
    useEffect(() => {
      const getData = async () => {
        // inicializar array de ejercicios recuperados
        let recoveredExercises = [];
        // si se piden los favs devolver solo los favs
        if (favChange) {
          console.log(`useGetExercises - if favs`);
          recoveredExercises = await getFavExercisesService(token);
          setExercises(recoveredExercises);
          // si se pide un ejercicio en concreto devolver solo ese
        } else if (getLiked && likeChange) {
          console.log(`useGetExercises - if likes`);
          recoveredExercises = await getLikedExercisesService(token);
          setExercises(recoveredExercises);
          // si se pide un ejercicio en concreto devolver solo ese
        } else if (idExercise) {
          console.log(`useGetExercises - if idExercise`);
          recoveredExercises = await getExerciseByIdService({
            idExercise,
            token,
          });
          setExercises(recoveredExercises);
          // si no se piden favs ni uno concreto recuperar todos los exercises
        } else {
          console.log(`useGetExercises - if general`);
          recoveredExercises = await getExercisesService(token);
          setExercises(recoveredExercises);
        }

        // si existe filtro aplicarlo a los recuperados
        if (filter) {
          // f para filtrar exercises; devolver cq exercise q contenga (en su nombre/tipologia/musculo) lo escrito por el usuario en el formulario
          function myFiltering(ex, filter) {
            if (ex.name.toLowerCase().includes(filter)) {
              return ex;
            }
            if (ex.typology.toLowerCase().includes(filter)) {
              return ex;
            }
            if (ex.muscles.toLowerCase().includes(filter)) {
              return ex;
            }
          }

          // aplicar filtrado
          const filteredExercises = recoveredExercises.filter((ex) =>
            myFiltering(ex, filter)
          );

          // setear exercises al resultado del filtro
          console.log(`useGetExercises - if filter`);
          setExercises(filteredExercises);
        }
      };
      getData();
    }, [filter, favChange, likeChange]);
    return exercises;
  };

  return { useGetExercises};
};
