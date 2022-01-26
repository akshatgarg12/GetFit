import {Container, ImageList, ImageListItem, Box,Button, TextField, Typography, Stack} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import axios from '../config/axios'
import {useNavigate} from 'react-router-dom'
import WebcamCapture from '../components/Webcam';

interface CreateProgressProps {
    
}

const guideImages = [
    '/images/front.jpeg',
    '/images/side.jpeg',
    '/images/back.jpeg',
]

const measurementParts = [
    {
        title : "bust",
        info : "Measure around the chest right at the nipple line, but don't pull the tape too tight."
    },
    {
        title : "calves",
        info : "Measure around the largest part of each calf."
    },
    {
        title : "chest",
        info : "Measure just under your bust."
    },
    {
        title : "forearm",
        info : "Measure around the largest part of the arm below the elbow."
    },
    {
        title : "hips",
        info : "Place the tape measure around the biggest part of your hips."
    },
    {
        title : "thighs",
        info : "Measure around the biggest part of each thigh."
    },
    {
        title : "arms",
        info : "Measure around the largest part of each arm above the elbow."
    },
    {
        title : "waist",
        info : "Measure a half-inch above your belly button or at the smallest part of your waist."
    }
]

const CreateProgress: React.FC<CreateProgressProps> = () => {
    const [selectedImages , setSelectedImages] = useState<Array<any>>([])
    const [uploadedImages , setUploadedImages] = useState<Array<string>>([])
    const [modeOfUploadingImage , setModeOfUploadingImage] = useState<Array<"upload" | "camera">>([])
    const changeModeOfUpload = (item : any, mode : "upload" | "camera") => {
        setModeOfUploadingImage((prev) => {
            const clone = [...prev]
            clone[item] = mode
            return clone
        })
    }

    const [measurements, setMeasurements] = useState<any>({
        weight : null,
        height : null,
        bust : null,
        calves : null,
        chest : null,
        forearm : null,
        hips : null,
        thighs : null, 
        arms : null,
        waist : null,
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [success, setSuccess] = useState<any>(null)
    const navigate = useNavigate()

    const onChangeHandler = (e:any) => {
        const {name, value} = e.target
        setMeasurements({
            ...measurements,
            [name] : value,
        })
    }
    const submitHandler = async () => {
        try{
            setLoading(true)
            // meausrement data should not be null
            for(let part in measurements){
                // @ts-ignore
                if(measurements[part] === null || measurements[part] === 0){
                    setError("Please fill all measurements")
                    return
                }
            }
            const req = await axios({
                method : "POST",
                url : "/progress",
                data : {
                    measurements,
                    front_img : uploadedImages[0],
                    side_img : uploadedImages[1],
                    back_img : uploadedImages[2],
                }
            })
            const {log} = req.data
            console.log(req.data)
            if(req.status === 200){
                setError(null)
                setSuccess(log)
            }else{
                setSuccess(null)
                setError(log)
            }
        }catch(e){
            setSuccess(null)
            // @ts-ignore
            setError(e.message)
        }finally{
            // release states
            setLoading(false)
        }
    }
    return (
        <Container sx={{padding:"2rem 1rem"}}>
            <Button sx={{marginBottom : "1rem"}} onClick={() => {navigate(-1)}} startIcon={<ArrowBackIcon fontSize="large" color="disabled" />}>
                Go Back
            </Button>
             <ImageList sx={{ width: "100%" }} cols={3} rowHeight="auto">
                {['front image','side image', 'back image'].map((name,item) => (
                    <ImageListItem key={item}>
                     <Typography variant="h6">
                        {name}
                     </Typography>
                     <Stack direction="row" spacing={2}>
                        <Button onClick={()=>changeModeOfUpload(item, "camera")}>Camera</Button>
                        <Button onClick={()=>changeModeOfUpload(item, "upload")}>Device</Button>
                    </Stack>
                     {
                         
                             modeOfUploadingImage[item] === "camera" ? 
                            
                                <WebcamCapture 
                                    setUploadedImage = {(url : string) => {
                                        const updateUploadedImages = [...uploadedImages]
                                        updateUploadedImages[item] = url
                                        setUploadedImages(updateUploadedImages)
                                    }}
                                /> :
                                <div>
                                    <img
                                        src={selectedImages[item] ? URL.createObjectURL(selectedImages[item]) : guideImages[item]}
                                        alt={"item"}
                                        loading="lazy"
                                        style={{width:"100%", height:"400px", objectFit:"contain"}}
                                    />
                                    <ImageUpload 
                                        selectedFile={selectedImages[item]}
                                        setSelectedFile={(file:any) => {
                                            setSelectedImages((prev) => {
                                            const files = [...prev]
                                            files[item] = file
                                            return files
                                            })
                                        }} 
                                        setUploadedImage = {(url : string) => {
                                            const updateUploadedImages = [...uploadedImages]
                                            updateUploadedImages[item] = url
                                            setUploadedImages(updateUploadedImages)
                                        }}
                                    />
                                </div> 

                     }
                     
                    </ImageListItem>
                ))}
            </ImageList>
            <Box
                component="form"
                autoComplete="off"
            >
                <Typography variant="h5" gutterBottom component="div">
                    Weight and Height
                </Typography>
                <TextField
                    id="weight"
                    label="Weight (in kgs)"
                    name="weight"
                    margin = "normal"
                    sx={{marginRight:"10px"}}
                    value = {measurements.weight || 0}
                    onChange={onChangeHandler}
                    type='number'
                />
                <TextField
                    id="height"
                    label="Height (in inch)"
                    name="height"
                    margin = "normal"
                    sx={{marginRight:"10px"}}
                    value = {measurements.height || 0}
                    onChange={onChangeHandler}
                    type='number'
                />
                <Typography variant="h5" gutterBottom component="div">
                    Measurements (in inch)
                </Typography>
                
                {
                    measurementParts.map((part) => {
                        return (
                            <TextField
                                key = {part.title}
                                id={part.title}
                                label={part.title}
                                name={part.title}
                                margin = "normal"
                                sx={{marginRight:"10px"}}
                                // @ts-ignore
                                value = {measurements[part.title] || 0}
                                onChange={onChangeHandler}
                                type='number'
                            />
                        )
                    })
                }
            </Box>
            {
                error && 
                <Typography color={"red"}>{error}</Typography>
            }
            {
                success && 
                <Typography color={"green"}>{success}</Typography>
            }
            <Button disabled={loading} sx={{margin:"10px 0"}} onClick={submitHandler} variant="contained">Submit</Button>
        </Container>
    );
}
 
export default CreateProgress;