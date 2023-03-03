/* COMPONENTE UserCard: tarjeta de usuario para renderizar cuando esta logeado */

import "./index.css";
import PropTypes from "prop-types";

import { ButtonGeneric } from "../ButtonGeneric/index";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FavLikeContext } from "../../contexts/FavLikeContext";

import { useViewNavigation } from "../../hooks/useViewNavigation";

export const UserCard = () => {
  // recuperar usuario activo del contexto
  const { currentUser, logout } = useContext(AuthContext);
  const {favCounter, likedCounter} = useContext(FavLikeContext);

  const { toExercisesPage, toNewExercisePage, toFavExercisesPage } = useViewNavigation();

  return (
    <article className="UserCard">
      <p>`favs:{favCounter} ; liked:{likedCounter}`</p>
      <p className="user">
        {currentUser
          ? `Logeado como: ${currentUser?.email}`
          : "Sesión no iniciada"}
      </p>
      {currentUser ? (
        <div className="buttons">
          {currentUser.role === "admin" ? (
            <ButtonGeneric
              className="ButtonGeneric"
              text="Crear ejercicio"
              onClickFunction={() => toNewExercisePage()}
            ></ButtonGeneric>
          ) : (
            <ButtonGeneric
              className="ButtonGeneric"
              text="Ver Favoritos"
              onClickFunction={() => toFavExercisesPage()}
            ></ButtonGeneric>
          )}

          <ButtonGeneric
            type="button"
            text="Lista Ejericios"
            onClickFunction={() => toExercisesPage()}
          ></ButtonGeneric>

          <ButtonGeneric
            className="ButtonGeneric"
            text="Cerrar sesión"
            onClickFunction={() => logout()}
          ></ButtonGeneric>
        </div>
      ) : (
        <></>
      )}
    </article>
  );
};

UserCard.propTypes = {
  currentUser: PropTypes.object,
};
