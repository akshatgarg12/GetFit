// render a list of exercises and show them in cards
// after selecting and clicking on next add no of sets and reps ranges
import { Typography, Box, Button } from '@mui/material';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';
import ExerciseCard from '../components/ExerciseCard';

interface CreateWorkoutPageProps {
    
}
 
const CreateWorkoutPage: React.FC<CreateWorkoutPageProps> = () => {
    const [selectedExercises, setSelectedExercises] = useState<Array<string | number>>([])
    const [formNumber, setFormNumber] = useState(0)
    // store this in session and delete after created
    useEffect(() => {
        console.log(selectedExercises)
        console.log(formNumber)
    }, [selectedExercises, formNumber])


    const toggleSelection = (id:string|number) => {
        const isAlreadySelected = selectedExercises.filter((e) => e === id).length > 0
        if(isAlreadySelected){
            setSelectedExercises((prev) => (
                prev.filter((e) => e !== id)
            ))
        }  
        else{
            setSelectedExercises([...selectedExercises, id])
        }
    }
    const openNextForm = () => {
        if(formNumber > 1) return;
        setFormNumber(formNumber + 1);
    }
    const openPreviousForm = () => {
        if(formNumber < 1) return;
        setFormNumber(formNumber - 1);
    }

    // form number can be 0, 1, 2
    return (
        <Container>
            {/* phase 1 selecting exercises */}
               <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                    {
                        [1,2,3,4,5,6,7,8].map((exercise) => {
                            const selected = selectedExercises.filter((e) => e === exercise).length > 0;
                            let idx = -1;
                            if(selected){
                                // find the index
                                idx = selectedExercises.indexOf(exercise)+1
                            }
                            return (
                            <Grid key={exercise} item xs={6} sm={4} md={3}>
                               <div style={{padding:"3px", border: selected ? "1px solid red" : "none"}} onClick={() => toggleSelection(exercise)}> {selected && <Typography color="text.secondary">{idx}</Typography>}<ExerciseCard id={exercise} /> </div>
                            </Grid>
                            )
                        }
                        )
                    }
              </Grid>
            {/* phase 2 selecting sets and reps for each  */}

            {/* phase 3 final result in table */}
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Button onClick={openPreviousForm}>Back</Button>
                <Button onClick={openNextForm}>Next</Button>
            </Box>
        </Container>
    );
}
 
export default CreateWorkoutPage;