import {useState, useEffect} from 'react'
import Container  from "@mui/material/Container";
import Divider  from "@mui/material/Divider";
import Button  from "@mui/material/Button";
import axios from "../config/axios";
import ProgressDiv from "../components/ProgressDiv";
import { useNavigate } from 'react-router-dom';
interface ProgressPageProps {
    
}
 
const ProgressPage: React.FC<ProgressPageProps> = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [progresses, setProgresses] = useState([])
    const navigate = useNavigate()
    const fetchUserProgress = async () => {
        try{
            setLoading(true)
            const req = await axios({
                method : "GET",
                url : "/progress"
            })
            if(req.status === 200){
                setProgresses(req.data.progresses)
            }else{
                setProgresses([])
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
        fetchUserProgress()
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
        <Container sx={{padding:"2rem 1rem"}}>
            <Button sx={{marginBottom:"1rem"}}variant="outlined" onClick={() => navigate('/progress/create')}>Create new progress</Button>
            {
                progresses.map(({_id, front_img, side_img, back_img, createdAt}) => (
                    <div key={_id}>
                        <ProgressDiv 
                            _id = {_id}
                            front_img = {front_img}
                            side_img = {side_img}
                            back_img = {back_img}
                            createdAt = {createdAt}
                        />
                        <Divider variant="middle" />
                    </div>
                ))
            }
        </Container>
    );
}
 
export default ProgressPage;