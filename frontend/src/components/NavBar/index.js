/* COMPONENTE NavBar botonera dde navegacion */

import "./index.css";
import PropTypes from "prop-types";

import { ButtonGeneric } from "../ButtonGeneric/index";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { useViewNavigation } from "../../hooks/useViewNavigation";

export const NavBar = ({ onClickAll, onClickFav }) => {
  // recuperar usuario activo del contexto
  const { currentUser } = useContext(AuthContext);

  // hook navegacion
  const { toNewExercisePage, toUsersManagementPage } = useViewNavigation();

  // devolver botones segun rol usuario
  return (
    <nav className="buttons">
      <ButtonGeneric
        type="button"
        text="Ver Todos"
        onClickFunction={onClickAll}
      ></ButtonGeneric>
      {currentUser.role === "worker" ? (
        <ButtonGeneric
          type="button"
          text="Ver Favoritos"
          onClickFunction={onClickFav}
        ></ButtonGeneric>
      ) : (
        <>
          <ButtonGeneric
            className="ButtonGeneric"
            text="Crear ejercicio"
            onClickFunction={() => toNewExercisePage()}
          ></ButtonGeneric>
          <ButtonGeneric
            className="ButtonGeneric"
            text="Usuarios"
            onClickFunction={() => toUsersManagementPage()}
          ></ButtonGeneric>
        </>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  currentUser: PropTypes.object,
};
