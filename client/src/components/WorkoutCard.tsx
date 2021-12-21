// name, tag, expected time
import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router';

interface WorkoutCardProps {
    _id : string | number,
    name : string,
    notes ?: string,
    body_parts_targeted : Array<string>
}
 
const WorkoutCard: React.FC<WorkoutCardProps> = ({_id,name,notes,body_parts_targeted}) => {
    const navigate = useNavigate()
    const openWorkoutInfoPage = () => {
        navigate("/workout/" + _id)
    }
    return (
    <Card sx={{ maxWidth: 345, margin:"auto" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{marginBottom:"1rem"}}>
            {notes}
          </Typography>
          <Box>
            {
              body_parts_targeted.map((bp) => (
                <Chip key={bp} sx={{marginRight:"4px"}} label={bp} variant="outlined" />
              ))
            }
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
          {/* Maybe place an icon button here */}
        <Button onClick={openWorkoutInfoPage} size="small" color="primary">
          Open
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
    );
}
 
export default WorkoutCard;