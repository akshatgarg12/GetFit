import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useState, useEffect} from 'react'
import axios from '../config/axios'

interface WorkoutInfoPageProps {
    
}
 
   
const WorkoutInfoPage: React.FC<WorkoutInfoPageProps> = () => {
    // this page will contain everything about workout and an edit btn
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [workout, setWorkout] = useState<any>(null)

    const {_id} = useParams()
    const navigate = useNavigate()
    const onClickGoBackHandler = () => {
        navigate(-1)
    }
    useEffect(() => {
        const fetchWorkout = async () => {
            try{
                setLoading(true)
                const req = await axios({
                    method : "GET",
                    url : `/workouts/${_id}`
                })
                if(req.status === 200){
                    console.log(req.data)
                    setWorkout(req.data.workout)
                }else{
                    setWorkout(null)
                    setError(req.data.log)
                }
            }catch(e){
                console.log(e)
                // @ts-ignore
                setError(e.response.data.log)
            }finally{
                setLoading(false)
            }
        }
        fetchWorkout()
    },[_id])

    const openExerciseInfo = (eid : string) => {
        // whatever id is passed through the row clicked
        navigate('/exercise/' + eid);
    }
    if(loading){
        return (
            <Container>
                Loading...
            </Container>
        )
    }
    if(error){
        return (
            <Container>
                {error}
            </Container>
        )
    }
    if(workout){
        const {name, notes, body_parts_targeted, exercises, updatedAt} = workout
        let totalSets = 0
        exercises.forEach(({sets}:{sets:number}) => totalSets += sets)
        const totalTime = totalSets*3;
        return (
            <Container>
                 <Button sx={{marginBottom : "1rem"}} onClick={onClickGoBackHandler} startIcon={<ArrowBackIcon fontSize="large" color="disabled" />}>
                    Go Back
                 </Button>
                <Stack>
                <Typography variant="h3" gutterBottom component="div">
                        {name}
                    </Typography>
                    <Box>
                        {
                            body_parts_targeted.map((bp:string) => (
                                <Chip sx={{marginRight:".5rem"}} label={bp} variant="outlined" />
                            ))
                        }
                    </Box>
                    <Typography variant="h6" gutterBottom component="div">
                        estimated time : {totalTime + 5} - {totalTime + 15} mins
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                        Total no of sets : {totalSets}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Instruments required / Freeweights : get them from exercises which are a part of this workout
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Personal tips and tricks to perform : {notes}
                    </Typography>
                    <Typography color="text.secondary" variant="subtitle1" gutterBottom component="div">
                        Last updated : {new Date(updatedAt).toLocaleDateString()}
                    </Typography>
                </Stack>
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
                        {exercises.map((row:any) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell sx={{cursor : "pointer"}} onClick={() => openExerciseInfo(row.eid)} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.sets}</TableCell>
                            <TableCell align="right">{row.reps}</TableCell>
                            <TableCell align="right">{row.progressive_overload}</TableCell>
                            <TableCell align="right">{row.tips}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    
    }
    return <div>Not found</div>
    
}
 
export default WorkoutInfoPage;