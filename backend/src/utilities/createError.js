/* funcion: crear y lanzar error personalizado con mensaje y codigo */
function createError (message, code) {
    // crear error
    const error = new Error(message);
  
    // crear codigo
    error.statusCode = code;
  
    // lanar error
    throw error;
  };
  
  module.exports = createError;