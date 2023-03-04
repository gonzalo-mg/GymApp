/* funcion comprobar si el usuario es administrador */
const {selectUserById} = require("../repositories/users");
const { createError } = require("../utilities");

async function checkAdmin(req, res, next) {
  try {
    // recoger id del usuario del header de la peticion (creada por validateAuth)
    const {idUser} = req.auth;
    // comprobar su role en bbdd
    // // seleccionar usuario de la bbdd (user contiene id, email, password (encriptada) y role)
    const user = await selectUserById(idUser);
    // si no es admin lanzar error
    if (user.role !== "admin") {
      createError(
        "You lack the required permissions, as this action can only be performed by an admin.",
        403
      );
    };

    // si es admin continuar al siguiente middleware
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = checkAdmin;