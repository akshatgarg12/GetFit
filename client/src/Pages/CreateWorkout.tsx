// render a list of exercises and show them in cards
// after selecting and clicking on next add no of sets and reps ranges
import { Typography, Box, Button, Stack, TextField, Card, TableContainer, TableRow, Table,FormControl, InputLabel, OutlinedInput, TableHead, TableCell, TableBody, Paper, Chip } from '@mui/material';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';
import ExerciseCard from '../components/ExerciseCard';
import { Theme, useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Exercises from '../assets/exercises.json'
import {useNavigate} from 'react-router-dom'
import { DeleteOutlined } from '@mui/icons-material';
import axios from '../config/axios'

interface CreateWorkoutPageProps {
    
}
 

interface Workout{
    id : string | number,
    name : string,
    target : string,
    bodyPart: string,
    sets : number,
    reps : number,
    progressive_overload : string,
    tips ?: string
}

interface WorkoutInfo{
    name : string,
    body_parts_targeted : Array<string>,
    notes ?: string
}

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  

  
const createDefaultWorkoutObject = (exercise : any):Workout => ({...exercise, sets : 1, reps : 12, progressive_overload: "yes", tips : ""})

const CreateWorkoutPage: React.FC<CreateWorkoutPageProps> = () => {
    // name, body parts targeted, notes by creator
    const defaultWorkoutInfo = sessionStorage.getItem("workoutInfo")
    const defaultFormNumber = sessionStorage.getItem("formNumber")
    const defaultSelectedExercises = sessionStorage.getItem("selectedExercises")
    const [workoutInfo, setWorkoutInfo] = useState<WorkoutInfo>(defaultWorkoutInfo ? JSON.parse(defaultWorkoutInfo) : {name : '' , body_parts_targeted:[], notes : ''})
    const [selectedExercises, setSelectedExercises] = useState<Array<Workout>>(defaultSelectedExercises ? JSON.parse(defaultSelectedExercises) : [])
    const [formNumber, setFormNumber] = useState(defaultFormNumber ? JSON.parse(defaultFormNumber) : 0)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [success, setSuccess] = useState<any>(null)

    const navigate = useNavigate()
    const theme = useTheme();
    const handleChange = (event: SelectChangeEvent<any>) => {
        const {
          target: { value },
        } = event;
        setWorkoutInfo((prev) => ({...prev, body_parts_targeted: typeof value === 'string' ? value.split(',') : value}))
      };
    const bodyPartOptions = new Set(Exercises.map((e) => e.bodyPart))
    const [exercisesToShow, setExercisesToShow] = useState<any>([])
    // store this in session and delete after created
    useEffect(() => {
       const targetedExercises = Exercises.filter((exer) => workoutInfo.body_parts_targeted.includes(exer.bodyPart))
       setExercisesToShow(targetedExercises)
    }, [workoutInfo.body_parts_targeted])

    // save form Number and state in session so if user redirects by mistake they get the info back
    useEffect(() => {
        sessionStorage.setItem("workoutInfo", JSON.stringify(workoutInfo))
        sessionStorage.setItem("selectedExercises", JSON.stringify(selectedExercises))
        sessionStorage.setItem("formNumber", JSON.stringify(formNumber))
        // also add a cancle btn to remove these from session
    }, [workoutInfo, selectedExercises, formNumber])

    const toggleSelection = (exercise : any) => {
        const isAlreadySelected = selectedExercises.filter((e) => e.id === exercise.id).length > 0
        if(isAlreadySelected){
            setSelectedExercises((prev) => (
                prev.filter((e) => e.id !== exercise.id)
            ))
        }  
        else{
            setSelectedExercises([...selectedExercises, createDefaultWorkoutObject(exercise) ])
        }
    }
    const openNextForm = () => {
        if(formNumber > 2) return;
        if(formNumber === 0 && workoutInfo.body_parts_targeted.length === 0) return
        setFormNumber(formNumber + 1);
    }
    const openPreviousForm = () => {
        if(formNumber < 1) return;
        setFormNumber(formNumber - 1);
    }
    const onDiscardForm = () => {
        // clear session and redirect to dashboard
        const confirmation = window.confirm("Are you sure you want to discard the form?")
        if(confirmation){
            sessionStorage.clear()
            navigate(-1)
        }
    }
    const onInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx:number) => {
        const {name, value}  = e.target
        // console.log(idx + " :  " + name  + " : " + value)
        const updatedState = [...selectedExercises]
        // @ts-ignore
        updatedState[idx][name] = value
        setSelectedExercises(updatedState)
    }
    const onWorkoutInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setWorkoutInfo((prev) => ({...prev , [name] : value}))
    }
   
    const onDeleteChip = (bp : string) => {
        // remove bp from body parts array if it exists
        setWorkoutInfo((prev) => {
            const updatedBodyPartArr = prev.body_parts_targeted.filter((b:string) => b !== bp)
            return {
                ...prev,
                body_parts_targeted : updatedBodyPartArr
            }
        })
    }
    const submitHandler = async () => {
        try{
            setLoading(true)
            const exercises = selectedExercises.map((e) => ({...e, eid : e.id, id:null }))
            const req = await axios({
                method : "POST",
                url : "/workouts",
                data : {
                    ...workoutInfo,
                    exercises
                }
            })
            if(req.status === 200){
                setError(null)
                setSuccess(req.data.log)
                setTimeout(() => {
                    navigate('/workouts')
                }, 2000)
            }else{
                setSuccess(null)
                setError(req.data.log)
            }
        }catch(e:any){
            // @ts-ignore
            setError(e.response.data.log)
        }finally{
            setLoading(false)
            sessionStorage.clear()
        }
        
        console.log("workout info : " , workoutInfo)
        console.log("Complete workout : ", selectedExercises)
    }

    return (
        <Container sx={{padding:"2rem 1rem"}}>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Box>
                    <Button disabled = {formNumber === 0} onClick={openPreviousForm}>Back</Button>
                    <Button color="error" onClick={onDiscardForm}>Discard Form</Button>
                </Box>
                {
                    formNumber < 3 && <Button disabled={!workoutInfo.body_parts_targeted.length} onClick={openNextForm}>Next</Button>
                }
                {
                    formNumber === 3 && <Button disabled = {loading} onClick={submitHandler}>Submit</Button>
                }
            </Box>
            <Box>
                {
                    error && 
                    <Typography color={"red"}>{error}</Typography>
                }
                {
                    success && 
                    <Typography color={"green"}>{success}</Typography>
                }
            </Box>
            {/* phase 0 selecting exercises */}
            {
                formNumber === 0 &&
                // this table can be refactored from workout info
                <Stack sx={{margin:"auto"}}>
                    <TextField
                        required
                        id="name" type="string" label="name" name="name"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin = "normal"
                        value={workoutInfo.name}
                        onChange={onWorkoutInfoChange}
                    />
                    <TextField
                        required
                        id="notes" type="string" label="notes" name="notes"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin = "normal"
                        value={workoutInfo.notes}
                        onChange={onWorkoutInfoChange}
                    />
                   <FormControl margin="normal" sx={{ maxWidth: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Body Parts Targeted</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={workoutInfo.body_parts_targeted}
                            onChange={handleChange}
                            input={<OutlinedInput label="Body Parts targeted" />}
                            MenuProps={MenuProps}
                        >
                        {Array.from(bodyPartOptions).map((name) => (
                            <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, workoutInfo.body_parts_targeted, theme)}
                            >
                            {name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <Box>
                    {  
                            workoutInfo.body_parts_targeted.map((bp) => (
                                <Chip 
                                    label={bp}
                                    variant = "outlined"
                                    onDelete={() => onDeleteChip(bp)}
                                />
                            ))   
                    }
                    </Box>
                </Stack>
            }
            {
                formNumber === 1 &&
                        workoutInfo.body_parts_targeted.map((bp:string) => {
                            return (
                                <Box>
                                    <Typography sx={{margin:"1rem 0"}} variant="h4">{bp}</Typography>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                                        {
                                             // @ts-ignore
                                            exercisesToShow.map(({id, name, target, bodyPart}) => {
                                                if(bp !== bodyPart) return <></>
                                                const selected = selectedExercises.filter((e) => e.id === id).length > 0;
                                                let idx = -1;
                                                if(selected){
                                                    // find the index
                                                    selectedExercises.forEach((w, i) => {
                                                        if(w.id === id) idx = i+1;
                                                    })
                                                }
                                                return (
                                                <Grid key={id} item xs={6} sm={4} md={3}>
                                                <div style={{padding:"3px", border: selected ? "1px solid red" : "none"}} onClick={() => toggleSelection({id, name, target})}>
                                                    {selected && <Typography color="text.secondary">{idx}</Typography>}
                                                    <ExerciseCard id={id} name={name} target={target} />
                                                    </div>
                                                </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </Box>
                            )
                        })
            }
               
            {/* phase 1 selecting sets and reps for each  */}
            {
                formNumber === 2 && 
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                    
                        {
                            selectedExercises.map((w, idx) => {
                                return (
                                <Grid key={w.id} item xs={12} sm={4} md={3}>
                                    <Card variant="outlined" sx={{padding:"1rem"}}>
                                        <Stack sx={{margin : "auto"}}>
                                            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                                                <Typography>{w.name}</Typography>
                                                {/* make this a btn to the url of workout */}
                                                <DeleteOutlined onClick={()=>toggleSelection(w)} />
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
                                )
                            })
                        }
                </Grid>
            }
            {/* phase 2 final result in table */}
            {
                formNumber === 3 &&
                // this table can be refactored from workout info
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, margin:"auto" }} aria-label="simple table">
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
                            {w.name}
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
        </Container>
    );
}
 
export default CreateWorkoutPage;