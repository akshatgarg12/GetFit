// render a list of exercises and show them in cards
// after selecting and clicking on next add no of sets and reps ranges
import { Typography, Box, Button, Stack, TextField, Card, TableContainer, TableRow, Table, TableHead, TableCell, TableBody, Paper } from '@mui/material';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';
import ExerciseCard from '../components/ExerciseCard';
import InfoIcon from '@mui/icons-material/Info';
interface CreateWorkoutPageProps {
    
}
 

interface Workout{
    id : string | number,
    sets : number,
    reps : number,
    progressive_overload : string,
    tips ?: string
}
const createDefaultWorkoutObject = (id : string | number):Workout => ({id, sets : 1, reps : 12, progressive_overload: "yes", tips : ""})

const CreateWorkoutPage: React.FC<CreateWorkoutPageProps> = () => {
    const [selectedExercises, setSelectedExercises] = useState<Array<Workout>>([])
    const [formNumber, setFormNumber] = useState(0)
    // store this in session and delete after created
    useEffect(() => {
        console.log(selectedExercises)
        console.log(formNumber)
    }, [selectedExercises, formNumber])


    const toggleSelection = (id:string|number) => {
        const isAlreadySelected = selectedExercises.filter((e) => e.id === id).length > 0
        if(isAlreadySelected){
            setSelectedExercises((prev) => (
                prev.filter((e) => e.id !== id)
            ))
        }  
        else{
            setSelectedExercises([...selectedExercises, createDefaultWorkoutObject(id) ])
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
    const onInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx:number) => {
        const {name, value}  = e.target
        // console.log(idx + " :  " + name  + " : " + value)
        const updatedState = [...selectedExercises]
        // @ts-ignore
        updatedState[idx][name] = value
        setSelectedExercises(updatedState)
    }
    const submitHandler = () => {
        console.log("Complete workout : ", selectedExercises)
    }
    // form number can be 0, 1, 2
    return (
        <Container sx={{margin:"1rem 0"}}>
            {/* phase 0 selecting exercises */}
            {
                formNumber === 0 &&
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                    {
                        [1,2,3,4,5,6,7,8].map((exercise) => {
                            const selected = selectedExercises.filter((e) => e.id === exercise).length > 0;
                            let idx = -1;
                            if(selected){
                                // find the index
                                selectedExercises.forEach((w, i) => {
                                    if(w.id === exercise) idx = i+1;
                                })
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
            }
               
            {/* phase 1 selecting sets and reps for each  */}
            {
                formNumber === 1 && 
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                    {
                        selectedExercises.map((w, idx) => (
                            <Grid key={w.id} item xs={12} sm={4} md={3}>
                                <Card variant="outlined" sx={{padding:"1rem"}}>
                                    <Stack sx={{margin : "auto"}}>
                                        <Box sx={{display:"flex", justifyContent:"space-between"}}>
                                            <Typography>Name of Workout</Typography>
                                            {/* make this a btn to the url of workout */}
                                             <InfoIcon />
                                        </Box>
                                        <TextField
                                            required
                                            id="sets" type="number" label="sets" name="sets"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            margin = "normal"
                                            value={w.sets}
                                            onChange={(e) => onInputChange(e, idx)}
                                        />
                                        <TextField
                                            required
                                            id="reps" type="number" label="reps" name="reps"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            margin = "normal"
                                            value={w.reps}
                                            onChange={(e) => onInputChange(e, idx)}
                                        />
                                        <TextField
                                            value={w.tips} id="tips" label="Tips" name="tips"
                                            margin = "normal"
                                            onChange={(e) => onInputChange(e, idx)}
                                        />
                                         <TextField
                                            value={w.progressive_overload} id="progressive_overload" label="progressive overload" name="progressive_overload"
                                            margin = "normal"
                                            onChange={(e) => onInputChange(e, idx)}
                                        />
                                        {/* <TextField id="progressive_overload" type="boolean" label="progressive overload" /> */}
                                    </Stack>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            }
            {/* phase 2 final result in table */}
            {
                formNumber === 2 &&
                // this table can be refactored from workout info
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Exercises</TableCell>
                        <TableCell align="right">Sets</TableCell>
                        <TableCell align="right">Reps</TableCell>
                        <TableCell align="right">Progressive Overload</TableCell>
                        <TableCell align="right">Tips</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {selectedExercises.map((w) => (
                        <TableRow
                        key={w.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell sx={{cursor : "pointer"}} component="th" scope="row">
                            Names
                        </TableCell>
                        <TableCell align="right">{w.sets}</TableCell>
                        <TableCell align="right">{w.reps}</TableCell>
                        <TableCell align="right">{w.progressive_overload}</TableCell>
                        <TableCell align="right">{w.tips}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Button disabled = {formNumber === 0} onClick={openPreviousForm}>Back</Button>
                {
                    formNumber < 2 && <Button onClick={openNextForm}>Next</Button>
                }
                {
                    formNumber === 2 && <Button onClick={submitHandler}>Submit</Button>
                }

            </Box>
        </Container>
    );
}
 
export default CreateWorkoutPage;