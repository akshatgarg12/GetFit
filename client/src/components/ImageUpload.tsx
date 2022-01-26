import { Box, Button, Typography,} from '@mui/material';
import axios from '../config/axios'
import {useState} from 'react'

interface ImageUploadProps{
    selectedFile : any,
    setSelectedFile : (file : any) => void,
    setUploadedImage : (url : string) => void
}

const toBase64 = (file:any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// @ts-nocheck
const ImageUpload : React.FC<ImageUploadProps> = ({selectedFile, setSelectedFile,setUploadedImage}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [success, setSuccess] = useState<any>(false)
    const [imageUrl, setImageUrl] = useState("")
    const [uploaded, setUploaded] = useState(false)

    const ImageUploader = async () => {
        try{
            setLoading(true)
            if (!selectedFile) return;
            const file = await toBase64(selectedFile);
            const imgUploadResponse = await axios({
                method:"POST",
                url:"/image",
                data:{
                    file,
                }
            })
            console.log(imgUploadResponse)
            setUploadedImage(imgUploadResponse.data.img_url)
            setImageUrl(imgUploadResponse.data.img_url)
            setUploaded(true)
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
            setImageUrl("")
            setUploadedImage("")
            setSuccess(false)
        }
        
    }
return (
    <Box>
            <input
            type="file"
            accept="image/*"
            // @ts-ignore
            onChange={(e:any) => {
                setSelectedFile(e.target.files[0]);
                console.log(e.target.files[0]);
            }}
            />
            {
                uploaded ? 
                <Button onClick={discardImage} >
                    Discard
                 </Button> :
                <Button disabled={loading} onClick={ImageUploader} >
                    upload Image
                 </Button>
            }
            {
                error && 
                <Typography color={"red"}>{error}</Typography>
            }
            {
                success && 
                <Typography color={"green"}>Img uploaded successfully</Typography>
            }
    </Box>
    );
}

export default ImageUpload