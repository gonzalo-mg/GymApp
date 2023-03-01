const jwt = require("jsonwebtoken");
const { createError } = require("../utilities");

const validateAuth = (req, res, next) => {
  try {
    // recuperar header authorization
    const { authorization } = req.headers;
    // comprobar q existe o lanzar error
    if (!authorization) {
      createError("Authorization header missing; can not proceed without it", 400);
    }

    // verificar estandar de formato (formato así: "TIPO TOKEN"; ej: "Bearer xxxxx")
    const [type, token] = authorization.split(" ");

    // verificar tipo y existencia
    if (type !== "Bearer" || !token) {
      createError("Invalid token format", 400);
    }

    // verificar token del usuario
    let tokenPayload;
    try {
      tokenPayload = jwt.verify(token, process.env.JWT_SECRET);  
    } catch (error) {
      createError("Invalid token", 400);
    }
    
    // crear propiedad de autenticacion en el objeto de peticion para el resto de middlewares y endpoints; darle los datos del token
    req.auth = tokenPayload;
    console.log(`validateAuth - tokenPayload.idUser: ${tokenPayload.idUser}`)

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAuth;