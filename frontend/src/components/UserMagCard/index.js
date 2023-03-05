/* componente para representar los usuarios en la vista UserManagementPage */
import "./index.css";
import PropTypes from "prop-types";
import { ButtonDelete } from "../ButtonDelete";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { deleteUserByIdService } from "../../services/user";

export const UserMagCard = ({ user, userChange, setUserChange }) => {
  const { idUser, email, role, created } = user;

// recuperar contexto autenticacion
const { token } = useContext(AuthContext);

  return (
    <article className="UserMagCard">
      <ul>
        <li>{email}</li>
        <li>id: {idUser}</li>
        <li>Rol: {role}</li>
        <li>Fecha creación: {created}</li>
      </ul>
      <ButtonDelete onClickFunction={(e)=>{
        e.stopPropagation();
        deleteUserByIdService({token, user})
      }}></ButtonDelete>
    </article>
  );
};

UserMagCard.propTypes = {
    user: PropTypes.object.isRequired,
  };