/* funcion: ajustar y guardar imagenes enviadas por cliente
se espera:
    - buffer: buffer de datos
    - folder: string nombre de la carpeta en q se guardara la imagen, dentro del directorio "uploads/images"
    - size: tamaño en q se guarda ña imagen 
se devuelve: nombre con q se guarda la imagen
*/

const sharp = require("sharp");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs").promises;

// f
async function processImage(buffer, folder, size) {
//async function processImage(buffer) {
  // generar ruta de carpeta almacen
  const folderPath = path.join(
    __dirname,
    "..",
    process.env.UPLOADS_DIR,
    process.env.IMAGES_DIR,
    folder
  );
  // asegurar existencia directorio
  await fs.mkdir(folderPath, { recursive: true });

  // procesar imagen con sharp
  const image = sharp(buffer);

  // homogeneizar size
  image.resize(size);

  // recupear metadatos
  const imageMeta = await image.metadata();

  // generar nombre: aleatorio.formato
  const imageName = `${uuid.v4()}.${imageMeta.format}`;

  // generar ruta de imagen
  const imagePath = path.join(folderPath, imageName);

  // guardar imagen
  await image.toFile(imagePath);

  // devolver nombre imagen
  return imageName;
}

module.exports = processImage;
