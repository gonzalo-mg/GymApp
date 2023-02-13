/* Funciones auxiliares para manejar usuarios */

import axios from "axios";
const serverRoot = process.env.REACT_APP_BACKEND_URL;

export const login = async ({ email, password }) => {
  try {
    console.log(`login ejecutandose con: ${email} y ${password}`);

    console.log("login call to:");
    console.log(`${serverRoot}/login`);

    const data = await axios.post(
      `${serverRoot}/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("login return:");
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

/* export const login = async ({ email, password }) => {
  try {
    console.log(`login ejecutandose con: ${email} y ${password}`);

    console.log("login call to:");
    console.log(`${serverRoot}/login`);

    const response = await fetch(
      `${serverRoot}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      },
      {}
    );
    
    console.log("login return:");
    console.log(response);

    return response;
  } catch (error) {
    console.error(error);
  }
}; */
