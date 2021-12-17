import {Container, ImageList, ImageListItem, Box,Button, TextField, Typography} from '@mui/material'
import { useState, useEffect } from 'react';
import ImageUpload from '../components/ImageUpload';

interface CreateProgressProps {
    
}
 
const CreateProgress: React.FC<CreateProgressProps> = () => {
    const [selectedImages , setSelectedImages] = useState<Array<any>>([])
    const [uploadedImages , setUploadedImages] = useState<Array<string>>([])
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
    const [measurements, setMeasurements] = useState({
        weight : 0,
        height : 0,
        bust : 0,
        calves : 0,
        chest : 0,
        forearm : 0,
        hips : 0,
        thighs : 0, 
        arms : 0,
        waist : 0,
    })
    const onChangeHandler = (e:any) => {
        const {name, value} = e.target
        setMeasurements({
            ...measurements,
            [name] : value,
        })
    }
    const submitHandler = () => {
        console.log(measurements)
        console.log(uploadedImages)
    }
    useEffect(() => {
        console.log(selectedImages)
    }, [selectedImages])
    
    return (
        <Container>
             <ImageList sx={{ width: "100%" }} cols={3} rowHeight="auto">
                {[0,1,2].map((item) => (
                    <ImageListItem key={item}>
                     <img
                        src={selectedImages[item] ? URL.createObjectURL(selectedImages[item]) : `https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg`}
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
                    value = {measurements.weight}
                    onChange={onChangeHandler}
                    type='number'
                />
                <TextField
                    id="height"
                    label="Height (in inch)"
                    name="height"
                    margin = "normal"
                    sx={{marginRight:"10px"}}
                    value = {measurements.height}
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
                                value = {measurements[part.title]}
                                onChange={onChangeHandler}
                                type='number'
                            />
                        )
                    })
                }
            </Box>
            <Button sx={{margin:"10px 0"}} onClick={submitHandler} variant="contained">Submit</Button>
        </Container>

    );
}
 
export default CreateProgress;