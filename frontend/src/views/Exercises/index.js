/* VISTA de listado completo de ejercicios */

import "./index.css";

import { useState, useEffect } from "react";
import { useExerciseNavigation } from "../../hooks/useNavigation";

import { getExercises } from "../../services/exercises";
import { ExerciseCard } from "../../components/ExerciseCard";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { TextBanner } from "../../components/TextBanner";

export const Exercises = () => {
  // f estado de "exercises"; para setear los exercises recuperados y a mostrar
  const [exercises, setExercises] = useState([]);

  // f estado de "exercises"; para setear los filtros a usar para mostrar exercises
  const [filter, setFilter] = useState("");

  // efecto obtener "exercises" del servidor
  // // funcion: getData; llamar al server y actualizar estado de "exercises"; al estar dentro de useEffect hay q hacerlo con un callback por sen asincrono
  // // variables de escucha: []; cada vez q se arrance el elemento
  useEffect(() => {
    const getData = async () => {
      // recuperar exercises del server
      const recoveredExercises = await getExercises();

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
      setExercises(filteredExercises);
    };
    getData();
  }, [filter]);

  // invocar hook de navegacion entre ejercicios
  const { toExercises, toExerciseDetail } = useExerciseNavigation();

  // devolver una card por cada exercise del server
  return (
    <article className="exercisesList">
      <TextBanner text={"Vista Lista Ejercicios Disponibles"}></TextBanner>

      <form
        id="filters"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(`form submit sets filtersURL to: ${filter}`);
        }}
      >
        <ul>
          <li>
            <input
              id="filterName"
              name="name"
              placeholder="Busca por nombre, tipología o músculo"
              value={filter}
              onChange={(e) => setFilter(e.target.value.toLowerCase())}
            ></input>
          </li>
        </ul>

        <ButtonGeneric type="submit" text="Filtrar"></ButtonGeneric>

        <ButtonGeneric
          type="button"
          text="Volver"
          onClickFunction={() => toExercises()}
        ></ButtonGeneric>
      </form>

      {filter !== "" ? (
        <TextBanner text="Resultados del filtrado"></TextBanner>
      ) : (
        ""
      )}

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
