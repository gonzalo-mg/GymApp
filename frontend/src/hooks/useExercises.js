/* HOOK para representar cards de ejercicios */

import { useState, useEffect } from "react";
import {
  getExercisesService,
  getFavExercisesService,
  getLikedExercisesService,
  getExerciseByIdService,
} from "../services/exercises";

export const useExercises = () => {
  
  // RECUPERAR todos ejercicios
  const useAllExercises = ({ token, filter = undefined }) => {
    // f estado de "exercises"; para setear los exercises recuperados y a mostrar
    const [exercises, setExercises] = useState([]);

    // efecto obtener "exercises" del servidor
    // // funcion: getData; llamar al server y actualizar estado de "exercises"; al estar dentro de useEffect hay q hacerlo con un callback por ser asincrono
    // // variables de escucha: []; cada vez q se arrance el elemento o cambie el filtro o los propios ejercios
    useEffect(() => {
      const getData = async () => {
        const recoveredExercises = await getExercisesService(token);
        setExercises(recoveredExercises);

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
    }, [filter]);
    return exercises;
  };

  
  // RECUPERAR todos los FAVS
  const useFavExercises = ({
    token,
    filter = undefined,
    favChange = undefined,
  }) => {
    
    // f estado de "exercises"; para setear los exercises recuperados y a mostrar
    const [exercises, setExercises] = useState([]);

    // efecto obtener "exercises" del servidor
    // // funcion: getData; llamar al server y actualizar estado de "exercises"; al estar dentro de useEffect hay q hacerlo con un callback por ser asincrono
    // // variables de escucha: []; cada vez q se arrance el elemento o cambie el filtro o los propios ejercios
    useEffect(() => {
      const getData = async () => {
        const recoveredExercises = await getFavExercisesService(token);
        if (favChange) {
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
    }, [filter, favChange]);
    return exercises;
  };

  // RECUPERAR todos los LIKED
  const useLikedExercises = ({
    token,
    filter = undefined,
    likeChange = undefined,
  }) => {
    // f estado de "exercises"; para setear los exercises recuperados y a mostrar
    const [exercises, setExercises] = useState([]);

    // efecto obtener "exercises" del servidor
    // // funcion: getData; llamar al server y actualizar estado de "exercises"; al estar dentro de useEffect hay q hacerlo con un callback por ser asincrono
    // // variables de escucha: []; cada vez q se arrance el elemento o cambie el filtro o los propios ejercios
    useEffect(() => {
      const getData = async () => {
        const recoveredExercises = await getLikedExercisesService(token);
        setExercises(recoveredExercises);

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
    }, [filter, likeChange]);
    return exercises;
  };

  // RECUPERAR todos los LIKED
  const useSingleExercises = ({ token, idExercise }) => {
    // f estado de "exercises"; para setear los exercises recuperados y a mostrar
    const [exercise, setExercise] = useState([]);

    // efecto obtener "exercises" del servidor
    // // funcion: getData; llamar al server y actualizar estado de "exercises"; al estar dentro de useEffect hay q hacerlo con un callback por ser asincrono
    // // variables de escucha: []; cada vez q se arrance el elemento o cambie el filtro o los propios ejercios
    useEffect(() => {
      const getData = async () => {
        const recoveredExercise = await getExerciseByIdService({
          token,
          idExercise,
        });
        setExercise(recoveredExercise);
      };
      getData();
    }, []);
    return exercise;
  };

  return {
    useAllExercises,
    useFavExercises,
    useLikedExercises,
    useSingleExercises,
  };
};
