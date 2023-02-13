/* funcion: lanzar error 404 - no encontrado */
function errorNotFound (req, res) {
    res
        .status(404)
        .send({ status: "error", message: "Not found" });
  };
  
  module.exports = errorNotFound;