/* Funciones auxiliares para manejar los ejercicios */

import axios from "axios";

const serverRoot = process.env.REACT_APP_BACKEND_URL;

/* f para recuperar todos los ejercicios del server */
export const getExercisesService = async (token) => {
  try {
    const response = await axios.get(`${serverRoot}/exercises`, {
      headers: { Authorization: token },
    });

    // desestructurar respuesta ; axios incluye varias anidaciones de objetos, por defecto uno llamada "data"; el backend tmb devuelve un {data};
    const { data } = response;
    const { data: serverData } = data;
    const { exercises } = serverData;

    // devolver array de objetos tipo ejercicio
    return exercises;
  } catch (e) {
    console.error(e);
    console.log(e.response.data);
    return alert(
      `getExercisesService - ${e.response.data.status}: ${e.response.data.message}`
    );
  }
};

/* f para recuperar un ejercicio particular del server mediante path param */
export const getExerciseByIdService = async ({ id, token }) => {
  try {
    const response = await axios.get(`${serverRoot}/exercises/${id}`, {
      headers: { Authorization: token },
    });

    // desestructurar respuesta ; axios incluye varias anidaciones de objetos, por defecto uno llamada "data"; el backend tmb devuelve un {data};
    const { data } = response;
    const { data: exercise } = data;

    // devolver objeto tipo ejercicio
    return exercise;
  } catch (e) {
    console.error(e);
    console.log(e.response.data);
    alert(
      `getExerciseByIdService - ${e.response.data.status}: ${e.response.data.message}`
    );
  }
};

/* f para recuperar los ejercicios favs de un usuario del server */
export const getFavExercisesService = async (token) => {
  try {
    const response = await axios.get(`${serverRoot}/favorites`, {
      headers: { Authorization: token },
    });
    const { data } = response;
    const { data: favs } = data;

    // devolver array de objetos tipo ejercicio
    return favs;
  } catch (e) {
    console.error(e);
    console.log(e.response.data);
    return alert(
      `getFavExercisesService - ${e.response.data.status}: ${e.response.data.message}`
    );
  }
};

/* f para grabar nuevo ejercicio en server */
export const postNewExerciseService = async ({
  token,
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
        Authorization: token,
      },
    });
    return alert(`Creado ejercicio: ${name}.`);
  } catch (e) {
    console.error(e.message);
    console.log(e.response.data);
    return alert(
      `postNewExerciseService - ${e.response.data.status}: ${e.response.data.message}`
    );
  }
};

/* f para borrar ejercicio de la bbdd */
export const deleteExerciseService = async ({ token, idExercise }) => {
  try {
    await axios.delete(`${serverRoot}/exercises/${idExercise}`, {
      headers: { Authorization: token },
    });
  } catch (e) {
    console.error(e);
    console.log(e.response.data);
    return alert(
      `deleteExerciseService - ${e.response.data.status}: ${e.response.data.message}`
    );
  }
};

/* f para cambiar fav */
/* export const toggleFavService = async ({ token, idExercise }) => {
  try {
    await axios.post(`${serverRoot}/exercises/${idExercise}/fav`, {
      headers: { Authorization: token },
    });
  } catch (e) {
    console.error(e);
    console.log(e.response.data);
    return alert(
      `toggleFavService - ${e.response.data.status}: ${e.response.data.message}`
    );
  }
}; */

export const toggleFavService = async ({ token, idExercise, data = null }) => {
  try {
    const response = await axios.post(
      `${serverRoot}/exercises/${idExercise}/fav`,
      data,
      {
        headers: { Authorization: token },
      }
    );
    //devolver objeto updatedfav, tipo:
    /* "updatedfav": {
        "idUser": 3,
        "idExercise": 2,
        "stateFav": 0,
        "created": "2023-03-02T09:43:15.000Z"
    } */
    if (response.data.fav.stateFav === 0) {
      return alert(`toggleFavService - Ejercicio eliminado de favoritos`);
    } else {
      return alert(`toggleFavService - Ejercicio añadido a favoritos`);
    }
  } catch (e) {
    console.error(e);
    console.log(e.response.data);
    return alert(
      `toggleFavService - ${e.response.data.status}: ${e.response.data.message}`
    );
  }
};
