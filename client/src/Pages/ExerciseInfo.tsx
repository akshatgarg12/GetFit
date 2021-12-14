import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import Exercises from '../assets/exercises.json'

interface ExerciseInfoPageProps {
    
}
 
const ExerciseInfoPage: React.FC<ExerciseInfoPageProps> = () => {
    // show a btn to edit or delete the exercise
    const navigate = useNavigate()
    const {id} = useParams()
    const ifExerciseExists = Exercises.filter((exercise) => exercise.id === id).length > 0
    if(!ifExerciseExists){
        return (
        <Typography variant="h6" gutterBottom component="div">
             Exercise does not exists
        </Typography>
        )
    }

    const {name, target, gifUrl, equipment, bodyPart} = Exercises.filter((exercise) => exercise.id === id)[0]

    const onClickGoBackHandler = () => {
        navigate(-1);
    }
    return (
        <Container maxWidth="sm" sx={{paddingTop:"2rem"}}>
            <Button sx={{marginBottom : "1rem"}} onClick={onClickGoBackHandler} startIcon={<ArrowBackIcon fontSize="large" color="disabled" />}>
                Go Back
            </Button>
            <Typography variant="h3" gutterBottom component="div">
                {name}
            </Typography>
            <img src={gifUrl} style={{width:"100%", objectFit:"contain"}} alt="exercise-tutorial"/>
            <Typography variant="h6" gutterBottom component="div">
                Muscle targeted : {target}
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
                Equipment required : {equipment}
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
                Body Part targeted : {bodyPart}
            </Typography>

        </Container>
    );
}
 
export default ExerciseInfoPage;