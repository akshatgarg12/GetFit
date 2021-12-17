import { Box, Button,} from '@mui/material';
import axios from '../config/axios'

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
    const ImageUploader = async () => {
      if (!selectedFile) return;
      const file = await toBase64(selectedFile);
      const imgUploadResponse = await axios({
          method:"POST",
          url:"/image",
          data:{
              file,
              test: "hey"
          }
      })
      setUploadedImage(imgUploadResponse.data.img_url)
    };
return (
    <Box>
            <input
            type="file"
            // @ts-ignore
            onChange={(e:any) => {
                setSelectedFile(e.target.files[0]);
                console.log(e.target.files[0]);
            }}
            />
            <Button onClick={ImageUploader} >
                upload Image
            </Button>
    </Box>
    );
}

export default ImageUpload