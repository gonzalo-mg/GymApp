/* Funciones auxiliares para manejar los ejercicios */

import axios from "axios";

const serverRoot = process.env.REACT_APP_BACKEND_URL;

/* f para recuperar todos los ejercicios del server */

export const getExercises = async () => {
  try {
    console.log(`calling getExercises`);
    const response = await axios.get(`${serverRoot}/exercises`);

    // desestructurar respuesta ; axios incluye varias anidaciones de objetos, por defecto uno llamada "data"; el backend tmb devuelve un {data};
    const { data } = response;
    const { data: serverData } = data;
    const { exercises } = serverData;

    // devolver array de objetos tipo ejercicio
    return exercises;
  } catch (e) {
    console.error(e);
    console.log(e.response.data);
    return alert(`${e.response.data.status}: ${e.response.data.message}`)
  }
};

// version con fetch
/*   export const getExercises= async () => {
    try {
      const response = await fetch(`${serverRoot}/exercises`);

      const parsedResponse = await response.json()

      console.log(parsedResponse.data.exercises)

      return parsedResponse.data.exercises;
    }
    catch (error) {
      console.error(error);
    }
  }; */

/* f para recuperar un ejercicio particular del server mediante path param */

export const getExerciseById = async (id) => {
  try {
    const response = await axios.get(`${serverRoot}/exercises/${id}`);

    // desestructurar respuesta ; axios incluye varias anidaciones de objetos, por defecto uno llamada "data"; el backend tmb devuelve un {data};
    const { data } = response;
    const { data: exercise } = data;

    // devolver objeto tipo ejercicio
    return exercise;
  } catch (e) {
    console.error(e);
    console.log(e.response.data);
    alert(`${e.response.data.status}: ${e.response.data.message}`)
  }
};

/* f para grabar nuevo ejercicio en server */
export const postNewExercise = async ({
  name,
  typology,
  description,
  muscles,
  picture,
}) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("typology", typology);
    formData.append("description", description);
    formData.append("muscles", muscles);
    formData.append("picture", picture);

    await axios.post(`${serverRoot}/newExercise`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    console.error(e.message);
    console.log(e.response.data);
    return alert(`${e.response.data.status}: ${e.response.data.message}`)
  }
};
