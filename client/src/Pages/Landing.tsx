import { Typography, Box,Grid, Button } from "@mui/material";
import ScheduleSharpIcon from '@mui/icons-material/ScheduleSharp';
import FitnessCenterSharpIcon from '@mui/icons-material/FitnessCenterSharp';
import SportsBasketballSharpIcon from '@mui/icons-material/SportsBasketballSharp';
import AutoGraphSharpIcon from '@mui/icons-material/AutoGraphSharp';
import { useNavigate } from "react-router-dom";
// import {title, tagline} from "../constants"
interface LandingPageProps {
    
}
 
const LandingPage: React.FC<LandingPageProps> = () => {
    const navigate = useNavigate()
    const onClickSignUp = () => navigate("/login")
    return (
        <div style={{maxWidth:"100vw", margin:"0", padding:"0"}}>
            <Box className="landing-page-hero">
                <img style={{width:"100%", height:"75vh", objectFit:"cover"}} src={"/images/landing.png"} alt="hero-img"/>
                <Box className="centered" sx={{width:"50%", height:"60%", maxWidth:"400px", maxHeight:"400px", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    <img style={{maxWidth:"100%", maxHeight:"100%",objectFit:"contain", }} src={"/assets/logo.gif"} loading="lazy" alt="logo" />
                    {/* <Typography variant="h1" component="div" gutterBottom mt={2} className="landing-page-heading">
                        {title}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        {tagline}
                    </Typography> */}
                </Box>
            </Box>
            {/* Feature box */}
                <Box sx={{padding:"1rem 0"}}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6} lg={3}>
                            <Box sx={{display:"flex", flexDirection:"column", alignItems: 'center'}}>
                                <SportsBasketballSharpIcon fontSize="large" />
                                <Typography variant="h6" component="div" gutterBottom mt={2} sx={{textAlign:"center"}}>
                                    Exercises
                                </Typography>
                                <Typography variant="subtitle1" component="div" gutterBottom mt={2} sx={{textAlign:"center"}}>
                                    Find out a collection of over 1000 exercises with target body parts and illustrations
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Box sx={{display:"flex", flexDirection:"column", alignItems: 'center'}}>
                                <AutoGraphSharpIcon fontSize="large" />
                                <Typography variant="h6" component="div" gutterBottom mt={2} sx={{textAlign:"center"}}>
                                     Progress tracking
                                </Typography>
                                <Typography variant="subtitle1" component="div" gutterBottom mt={2} sx={{textAlign:"center"}}>
                                    Track your progress periodically with images and measurements for goal-oriented training, analyse your growth with demographics
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Box sx={{display:"flex", flexDirection:"column", alignItems: 'center'}}>
                                <FitnessCenterSharpIcon fontSize="large" />
                                <Typography variant="h6" component="div" gutterBottom mt={2} sx={{textAlign:"center"}}>
                                Custom workouts
                                </Typography>
                                <Typography variant="subtitle1" component="div" gutterBottom mt={2} sx={{textAlign:"center"}}>
                                    Create custom workouts by specifying sets and reps, you can also share these workouts with others
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Box sx={{display:"flex", flexDirection:"column", alignItems: 'center'}}>
                                <ScheduleSharpIcon fontSize="large" />
                                <Typography variant="h6" component="div" gutterBottom mt={2} sx={{textAlign:"center"}}>
                                    Scheduler
                                </Typography>
                                <Typography variant="subtitle1" component="div" gutterBottom mt={2} sx={{textAlign:"center"}}>
                                    Schedule your workouts on calender and create a workout plan which works the best for you 
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                {/* Login Page Link */}
                <Box sx={{textAlign:"center", background:"#152238", padding:"2rem"}}>
                    <Typography variant="h5" color="white" component="div" gutterBottom>
                       Start your fitness journey today!
                    </Typography>
                    <Button onClick={onClickSignUp} color="secondary" variant="contained">Sign Up</Button>
                </Box>
        </div>
    );
}
 
export default LandingPage;