import "./index.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
//import { createSearchParams } from "react-router-dom";

import { getExercises } from "../../services/exercises";
import { ExerciseCard } from "../../components/ExerciseCard";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { TextBanner } from "../../components/TextBanner";

export const Exercises = () => {
  // f estado de "exercises"
  const [exercises, setExercises] = useState([]);

  const [filter, setFilter] = useState("");
/*   const [nameFilter, setNameFilter] = useState("");
  const [typologyFilter, setTypologyFilter] = useState("");
  const [musclesFilter, setMusclesFilter] = useState(""); */

  // efecto obtener "exercises" del servidor
  // // funcion: getData; llamar al fetch y actualizar estado de "exercises"
  // // variables de escucha: []; cada vez q se arrance el elemento
  useEffect(() => {
    const getData = async () => {
      console.log(`running useEffect`);

      const recoveredExercises = await getExercises();

function myFiltering(ex, filter) {
  
  if (ex.name.toLowerCase().includes(filter)) {
    return ex
  }
  if (ex.typology.toLowerCase().includes(filter)) {
    return ex
  }
  if (ex.muscles.toLowerCase().includes(filter)) {
    return ex
  }
 
}

      const filteredExercises = recoveredExercises.filter(ex => myFiltering(ex, filter))

      setExercises(filteredExercises);
      console.log(
        `useEffect after call to server sets currentExercises to: ${filteredExercises}`
      );
    };
    getData();
  }, [filter]);

  // nombrar hook
  const navigate = useNavigate();

  // f navegar a detalle del exercise
  const toExercises = () => {
    setFilter("");
    return navigate(`/exercises`);
  };

  // f navegar a detalle del exercise
  const toExerciseDetail = (id) => {
    return navigate(`/exercises/${id}`);
  };

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
