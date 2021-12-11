import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ExerciseCard from '../components/ExerciseCard';
import Exercises from '../assets/exercises.json'

interface ExercisesPageProps {
    
}
 
const ExercisesPage: React.FC<ExercisesPageProps> = () => {
    // render those exercise from array based on category
    // add a btn to add new exercise
    // render only a few at a time.. like 4-5 of each bodypart and create a search option / view all for each category
    return (
        <div>
            <Box sx={{padding : "20px"}} mb="1.5">
                Create a button to open a modal to add new exercise or navigate to new page
                List all exercise created by user category wise
            </Box>
            <Container>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                    {
                        Exercises.map(({id, name, target}) => (
                            <Grid key={id} item xs={6} sm={4} md={3}>
                                <ExerciseCard id={id} name={name} target={target} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </div>
    );
}
 
export default ExercisesPage;



