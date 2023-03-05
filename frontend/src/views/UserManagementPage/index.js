/* VISTA para q admin gestione usuarios */

import "./index.css";

import { ButtonGeneric } from "../../components/ButtonGeneric";
import { UserCard } from "../../components/UserCard";
import { NavBar } from "../../components/NavBar";
import { TextBanner } from "../../components/TextBanner";
//import { UserMagCard } from "../../components/UserMagCard";

import { useState, useContext, useEffect } from "react";

import { useViewNavigation } from "../../hooks/useViewNavigation";

import {
  deleteUserByIdService,
  getAllUsersService,
  postNewUserService,
} from "../../services/user";

import { AuthContext } from "../../contexts/AuthContext";

export const UserManagementPage = () => {
  // recuperar contexto autenticacion
  const { token, currentUser } = useContext(AuthContext);

  // invocar hook de navegacion entre ejercicios
  const { toExercisesPage, toAnonUserPage } = useViewNavigation();

  // recuperar usuarios de server
  const [users, setUsers] = useState([]);
  const [userChange, setUserChange] = useState(true);

  // efecto refrescar usuarios; solo workers; el admin no se borra
  useEffect(() => {
    const getData = async () => {
      const recoveredUsers = await getAllUsersService(token);
      const workers = recoveredUsers.filter((u) => u.role !== "admin");
      console.log(recoveredUsers);
      console.log(workers);
      setUsers(workers);
    };
    getData();
  }, [token, userChange]);

  // def estado para recuperar del formulario y enviar al contexto de auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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

  /* f gestionar boton delete */
  const handleDelete = async ({ e, token, user }) => {
    e.stopPropagation();
    await deleteUserByIdService({ token, user });
    await setUserChange(!userChange);
  };

  return !currentUser ? (
    toAnonUserPage()
  ) : (
    <div className="divUserManagementPage">
      <div className="divNav">
        <UserCard></UserCard>
        <NavBar onClickAll={() => toExercisesPage()}></NavBar>
      </div>

      <TextBanner title="Gestión de Usuarios"></TextBanner>
      <article className="articleGesUsariosActivos">
        <TextBanner subtitle="Usuarios Activos"></TextBanner>
        <ul>
          {users.map((user) => {
            return (
              <article className="articleGesUsuCard" key={user.idUser}>
                <ul>
                  <li>{user.email}</li>
                  <li>id:{user.idUser}</li>
                  <li>Rol:{user.role}</li>
                  <li>Fecha creación:{user.created}</li>
                </ul>
                <ButtonGeneric
                  text="BORRAR"
                  className2="delete"
                  onClickFunction={(e) => {
                    handleDelete({ e, token, user });
                  }}
                ></ButtonGeneric>
              </article>
            );
          })}
        </ul>
      </article>

      <div className="articleGesNuevoUsario">
        <TextBanner subtitle="Nuevo Usuario"></TextBanner>
        <fieldset className="formNewUser">
          <TextBanner text="Introduzca credenciales del nuevo usuario."></TextBanner>
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
              type="password"
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
      </div>
    </div>
  );
};
