/* Funciones auxiliares para manejar gestiones sobre usuarios con la bbdd*/

import axios from "axios";
//import { useExerciseNavigation } from "../hooks/useNavigation";

const serverRoot = process.env.REACT_APP_BACKEND_URL;

/* f de llamada post de login */
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
    alert(`Login fallido - ${e.response.data.status}: ${e.response.data.message}`);
  
    // y lanzar el error para recoger en la f handleLogingForm
    throw new Error(
      `Login fallido - ${e.response.data.status}: ${e.response.data.message}`
    );
  }
};
