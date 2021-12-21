import {useState, useEffect} from 'react';
import axios from '../config/axios'
import {useNavigate} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import WorkoutCard from '../components/WorkoutCard';


interface WorkoutsPageProps {
    
}
 
const WorkoutsPage: React.FC<WorkoutsPageProps> = () => {
    // call for exercises of user
    // render those exercise from array based on category
    // add a btn to add new exercise
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [workouts, setWorkouts] = useState([])
    const navigate = useNavigate()
    const fetchUserWorkouts = async () => {
        try{
            setLoading(true)
            const req = await axios({
                method : "GET",
                url : "/workouts"
            })
            if(req.status === 200){
                setWorkouts(req.data.workouts)
            }else{
                setWorkouts([])
                setError(req.data.log)
            }
        }catch(e:any){
            // @ts-ignore
            setError(e.response.data.log)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUserWorkouts()
    },[])

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
    return (   
        <Container sx={{padding:"2rem 0"}}>
            <Button variant="outlined" onClick={() => navigate('/workout/create')}>Create new Workout</Button>
            <Grid sx={{padding:"2rem 0"}} container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                {
                    [...workouts].reverse().map(({name, notes, body_parts_targeted, _id}) => (
                        <Grid key={_id} item xs={12} sm={6} md={4}>
                            <WorkoutCard _id={_id} name={name} notes={notes} body_parts_targeted={body_parts_targeted} />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}
 
export default WorkoutsPage;



