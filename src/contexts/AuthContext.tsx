import { createContext } from "react"
import { AuthContextType, UserInterface } from "../shared/interfaces/userInterfaces";



const defaultAuthContext: AuthContextType = {
    user: null,
    setUser: () => {},
  };
  
  const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export default AuthContext