/* funcion: loggear usuario y asignarle token de sesion 
se espera: peticion con un body json q contenga:
  email: direccion de email con la q se registro el usuario
  password: password del usuario
se envia: token de sesion del usuario
*/
const { userLoginSchema } = require("../../validationSchemas");
const { selectUserByEmail } = require("../../repositories/users");
const { createError } = require("../../utilities");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginUser(req, res, next) {
  try {
    // validar body de la peticion del cliente
    await userLoginSchema.validateAsync(req.body);

    // recoger datos del body
    const { email, password } = req.body;

    // comprobar si el usuario existe: si en la bbdd ya hay ese email
    // // seleccionar usuario de la bbdd (user contiene id, email, password (encriptada) y role)
    const user = await selectUserByEmail(email);

    // // // si no existe el email lanzar error
    if (!user) {
      createError(
        "The introduced password or email are not correct. Try again. If the problem continues contact the administrator.",
        400
      );
    }

    // // comprobar la contraseña
    const passwordCheck = await bcrypt.compare(password, user.password);
    // // // si la proporcionada en el body no coincide con la almacenada en bbdd, lanzar error
    if (!passwordCheck) {
      createError(
        "The introduced password or email are not correct. Try again. If the problem continues contact the administrator.",
        400
      );
    }

    // superadas las comprobaciones asignar token de sesion
    // // datos del token: id del usuario en bbdd
    const tokenPayload = { idUser: user.idUser };

    // generar token
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // enviar respuesta
    res.status(400).send({
      status: "ok - logged in succesfully",
      data: { userToken: token },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = loginUser;
