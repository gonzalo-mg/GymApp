/* VISTA raiz y de login */

import "./index.css";

import { ButtonGeneric } from "../../components/ButtonGeneric";
import { UserCard } from "../../components/UserCard";
import {TextBanner} from "../../components/TextBanner"

import { postLoginService } from "../../services/user";

import { useState, useContext } from "react";
import { useViewNavigation } from "../../hooks/useViewNavigation";
import { AuthContext } from "../../contexts/AuthContext";

export const AnonUserPage = () => {
  // def estado para recuperar del formulario y enviar al contexto de auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // recuperar f de login del contexto para cambiar estado del token
  const { currentUser, login } = useContext(AuthContext);

  const { toExercisesPage } = useViewNavigation();

  /* f de gestion formulario de login q recibe email y password */
  const handleLogingForm = async (e) => {
    try {
      e.preventDefault();

      // llamar a server con datos del login y recibir token
      const newToken = await postLoginService({ email, password });
      console.log(`handleLogingForm -  newToken ${newToken}`);
      //modificar estado
      login(newToken);
    } catch (error) {
      console.error(error);
    }
  };

  // si existe usuario conectado enviar a pag principal de exercises; si no permanecer en pag de login
  return currentUser ? (
    toExercisesPage()
  ) : (
    <>
      <UserCard></UserCard>
      <fieldset>
        <TextBanner subtitle="Introduzca sus credenciales"></TextBanner>
        <form onSubmit={(e) => handleLogingForm(e)}>
          <label htmlfor="email">Correo: </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Introduzca su correo"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label for="pass">Contraseña: </label>
          <input
            type="password"
            id="pass"
            name="password"
            placeholder="Introduzca su contraseña"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
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
