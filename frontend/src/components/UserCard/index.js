/* COMPONENTE UserCard: tarjeta de usuario para renderizar cuando esta logeado */

import "./index.css";
import PropTypes from 'prop-types'

import { ButtonGeneric } from "../ButtonGeneric";

import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export const UserCard = () => {
  // recuperar usuario activo del contexto
  const {currentUser, logout} = useContext(AuthContext);
  return (
      <article className="UserCard">
        <p className="user">{currentUser ? `Logeado como: ${currentUser?.email}` : "Sesión no iniciada"}</p>
        {currentUser ? <div className="buttons">
          <ButtonGeneric
            className="ButtonGenericFav"
            text="Ver Favoritos"
            onClickFunction={"WIP-abrir favs usuario"}
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