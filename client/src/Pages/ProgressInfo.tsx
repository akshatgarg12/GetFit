import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as React from 'react';
import Table from '@mui/material/Table';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from "../config/axios";
import BasicImageModal from "../components/ImageModal";

interface ProgressInfoPageProps {
    
}


const ProgressInfoPage: React.FC<ProgressInfoPageProps> = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [progress, setProgress] = useState<any>(null)

    // modal related state and fns
    const [openModal, setOpenModal] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const handleOpenModal = (imgSrc : string) => {
        setOpenModal(true);
        setModalImage(imgSrc)
    }
    const handleCloseModal = () => setOpenModal(false);

    // show a btn to edit or delete the exercise
    const navigate = useNavigate()
    const onClickGoBackHandler = () => {
        navigate(-1);
    }
    const {_id} = useParams()
    const deleteProgress = async () => {
        const confirm = window.confirm("are you sure you want to delete this progress?")
        if(!confirm) return
        const req = await axios({
            method : "DELETE",
            url : `/progress/${_id}`
        })
        if(req.status === 200){
            console.log("deleted progress")
            navigate(-1)
        }else{
            setError(req.data.log)
        }
    }
    useEffect(() => {
        const fetchProgress = async () => {
            try{
                setLoading(true)
                const req = await axios({
                    method : "GET",
                    url : `/progress/${_id}`
                })
                if(req.status === 200){
                    console.log(req.data)
                    setProgress(req.data.progress)
                }else{
                    setProgress(null)
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
        fetchProgress()
    },[_id])

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
    if(progress){
        const measurementsData = []
        const {measurements, front_img, back_img, side_img, createdAt} = progress
        let BMI = 0
        if(measurements){
            for(let part in measurements){
                if(part === "_id" || part === "units" || part === "weight" || part === "height") continue
                const obj = {part, value : measurements[part]}
                measurementsData.push(obj)
            }
        }
        if(measurements.weight && measurements.height){
            BMI = measurements.weight / (measurements.height * measurements.height)
        }
        return (
            <Container sx={{padding:"2rem 1rem"}}>
                <Button sx={{marginBottom : "1rem"}} onClick={onClickGoBackHandler} startIcon={<ArrowBackIcon fontSize="large" color="disabled" />}>
                    Go Back
                </Button>
                <Typography variant="h4" gutterBottom component="div">
                    {new Date(createdAt).toLocaleDateString()}
                </Typography>
              
                <ImageList sx={{ width: "100%" }} cols={3} rowHeight="auto">
                    {[front_img, side_img, back_img].map((item, idx) => (
                        item && <ImageListItem key={idx}>
                        <img
                            src={item ? item : ""}
                            alt='img not avialable'
                            loading="lazy"
                            style={{ width: "100%", height:"40vh", objectFit:"contain" }}
                            onClick = {() => handleOpenModal(item)}
                        />
                        </ImageListItem>
                    ))}
                    <BasicImageModal 
                        imgSrc={modalImage}
                        handleClose={handleCloseModal}
                        open={openModal} 
                    />
                </ImageList>
                <Typography variant="h6" gutterBottom component="div">
                    Weight : {measurements.weight}
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    height : {measurements.height}
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    BMI : {BMI}
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    Measurements : 
                </Typography>
                <TableContainer sx={{ minWidth: 250}} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Units (in inch)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            measurementsData.map(({part, value}) => (
                                    <TableRow
                                        key={part}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {part}
                                    </TableCell>
                                    <TableCell align="right">{value}</TableCell>
                                    </TableRow>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={deleteProgress} color="error" sx={{marginTop:"3rem"}}>
                    Delete Progress
                </Button>
            </Container>
        );
    }

    return (
    <div>
        <Typography variant="body1" gutterBottom>
            Bust: Measure around the chest right at the nipple line, but don't pull the tape too tight.<br/>
            Calves: Measure around the largest part of each calf.<br/>
            Chest: Measure just under your bust.<br/>
            Forearm: Measure around the largest part of the arm below the elbow.<br/>
            Hips: Place the tape measure around the biggest part of your hips.<br/>
            Thighs: Measure around the biggest part of each thigh.<br/>
            Upper arm: Measure around the largest part of each arm above the elbow.<br/>
            Waist: Measure a half-inch above your belly button or at the smallest part of your waist.<br/>
        </Typography>
    </div>
    );
    
}
 
export default ProgressInfoPage;