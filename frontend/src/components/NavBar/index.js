/* COMPONENTE NavBar botonera dde navegacion */

import "./index.css";
import PropTypes from "prop-types";

import { ButtonGeneric } from "../ButtonGeneric/index";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { useViewNavigation } from "../../hooks/useViewNavigation";
import { useLocation, Link } from "react-router-dom";

export const NavBar = ({ onClickAll, onClickFav }) => {
  // recuperar usuario activo del contexto
  const { currentUser } = useContext(AuthContext);

  // hook navegacion
  const { toExercisesPage, toFavExercisesPage, toNewExercisePage } =
    useViewNavigation();

  const { pathname } = useLocation();

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
            text="Crear usuario"
          ></ButtonGeneric>
        </>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  currentUser: PropTypes.object,
};
