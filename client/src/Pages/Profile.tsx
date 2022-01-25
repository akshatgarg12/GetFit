import { Container, Typography, Stack, Grid, Button } from '@mui/material';

import {useEffect, useState} from 'react'
import Calendar from 'react-calendar';
import { useAuth } from '../hooks/useAuth';
import axios from '../config/axios'
import React from 'react';

interface ProfileProps {
    
}
 
const Profile: React.FC<ProfileProps> = () => {
    const [value, onChange] = useState(new Date());
    const [activities, setActivities] = useState<Array<any>>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    
    const tileClassName =  ({ date, view }: any) => {
        // Add class to tiles in month view only
        if (view === "month") {
            // date is marked as absent then red, else green
            const data = activities.filter((a) => (new Date(a.date).toLocaleDateString() === new Date(date).toLocaleDateString()))
            // console.log(data)
            if(data && data.length){
                return data[0].mark === "Absent" ? "absent" : "present"
            }else{  
                return "none"
            }
        }
        return "none"
    }

    useEffect(() => {  
        const fetchActivity = async () => {
            try{
                setLoading(true)
                const response = await axios({
                    url : "/activity",
                    method : "GET"
                })
                if(response.status === 200){
                    const data = response.data.activities
                    setActivities(data)
                }else{
                    setActivities([])
                    setError(response.data.log)
                }
            }catch(e){
                // @ts-ignore
                setError(e.response.data.log)
            }finally{
                setLoading(false)
            }
        }
        fetchActivity()
    }, [])
    const markActivity = async (date: Date, mark: "Absent" | "Present") => {
        try{
            const response = await axios({
                url : "/activity",
                method : "POST",
                data : {
                    date,
                    mark
                }
            })
            if(response.status === 200){
                const data = response.data.activity
                setActivities([...activities, data])
            }else{
                setError(response.data.log)
            }
        }catch(e){
            // @ts-ignore
            setError(e.response.data.log)
        }finally{
            setLoading(false)
        }
    }
    

    const {user} = useAuth()
    const markPresent = () => markActivity(value, "Present")
    const markAbsent = () => markActivity(value, "Absent")
    const removeActivity = async () => {
        try{
            const date = activities.filter((a) => (new Date(a.date).toLocaleDateString() === value.toLocaleDateString()))[0].date
            const response = await axios({
                url : "/activity",
                method : "DELETE",
                data : {
                    date
                }
            })
            if(response.status === 200){
                const data = activities.filter((a) => (new Date(a.date).toLocaleDateString() !== value.toLocaleDateString()))
                setActivities(data)
            }else{
                setError(response.data.log)
            }
        }catch(e){
            // @ts-ignore
            setError(e.response.data.log)
        }finally{
            setLoading(false)
        }
    }
    const alreadyMarked = (val : Date) => {
        const flag = activities.filter((a) => (new Date(a.date).toLocaleDateString() === (val).toLocaleDateString()))
        return flag && flag.length
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
    return (
        <Container sx={{padding:"2rem 0"}}>
            <Stack spacing={2} style={{textAlign:"center"}}>
                <img src={user.photoURL} alt="user-profile-email" style={{width:"150px", height:"150px", objectFit:"contain", borderRadius:"50%", margin:"auto"}} />
                <Typography variant="h6">{user.displayName}</Typography>
            </Stack>  
            <Grid container sx={{textAlign:"center"}} mt={4} spacing={4}>
                <Grid item xs={12} md={12} lg={6}>
                    <Calendar
                        value={value}
                        onChange={onChange}
                        returnValue="start"
                        selectRange={false}
                        tileClassName={tileClassName}
                        className={"calender"}
                    />
                    
                </Grid>
                <Grid item xs={12} md={12} lg={6} sx={{textAlign:"center", margin:"auto"}}>
                    {
                        // check if date already exists in activity 
                        alreadyMarked(value) ?
                        <Button variant="contained" color="secondary" onClick={removeActivity}>Remove mark</Button>
                        :
                        <Stack spacing={2} sx={{maxWidth:"200px",margin:"auto"}}>
                            <Button size="medium" variant="contained" color="success" onClick={markPresent}>Present</Button>
                            <Button size="medium" variant="contained" color="error" onClick={markAbsent}>Absent</Button>
                        </Stack>
                    }
                    
                </Grid>
            </Grid>

        </Container>
    );
}
 
export default Profile;