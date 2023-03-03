import { createContext, useEffect, useState, useContext } from "react";
import { getFavExercisesService, getLikedExercisesService } from "../services/exercises";
import { AuthContext } from "./AuthContext";

// definir objeto global de contexto
export const FavLikeContext = createContext();

// definir componente proveedor
export const FavLikeContextProvider = ({ children }) => {

    // recuperar contexto autenticacion
  const { token} = useContext(AuthContext);

    // f de estado
    const [favEx, setFavEx] = useState();
    const [likedEx, setLikedEx] = useState();
    const [favCounter, setFavCounter] = useState("fc");
    const [likedCounter, setLikedCounter] = useState("lc");

    
    useEffect(() => {
        const getData = async () => {
          try {
            // recuperar datos
            const recoveredFavs = await getFavExercisesService(token);
            const recoveredLiked = await getLikedExercisesService(token)
            // actualizar estados
            setFavEx(recoveredFavs)
            setFavCounter(recoveredFavs.length)
            setLikedEx(recoveredLiked)
            setLikedCounter(recoveredLiked.length)
            
          } catch (error) {
          }
        };
        // si hay token hacer peticion para recuperar datos iniciales
        if (token) {
          getData();
        }
      }, [token, favCounter]);

  return (
    <FavLikeContext.Provider value={{favEx, likedEx, favCounter, likedCounter}}>
      {children}
    </FavLikeContext.Provider>
  );
};