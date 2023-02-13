import "./index.css";

import { ButtonGeneric } from "../ButtonGeneric";

export const UserCard = ({ user }) => {
    return (
      <article className="UserCard">
        <p className="user">{user || "usuario@test.com"}</p>
        <div className="buttons">
          <ButtonGeneric
            className="ButtonGenericFav"
            text="Ver Favoritos"
            onClickFunction={"WIP-abrir favs usuario"}
          ></ButtonGeneric>
          <ButtonGeneric
            className="ButtonGenericFav"
            text="Cerrar sesión"
            onClickFunction={"WIP-cerrar sesion"}
          ></ButtonGeneric>
        </div>
      </article>
    );
};
