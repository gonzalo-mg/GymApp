/* COMPONENTE UserCard: tarjeta de usuario para renderizar cuando esta logeado */

import "./index.css";
import PropTypes from "prop-types";

import { ButtonGeneric } from "../ButtonGeneric/index";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const UserCard = () => {
  // recuperar usuario activo del contexto
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <article className="UserCard">
      <p className="user">
        {currentUser ? `Usuario: ${currentUser?.email}` : "Sesión no iniciada"}
      </p>
      {currentUser ? (
        <ButtonGeneric
          className="ButtonGeneric"
          text="Cerrar sesión"
          onClickFunction={(e) => {
            e.preventDefault();
            logout();
          }}
        ></ButtonGeneric>
      ) : null}
    </article>
  );
};

UserCard.propTypes = {
  currentUser: PropTypes.object,
  logout: PropTypes.func,
};
