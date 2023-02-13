import axios from "axios";

const serverRoot = process.env.REACT_APP_BACKEND_URL;

export const getExercises = async () => {

    try {
      console.log(`calling getExercises`)
      const response = await axios.get(`${serverRoot}/exercises`);

      // desestructurar respuesta ; axios incluye varias anidaciones de objetos, por defecto uno llamada "data"; el backend tmb devuelve un {data};
      const { data } = response;
      const { data: serverData } = data;
      const { exercises } = serverData;

      console.log("getExercises response:");
      console.log(exercises);
      // devolver array de objetos tipo ejercicio
      return exercises;
    } catch (error) {
      console.error(error);
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

export const getExerciseById = async (id) => {
  try {
    const response = await axios.get(`${serverRoot}/exercises/${id}`);

    //console.log("getExerciseById response");
    //console.log(response);

    // desestructurar respuesta ; axios incluye varias anidaciones de objetos, por defecto uno llamada "data"; el backend tmb devuelve un {data};
    const { data } = response;
    const { data: exercise } = data;

    // devolver objeto tipo ejercicio
    return exercise;
  } catch (error) {
    console.error(error);
  }
};
