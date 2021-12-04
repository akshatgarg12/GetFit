import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

interface ExerciseCardProps {
    id : string | number
}
 
const ExerciseCard: React.FC<ExerciseCardProps> = ({id}) => {
    // redirect to info page on click
    const navigate = useNavigate()
    const onClickHandler = () => {
       navigate('/exercise/' + id)
    }
    return (
        <Card variant="outlined" sx={{ width:"100%", maxWidth:"300px",  margin : "auto" }}>
        <CardContent>
            <Typography variant="h5" component="div">
                Name of Exercise
            </Typography>
            <Typography color="text.secondary">
            rep range
            </Typography>
            <Typography color="text.secondary">
            Heaviest set
            </Typography>
            <Button variant="outlined" size="small" onClick={onClickHandler}>Learn More</Button>
        </CardContent>
    </Card>
    );
}
 
export default ExerciseCard;