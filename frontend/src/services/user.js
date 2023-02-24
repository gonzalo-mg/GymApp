/* Funciones auxiliares para manejar usuarios */

import axios from "axios";
import { useExerciseNavigation } from "../hooks/useNavigation";

const serverRoot = process.env.REACT_APP_BACKEND_URL;



/* f de loging de usuario a traves de formulario q reciba email y password*/
export const logUser = async (e) => {
  try {
    e.preventDefault();
// recibir datos del evento del formulario
    const email = e.target.email.value;
    const password = e.target.password.value;
    // llamar a server con datos del login y recibir token so va ok
    const userToken = await postLogin({ email, password });
    console.log(`userToken: ${userToken}`);
    // meter token en localstorage
        localStorage.setItem('userToken', JSON.stringify(userToken))
    // WIP enviar a vista de exercises si login ok

  } catch (error) {
    console.error(error);
  }
};

/* f de llamada post de login */
export const postLogin = async ({ email, password }) => {
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

    // devovler token como string
    return data.data.data.userToken;
  } catch (e) {
    console.error(e);
    alert(`catch-${e.response.data.status}: ${e.response.data.message}`);
  }
};
