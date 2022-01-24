import { Container, Typography, Stack, Grid } from '@mui/material';

import {useState} from 'react'
import Calendar from 'react-calendar';
import { useAuth } from '../hooks/useAuth';

interface ProfileProps {
    
}
 
const Profile: React.FC<ProfileProps> = () => {
    const [value, onChange] = useState(new Date());

    const tileClassName = ({ date, view }: any) => {
        // Add class to tiles in month view only
        if (view === "month") {
            return "present"
        }
        return "present"
    }
    const {user} = useAuth()

    return (
        <Container sx={{padding:"2rem 0"}}>
            <Stack spacing={2} style={{textAlign:"center"}}>
                <img src={user.photoURL} alt="user-profile-email" style={{width:"150px", height:"150px", objectFit:"contain", borderRadius:"50%", margin:"auto"}} />
                <Typography variant="h6">{user.displayName}</Typography>
            </Stack>  
            <Grid container sx={{textAlign:"center"}} mt={4} spacing={4}>
                <Grid item xs={12} md={12} lg={6}>
                    <Calendar
                        value={value}
                        onChange={onChange}
                        returnValue="start"
                        selectRange={false}
                        tileClassName={tileClassName}
                        className={"calender"}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                        <Typography style={{margin:"auto"}}>{value.toLocaleDateString()}</Typography>
                        <Typography style={{margin:"auto"}}>{value.toLocaleDateString()}</Typography>
                        <Typography style={{margin:"auto"}}>{value.toLocaleDateString()}</Typography>
                </Grid>
            </Grid>

        </Container>
    );
}
 
export default Profile;