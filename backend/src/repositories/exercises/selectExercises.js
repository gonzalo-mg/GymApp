/* funcion SQL query: seleccionar exercises todos o filtrados
se espera: un objeto con los filtros empleados; key=values
se devuleve: array de objetos tipo exercise
*/

const getPool = require("../../database/getPool");

async function selectExercises(filters) {
  // solicitar conexion a bbdd
  const pool = getPool();

  // consultar
  // construir la consulta dinamicamente segun los filtros recibidos

  // consulta: codigo base
  let sqlCode = "SELECT * FROM exercises";

  // consulta: segmentos q se van añadiendo con cada filtro (nuevo where)
  let sqlAddFilter = " WHERE";

  // consulta: valores sustitutos ?; seran los valores de los filtros recibidos (value del key=value)
  let subtitutes = [];

  // recorrer filtros
  for (let key in filters) {
    // tomar valor buscado con el filtro
    let searchedValue = filters[key];

    // añadir filtro a la consulta
    sqlCode += sqlAddFilter + ` ${key} = ?`;

    // añadir valor buscado al array de sustitutos
    subtitutes.push(searchedValue);

    // cambiar WHERE por AND en caso de que haya mas de 1 filtro
    sqlAddFilter = " AND";
  }

  // hacer consulta: pasar codigo sql y array de valores sustitutos
  const exercises = await pool.query(sqlCode, subtitutes);

  // .query(SQL, SUSTITUTOS) admite parametros
  // // SQL: codigo sql a ejecutar
  // // SUSITUTOS: array de valores sustitutos de ? en SQL

  // // .query devuleve [[consulta], [cosa1],..., [cosas]]; nos quedamos con [consulta];

  // devolver exercises (array con todos los objetos exercise q pasen los filtros)
  return exercises[0];
}

module.exports = selectExercises;
