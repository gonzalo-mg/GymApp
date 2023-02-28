/* Funciones auxiliares para manejar usuarios */

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
    alert(`catch-${e.response.data.status}: ${e.response.data.message}`);
    console.error(e);
    console.error(e.response.data.message);
    throw new Error(`catch-${e.response.data.status}: ${e.response.data.message}`)
  }
};
