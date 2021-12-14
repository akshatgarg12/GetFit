import { Button } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import firebaseApp from '../config/firebase'

interface LoginPageProps {
    
}




const LoginPage: React.FC<LoginPageProps> = () => {
    const auth = getAuth(firebaseApp); 
    const provider = new GoogleAuthProvider();
    const onClickLogin = () => {
        signInWithPopup(auth, provider)
        .then((result: UserCredential) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential && credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(token, user)
        }).catch((error: FirebaseError) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
    
    return (
        <Button onClick={onClickLogin}>Login</Button>
    );
}
 
export default LoginPage;