import {useRef, useState, useCallback} from "react";
import Webcam from "react-webcam";
import { Box, Button, Stack, Typography } from "@mui/material";
import axios from '../config/axios'

interface WebcamCaptureProps{
    setUploadedImage : (url : string) => void
}

const WebcamCapture = ({setUploadedImage}:WebcamCaptureProps) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [success, setSuccess] = useState<any>(false)
    const webcamRef = useRef(null);
    const [facingMode, setFacingMode] = useState("user")
    const [capturedImage, setCapturedImage] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [uploaded, setUploaded] = useState(false)

    const ImageUploader = async () => {
        try{
            setLoading(true)
            if (!capturedImage) return;
            const imgUploadResponse = await axios({
                method:"POST",
                url:"/image",
                data:{
                    file : capturedImage,
                }
            })
            console.log(imgUploadResponse)
            setUploaded(true)
            setUploadedImage(imgUploadResponse.data.img_url)
            setImageUrl(imgUploadResponse.data.img_url)
            setError(null)
            setSuccess(true)
        }catch(e){
            // @ts-ignore
            setError(e.message)
            setSuccess(false)
        }finally{
            setLoading(false)
        }
    };
    const toggleFacingMode = () => {
        if(facingMode === "user"){
            setFacingMode("environment")
        }else{
            setFacingMode("user")
        }
    }
    const discardImage = async () => {
        try{
            if(uploaded && imageUrl){
                // delete request
                const imgDeleteResponse = await axios({
                    method:"DELETE",
                    url:"/image",
                    data:{
                        url : imageUrl,
                    }
                })
                console.log(imgDeleteResponse)
            }
        }catch(e){
            console.log(e)
        }finally{
            setUploaded(false)
            setCapturedImage("")
            setImageUrl("")
            setUploadedImage("")
            setSuccess(false)
        }
        
    }
    const videoConstraints = {
        width: 720,
        height: 1280,
        facingMode
    };
    const capture = useCallback(
        () => {
            // @ts-ignore
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc)
        },
        [webcamRef]
    );

    return (
        <Stack>
            {
                capturedImage ? 
                    <Stack spacing={2}>
                        <Box sx={{height:"450px",width:"300px", margin:"auto"}}>
                            <img style={{width:"100%", height:"100%", objectFit:"contain"}} src={capturedImage} alt="preview" />
                        </Box>
                        <Stack direction="row" spacing={2}>
                            {
                                uploaded ? 
                                <Typography>Image uploaded!</Typography> : 
                                <Button disabled={loading} onClick={ImageUploader}>Use this image</Button>
                            }
                            <Button onClick={discardImage}>Discard</Button>
                        </Stack>
                    </Stack>
                    :
                    <Stack spacing={2}>
                        <Box sx={{height:"450px",width:"300px", margin:"auto"}}>
                            <Webcam
                                audio={false}
                                height={"100%"}
                                width={"100%"}
                                style={{
                                    maxHeight : "1280px",
                                    maxWidth : "720px",
                                    margin:"auto"
                                }}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                mirrored={true}
                                videoConstraints={videoConstraints}
                            />
                        </Box>
                        <Stack direction="row" spacing={2}>
                            <Button onClick={capture}>Capture photo</Button>
                            <Button onClick={toggleFacingMode}>toggle</Button>
                        </Stack>
                    </Stack>

            }
            {
                error && 
                <Typography color={"red"}>{error}</Typography>
            }
            {
                success && 
                <Typography color={"green"}>Img uploaded successfully</Typography>
            }
        </Stack>
    );
};

export default WebcamCapture