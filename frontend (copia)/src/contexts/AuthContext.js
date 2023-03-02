import { createContext, useEffect, useState } from "react";
import { getCurrentUserDataService } from "../services/user";

// definir objeto global de contexto
export const AuthContext = createContext();

// definir componente proveedor
export const AuthContextProvider = ({ children }) => {
  // definir estado para token; inicialmente recuperar de localStorage si existe
  const [token, setToken] = useState(localStorage.getItem("token"));
  // definir estado para usuario; inicialmente nadie
  const [currentUser, setCurrentUser] = useState(null);

  // f de logout
  const logout = () => {
    setToken("");
    setCurrentUser(null);
  };

  // f de login
  const login = (token) => {
    setToken(token);
  };

  // efecto sincronizar token con localStorage; refrescar con cambios de estado de token;
  useEffect(() => {
    // formateo el token con "Bearer" por requerimietno backend
    localStorage.setItem("token", token);
  }, [token]);

  // efecto para comprobar datos token y usuario actual con peticion a GET/currentUser
  useEffect(() => {
    const getUserData = async () => {
      try {
        // llamar al servicio de recuperar datos del currentUser con el token actual
        const data = await getCurrentUserDataService(token);
        // actualizar usuario con los datos obtenidos
        setCurrentUser(data.data);
      } catch (error) {
        // si el token no es valido deslogear
        logout();
      }
    };
    // si hay token hacer peticion para recuperar datos usuario
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
