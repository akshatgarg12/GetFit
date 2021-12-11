import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

interface ExerciseCardProps {
    id : string | number,
    name : string,
    target : string
}
 
const ExerciseCard: React.FC<ExerciseCardProps> = ({id, name, target}) => {
    // redirect to info page on click
    const navigate = useNavigate()
    const onClickHandler = () => {
       navigate('/exercise/' + id)
    }
    return (
        <Card variant="outlined" sx={{ width:"100%", maxWidth:"300px",height:"100%", margin : "auto" }}>
        <CardContent>
            <Typography variant="h6" component="div">
                {name}
            </Typography>
            <Typography color="text.secondary">
                target  : {target}
            </Typography>
            <CardActions sx={{margin:"0", padding:"0"}}>
                <Button sx={{marginTop:"1rem"}} variant="outlined" size="small" onClick={onClickHandler}>Learn More</Button>
            </CardActions>
        </CardContent>
    </Card>
    );
}
 
export default ExerciseCard;