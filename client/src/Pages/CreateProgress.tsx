import {Container, ImageList, ImageListItem, Box, TextField, Typography} from '@mui/material'
import { useState, useEffect } from 'react';
import ImageUpload from '../components/ImageUpload';

interface CreateProgressProps {
    
}
 
const CreateProgress: React.FC<CreateProgressProps> = () => {
    const [selectedImages , setSelectedImages] = useState<Array<any>>([])
    const measurementParts = [
        {
            title : "Bust",
            info : "Measure around the chest right at the nipple line, but don't pull the tape too tight."
        },
        {
            title : "Calves",
            info : "Measure around the largest part of each calf."
        },
        {
            title : "Chest",
            info : "Measure just under your bust."
        },
        {
            title : "Forearm",
            info : "Measure around the largest part of the arm below the elbow."
        },
        {
            title : "Hips",
            info : "Place the tape measure around the biggest part of your hips."
        },
        {
            title : "Thighs",
            info : "Measure around the biggest part of each thigh."
        },
        {
            title : "arms",
            info : "Measure around the largest part of each arm above the elbow."
        },
        {
            title : "Waist",
            info : "Measure a half-inch above your belly button or at the smallest part of your waist."
        },
        {
            title : "Bust",
            info : "Measure around the chest right at the nipple line, but don't pull the tape too tight."
        }
    ]
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
                        style={{width:"300px", height:"300px", objectFit:"contain"}}
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
                    label="Weight"
                    value={10}
                    margin = "normal"
                    sx={{marginRight:"10px"}}
                    // onChange={handleChange}
                />
                <TextField
                    id="height"
                    label="Height"
                    value = {10}
                    margin = "normal"
                    sx={{marginRight:"10px"}}
                />
                <Typography variant="h5" gutterBottom component="div">
                    Measurements
                </Typography>
                
                {
                    measurementParts.map((part) => {
                        return (
                            <TextField
                                key = {part.title}
                                id={part.title}
                                label={part.title}
                                value = {10}
                                margin = "normal"
                                sx={{marginRight:"10px"}}
                            />
                        )
                    })
                }
            </Box>
        </Container>

    );
}
 
export default CreateProgress;