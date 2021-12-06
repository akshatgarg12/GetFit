// name, tag, expected time
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';

interface WorkoutCardProps {
    
}
 
const WorkoutCard: React.FC<WorkoutCardProps> = () => {
    return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://via.placeholder.com/200"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{marginBottom:"1rem"}}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Chip sx={{marginRight:".5rem"}} label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
        </CardContent>
      </CardActionArea>
      <CardActions>
          {/* Maybe place an icon button here */}
        <Button size="small" color="primary">
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