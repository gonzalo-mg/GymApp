/* Funciones auxiliares para manejar gestiones sobre usuarios con la bbdd*/

import axios from "axios";

const serverRoot = process.env.REACT_APP_BACKEND_URL;

/* f de llamada post de login; devulve token como string */
export const postLoginService = async ({ email, password }) => {
  try {
    const data = await axios.post(
      `${serverRoot}/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // devolver token como string
    return data.data.data.userToken;
  } catch (e) {
    // en caso de error emitir alerta con los mensajes q devuleva el servidor
    console.error(e);
    alert(
      `Login fallido - ${e.response.data.status}: ${e.response.data.message}`
    );

    // y lanzar el error para recoger en la f handleLogingForm
    throw new Error(
      `Login fallido - ${e.response.data.status}: ${e.response.data.message}`
    );
  }
};

/* f recuperar datos usuario activo*/
export const getCurrentUserDataService = async (token) => {
  try {
    // llamada con token en header
    const response = await axios.get(`${serverRoot}/currentUser`, {
      headers: { Authorization: token },
    });

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

/* f recuperar todos los usarios de la bbdd */
export const getAllUsersService = async (token) => {
  try {
    const response = await axios.get(`${serverRoot}/users`, {
      headers: { Authorization: token },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

/* f borrar usuario de la base de datos con su idUser */
export const deleteUserByIdService = async ({ token, user }) => {
  try {
    const { idUser, email } = user;
    const response = await axios.delete(`${serverRoot}/users/${idUser}`, {
      headers: { Authorization: token },
    });
    alert(`deleteUserByIdService - Usuario ${email} eliminado.`);
    return response.data;
  } catch (e) {
    console.error(e);
    alert(
      `deleteUserByIdService - ${e.response.data.status}: ${e.response.data.message}`
    );
  }
};

/* f crear nuevo usuario */
export const postNewUserService = async ({ token, email, password }) => {
  try {
    const data = await axios.post(
      `${serverRoot}/newUser`,
      {
        email: email,
        password: password,
      },
      {
        headers: { Authorization: token },
      }
    );
    // devolver respuesta
    alert(`postNewUserService - Usuario ${email} creado.`);
    return data;
  } catch (e) {
    console.error(e);
    alert(`postNewUserService - ${e.response.data}: ${e.response.message}`);
  }
};
