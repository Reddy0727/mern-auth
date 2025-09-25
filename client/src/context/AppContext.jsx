import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    axios.defaults.withCredentials = true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLogged,setIsLogged] = useState(false);
    const [userData,setUserData] = useState(false)

    const isAuth = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/is-auth');
            if(data.success) {
                setIsLogged(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getUserData = async () =>{
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (err) {
            toast.error(err.message)
        }
    }
    useEffect(()=>{
        isAuth()
    },[])
    
    const value = {
        backendUrl,
        isLogged,setIsLogged,
        userData,setUserData,getUserData
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}