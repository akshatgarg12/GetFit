import { Stack, Button, Typography, Avatar } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import {auth} from '../config/firebase';
import {useAuth} from '../hooks/useAuth'
import axios from '../config/axios'

interface LoginPageProps {
    
}

const LoginPage: React.FC<LoginPageProps> = () => {
    const provider = new GoogleAuthProvider()
    const onClickLogin = async () => {
        try{
            const result:UserCredential = await signInWithPopup(auth, provider)
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential && credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(token, user)
            await axios({
                url:"/users",
                method:"POST"
            })
        }
        catch(e){
            console.log(e)
        }
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
 