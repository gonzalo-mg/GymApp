/* VISTA raiz y de login */

import "./index.css";

import { ButtonGeneric } from "../../components/ButtonGeneric";
import {UserCard} from "../../components/UserCard"
import { postLoginService } from "../../services/user";

import { useState, useContext } from "react";

import { useViewNavigation } from "../../hooks/useViewNavigation";
import { AuthContext } from "../../contexts/AuthContext";

import { useLocation } from "react-router-dom";

export const AnonUserPage = () => {
  // def estado para recuperar del formulario y enviar al contexto de auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // recuperar f de login del contexto para cambiar estado del token
  const { token, currentUser, login } = useContext(AuthContext);

  const { toExercisesPage } = useViewNavigation();

  //const location = useLocation();

  /* f de gestion formulario de login q recibe email y password */
  const handleLogingForm = async (e) => {
    try {
      e.preventDefault();

      // llamar a server con datos del login y recibir token
      const newToken = await postLoginService({ email, password });
      console.log(`handleLogingForm -  newToken ${newToken}`)
      //modificar estado
      login(newToken);

    } catch (error) {
      console.error(error);
    }
  };

  // si existe usuario conectado enviar a pag principal de exercises; si no permanecer en pag de login
  return currentUser ? toExercisesPage() :(
    <>
    <UserCard></UserCard>
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
    </>
  );
};
