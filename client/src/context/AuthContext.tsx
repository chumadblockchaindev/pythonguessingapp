import { createContext, useState, useEffect, useContext, Dispatch, SetStateAction } from 'react'; 
import api from '../utils/api';
import { jwtDecode } from 'jwt-decode'

interface AppData {
    loginAuth: ({ username, password }: LoginCredientials) => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    showMsg: boolean;
    setShowMsg: Dispatch<SetStateAction<boolean>>;
}

export interface LoginCredientials {
    username?: string, password?: string 
  }
  
export const AuthContext = createContext<AppData | null>(null);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => { 
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const[isLoading, setIsLoading] = useState(true)
    const[showMsg, setShowMsg] = useState(true)

        useEffect(() => { 
            auth().catch(() => setIsAuthenticated(false))
        }, [isAuthenticated, setIsAuthenticated]);
        
        async function loginAuth ({ username, password }: LoginCredientials ) {
          try {
            const res = await api.post('/api/token/', {username, password})
            if (res.status === 200){
              localStorage.setItem("ACCESSTOKEN", res.data.access);
              localStorage.setItem("REFRESHTOKEN", res.data.refresh);
              auth()
            }
          } catch (error) {
            console.error(error);
          }
        }

        const refreshToken = async () => {
          const refreshToken = localStorage.getItem("REFRESHTOKEN");
            try {
                const res = await api.post("/api/token/refresh/", {
                    refresh: refreshToken,
                });
                if (res.status === 200) {
                    localStorage.setItem("ACCESSTOKEN", res.data.access)
                    setIsAuthenticated(true)
                    setIsLoading(false)
                } else {
                    setIsAuthenticated(false)
                    setIsLoading(false)
                }
            } catch (error) {
                setIsAuthenticated(false);
                setIsLoading(false)
            }
        }
        
          const auth = async () => {
            const token = localStorage.getItem("ACCESSTOKEN")
            if(!token) { 
              setIsAuthenticated(false)
              return
            }
          
            const decoded = jwtDecode (token)
            const tokenExpiration = decoded.exp  
            const now = Date.now() / 1000

            if(tokenExpiration! < now) {
              await refreshToken()
            } else {
              setIsAuthenticated(true);
              setIsLoading(false)
            }
          }
        

    return ( 
        <AuthContext.Provider value={{ isAuthenticated, isLoading, showMsg, setShowMsg , loginAuth }}> 
            {children} 
        </AuthContext.Provider> 
        ); 
    };

    export const useAuth = () => {
      const context = useContext(AuthContext)
      if (!context) throw new Error("useAuth must be used within an AuthProvider");
      return context;}