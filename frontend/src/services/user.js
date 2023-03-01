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
    console.log(`postLoginService - token devuelto: ${data.data.data.userToken}`)
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

/* f llamada a get a /currentUser con el token almacenado para recuperar/validar datos/token del usuario;
devulve los datos del usuario como un objeto tipo:
  {
    "status": "ok - user data recovered",
    "data": {
        "idUser": 3,
        "email": "worker2@mail.com",
        "password": "$2b$10$3Mp9sN4vuCsObRYArwuuoeKvXDAVliY8Ly4SoQCPj9rdyZ2WV4JYG",
        "role": "worker",
        "created": "2023-03-01T18:19:18.000Z"
    }
  }
*/
export const getCurrentUserDataService = async (token) => {
  // llamada con token en header
  const response = await axios.get(`${serverRoot}/currentUser`, {
    headers: { "Authorization": token },
  });

  return response.data;
};
