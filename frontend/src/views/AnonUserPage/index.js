/* VISTA raiz y de login */

import "./index.css";

import { ButtonGeneric } from "../../components/ButtonGeneric";

import {postLoginService} from "../../services/user";

import { useState } from "react";

import { useExerciseNavigation } from "../../hooks/useNavigation";

export const AnonUserPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const {toExercisesPage} = useExerciseNavigation();

/* f de gestion formulario login q recibe email y password */
const handleLogingForm = async (e) => {
  try {
    e.preventDefault();

    // llamar a server con datos del login y recibir token
    const userToken = await postLoginService({ email, password });
    console.log(`userToken: ${userToken}`);

    // meter token en localstorage
        localStorage.setItem('userToken', JSON.stringify(userToken))
    // WIP enviar a vista de exercises si login ok
    toExercisesPage()

  } catch (error) {
    console.error(error);
  }
};

  return (
    <fieldset>
      <legend>Introduzca sus credenciales</legend>
      <form onSubmit={(e) => handleLogingForm(e)}>
        <div>
          <label htmlfor="email">Correo: </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Introduzca su correo"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div>
          <label for="pass">Contraseña: </label>
          <input
            type="password"
            id="pass"
            name="password"
            placeholder="Introduzca su contraseña"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <ButtonGeneric
          type="submit"
          text="Enviar"
          className="sendButton"
        ></ButtonGeneric>
      </form>
    </fieldset>
  );
};
