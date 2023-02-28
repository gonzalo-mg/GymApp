/* VISTA raiz y de login */

import "./index.css";

import { ButtonGeneric } from "../../components/ButtonGeneric";

import { postLoginService } from "../../services/user";

import { useState, useContext } from "react";

import { useExerciseNavigation } from "../../hooks/useNavigation";
import { AuthContext } from "../../contexts/AuthContext";

export const AnonUserPage = () => {
  // def estado para recuperar del formulario y enviar al contexto de auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // recuperar f de estado del contexto
  const {setToken, setCurrentUser} = useContext(AuthContext)

  const { toExercisesPage } = useExerciseNavigation();

  /* f de gestion formulario login q recibe email y password */
  const handleLogingForm = async (e) => {
    try {
      e.preventDefault();

      // llamar a server con datos del login y recibir token
      const newToken = await postLoginService({ email, password });

      //modificar estados
      setToken(newToken);
      setCurrentUser(email);

      // enviar a vista de exercises si login ok
      toExercisesPage();
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
