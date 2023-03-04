/* VISTA para q admin gestione usuarios */

import "./index.css";

import { ButtonGeneric } from "../../components/ButtonGeneric";
import { UserCard } from "../../components/UserCard";

import { useState, useContext } from "react";

import { useViewNavigation } from "../../hooks/useViewNavigation";

import { postNewUserService } from "../../services/user";

import { AuthContext } from "../../contexts/AuthContext";
import { NavBar } from "../../components/NavBar";

export const UserManagement = () => {
  const { toAnonUserPage, toExercisesPage } = useViewNavigation;
  // def estado para recuperar del formulario y enviar al contexto de auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // recuperar f de login del contexto para cambiar estado del token
  const { token, currentUser } = useContext(AuthContext);

  /* f de gestion formulario de nuevo registro q recibe email y password */
  const handleForm = async (e) => {
    console.log(`handleForm llamado`);
    try {
      e.preventDefault();
      if (password !== password2) {
        alert`Las contraseñas no coinciden`;
        return null;
      }

      // llamar a server con datos
      await postNewUserService({ email, password });
    } catch (error) {
      console.error(error);
    }
  };

  return !currentUser ? (
    toAnonUserPage()
  ) : (
    <>
      <UserCard></UserCard>
      <NavBar onClickAll={() => toExercisesPage()}></NavBar>

      <article className="oldUser">
        <p>recuperar email usuario y poner boton de borrar</p>
      </article>

      <article className="newUser">
        <fieldset>
          <legend>Introduzca credenciales del nuevo usuario.</legend>
          <form onSubmit={(e) => handleForm(e)}>
            <label htmlfor="email">Correo: </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Introduzca nuevo correo"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <label for="pass">Contraseña: </label>
            <input
              type="password"
              id="pass"
              name="password"
              placeholder="Introduzca nueva contraseña"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <label for="pass">Repita la contraseña: </label>
            <input
              type="password2"
              id="pass2"
              name="password2"
              placeholder="Repita la nueva contraseña"
              required
              onChange={(e) => setPassword2(e.target.value)}
            ></input>

            <ButtonGeneric
              type="submit"
              text="Enviar"
              className="sendButton"
            ></ButtonGeneric>
          </form>
        </fieldset>
      </article>
    </>
  );
};
