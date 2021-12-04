import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
interface ExerciseInfoPageProps {
    
}
 
const ExerciseInfoPage: React.FC<ExerciseInfoPageProps> = () => {
    // show a btn to edit or delete the exercise
    const navigate = useNavigate()
    const onClickGoBackHandler = () => {
        navigate('/exercises')
    }
    return (
        <Container maxWidth="sm" sx={{paddingTop:"2rem"}}>
            <Button sx={{marginBottom : "1rem"}} onClick={onClickGoBackHandler} startIcon={<ArrowBackIcon fontSize="large" color="disabled" />}>
                Go Back
            </Button>
            <Typography variant="h3" gutterBottom component="div">
                Name of Exercise
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
                Muscles Targeted
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
                Max weight for progressive overload
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
                Recommended rep ranges
            </Typography>
            <Typography variant="body1" gutterBottom>
                Instruments required / Freeweights
            </Typography>
            <Typography variant="body1" gutterBottom>
                Personal tips and tricks to perform
            </Typography>
            <Typography color="text.secondary" variant="subtitle1" gutterBottom component="div">
                Last updated
            </Typography>
            
        </Container>
    );
}
 
export default ExerciseInfoPage;