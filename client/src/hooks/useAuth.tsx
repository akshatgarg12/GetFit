import { createContext, useContext, useEffect, useState } from "react"
import {onAuthStateChanged} from 'firebase/auth'
import {auth as firebaseAuth} from '../config/firebase'


interface AuthState{
    isAuthenticated : boolean,
    user : Object | null
}

const defaultAuthState:AuthState = {
    isAuthenticated : false,
    user : null
}

const AuthContext = createContext<any>(defaultAuthState)

export const useAuth = () => useContext(AuthContext)

const AuthContextProvider = ({children}:any) => {
    const [auth, setAuth] = useState(defaultAuthState)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const callback = (user:any) => {
            console.log(user)
            if (user) {
                setAuth({
                    isAuthenticated: true,
                    user
                })
            } else {
                setAuth({
                    isAuthenticated: false,
                    user: null
                })
            }
            setLoading(false)
        }
        const unlisten = onAuthStateChanged(firebaseAuth, (user) => {
            callback(user)
        })
         return () => {
             unlisten();
         }
    }, [])
    if(loading){
        return <div>Loading...</div>
    }
    return (
        <AuthContext.Provider value={{...auth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
