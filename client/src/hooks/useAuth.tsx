import { createContext, useContext, useEffect, useState } from "react"
import {onAuthStateChanged} from 'firebase/auth'
import {auth as firebaseAuth} from '../config/firebase'


interface AuthState{
    isAuthenticated : boolean,
    user : Object | null
}
const defaultIsAuthenticated = localStorage.getItem('isAuthenticated') 
const defaultUser = localStorage.getItem('user') 
const defaultAuthState:AuthState = {
    isAuthenticated : defaultIsAuthenticated ? true : false,
    user : defaultUser ? JSON.parse(defaultUser) : null
}

const AuthContext = createContext<any>(defaultAuthState)

export const useAuth = () => useContext(AuthContext)

const AuthContextProvider = ({children}:any) => {
    const [auth, setAuth] = useState(defaultAuthState)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const callback = (user:any) => {
            // console.log(user)
            if (user) {
                const {photoURL,displayName,email} = user
                setAuth({
                    isAuthenticated: true,
                    user : {photoURL,displayName,email}
                })
                localStorage.setItem('isAuthenticated', JSON.stringify(true))
                localStorage.setItem('user', JSON.stringify({photoURL,displayName,email}))
            } else {
                setAuth({
                    isAuthenticated: false,
                    user: null
                })  
                localStorage.removeItem("isAuthenticated")
                localStorage.removeItem("user")
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
        <AuthContext.Provider value={{...auth,loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
