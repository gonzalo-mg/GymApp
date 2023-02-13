import "./index.css";

import { ButtonGeneric } from "../../components/ButtonGeneric";

import { login }from "../../services/user.js";

import { useNavigate } from "react-router";

export const AnonUser = () => {

  // nombrar hook
  const navigate = useNavigate();

   // f navegar a detalle del exercise
 const toExercises = () => {
  return navigate(`/exercises`);
};

  const logUser = async (e) => {
    try {
      e.preventDefault();

      

      const email = e.target.email.value;
      const password = e.target.password.value;

      console.log("llamando a login con:")
      console.log(`con email: ${email}`)
      console.log(`con password: ${password}`)

      await login({ email, password });
      //toExercises();
    } catch (error) {}
  };

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
          ></input>
        </div>

        <div>
          <label for="pass">Contraseña: </label>
          <input
            type="password"
            id="pass"
            name="password"
            placeholder="Introduzca su contraseña"
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
