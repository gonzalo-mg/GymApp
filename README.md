# GymApp

Backend y Frontend en este repositorio.

## Frontend
+ Usuarios activos:

administrator@mail.com

worker1@mail.com

worker2@mail.com

Todos con contraseña: 1234567890

## Backend
+ BASE DE DATOS

+ SCRIPTS DISPONIBLES

- npm run initDb

Reinicia la BBDD.

- npm run populateDb

Introduce algunos datos en todas las tablas.

- npm run dev

Arranca.

+ VARIABLES PRIVADAS .env

Se incluye el archivo "envPlantilla" a modo de plantilla para rellenar el .env con los datos pertinentes.

- Tablas

-- USERS (idUser, email, password, rol, created)

    • idUser: PK.
    • email: correo electrónico del usuario.
    • password: contraseña de acceso del usuario, encriptada.
    • role: tipo de usuario; para gestionar sus permisos:
        ◦ admin
        ◦ worker
    • created: timestamp del momento de creacion del registro.

-- EXERCICES (idExercise, name, description, picture, type, group, idUser, created)

    • idExercise: PK.
    • name: nombre del ejercicio.
    • description: descripción del ejercicio.
    • typology: tipología del ejercicio.
    • muscles: grupo muscular del ejercicio.
    • picture: nombre de la imagen.
    • created: timestamp del momento de creacion del registro.

-- LIKES (idUser, idExercise, stateLike, created)

    • idUser: FK, referencia a USUARIOS (idUser).
    • idExercise: FK, referencia a EJERCICIOS (idExercise).
    • stateLike: booleano que indica si el usuario (idUser) a dado like al post:
        ◦ false: no ha dado like o lo ha quitado, valor por defecto.
        ◦ true: ha dado like.
    • created: timestamp del momento de creacion del registro.			

-- FAVS (idUser, idExercise, stateFav, created)

    • idUser: FK, referencia a USUARIOS (idUser).
    • idExercise: FK, referencia a EJERCICIOS (idExercise).
    • stateFav: booleano que indica si el usuario (idUser) a dado fav al post:
        ◦ false: no ha dado fav o lo ha quitado, valor por defecto.
        ◦ true: ha dado fav.
    • created: timestamp del momento de creacion del registro.


+ ENDPOINTS

- .get("/login", loginUser);

Permite el login del usuario; requiere email y contraseña y devuleve token de sesión.

- .get("/register", registerUser);


- .get("/exercises", validateAuth, getExercises);

Devuelve todos los ejercicios de la bbdd; requiere que el usuario esté autenticado.

- .get("/exercises:idExercise", validateAuth, getExerciseDetails);

Devuelve un ejercicio en particular; requiere que el usuario esté autenticado.
Debe indicarse el idExercise mediante path param; 

- .post("/exercises/:idExercise/like", validateAuth, toggleExerciseLike);

; requiere que el usuario esté autenticado.

- .post("/exercises/:idExercise/fav", validateAuth, toggleExerciseFav);

; requiere que el usuario esté autenticado.

- .get("/favorites:idUser", validateAuth, getUserFavs);

; requiere que el usuario esté autenticado.

- .post("/newExercise", validateAuth, checkAdmin, postNewExercise);

Permite crear un nuevo ejercicio en la bbdd; requiere que el usuario esté autenticado y sea administrador.
Los datos se esperan mediante peticion tipo form-data, con los campos: 
-- name: string, requerido.
-- description: string, requerido.
-- typology: string, requerido.
-- muscles: string, requerido.
-- picture: imagen, opcional; solo se admite una.


- .put("/exercises/:idExercise", validateAuth, checkAdmin, putEditExercise);

; requiere que el usuario esté autenticado. y sea administrador.

- .delete("/exercises/:idExercise", validateAuth, checkAdmin, deleteExercise);

Borra un ejercicio de la bbdd, indicando su idExercise; requiere que el usuario esté a
