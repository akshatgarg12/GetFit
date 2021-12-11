import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ExerciseCard from '../components/ExerciseCard';
import Exercises from '../assets/exercises.json'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useParams, useNavigate} from 'react-router-dom'
import {Typography } from '@mui/material';
interface ExercisesPageProps {
}
 
const ExercisesPage: React.FC<ExercisesPageProps> = () => {
    // render those exercise from array based on category
    // add a btn to add new exercise
    // render only a few at a time.. like 4-5 of each bodypart and create a search option / view all for each category
    const {bodyPart : specificBodyPart} = useParams()
    const navigate = useNavigate()
    const bodyParts = new Set<string>()
    Exercises.forEach((exercise) => {
        bodyParts.add(exercise.bodyPart)
    })
    // key : array[exercise]
    const bodyPartExerciseMap = new Map<string, Array<any>>()
    Array.from((bodyParts)).forEach((bp) => {
        bodyPartExerciseMap.set(bp, [])
    })
    Exercises.forEach((exercise) => {
        // @ts-ignore
        const exercisesArr = [...bodyPartExerciseMap.get(exercise.bodyPart), exercise]
        bodyPartExerciseMap.set(exercise.bodyPart, exercisesArr)
    })
    const bodyPartExercisesDS = Array.from(bodyPartExerciseMap).map(([bodyPart, exercises]) => ({bodyPart, exercises}))
    const onClickGoBackHandler = () => {
        navigate(-1);
    }
    return (
        <Container>
            {
                specificBodyPart && 
                <Button sx={{marginBottom : "1rem"}} onClick={onClickGoBackHandler} startIcon={<ArrowBackIcon fontSize="large" color="disabled" />}>
                Go Back
                </Button>
            }
            <Box sx={{padding : "20px"}} mb="1.5">
                Create a button to open a modal to add new exercise or navigate to new page
                List all exercise created by user category wise
            </Box>
            {
                bodyPartExercisesDS.map(({bodyPart, exercises}) => {
                if(!specificBodyPart){
                    return (
                        <Container>
                            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <Typography variant="h4" sx={{margin:"1rem 0"}}>{bodyPart}</Typography>
                                <Link style={{margin:"auto 0"}} to={"/exercises/" + bodyPart} > View all</Link>
                            </Box>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                                {
                                    exercises.slice(0,10).map(({id, name, target}) => {
                                        return (
                                            <Grid key={id} item xs={6} sm={4} md={3}>
                                                <ExerciseCard id={id} name={name} target={target} />
                                            </Grid>
                                        )
                                    })
                                    
                                }
                            </Grid>
                        </Container>
                    )
                }
            
                if(bodyPart.toLowerCase() === specificBodyPart.toLowerCase()){
                    return (
                    <Container>
                            <Typography variant="h4" sx={{margin:"1rem 0"}}>{bodyPart}</Typography>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                                {
                                    exercises.map(({id, name, target}) => {
                                        return (
                                            <Grid key={id} item xs={6} sm={4} md={3}>
                                                <ExerciseCard id={id} name={name} target={target} />
                                            </Grid>
                                        )
                                    })
                                    
                                }
                            </Grid>
                    </Container>
                    )
                }
                else{
                    return <Typography>No exercise Found</Typography>;
                }
            })
        }
        </Container>
    );
}
 
export default ExercisesPage;



