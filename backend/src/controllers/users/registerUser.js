const { userRegisterSchema } = require("../../validationSchemas");
const { selectUserByEmail, insertUser } = require("../../repositories/users");
const { createError } = require("../../utilities");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res, next) {
  try {
    // validar body de peticion
    await userRegisterSchema.validateAsync(req.body);

    // recoger datos del body
    const { email, password } = req.body;

    // corpobar si ya existe usuario con ese email
    const emailCheck = await selectUserByEmail(email);

    // si ya esta registrado lanzar error
    if (emailCheck) {
      createError("A user with that email is already registered", 400);
    }

    // encriptar password para la bbdd
    const encryptedPassword = await bcrypt.hash(password, 10);

    // insertar nuevo usuario en la bbdd
    const registeredUser = await insertUser({
      email,
      encryptedPassword,
    });
    
    const newUser = await selectUserByEmail(email)

    res
      .status(201)
      .send({
        status: "ok - new user created",
        newUser
      });
  } catch (error) {
    next(error);
  }
}

module.exports = registerUser;
