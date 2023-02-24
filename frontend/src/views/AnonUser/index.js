/* VISTA raiz y de login */

import "./index.css";

import { ButtonGeneric } from "../../components/ButtonGeneric";

import { logUser } from "../../services/user.js";

export const AnonUser = () => {

  return (
    <fieldset>
      <legend>Introduzca sus credenciales</legend>
      <form onSubmit={(e) => logUser(e)}>
        <div>
          <label htmlfor="email">Correo: </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Introduzca su correo"
            required
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
