import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"


export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            resolve(user)
        })
    })
}