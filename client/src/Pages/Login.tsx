import { Stack, Button, Typography, Avatar } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { FirebaseError } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import {auth} from '../config/firebase';
import {useAuth} from '../hooks/useAuth'

interface LoginPageProps {
    
}

const LoginPage: React.FC<LoginPageProps> = () => {
    const provider = new GoogleAuthProvider()
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

   
    const {isAuthenticated, user} = useAuth()

    const onClickLogout = () => {
        auth.signOut()
    }
    return (
        <div>
            <Stack sx={{maxWidth:"300px", margin:"5rem auto", textAlign:"center", border:"1px solid black", padding:"1rem" }}>
               
                {
                    !isAuthenticated &&
                    <>
                        <Typography variant="h6" gutterBottom component="div">
                            Login / Register
                        </Typography> 
                        <Button sx={{marginTop:"1rem"}} variant="contained" onClick={onClickLogin} endIcon={<GoogleIcon fontSize="large" />}>
                            Sign In with Google 
                        </Button>
                    </>
                }
                {
                    isAuthenticated && user && 
                    <>
                        <Avatar alt={user.email} src={user.photoURL} sx={{ width: 56, height: 56, alignSelf:"center", margin:"1rem 0"}} />
                        <Typography variant="h6" gutterBottom component="div">
                           {user.displayName}
                        </Typography>
                        <Button variant="outlined" sx={{marginTop:"1rem"}} onClick={onClickLogout}>Logout</Button>
                    </>
                }
            </Stack>
        </div>

    );
}

export default LoginPage;
 