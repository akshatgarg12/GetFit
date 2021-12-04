import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ExerciseCard from '../components/ExerciseCard';


interface ExercisesPageProps {
    
}
 
const ExercisesPage: React.FC<ExercisesPageProps> = () => {
    // call for exercises of user
    // render those exercise from array based on category
    // add a btn to add new exercise
    return (
        <div>
            <Box sx={{padding : "20px"}} mb="1.5">
                Create a button to open a modal to add new exercise or navigate to new page
                List all exercise created by user category wise
            </Box>
            <Container>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                    {
                        [1,2,3,4,5,6,7,8].map((exercise) => (
                            <Grid key={exercise} item xs={6} sm={4} md={3}>
                                <ExerciseCard id={exercise} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </div>
    );
}
 
export default ExercisesPage;



