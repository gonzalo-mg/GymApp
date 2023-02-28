import { createContext, useEffect, useState } from "react";

// definir objeto global de contexto
export const AuthContext = createContext();

// definir componente proveedor
export const AuthContextProvider = ({ children }) => {
  // definir estado para token; inicialmente recuperar de localStorage si existe
  const [token, setToken] = useState(localStorage.getItem("token"));
  // definir estado para usuario; inicialmente recuperar de localStorage si existe
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));

  // efecto para gestionar token en localstorage; refrescar con cambios de estado de token
  useEffect(()=>{
    localStorage.setItem('token', token);
    localStorage.setItem('user', currentUser)
  }, [token, currentUser])

  return (
    <AuthContext.Provider
      value={{ token, setToken, currentUser, setCurrentUser}}
    >
      {children}
    </AuthContext.Provider>
  );
};
