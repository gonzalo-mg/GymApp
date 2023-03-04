/* funcion: editar ejercicio 
se espera: peticion con un body form-data q contenga:
  -key=value
    --name=
    --description=
    --typology=
    --muscle=
    --picture=
se envia: confirmacion
*/
const { createError, processImage } = require("../../utilities");
const { exerciseSchema } = require("../../validationSchemas");
const {
  selectExerciseById,
  editExercise,
} = require("../../repositories/exercises");

async function putEditExercise(req, res, next) {
  try {
    // recoger parametro (path param - :idExercise) (req.params devuelve objeto- desestrucutrar para obtener solo numero)
    const { idExercise } = req.params;

    // validar body de la peticion del cliente
    await exerciseSchema.validateAsync(req.body);

    // recoger datos del body
    const { name, description, typology, muscles } = req.body;

    // comprobar si el ejercicio ya existe
    // // seleccionar exercise de la bbdd
    const exercise = await selectExerciseById(idExercise);

    if (!exercise) {
      createError("No such exercise in the database.", 404);
    }

    // gestionar imagen subida por cliente
    // // recuperar datos de la peticion;
    const picture = req.files.picture;
    console.log(picture);

    // validar q se envia 1 unica imagen;; fileupload devuleve objeto si 1 unica imagen y array si mas de una imagen
    // // typeof array devulve objeto; no sirve para hacer distincion en este caso
    if (Array.isArray(picture)) {
      createError("Only one picture per exercise is allowed", 409);
    }
    // procesar imagen (ajustar y guardar), enviando su buffer con .data;
    // // processImage(buffer, folder, size)
    const pictureName = await processImage(picture.data, "exercises", 1000);

    // insertar exercise en la bbdd (llamar repositorio)
    await editExercise({ name, description, typology, muscles, pictureName, idExercise });

    // enviar respuesta
    res.status(201).send({
      status: "ok - exercise edited successfully",
      data: {
        name,
        description,
        typology,
        muscles,
        pictureName,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = putEditExercise;
