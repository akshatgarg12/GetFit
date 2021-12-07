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
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface WorkoutInfoPageProps {
    
}
 
function createData(
    name: string,
    sets: number,
    reps: number,
    progressive_overload: string,
    tips: string,
  ) {
    return { name, sets, reps, progressive_overload, tips };
  }
  
  const rows = [
    createData('Dumbell press', 4, 12, "yes", "slow and steady")
  ];

const WorkoutInfoPage: React.FC<WorkoutInfoPageProps> = () => {
    // this page will contain everything about workout and an edit btn
    const navigate = useNavigate()
    const onClickGoBackHandler = () => {
        navigate(-2)
    }
    const openExerciseInfo = () => {
        // whatever id is passed through the row clicked
        navigate('/exercise/' + 1 + "?go_back=current_url");
    }
    return (
        <Container>
             <Button sx={{marginBottom : "1rem"}} onClick={onClickGoBackHandler} startIcon={<ArrowBackIcon fontSize="large" color="disabled" />}>
                Go Back
             </Button>
            <Stack>
            <Typography variant="h3" gutterBottom component="div">
                    Name of Workout
                </Typography>
                <Box>
                <Chip sx={{marginRight:".5rem"}} label="Body parts targeted" variant="outlined" />
                <Chip sx={{marginRight:".5rem"}} label="Body parts targeted" variant="outlined" />
                <Chip sx={{marginRight:".5rem"}} label="Body parts targeted" variant="outlined" />
                </Box>
                <Typography variant="h6" gutterBottom component="div">
                    estimated time : will be calculated based on sets
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    Total no of sets : 10
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Instruments required / Freeweights : get them from exercises which are a part of this workout
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Personal tips and tricks to perform
                </Typography>
                <Typography color="text.secondary" variant="subtitle1" gutterBottom component="div">
                    Last updated
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
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell sx={{cursor : "pointer"}} onClick={openExerciseInfo} component="th" scope="row">
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
 
export default WorkoutInfoPage;