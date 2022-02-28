/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ExerciseCard from '../components/ExerciseCard';
import Exercises from '../assets/exercises.json'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useParams, useNavigate} from 'react-router-dom'
import {Typography } from '@mui/material';
import {v4 as uuid} from 'uuid'

interface ExercisesPageProps {
}
 
const ExercisesPage: React.FC<ExercisesPageProps> = () => {
    // render those exercise from array based on category
    // add a btn to add new exercise
    // render only a few at a time.. like 4-5 of each bodypart and create a search option / view all for each category
    const [searchedExercise, setSearchedExercise] = useState<any>(null)
    // @ts-ignore
    const defaultSearchedExercisesCollection = JSON.parse(sessionStorage.getItem("searchedExercisesCollection")) || []
    const [searchedExercisesCollection, setSearchedExercisesCollection] = useState<Array<any>>(defaultSearchedExercisesCollection)
    const clearSearchHistory = () => {
        setSearchedExercisesCollection([])
        sessionStorage.removeItem("searchedExercisesCollection")
    }
    const {bodyPart : specificBodyPart} = useParams()
    const navigate = useNavigate()
    const bodyParts = new Set<string>()
    Exercises.forEach((exercise) => {
        bodyParts.add(exercise.bodyPart)
    })
    // key(bodyPart) : array[exercise]
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
    useEffect(() =>{
        if(searchedExercise){
            setSearchedExercisesCollection([searchedExercise, ...searchedExercisesCollection])
            sessionStorage.setItem("searchedExercisesCollection",  JSON.stringify([searchedExercise, ...searchedExercisesCollection]))
        }
    },[searchedExercise])

    return (
        <Container sx={{padding:"2rem 1rem"}}>
            {
                specificBodyPart && 
                <Button sx={{marginBottom : "1rem"}} onClick={onClickGoBackHandler} startIcon={<ArrowBackIcon fontSize="large" color="disabled" />}>
                 Go Back
                </Button>
            }
            
            <Container>
                <Grid container spacing={2}>
                     <Grid item xs={12} md={6}>
                        <Autocomplete
                            id="grouped-demo"
                            options={Exercises}
                            groupBy={(option) => option.bodyPart}
                            renderOption={(props, value) => (
                                <li {...props} key={uuid()}>
                                    {value.name}
                                </li>
                            )}
                            getOptionLabel={(option) => option.name}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Search by exercise name" />}
                            value = {searchedExercise}
                            onChange={(_, val) => setSearchedExercise(val)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            id="grouped-demo"
                            options={Exercises}
                            groupBy={(option) => option.bodyPart}
                            renderOption={(props, value) => (
                                <li {...props} key={uuid()}>
                                    {value.name}
                                </li>
                            )}
                            getOptionLabel={(option) => option.target}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Search by Muscle targeted" />}
                            value = {searchedExercise}
                            onChange={(_, val) => setSearchedExercise(val)}
                        />
                    </Grid>
                </Grid>
                {
                    searchedExercisesCollection.length ? 
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <Typography variant="h6" sx={{margin:"1rem 0"}}>Search Results</Typography> 
                        <Button style={{margin:"auto 0"}} onClick={clearSearchHistory}>Clear Search</Button>
                     </Box>
                    : null
                }
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                    {
                        searchedExercisesCollection.map(({id, name, target}) => {
                            return (
                                <Grid key={uuid()} item xs={6} sm={4} md={3}>
                                    <ExerciseCard id={id} name={name} target={target} />
                                </Grid>
                            )
                        })
                        
                    }
                </Grid>
            </Container>
            {
                // eslint-disable-next-line array-callback-return
                bodyPartExercisesDS.map(({bodyPart, exercises}, id) => {
                if(!specificBodyPart){
                    return (
                        <Container key={id}>
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
            })
        }
        </Container>
    );
}
 
export default ExercisesPage;



