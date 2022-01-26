import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { saveAs } from 'file-saver';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}


interface BasicImageModalProps{
    open : boolean,
    handleClose : (x : any) => void,
    imgSrc : string 
}

const BasicImageModal = ({ open, handleClose, imgSrc}:BasicImageModalProps) => {
    const saveHandler = () => {
        saveAs(imgSrc, "myimg.jpg")
    }
    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{...style, textAlign:"center", margin:"auto",}}>
                <Stack sx={{ height:"100%"}} spacing={2}>
                    <img
                        src={imgSrc}
                        alt='img not avialable'
                        loading="lazy"
                        style={{ width: "100%", height:"100%", margin:"auto", objectFit:"contain" }}
                    />
                    <Stack direction={"row"} spacing={2}>
                        <Button variant="outlined" onClick={handleClose}>Close</Button>
                        <Button variant="outlined" onClick={saveHandler}>
                            Save
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
        </div>
    );
}


export default BasicImageModal;