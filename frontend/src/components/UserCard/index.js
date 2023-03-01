/* COMPONENTE UserCard: tarjeta de usuario para renderizar cuando esta logeado */

import "./index.css";
import PropTypes from 'prop-types'

import { ButtonGeneric } from "../ButtonGeneric";

import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

import { useViewNavigation } from "../../hooks/useViewNavigation";

export const UserCard = () => {
  // recuperar usuario activo del contexto
  const {currentUser, logout} = useContext(AuthContext);

  const { toNewExercisePage, toFavExercisesPage } = useViewNavigation();

  return (
      <article className="UserCard">
        <p className="user">{currentUser ? `Logeado como: ${currentUser?.email}` : "Sesión no iniciada"}</p>
        {currentUser ? <div className="buttons">
        {currentUser.role === "admin" ? <ButtonGeneric
            className="ButtonGenericFav"
            text="Crear ejercicio"
            onClickFunction={()=>toNewExercisePage()}
          ></ButtonGeneric> : <></>}
          <ButtonGeneric
            className="ButtonGenericFav"
            text="Ver Favoritos"
            onClickFunction={()=>toFavExercisesPage()}
          ></ButtonGeneric>
          <ButtonGeneric
            className="ButtonGenericFav"
            text="Cerrar sesión"
            onClickFunction={() => logout()}
          ></ButtonGeneric>
        </div> : <></>}
      </article>
    );
};

UserCard.propTypes = {
  currentUser: PropTypes.object
}