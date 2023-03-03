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
export const getExerciseByIdService = async ({ idExercise, token }) => {
  try {
    const response = await axios.get(`${serverRoot}/exercises/${idExercise}`, {
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

/* f para recuperar los ejercicios liked de un usuario del server */
export const getLikedExercisesService = async (token) => {
  try {
    const response = await axios.get(`${serverRoot}/likes`, {
      headers: { Authorization: token },
    });
    const { data } = response;
    const { data: liked } = data;

    // devolver array de objetos tipo ejercicio
    return liked;
  } catch (e) {
    console.error(e);
    console.log(e.response.data);
    return alert(
      `getLikedExercisesService - ${e.response.data.status}: ${e.response.data.message}`
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

export const toggleFavService = async ({ token, idExercise, data = null }) => {
  try {
    const response = await axios.post(
      `${serverRoot}/exercises/${idExercise}/fav`,
      data,
      {
        headers: { Authorization: token },
      }
    );
    //devolver objeto stateFav (1 ó 0)
    if (response.data.fav.stateFav === 0) {
      alert(`toggleFavService - Ejercicio eliminado de favoritos`);
      return response.data.fav.stateFav;
    } else {
      alert(`toggleFavService - Ejercicio ${response.data.fav.idExercise} añadido a favoritos`);
      return response.data.fav.stateFav;
    }
  } catch (e) {
    console.error(e);
    console.log(e.response.data);
    return alert(
      `toggleFavService - ${e.response.data.status}: ${e.response.data.message}`
    );
  }
};

export const toggleLikeService = async ({ token, idExercise, data = null }) => {
  try {
    const response = await axios.post(
      `${serverRoot}/exercises/${idExercise}/like`,
      data,
      {
        headers: { Authorization: token },
      }
    );
  //devolver objeto stateLike (1 ó 0)
    if (response.data.updatedLike.stateLike === 0) {
      alert(`toggleLikeService - Like quitado`)
      return response.data.updatedLike.stateLike;
    } else {
      alert(`toggleLikeService - Like dado`)
      return response.data.updatedLike.stateLike;
    }
  } catch (e) {
    console.error(e);
    console.log(e.response.data);
    return alert(
      `toggleLikeService - ${e.response.data.status}: ${e.response.data.message}`
    );
  }
};
